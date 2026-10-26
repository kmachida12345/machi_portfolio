import { categoryStyle, type Category } from "@/lib/category";
import { cx } from "@/lib/cx";

type Props = {
  items: string[];
  category: Category;
  label: string;
  size?: "md" | "sm";
};

// スキルや記事のタグを並べる
export function TagList({ items, category, label, size = "md" }: Props) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className={cx(
            "rounded",
            size === "md" ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-[13px]",
            categoryStyle[category].soft,
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
