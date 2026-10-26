import type { ThumbIcon } from "@/components/Thumbnail";
import type { Category } from "@/lib/category";

// トップページの Works に並べるカード。エンジニアと音楽を混ぜて並べる
// （あとで API + DB に移す予定。そのときもこの形に合わせる）
export type WorkItem = {
  category: Category;
  kind: string; // ラベルの後半："WEB"、"VIDEO"、"LESSON" など
  title: string;
  description: string;
  href: string; // サイト内なら "/music/"、外部なら "https://..."
  icon: ThumbIcon; // 画像がないときに出すアイコン
  thumbnail?: string; // 画像の URL（あれば画像を表示）
};

export const showcase: WorkItem[] = [
  {
    category: "engineer",
    kind: "WEB",
    title: "machi_portfolio",
    description: "このサイト。フロントからインフラまで自分で作っています。",
    href: "/engineer/",
    icon: "code",
  },
];
