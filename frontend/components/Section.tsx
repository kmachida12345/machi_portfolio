import type { ReactNode } from "react";
import { Container } from "@/components/Container";
import { cx } from "@/lib/cx";

type Props = {
  id: string;
  title?: string;
  description?: string;
  // 見出しの右端に置くリンク（「すべて見る →」など）
  action?: ReactNode;
  // トップページは見出しを少し大きくする
  size?: "top" | "sub";
  children: ReactNode;
};

// 上に 1px の線を引いた、ページの 1 区切り
export function Section({
  id,
  title,
  description,
  action,
  size = "sub",
  children,
}: Props) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className="border-t border-line"
    >
      <Container className="flex flex-col gap-7 py-16 md:py-20">
        {title && (
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <div className="flex flex-col gap-2">
              <h2
                id={headingId}
                className={cx(
                  "font-bold",
                  size === "top" ? "text-[30px]" : "text-[26px]",
                )}
              >
                {title}
              </h2>
              {description && (
                <p className="text-[15px] text-muted">{description}</p>
              )}
            </div>
            {action}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
