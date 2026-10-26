import Image from "next/image";
import {
  Calendar,
  CirclePlay,
  Code,
  MessageSquareText,
  Music,
  type LucideIcon,
} from "lucide-react";
import { categoryStyle, type Category } from "@/lib/category";
import { cx } from "@/lib/cx";

export type ThumbIcon = "code" | "play" | "chat" | "note" | "calendar";

const icons: Record<ThumbIcon, LucideIcon> = {
  code: Code,
  play: CirclePlay,
  chat: MessageSquareText,
  note: Music,
  calendar: Calendar,
};

type Props = {
  category: Category;
  icon?: ThumbIcon;
  image?: string;
  kaomoji?: string;
  iconSize?: number;
  className?: string;
};

// 16:9 のサムネイル。画像があれば画像、なければ差し色の薄い地にアイコン（または顔文字）
export function Thumbnail({
  category,
  icon = "code",
  image,
  kaomoji,
  iconSize = 40,
  className,
}: Props) {
  if (image) {
    return (
      <div
        className={cx(
          "relative aspect-video overflow-hidden bg-surface",
          className,
        )}
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 768px) 360px, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  const style = categoryStyle[category];
  const Icon = icons[icon];
  return (
    <div
      aria-hidden
      className={cx(
        "flex aspect-video items-center justify-center",
        style.soft,
        style.text,
        className,
      )}
    >
      {kaomoji ? (
        <span className="text-2xl tracking-wide">{kaomoji}</span>
      ) : (
        <Icon size={iconSize} strokeWidth={1.5} />
      )}
    </div>
  );
}
