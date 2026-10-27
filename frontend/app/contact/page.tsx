import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/Container";
import { SmartLink } from "@/components/SmartLink";
import { mentaUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "演奏・レッスンのご依頼、アプリ開発のご相談はこちらから。",
};

export default function ContactPage() {
  return (
    <Container className="flex flex-wrap gap-14 pt-20 pb-24">
      <div className="flex flex-[1_1_280px] flex-col gap-5">
        <p className="font-mono text-[13px] tracking-[0.08em] text-muted">
          CONTACT
        </p>
        <h1 className="text-[32px] leading-snug font-bold md:text-[40px]">
          お問い合わせ
        </h1>
        <p className="text-[15px] leading-[1.9] text-muted">
          演奏のご依頼、アプリ開発のご相談、そのほかのご連絡もこちらからどうぞ。1日以内にお返事します。
        </p>
        <p className="rounded-lg bg-surface p-4 text-sm leading-[1.8] text-muted">
          Android 開発のメンタリングは、
          <SmartLink
            href={mentaUrl}
            className="text-eng underline underline-offset-4"
          >
            MENTA のページ
          </SmartLink>
          からお申し込みください。
        </p>
      </div>
      <ContactForm />
    </Container>
  );
}
