import { AboutCard } from "@/components/AboutCard";
import { about } from "@/data/about";
import { ContactCard } from "@/components/ContactCard";
import { contact } from "@/data/contact";
import { HeroCard } from "@/components/HeroCard";
import { hero } from "@/data/hero";
import { SkillCard } from "@/components/SkillCard";
import { skills } from "@/data/skills";
import { WorksSection } from "@/components/WorksSection";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <section className="mt-16">
        <HeroCard hero={hero} />
      </section>
      <section className="mt-16">
        <h2 className="text-2xl font-semibold">About</h2>
        <AboutCard about={about} />
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Works</h2>
        <WorksSection />
      </section>
      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {skills.map((s) => (
            <SkillCard key={s.name} skill={s} />
          ))}
        </div>
      </section>
      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <ContactCard contact={contact} />
      </section>
    </main>
  );
}
