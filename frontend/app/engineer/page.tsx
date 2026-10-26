import type { Metadata } from "next";
import { ContactLine } from "@/components/ContactLine";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { SmartLink } from "@/components/SmartLink";
import { TagList } from "@/components/TagList";
import {
  career,
  engineerLead,
  engineerWorks,
  mentoring,
  skillGroups,
} from "@/data/engineer";
import { mentaUrl } from "@/data/site";
import { labelClass } from "@/lib/category";
import { cx } from "@/lib/cx";

export const metadata: Metadata = {
  title: "Engineer",
  description:
    "Android アプリ開発を中心に、Web・インフラまで。スキル、作ったもの、メンタリング、経歴。",
};

export default function EngineerPage() {
  return (
    <>
      <PageHeader
        label="ENGINEER"
        category="engineer"
        title="アプリ開発と、Web・インフラ"
        lead={engineerLead}
      />

      <Section id="skills" title="Skills">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          {skillGroups.map((group) => (
            <div
              key={group.name}
              className="flex flex-col gap-3 rounded-lg border border-line p-6"
            >
              <h3 className={cx(labelClass, "text-[13px] text-eng")}>
                {group.name}
              </h3>
              <TagList
                items={group.items}
                category="engineer"
                label={`${group.name} のスキル`}
              />
            </div>
          ))}
        </div>
      </Section>

      {engineerWorks.length > 0 && (
        <Section id="works" title="Works">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
            {engineerWorks.map((work) => (
              <article
                key={work.title}
                className="flex flex-col gap-3 rounded-lg border border-line p-6"
              >
                <h3 className="text-lg font-bold">{work.title}</h3>
                <p className="text-[15px] leading-[1.8] text-muted">
                  {work.description}
                </p>
                <p className="font-mono text-xs text-muted">
                  {work.stack.join(" · ")}
                </p>
                <SmartLink
                  href={work.href}
                  className="self-start py-2 text-sm text-eng hover:opacity-70"
                >
                  {work.linkLabel} →
                </SmartLink>
              </article>
            ))}
          </div>
        </Section>
      )}

      <section
        aria-labelledby="mentoring-heading"
        className="border-t border-line"
      >
        <Container className="flex flex-wrap gap-x-12 gap-y-8 py-16 md:py-20">
          <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-4">
            <h2 id="mentoring-heading" className="text-[26px] font-bold">
              Mentoring
            </h2>
            <p className="text-base leading-[1.9]">{mentoring.description}</p>
            <TagList
              items={mentoring.topics}
              category="engineer"
              label="相談できること"
            />
          </div>
          <div className="flex flex-[1_1_300px] flex-col justify-center gap-3 rounded-lg border border-line p-7">
            <span className={cx(labelClass, "text-eng")}>MENTA</span>
            <span className="text-[15px] leading-[1.8] text-muted">
              プランの内容や料金、お申し込みは MENTA のページからどうぞ。
            </span>
            <SmartLink
              href={mentaUrl}
              className="flex min-h-11 items-center self-start rounded-md border border-line px-5 text-sm font-medium hover:border-muted"
            >
              MENTA のプランを見る ↗
            </SmartLink>
          </div>
        </Container>
      </section>

      {career.length > 0 && (
        <Section id="career" title="Career">
          <ol className="flex flex-col border-b border-line">
            {career.map((item) => (
              <li
                key={`${item.period}-${item.title}`}
                className="flex flex-wrap gap-x-8 gap-y-2 border-t border-line py-6"
              >
                <span className="flex-[0_0_160px] font-mono text-sm text-muted">
                  {item.period}
                </span>
                <div className="flex flex-[999_1_320px] flex-col gap-1.5">
                  <span className="text-[17px] font-bold">{item.title}</span>
                  <span className="text-[15px] leading-[1.8] text-muted">
                    {item.description}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      )}

      <ContactLine
        text="開発のご相談は、お問い合わせフォームから（メンタリングは MENTA から）。"
        category="engineer"
      />
    </>
  );
}
