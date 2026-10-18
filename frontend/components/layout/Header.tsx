"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiGithub, SiX, SiYoutube, SiInstagram } from "react-icons/si";
import { navItems, socialLinks } from "@/data/site";

export function Header() {
  const pathname = usePathname();

  return (
    <header></header>
    
  );
}