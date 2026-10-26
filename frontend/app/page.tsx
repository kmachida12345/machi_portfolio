import Link from "next/link";
import { PostCard } from "@/components/blog/PostCard";
import { ContactLine } from "@/components/ContactLine";
import { Container } from "@/components/Container";
import { Placeholder } from "@/components/Placeholder";
import { Section } from "@/components/Section";
import { WorkCard } from "@/components/WorkCard";
import { posts } from "@/data/posts";
import { profile } from "@/data/profile";
import { showcase } from "@/data/showcase";

export default function Home() {
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <section>
        <Container className="flex flex-wrap items-end gap-12 py-16 md:py-24">
          <div className="flex min-w-0 flex-[999_1_480px] flex-col gap-[22px]">
            <p className="font-mono text-[13px] tracking-[0.08em] text-muted">
              {profile.roleLabel}
            </p>
            <h1 className="text-[40px] leading-[1.1] font-bold tracking-[-0.015em] md:text-[64px]">
              {profile.name}
            </h1>
            <p className="text-xl leading-relaxed font-medium">
              {profile.title}
            </p>
            <p className="max-w-[620px] text-base leading-[1.9] text-muted">
              {profile.intro}
            </p>
            <Link
              href="/about/"
              className="self-start border-b border-fg py-2.5 text-[15px] font-medium hover:opacity-70"
            >
              プロフィールを見る
            </Link>
          </div>
          <Placeholder
            label=""
            className="aspect-[4/5] max-w-[260px] flex-[1_1_220px]"
          />
        </Container>
      </section>

      {showcase.length > 0 && (
        <Section
          id="works"
          title="Works"
          size="top"
          action={
            <nav aria-label="Works の詳細" className="flex gap-5 text-[15px]">
              <Link
                href="/engineer/"
                className="py-3 text-eng hover:opacity-70"
              >
                Engineer →
              </Link>
              <Link href="/music/" className="py-3 text-music hover:opacity-70">
                Music →
              </Link>
            </nav>
          }
        >
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
            {showcase.map((item) => (
              <WorkCard key={`${item.category}-${item.title}`} item={item} />
            ))}
          </div>
        </Section>
      )}

      <Section
        id="blog"
        title="Blog"
        size="top"
        action={
          <Link href="/blog/" className="py-3 text-[15px] hover:opacity-70">
            すべての記事 →
          </Link>
        }
      >
        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-[15px] text-muted">
            準備中です。技術と音楽、どちらの記事も書いていく予定です。
          </p>
        )}
      </Section>

      <ContactLine text="演奏のご依頼・開発のご相談は、お問い合わせフォームから。" />
    </>
  );
}
