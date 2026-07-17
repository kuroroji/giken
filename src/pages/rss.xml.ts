import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '@/data/site';
import { getPublishedArticles } from '@/utils/articles';

/** RSSフィード（/rss.xml） */
export async function GET(context: APIContext) {
  const articles = await getPublishedArticles();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? 'https://kuroroji-giken.pages.dev',
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishedAt,
      link: `/articles/${article.id}/`,
    })),
    customData: '<language>ja</language>',
  });
}
