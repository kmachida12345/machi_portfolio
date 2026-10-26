// 角括弧 [ ] の部分は、内容が決まるまでの仮の文章

export const engineerLead = "Android エンジニアです。";

export const skillGroups = [
  {
    name: "MOBILE",
    items: ["Kotlin", "Android", "Jetpack Compose", "Flutter"],
  },
  { name: "FRONTEND", items: ["TypeScript", "Next.js", "Tailwind CSS"] },
  { name: "BACKEND", items: ["Ktor", "Exposed", "PostgreSQL"] },
  { name: "INFRA", items: ["AWS", "Terraform", "Docker", "GitHub Actions"] },
];

export type EngineerWork = {
  title: string;
  description: string;
  stack: string[];
  href: string;
  linkLabel: string;
};

export const engineerWorks: EngineerWork[] = [
  {
    title: "machi_portfolio",
    description:
      "このサイト。Next.js の静的サイトを CloudFront で配信し、API は Ktor を Lambda で動かしています。インフラは Terraform、デプロイは GitHub Actions。",
    stack: ["Next.js", "Ktor", "Neon", "AWS", "Terraform"],
    href: "https://github.com/kmachida12345/machi_portfolio",
    linkLabel: "GitHub で見る",
  },
];

export const mentoring = {
  description: "MENTA でメンタリングをしています。",
  topics: ["Android 開発"],
};

export const career: { period: string; title: string; description: string }[] =
  [];
