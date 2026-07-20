/**
 * カテゴリーの一元管理。
 * カテゴリーを追加・変更するときは、この配列を編集するだけでよい。
 * slug はURLに使われるので英数字とハイフンのみ。
 *
 * 【方針】初期は「ゲーム」「YouTubeの始め方」の2つだけに絞る。
 * AI・動画編集・配信・自作ツールなどの話題は「YouTubeの始め方」に含める。
 * 記事が増えてきたら、ここに行を足すだけでカテゴリーを分離できる。
 */
export const CATEGORIES = [
  {
    slug: 'game',
    name: 'ゲーム',
    description: '実際に遊んだゲームの紹介、新作の序盤感想、おすすめまとめ、ジャンル解説など。YouTube動画の補足記事もここに載せます。',
  },
  {
    slug: 'youtube-guide',
    name: 'YouTubeの始め方',
    description: 'チャンネルの始め方、OBSの設定、録画・配信、動画編集、サムネイル制作、AIを使った制作効率化まで。一人でゲームYouTubeを運営するための実践記録です。',
  },
  {
    slug: 'promotion',
    name: 'ゲームプロモーション',
    description: 'ゲーム会社・パブリッシャーの担当者様向けに、実況者への案件依頼の進め方や、動画を使った宣伝・プロモーションの考え方を、依頼される側の実況者の立場から解説します。',
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
