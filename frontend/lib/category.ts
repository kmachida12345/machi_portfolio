export type Category = "engineer" | "music";

type CategoryStyle = {
  label: string;
  text: string;
  soft: string;
  border: string;
};

// Tailwind はソースに完全な形で書かれたクラス名しか拾わないので、
// `text-${category}` のように組み立てず、対応表から引く
export const categoryStyle: Record<Category, CategoryStyle> = {
  engineer: {
    label: "ENGINEER",
    text: "text-eng",
    soft: "bg-eng-soft",
    border: "border-eng",
  },
  music: {
    label: "MUSIC",
    text: "text-music",
    soft: "bg-music-soft",
    border: "border-music",
  },
};

// ENGINEER / MUSIC などの小さなラベルの文字
export const labelClass = "font-mono text-xs font-medium tracking-[0.08em]";
