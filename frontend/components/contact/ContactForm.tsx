"use client";

import { useState, type FormEvent } from "react";
import { Turnstile } from "@/components/contact/Turnstile";
import { submitContact, type ContactKind } from "@/lib/contact";
import { cx } from "@/lib/cx";

const kinds: {
  value: ContactKind;
  label: string;
  selected: string;
  accent: string;
}[] = [
  {
    value: "music",
    label: "演奏・レッスン",
    selected: "border-music bg-music-soft",
    accent: "accent-music",
  },
  {
    value: "engineer",
    label: "開発のご相談",
    selected: "border-eng bg-eng-soft",
    accent: "accent-eng",
  },
  {
    value: "other",
    label: "その他",
    selected: "border-fg bg-surface",
    accent: "accent-fg",
  },
];

const fieldClass =
  "rounded-md border border-line bg-bg px-3.5 text-base text-fg focus:border-fg focus:outline-none disabled:opacity-60";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Status = "idle" | "submitting" | "success";

export function ContactForm() {
  const [kind, setKind] = useState<ContactKind>("music");
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<string[]>([]);
  const [resetKey, setResetKey] = useState(0);
  const [turnstileFailed, setTurnstileFailed] = useState(false);

  const submitting = status === "submitting";
  const unavailable = !TURNSTILE_SITE_KEY || turnstileFailed;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token || submitting) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("submitting");
    setErrors([]);

    const result = await submitContact({
      kind,
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      turnstileToken: token,
    });

    // トークンは 1 回しか使えないので、結果に関係なく取り直す
    setToken(null);
    setResetKey((key) => key + 1);

    if (result.ok) {
      form.reset();
      setKind("music");
      setStatus("success");
    } else {
      setErrors(result.errors);
      setStatus("idle");
    }
  }

  return (
    <form
      aria-label="お問い合わせフォーム"
      onSubmit={handleSubmit}
      className="flex min-w-0 flex-[999_1_520px] flex-col gap-7 rounded-lg border border-line p-6 md:p-10"
    >
      <fieldset className="flex flex-col gap-3" disabled={submitting}>
        <legend className="mb-3 text-[15px] font-bold">ご用件</legend>
        <div className="flex flex-wrap gap-2.5">
          {kinds.map((item) => (
            <label
              key={item.value}
              className={cx(
                "flex min-h-12 flex-[1_1_180px] cursor-pointer items-center gap-2.5 rounded-md border px-4 text-[15px]",
                kind === item.value ? item.selected : "border-line",
              )}
            >
              <input
                type="radio"
                name="kind"
                value={item.value}
                checked={kind === item.value}
                onChange={() => setKind(item.value)}
                className={cx("size-[18px]", item.accent)}
              />
              {item.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-[15px] font-bold">
          お名前
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={100}
          disabled={submitting}
          className={cx(fieldClass, "min-h-12")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[15px] font-bold">
          メールアドレス
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          disabled={submitting}
          className={cx(fieldClass, "min-h-12")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[15px] font-bold">
          内容
        </label>
        <textarea
          id="message"
          name="message"
          rows={7}
          required
          maxLength={5000}
          disabled={submitting}
          aria-describedby="message-hint"
          className={cx(fieldClass, "resize-y py-3 leading-[1.7]")}
        />
        <span id="message-hint" className="text-[13px] text-muted">
          演奏のご依頼は日時・場所・内容、レッスンはご希望の楽器と経験がわかるとスムーズです。
        </span>
      </div>

      {TURNSTILE_SITE_KEY && !turnstileFailed && (
        <Turnstile
          siteKey={TURNSTILE_SITE_KEY}
          onTokenChange={setToken}
          resetKey={resetKey}
          onLoadError={() => setTurnstileFailed(true)}
        />
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="flex-[1_1_260px] text-[13px] leading-[1.7] text-muted">
          いただいた情報は、お返事のためだけに使います。送信時に、ボット対策として
          Cloudflare Turnstile による確認を行います。
        </p>
        <button
          type="submit"
          disabled={!token || submitting || unavailable}
          className="min-h-12 rounded-md bg-fg px-10 text-[15px] font-medium text-bg hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? "送信中…" : "送信する"}
        </button>
      </div>

      {unavailable && (
        <p
          role="alert"
          className="rounded-lg bg-surface p-4 text-sm leading-[1.8] text-muted"
        >
          現在フォームを利用できません。お手数ですが、SNS からご連絡ください。
        </p>
      )}

      {errors.length > 0 && (
        <ul
          role="alert"
          className="flex flex-col gap-1 rounded-lg border border-line bg-surface p-4 text-sm leading-[1.8]"
        >
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      {status === "success" && (
        <p
          role="status"
          className="rounded-lg bg-surface p-4 text-sm leading-[1.8]"
        >
          送信しました。お問い合わせありがとうございます。内容を確認して、メールでお返事します。
        </p>
      )}
    </form>
  );
}
