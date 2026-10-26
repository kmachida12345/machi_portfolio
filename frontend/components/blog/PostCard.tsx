import Link from "next/link";
import { PostMeta } from "@/components/blog/PostMeta";
import { Thumbnail } from "@/components/Thumbnail";
import type { Post } from "@/data/posts";

// トップページの Blog に並べる縦長のカード
export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}/`} className="group flex flex-col gap-3.5">
      <Thumbnail
        category={post.category}
        icon={post.icon}
        kaomoji={post.kaomoji}
        image={post.image}
        className="rounded-lg"
      />
      <PostMeta post={post} />
      <span className="text-[17px] leading-relaxed font-bold group-hover:opacity-70">
        {post.title}
      </span>
    </Link>
  );
}
