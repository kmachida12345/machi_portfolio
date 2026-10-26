import type { Post } from "@/data/posts";
import { categoryStyle } from "@/lib/category";
import { cx } from "@/lib/cx";
import { formatDate } from "@/lib/date";

// 記事の日付とカテゴリ
export function PostMeta({ post }: { post: Post }) {
  const style = categoryStyle[post.category];
  return (
    <span className="flex flex-wrap gap-4 font-mono text-xs">
      <time dateTime={post.date} className="text-muted">
        {formatDate(post.date)}
      </time>
      <span className={cx("font-medium tracking-[0.08em]", style.text)}>
        {style.label}
      </span>
    </span>
  );
}
