/** 日付を「2026年7月18日」の形式にする */
export function formatDate(date: Date): string {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

/** 日付を ISO 形式 (YYYY-MM-DD) にする。datetime 属性や構造化データに使用 */
export function toISODate(date: Date): string {
  return date.toISOString().split('T')[0] ?? '';
}
