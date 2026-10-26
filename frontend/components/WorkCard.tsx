import { SmartLink } from "@/components/SmartLink";
import { Thumbnail } from "@/components/Thumbnail";
import type { WorkItem } from "@/data/showcase";
import { categoryStyle, labelClass } from "@/lib/category";
import { cx } from "@/lib/cx";

// トップページの Works に並べるカード（カード全体がリンク）
export function WorkCard({ item }: { item: WorkItem }) {
  const style = categoryStyle[item.category];
  return (
    <SmartLink
      href={item.href}
      className="flex flex-col overflow-hidden rounded-lg border border-line bg-bg transition-colors hover:border-muted"
    >
      <Thumbnail
        category={item.category}
        icon={item.icon}
        image={item.thumbnail}
      />
      <div className="flex flex-col gap-2 px-5 pt-[18px] pb-[22px]">
        <span className={cx(labelClass, style.text)}>
          {style.label} · {item.kind}
        </span>
        <span className="text-[17px] leading-normal font-bold">
          {item.title}
        </span>
        <span className="text-sm leading-[1.7] text-muted">
          {item.description}
        </span>
      </div>
    </SmartLink>
  );
}
