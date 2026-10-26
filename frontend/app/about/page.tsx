import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { InfoTable } from "@/components/InfoTable";
import { Placeholder } from "@/components/Placeholder";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
  description:
    "Android エンジニアで、アイリッシュフルート・バウロン奏者の町田康平のプロフィール。",
};

export default function AboutPage() {
  const facts = [
    ...profile.facts,
    {
      term: "連絡先",
      detail: (
        <Link
          href="/contact/"
          className="underline underline-offset-4 hover:opacity-70"
        >
          お問い合わせフォーム
        </Link>
      ),
    },
  ];

  return (
    <>
      <section>
        <Container className="flex flex-wrap gap-12 pt-20 pb-16">
          <Placeholder
            label=""
            className="aspect-[4/5] max-w-[300px] flex-[1_1_240px]"
          />
          <div className="flex min-w-0 flex-[999_1_460px] flex-col gap-5">
            <p className="font-mono text-[13px] tracking-[0.08em] text-muted">
              ABOUT
            </p>
            <h1 className="text-[32px] leading-tight font-bold md:text-[44px]">
              {profile.name}
            </h1>
            <p className="text-lg font-medium">{profile.title}</p>
            {profile.aboutParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-[1.95]">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section aria-label="2 つの活動" className="border-t border-line">
        <Container className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-12 py-16">
          <div className="flex flex-col gap-3.5">
            <h2 className="font-mono text-[13px] font-medium tracking-[0.08em] text-eng">
              AS AN ENGINEER
            </h2>
            <p className="text-[15px] leading-[1.9]">{profile.asEngineer}</p>
            <Link
              href="/engineer/"
              className="self-start py-2.5 text-[15px] text-eng hover:opacity-70"
            >
              スキル・Works を見る →
            </Link>
          </div>
          <div className="flex flex-col gap-3.5">
            <h2 className="font-mono text-[13px] font-medium tracking-[0.08em] text-music">
              AS A MUSICIAN
            </h2>
            <p className="text-[15px] leading-[1.9]">{profile.asMusician}</p>
            <Link
              href="/music/"
              className="self-start py-2.5 text-[15px] text-music hover:opacity-70"
            >
              演奏・出演情報を見る →
            </Link>
          </div>
        </Container>
      </section>

      <section aria-labelledby="facts-heading" className="border-t border-line">
        <Container className="flex flex-col gap-6 py-16">
          <h2 id="facts-heading" className="text-2xl font-bold">
            プロフィール
          </h2>
          <InfoTable items={facts} variant="rows" />
        </Container>
      </section>
    </>
  );
}
