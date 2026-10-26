// 角括弧 [ ] の部分は、内容が決まるまでの仮の文章

export const musicLead = "アイリッシュフルートを演奏しています。";

export const musicProfile = [
  { term: "楽器", detail: "アイリッシュフルート、バウロン" },
  { term: "ジャンル", detail: "アイルランド伝統音楽" },
  { term: "活動", detail: "都内のセッション、レッスン、たまにライブ" },
  { term: "演奏歴", detail: "2014年ごろ〜" },
];

export const instruments: {
  name: string;
  photoLabel: string;
  description: string;
}[] = [];

export const lesson: {
  description: string;
  details: { term: string; detail: string }[];
} = {
  description: "",
  details: [],
};

export const sessions: { schedule: string; name: string; area: string }[] = [];

export type Live = {
  date: string; // YYYY-MM-DD
  title: string;
  venue: string;
  performers: string;
  url?: string;
};

// 新しい順に並べておく。終了したかどうかはビルドした日で判定する
export const lives: Live[] = [];

// YouTube は埋め込まず、サムネイルとリンクだけにする
export const videos: { title: string; url: string }[] = [];
