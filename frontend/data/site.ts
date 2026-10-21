export type NavItem = {
  href: string;
  label: string;
  // 今いるページのときに足す色のクラス（ない項目は文字色のまま太字だけ）
  activeClass?: string;
};

export const navItems: NavItem[] = [
  { href: "/about/", label: "About" },
  { href: "/engineer/", label: "Engineer", activeClass: "text-eng" },
  { href: "/music/", label: "Music", activeClass: "text-music" },
  { href: "/blog/", label: "Blog" },
  { href: "/contact/", label: "Contact" },
];

export const socialLinks = {
  github: "https://github.com/kmachida12345",
  x: "https://x.com/machi_irish",
  youtube: "https://www.youtube.com/@kmachida12345",
  instagram: "https://www.instagram.com/kmachida0928",
};