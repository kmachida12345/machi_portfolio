import type { Work } from "@/data/works";

export function WorkCard({ work }: { work: Work }) {
    return (
        <article className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <h3 className="text-lg font-semibold">{work.title}</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {work.description}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
                {work.tech.map((t) => (
                    <li key={t} className="rounded bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800">
                        {t}
                    </li>
                ))}
            </ul>
        </article>
    );
}
