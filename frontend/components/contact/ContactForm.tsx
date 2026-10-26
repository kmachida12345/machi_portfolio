"use client";

import { useState, type FormEvent } from "react";
import { cx } from "@/lib/cx";

type Kind = "music" | "engineer" | "other";

const kinds: {
  value: Kind;
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
  "rounded-md border border-line bg-bg px-3.5 text-base text-fg focus:border-fg focus:outline-none";

// 見た目だけ先に用意したフォーム。送信の仕組み（API・メール通知・スパム対策）は別のステップで作る
export function ContactForm() {
  const [kind, setKind] = useState<Kind>("music");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form
      aria-label="お問い合わせフォーム"
      onSubmit={handleSubmit}
      className="flex min-w-0 flex-[999_1_520px] flex-col gap-7 rounded-lg border border-line p-6 md:p-10"
    >
      <fieldset className="flex flex-col gap-3">
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
          aria-describedby="message-hint"
          className={cx(fieldClass, "resize-y py-3 leading-[1.7]")}
        />
        <span id="message-hint" className="text-[13px] text-muted">
          演奏のご依頼は日時・場所・内容、レッスンはご希望の楽器と経験がわかるとスムーズです。
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="flex-[1_1_260px] text-[13px] leading-[1.7] text-muted">
          いただいた情報は、お返事のためだけに使います。
        </p>
        <button
          type="submit"
          className="min-h-12 rounded-md bg-fg px-10 text-[15px] font-medium text-bg hover:opacity-80"
        >
          送信する
        </button>
      </div>

      {submitted && (
        <p
          role="status"
          className="rounded-lg bg-surface p-4 text-sm leading-[1.8] text-muted"
        >
          送信機能は準備中です。お手数ですが、SNS からご連絡ください。
        </p>
      )}
    </form>
  );
}
