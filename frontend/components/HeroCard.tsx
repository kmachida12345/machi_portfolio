import type { Hero } from "@/data/hero";
import { Card } from "./util/Card";

export function HeroCard({ hero }: { hero: Hero }) {
    return (
        <Card>
            <h3 className="text-lg font-semibold">{hero.title}</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {hero.description}
            </p>
        </Card>
    );
}
