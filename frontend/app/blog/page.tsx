import type { Metadata } from "next";
import { BlogList } from "@/components/blog/BlogList";
import { Container } from "@/components/Container";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "開発で学んだことと、アイルランド伝統音楽のこと。",
};

export default function BlogPage() {
  return (
    <Container className="flex flex-col gap-9 pt-20 pb-24">
      <div className="flex flex-col gap-4">
        <p className="font-mono text-[13px] tracking-[0.08em] text-muted">
          BLOG
        </p>
        <h1 className="text-[32px] font-bold md:text-[44px]">Blog</h1>
        <p className="text-base leading-[1.9] text-muted">
          開発で学んだことと、音楽のこと。
        </p>
      </div>
      <BlogList posts={posts} />
    </Container>
  );
}
