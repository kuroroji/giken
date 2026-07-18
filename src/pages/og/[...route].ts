import { OGImageRoute } from 'astro-og-canvas';
import { getPublishedArticles } from '@/utils/articles';
import { SITE } from '@/data/site';

/**
 * 記事ごとのOGP画像（SNSシェア用のアイキャッチ）を自動生成する。
 * /og/<記事ID>.png でアクセスできる。
 * デザインは記事ページのアイキャッチと同じ「黒背景+白の明朝体タイトル」。
 */
const articles = await getPublishedArticles();

export const { getStaticPaths, GET } = await OGImageRoute({
  pages: Object.fromEntries(articles.map((article) => [article.id, article.data])),
  getImageOptions: (_path, page) => ({
    // 先頭の空行は縦位置の調整用（上に寄りすぎるのを防ぐ）
    title:
      '\n' +
      (page.eyecatchLines.length > 0 ? page.eyecatchLines.join('\n') : page.title),
    description: `${SITE.name}｜くろろじコラム`,
    bgGradient: [[17, 17, 17]],
    padding: 72,
    border: { color: [255, 255, 255], width: 10, side: 'block-end' },
    font: {
      title: {
        size: 54,
        lineHeight: 1.7,
        families: ['Noto Serif JP'],
        weight: 'Bold',
        color: [255, 255, 255],
      },
      description: {
        size: 30,
        lineHeight: 2.2,
        families: ['Noto Serif JP'],
        weight: 'Bold',
        color: [190, 190, 190],
      },
    },
    fonts: [
      'https://cdn.jsdelivr.net/fontsource/fonts/noto-serif-jp@latest/japanese-700-normal.ttf',
    ],
  }),
});
