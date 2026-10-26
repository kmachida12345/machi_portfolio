import type { ReactNode } from "react";
import { Container } from "@/components/Container";
import { categoryStyle, type Category } from "@/lib/category";
import { cx } from "@/lib/cx";

type Props = {
  label: string;
  title: string;
  lead?: string;
  category?: Category;
  // 右側に並べるもの（プロフィール表など）
  aside?: ReactNode;
};

// 下層ページの冒頭（ラベル・見出し・リード文）
export function PageHeader({ label, title, lead, category, aside }: Props) {
  return (
    <section>
      <Container className="flex flex-wrap gap-12 pt-20 pb-14">
        <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-5">
          <p
            className={cx(
              "font-mono text-[13px] font-medium tracking-[0.08em]",
              category ? categoryStyle[category].text : "text-muted",
            )}
          >
            {label}
          </p>
          <h1 className="text-[32px] leading-tight font-bold md:text-[44px]">
            {title}
          </h1>
          {lead && (
            <p className="max-w-[640px] text-base leading-[1.9] text-muted">
              {lead}
            </p>
          )}
        </div>
        {aside}
      </Container>
    </section>
  );
}
