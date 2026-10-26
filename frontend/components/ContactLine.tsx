import Link from "next/link";
import { Container } from "@/components/Container";
import { categoryStyle, type Category } from "@/lib/category";
import { cx } from "@/lib/cx";

type Props = {
  text: string;
  category?: Category;
};

// 各ページの最後に置く、お問い合わせへの控えめな 1 行
export function ContactLine({ text, category }: Props) {
  return (
    <section aria-label="お問い合わせ" className="border-t border-line">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-10">
        <p className="text-[15px] text-muted">{text}</p>
        <Link
          href="/contact/"
          className={cx(
            "py-3 text-[15px] font-medium hover:opacity-70",
            category ? categoryStyle[category].text : "text-fg",
          )}
        >
          お問い合わせ →
        </Link>
      </Container>
    </section>
  );
}
