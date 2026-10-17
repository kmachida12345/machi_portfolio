export type Skill = {
  name: string;
  level: "beginner" | "intermediate" | "advanced";
  yearsOfExperience: number;
};

export const skills: Skill[] = [
  {
    name: "Kotlin",
    level: "intermediate",
    yearsOfExperience: 8,
  },
];
