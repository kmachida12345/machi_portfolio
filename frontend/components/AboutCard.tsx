import type { About } from "@/data/about";

export function AboutCard({ about }: { about: About }) {
    return (
        <article className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <h3 className="text-lg font-semibold">About Me</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {about.description}
            </p>
        </article>
    );
}
