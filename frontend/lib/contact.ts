const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export type ContactKind = "music" | "engineer" | "other";

export type ContactPayload = {
  kind: ContactKind;
  name: string;
  email: string;
  message: string;
  turnstileToken: string;
};

export type ContactResult =
  { ok: true } | { ok: false; status: number; errors: string[] };

const fallbackError =
  "送信できませんでした。時間をおいて再度お試しいただくか、SNS からご連絡ください。";

// CloudFront の OAC 経由で Lambda に POST するときは、
// 本文の SHA-256 を x-amz-content-sha256 ヘッダーに入れる必要がある（Lambda は署名なしの本文を受け付けない）
async function sha256Hex(text: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text),
  );
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function submitContact(
  payload: ContactPayload,
): Promise<ContactResult> {
  const body = JSON.stringify(payload);

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-amz-content-sha256": await sha256Hex(body),
      },
      body,
    });
  } catch {
    return { ok: false, status: 0, errors: [fallbackError] };
  }

  if (res.status === 201) return { ok: true };

  // API のエラーは { errors: [...] } の JSON。WAF でブロックされたときなどは
  // CloudFront の 404 ページ（HTML）が返ってくるので、JSON でなければ汎用のメッセージにする
  const isJson = res.headers.get("content-type")?.includes("application/json");
  if (isJson) {
    try {
      const data: unknown = await res.json();
      if (
        typeof data === "object" &&
        data !== null &&
        "errors" in data &&
        Array.isArray(data.errors) &&
        data.errors.every((e) => typeof e === "string")
      ) {
        return { ok: false, status: res.status, errors: data.errors };
      }
    } catch {
      // 読めなければ汎用のメッセージにする
    }
  }
  return { ok: false, status: res.status, errors: [fallbackError] };
}
