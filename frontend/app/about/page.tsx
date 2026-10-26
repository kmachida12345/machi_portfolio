import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1080px] px-6 py-24">
      <h1 className="text-4xl font-bold">About</h1>
    </div>
  );
}
