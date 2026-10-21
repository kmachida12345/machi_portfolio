import { socialLinks } from "@/data/site";
import Link from "next/link";
type SocialItem = {
  href: string;
  label: string;
};

const socialItems: SocialItem[] = [
  {
    href: socialLinks.github,
    label: "GitHub",
  },
  {
    href: socialLinks.x,
    label: "X",
  },
  {
    href: socialLinks.youtube,
    label: "YouTube",
  },
  {
    href: socialLinks.instagram,
    label: "Instagram",
  },
];

const linkClass = "block py-3 hover:text-fg";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-x-8 gap-y-2 px-6 py-4">
        <ul
          aria-label="フッター"
          className="flex flex-wrap gap-x-6 text-sm text-muted"
        >
          {socialItems.map((item) => (
            <li key={item.href}>
              <a
                className={linkClass}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <Link className={linkClass} href="/contact/">
              お問い合わせ
            </Link>
          </li>
        </ul>

        <div className="font-mono text-xs text-muted">
          &copy; {new Date().getFullYear()} Kohei Machida
        </div>
      </div>
    </footer>
  );
}
