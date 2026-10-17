import type { Skill } from "@/data/skills";
import { Card } from "./util/Card";

export function SkillCard({ skill }: { skill: Skill }) {
    return (
        <Card>
            <h3 className="text-lg font-semibold">{skill.name}</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Level: {skill.level}
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Years of Experience: {skill.yearsOfExperience}
            </p>
        </Card>
    );
}
