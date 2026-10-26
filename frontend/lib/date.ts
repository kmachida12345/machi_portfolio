const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// "2026-10-18" を年・月・日に分ける（タイムゾーンの影響を受けないよう Date の文字列解析は使わない）
function parse(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month, day };
}

const pad = (n: number) => String(n).padStart(2, "0");

// "2026-10-18" → "2026.10.18"
export function formatDate(iso: string) {
  const { year, month, day } = parse(iso);
  return `${year}.${pad(month)}.${pad(day)}`;
}

// "2026-12-05" → "2026.12.05 Sat"
export function formatDateWithWeekday(iso: string) {
  const { year, month, day } = parse(iso);
  const weekday =
    weekdays[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
  return `${formatDate(iso)} ${weekday}`;
}

// 静的書き出しなので「今日」はビルドした日。終了したライブの判定に使う
export function isPast(iso: string, today = new Date()) {
  const todayIso = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
  return iso < todayIso;
}
