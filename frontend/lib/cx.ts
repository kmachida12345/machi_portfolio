// 条件付きでクラス名をつなげる小さなヘルパー（false や undefined は捨てる）
export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
