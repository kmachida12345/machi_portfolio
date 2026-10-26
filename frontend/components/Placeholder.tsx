import { cx } from "@/lib/cx";

// 写真などが用意できるまでの点線の枠
export function Placeholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex items-center justify-center rounded-lg border border-dashed border-line bg-surface text-sm text-muted",
        className,
      )}
    >
      {label}
    </div>
  );
}
