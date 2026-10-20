"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import { SiGithub, SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { navItems, socialLinks } from "@/data/site";

type SocialItem = {
  href: string;
  label: string;
  Icon: IconType;
};

const socialItems: SocialItem[] = [
  { href: socialLinks.github, label: "GitHub", Icon: SiGithub },
  { href: socialLinks.x, label: "X", Icon: SiX },
  { href: socialLinks.youtube, label: "YouTube", Icon: SiYoutube },
  { href: socialLinks.instagram, label: "Instagram", Icon: SiInstagram },
];

// "/blog/" のメニューは "/blog" でも "/blog/post-1/" でも「今いるページ」として扱う
function isCurrent(pathname: string, href: string) {
  const base = href.replace(/\/$/, "");
  return pathname === base || pathname.startsWith(`${base}/`);
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-x-8 gap-y-2 px-6 py-4">
        <Link href="/" className="py-3 font-mono text-base font-medium">
          kmachida
        </Link>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <nav aria-label="メインメニュー">
            <ul className="flex flex-wrap gap-x-6 text-[15px]">
              {navItems.map((item) => {
                const current = isCurrent(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      className={`block py-3 hover:opacity-70 ${current ? `font-bold ${item.activeClass ?? ""}` : ""}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <ul aria-label="SNS" className="flex">
            {socialItems.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-11 items-center justify-center text-muted hover:text-fg"
                >
                  <Icon aria-hidden size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
