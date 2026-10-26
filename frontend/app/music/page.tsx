import type { Metadata } from "next";
import Link from "next/link";
import { ContactLine } from "@/components/ContactLine";
import { Container } from "@/components/Container";
import { InfoTable } from "@/components/InfoTable";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { Section } from "@/components/Section";
import { SmartLink } from "@/components/SmartLink";
import { Thumbnail } from "@/components/Thumbnail";
import {
  instruments,
  lesson,
  lives,
  musicLead,
  musicProfile,
  sessions,
  videos,
} from "@/data/music";
import { cx } from "@/lib/cx";
import { formatDateWithWeekday, isPast } from "@/lib/date";

export const metadata: Metadata = {
  title: "Music",
  description:
    "アイリッシュフルートとバウロンで、アイルランド伝統音楽を演奏しています。レッスン、セッション、ライブ情報。",
};

export default function MusicPage() {
  return (
    <>
      <PageHeader
        label="MUSIC"
        category="music"
        title="アイルランド伝統音楽の演奏"
        lead={musicLead}
        aside={
          <InfoTable
            items={musicProfile}
            className="flex-[1_1_300px] self-end bg-surface"
          />
        }
      />

      {instruments.length > 0 && (
        <Section id="instruments" title="Instruments">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
            {instruments.map((instrument) => (
              <article
                key={instrument.name}
                className="flex flex-col gap-3.5 rounded-lg border border-line p-6"
              >
                <Placeholder
                  label={instrument.photoLabel}
                  className="aspect-[3/2] rounded-md"
                />
                <h3 className="text-lg font-bold">{instrument.name}</h3>
                <p className="text-[15px] leading-[1.8] text-muted">
                  {instrument.description}
                </p>
              </article>
            ))}
          </div>
        </Section>
      )}

      {lesson.description && (
        <section
          aria-labelledby="lessons-heading"
          className="border-t border-line"
        >
          <Container className="flex flex-wrap gap-x-12 gap-y-8 py-16 md:py-20">
            <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-4">
              <h2 id="lessons-heading" className="text-[26px] font-bold">
                Lessons
              </h2>
              <p className="text-base leading-[1.9]">{lesson.description}</p>
              <Link
                href="/contact/"
                className="self-start py-2.5 text-[15px] font-medium text-music hover:opacity-70"
              >
                レッスンについて問い合わせる →
              </Link>
            </div>
            {lesson.details.length > 0 && (
              <InfoTable
                items={lesson.details}
                className="flex-[1_1_300px] bg-music-soft"
              />
            )}
          </Container>
        </section>
      )}

      {sessions.length > 0 && (
        <Section
          id="sessions"
          title="Sessions"
          description="よく顔を出している都内のセッションです。"
        >
          <ul className="flex flex-col border-b border-line">
            {sessions.map((session) => (
              <li
                key={`${session.schedule}-${session.name}`}
                className="flex flex-wrap items-baseline gap-x-8 gap-y-1.5 border-t border-line py-[18px]"
              >
                <span className="flex-[0_0_200px] font-mono text-sm text-music">
                  {session.schedule}
                </span>
                <span className="flex-[999_1_280px] text-base font-medium">
                  {session.name}
                </span>
                <span className="text-sm text-muted">{session.area}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Live は出演予定がなくても見出しと説明だけは出す（「決まり次第お知らせ」の案内のため） */}
      <Section
        id="live"
        title="Live"
        description="出演は不定期です。決まり次第ここでお知らせします。"
      >
        {lives.length > 0 && (
          <ol className="flex flex-col border-b border-line">
            {lives.map((live) => {
              const past = isPast(live.date);
              return (
                <li
                  key={`${live.date}-${live.title}`}
                  className={cx(
                    "flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-line py-5",
                    past && "text-muted",
                  )}
                >
                  <time
                    dateTime={live.date}
                    className={cx(
                      "flex-[0_0_180px] font-mono text-base",
                      !past && "font-medium text-music",
                    )}
                  >
                    {formatDateWithWeekday(live.date)}
                  </time>
                  <div className="flex flex-[999_1_300px] flex-col gap-1">
                    <span className="text-[17px] font-bold">{live.title}</span>
                    <span className={cx("text-sm", !past && "text-muted")}>
                      {live.venue} / {live.performers}
                    </span>
                  </div>
                  {past ? (
                    <span className="font-mono text-[13px] tracking-[0.08em]">
                      終了
                    </span>
                  ) : (
                    live.url && (
                      <SmartLink
                        href={live.url}
                        className="flex min-h-11 items-center rounded-md border border-line px-5 text-sm hover:border-muted"
                      >
                        詳細
                      </SmartLink>
                    )
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </Section>

      {videos.length > 0 && (
        <Section id="videos" title="Videos">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
            {videos.map((video, index) => (
              <SmartLink
                key={`${index}-${video.title}`}
                href={video.url}
                className="group flex flex-col gap-2.5"
              >
                <Thumbnail
                  category="music"
                  icon="play"
                  className="rounded-lg"
                />
                <span className="text-[15px] font-medium group-hover:opacity-70">
                  {video.title}
                </span>
                <span className="text-[13px] text-muted">YouTube で見る ↗</span>
              </SmartLink>
            ))}
          </div>
        </Section>
      )}

      <ContactLine
        text="レッスンや、ライブ・イベントでの演奏のご相談は、お問い合わせフォームから。"
        category="music"
      />
    </>
  );
}
