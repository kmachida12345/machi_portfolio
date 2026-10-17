"use client";

import { useEffect, useState } from "react";
import type { Work } from "@/data/works";
import { fetchWorks } from "@/lib/api";
import { WorkCard } from "@/components/WorkCard";

type State =
    | { status: "loading" }
    | { status: "error" }
    | { status: "success"; works: Work[] };

export function WorksSection() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    fetchWorks()
      .then((works) => setState({ status: "success", works }))
      .catch(() => setState({ status: "error" }));
  }, []);

  if (state.status === "loading") return <p className="mt-6">Loading...</p>;
  if (state.status === "error") return <p className="mt-6">Failed to load works.</p>;

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {state.works.map((w) => (
        <WorkCard key={w.title} work={w} />
      ))}
    </div>
  );
}