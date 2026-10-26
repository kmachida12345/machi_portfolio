import type { ThumbIcon } from "@/components/Thumbnail";
import type { Category } from "@/lib/category";

// ブログの仕組み（Markdown にするか DB にするか）を作るまでの仮のデータ
export type Post = {
  slug: string;
  date: string; // YYYY-MM-DD
  category: Category;
  title: string;
  excerpt: string;
  tags: string[];
  icon?: ThumbIcon;
  kaomoji?: string;
  image?: string;
};

export const posts: Post[] = [];

export function findPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
