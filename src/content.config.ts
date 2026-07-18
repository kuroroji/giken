import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORY_SLUGS } from './data/categories';

/**
 * 記事（articles）のスキーマ定義。
 * src/content/articles/ 配下の Markdown ファイルが記事になる。
 * ここに合わない frontmatter を書くとビルド時にエラーで教えてくれる。
 */
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    /** 記事タイトル */
    title: z.string().max(120),
    /** 記事の説明（一覧カードと meta description に使用） */
    description: z.string().max(200),
    /** 公開日 */
    publishedAt: z.coerce.date(),
    /** 更新日（未更新なら省略可） */
    updatedAt: z.coerce.date().optional(),
    /** カテゴリー（src/data/categories.ts の slug のどれか） */
    category: z.enum(CATEGORY_SLUGS),
    /** タグ（自由入力） */
    tags: z.array(z.string()).default([]),
    /** アイキャッチ画像のパス（例: /images/articles/xxx.svg）。省略時は自動生成の代替表示 */
    thumbnail: z.string().optional(),
    /**
     * 自動生成アイキャッチ・OGP画像でのタイトルの改行位置。
     * 指定しない場合はタイトルがそのまま自動改行される。
     * 例: eyecatchLines: ['【初心者講座】ゲーム実況の始め方を', '現役YouTuberが徹底解説']
     */
    eyecatchLines: z.array(z.string()).default([]),
    /** アイキャッチ画像の代替テキスト */
    thumbnailAlt: z.string().optional(),
    /** 著者名 */
    author: z.string().default('くろろじ'),
    /** true にすると本番ビルドから除外される（下書き） */
    draft: z.boolean().default(false),
    /** true にするとトップページの「注目記事」に表示される */
    featured: z.boolean().default(false),
    /** アフィリエイトリンクを含む記事は true（記事内に表記が出る） */
    affiliateDisclosure: z.boolean().default(false),
    /** 参考リンク */
    sourceLinks: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),

    // --- レビュー記事向けの任意項目（通常の記事では省略してよい） ---
    /** 紹介する製品・サービス名 */
    productName: z.string().optional(),
    /** 5段階評価 */
    rating: z.number().min(1).max(5).optional(),
    /** 良かった点 */
    pros: z.array(z.string()).default([]),
    /** 気になった点 */
    cons: z.array(z.string()).default([]),
  }),
});

export const collections = { articles };
