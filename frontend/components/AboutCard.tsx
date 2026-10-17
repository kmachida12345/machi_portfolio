import type { About } from "@/data/about";
import { Card } from "./util/Card";

export function AboutCard({ about }: { about: About }) {
    return (
        <Card>
            <h3 className="text-lg font-semibold">About Me</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {about.description}
            </p>
        </Card>
    );
}
