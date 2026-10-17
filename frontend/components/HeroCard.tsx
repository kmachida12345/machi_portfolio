import type { Hero } from "@/data/hero";

export function HeroCard({ hero }: { hero: Hero }) {
    return (
        <article className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <h3 className="text-lg font-semibold">{hero.title}</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {hero.description}
            </p>
        </article>
    );
}
