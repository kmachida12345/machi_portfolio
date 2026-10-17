export type Work = {
    title: string;
    description: string;
    tech: string[];
    url?: string
};


export const works: Work[] = [
    {
        title: "machi_portfolio",
        description: "This site. Next.js / Kotlin / AWS",
        tech: ["Next.js", "TypeScript", "Tailwind CSS"],
        url: "https://github.com/kmachida12345/machi_portfolio"
    }
];