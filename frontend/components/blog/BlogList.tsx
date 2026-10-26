"use client";

import { useState } from "react";
import { PostListItem } from "@/components/blog/PostListItem";
import type { Post } from "@/data/posts";
import type { Category } from "@/lib/category";
import { cx } from "@/lib/cx";

type Filter = "all" | Category;

const filters: { value: Filter; label: string; text: string }[] = [
  { value: "all", label: "すべて", text: "" },
  { value: "engineer", label: "Engineer", text: "text-eng" },
  { value: "music", label: "Music", text: "text-music" },
];

// カテゴリの切り替えはブラウザ側で行う（静的書き出しなので、記事は全部 HTML に入っている）
export function BlogList({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible =
    filter === "all" ? posts : posts.filter((post) => post.category === filter);

  return (
    <>
      <div role="group" aria-label="カテゴリ" className="flex flex-wrap gap-2">
        {filters.map((item) => {
          const selected = filter === item.value;
          return (
            <button
              key={item.value}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(item.value)}
              className={cx(
                "flex min-h-10 items-center rounded-full px-4 text-sm",
                selected
                  ? "bg-fg text-bg"
                  : cx("border border-line hover:border-muted", item.text),
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {visible.length > 0 ? (
        <ol className="flex flex-col border-b border-line">
          {visible.map((post) => (
            <PostListItem key={post.slug} post={post} />
          ))}
        </ol>
      ) : (
        <p className="border-t border-line py-10 text-[15px] text-muted">
          まだ記事がありません。
        </p>
      )}
    </>
  );
}
