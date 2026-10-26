import Link from "next/link";
import { PostMeta } from "@/components/blog/PostMeta";
import { Thumbnail } from "@/components/Thumbnail";
import type { Post } from "@/data/posts";

// ブログ一覧の 1 行（サムネイル + 日付・カテゴリ・タイトル・冒頭）
export function PostListItem({ post }: { post: Post }) {
  return (
    <li className="border-t border-line">
      <Link
        href={`/blog/${post.slug}/`}
        className="group flex flex-wrap items-start gap-x-7 gap-y-4 py-7"
      >
        <Thumbnail
          category={post.category}
          icon={post.icon}
          kaomoji={post.kaomoji}
          image={post.image}
          iconSize={36}
          className="max-w-[280px] flex-[1_1_220px] rounded-lg"
        />
        <div className="flex min-w-0 flex-[999_1_360px] flex-col gap-2.5">
          <PostMeta post={post} />
          <span className="text-xl leading-normal font-bold group-hover:opacity-70">
            {post.title}
          </span>
          <span className="text-[15px] leading-[1.8] text-muted">
            {post.excerpt}
          </span>
        </div>
      </Link>
    </li>
  );
}
