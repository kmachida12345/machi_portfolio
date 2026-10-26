import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostMeta } from "@/components/blog/PostMeta";
import { TagList } from "@/components/TagList";
import { Thumbnail } from "@/components/Thumbnail";
import { findPost, posts } from "@/data/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

// 静的書き出しなので、ビルド時に全記事のページを作る。それ以外の URL は 404
export const dynamicParams = false;

export function generateStaticParams() {
  if (posts.length === 0) {
    return [{ slug: "_" }];
  }
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article" },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  // posts は新しい順なので、1 つ後ろが「前の記事」
  const index = posts.indexOf(post);
  const older = posts[index + 1];
  const newer = posts[index - 1];

  return (
    <div className="mx-auto max-w-180 px-6 pt-[72px] pb-24">
      <article className="flex flex-col gap-7">
        <header className="flex flex-col gap-4 border-b border-line pb-7">
          <Link
            href="/blog/"
            className="self-start py-2 text-sm text-muted hover:opacity-70"
          >
            ← Blog
          </Link>
          <PostMeta post={post} />
          <h1 className="text-[26px] leading-normal font-bold md:text-[32px]">
            {post.title}
          </h1>
          <TagList
            items={post.tags}
            category={post.category}
            label="タグ"
            size="sm"
          />
        </header>

        <Thumbnail
          category={post.category}
          icon={post.icon}
          kaomoji={post.kaomoji}
          image={post.image}
          iconSize={48}
          className="rounded-lg"
        />

        <p className="text-base leading-loose">{post.excerpt}</p>
        <p className="rounded-lg bg-surface p-5 text-[15px] leading-[1.9] text-muted">
          本文は準備中です。ブログの仕組みを作るときに追加します。
        </p>

        <nav
          aria-label="前後の記事"
          className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4"
        >
          {older ? (
            <Link
              href={`/blog/${older.slug}/`}
              className="flex flex-col gap-1.5 rounded-lg border border-line p-5 hover:border-muted"
            >
              <span className="text-[13px] text-muted">← 前の記事</span>
              <span className="text-[15px] leading-relaxed font-medium">
                {older.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link
              href={`/blog/${newer.slug}/`}
              className="flex flex-col gap-1.5 rounded-lg border border-line p-5 text-right hover:border-muted"
            >
              <span className="text-[13px] text-muted">次の記事 →</span>
              <span className="text-[15px] leading-relaxed font-medium">
                {newer.title}
              </span>
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}
