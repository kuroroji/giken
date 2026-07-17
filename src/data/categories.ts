/**
 * カテゴリーの一元管理。
 * カテゴリーを追加・変更するときは、この配列を編集するだけでよい。
 * slug はURLに使われるので英数字とハイフンのみ。
 */
export const CATEGORIES = [
  {
    slug: 'ai-automation',
    name: 'AI・自動化',
    description: 'AIツールの活用法と、面倒な作業を自動化する仕組みづくり。実際に使って役立ったものだけを記録します。',
  },
  {
    slug: 'video-production',
    name: '動画・YouTube制作',
    description: '動画編集、サムネイル、台本づくりなど、YouTube運営に必要な制作作業の効率化とノウハウ。',
  },
  {
    slug: 'streaming-recording',
    name: '配信・録画',
    description: 'OBSをはじめとする配信・録画環境の構築、設定、トラブル対応の記録。',
  },
  {
    slug: 'pc-gear',
    name: 'PC・機材',
    description: 'PC本体、マイク、キャプチャーボードなど、制作を支えるハードウェアの選定と使用感。',
  },
  {
    slug: 'gaming-setup',
    name: 'ゲーム環境',
    description: 'ゲームを快適に遊び、録るための環境づくり。SteamやコンソールとPCの連携なども扱います。',
  },
  {
    slug: 'solo-business',
    name: '個人事業・サービス',
    description: '個人クリエイター・個人事業主に役立つサービスやお金まわりの話。',
  },
  {
    slug: 'diy-tools',
    name: '自作ツール',
    description: '既製品で足りないところを埋めるための、小さな自作ツールやスクリプトの紹介。',
  },
  {
    slug: 'lab-report',
    name: '技研レポート',
    description: '検証の記録、失敗談、運営の振り返りなど。くろろじ技研の活動報告です。',
  },
] as const;

export type Category = (typeof CATEGORIES)[number];
export type CategorySlug = Category['slug'];

/** Content Collections のスキーマ定義で使う slug 一覧 */
export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug) as [
  CategorySlug,
  ...CategorySlug[],
];

/** slug からカテゴリー情報を取得する（存在しない slug なら undefined） */
export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
