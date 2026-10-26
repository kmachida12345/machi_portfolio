import { Fragment, type ReactNode } from "react";
import { cx } from "@/lib/cx";

export type InfoItem = {
  term: string;
  detail: ReactNode;
};

type Props = {
  items: InfoItem[];
  // box: 地の色付きの小さな表（Music のプロフィールなど）/ rows: 線で区切った表（About）
  variant?: "box" | "rows";
  className?: string;
};

export function InfoTable({ items, variant = "box", className }: Props) {
  if (variant === "rows") {
    return (
      <dl
        className={cx(
          "grid grid-cols-[minmax(120px,200px)_minmax(0,1fr)] border-b border-line text-[15px]",
          className,
        )}
      >
        {items.map((item) => (
          <Fragment key={item.term}>
            <dt className="border-t border-line py-4 text-muted">
              {item.term}
            </dt>
            <dd className="border-t border-line py-4">{item.detail}</dd>
          </Fragment>
        ))}
      </dl>
    );
  }

  return (
    <dl
      className={cx(
        "grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-3.5 rounded-lg p-6 text-[15px]",
        className,
      )}
    >
      {items.map((item) => (
        <Fragment key={item.term}>
          <dt className="text-muted">{item.term}</dt>
          <dd>{item.detail}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
