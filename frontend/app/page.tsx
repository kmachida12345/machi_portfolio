import { works } from "@/data/works";
import { WorkCard } from "@/components/WorkCard";


export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">こんにちは</h1>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Works</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {works.map((w) => (
            <WorkCard key={w.title} work={w} />
          ))}
        </div>
      </section>
    </main>
  );
}
