import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

/**
 * 公開対象の記事を新しい順で取得する。
 * draft: true の記事は、本番ビルドでは除外される。
 * （開発サーバーでは下書きも確認できる）
 */
export async function getPublishedArticles(): Promise<Article[]> {
  const all = await getCollection('articles', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return all.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );
}

/** トップページ「注目記事」用。featured がなければ最新記事で埋める */
export function pickFeatured(articles: Article[], limit = 3): Article[] {
  const featured = articles.filter((a) => a.data.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  const rest = articles.filter((a) => !a.data.featured);
  return [...featured, ...rest].slice(0, limit);
}

/** 関連記事：同じカテゴリーを優先し、足りなければ他の最新記事で埋める */
export function pickRelated(
  current: Article,
  articles: Article[],
  limit = 3,
): Article[] {
  const others = articles.filter((a) => a.id !== current.id);
  const sameCategory = others.filter(
    (a) => a.data.category === current.data.category,
  );
  const rest = others.filter((a) => a.data.category !== current.data.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/** 前後の記事（時系列）を取得する。prev = ひとつ古い記事, next = ひとつ新しい記事 */
export function pickAdjacent(
  current: Article,
  articles: Article[],
): { prev: Article | undefined; next: Article | undefined } {
  const index = articles.findIndex((a) => a.id === current.id);
  return {
    // articles は新しい順なので、index+1 が古い側
    prev: articles[index + 1],
    next: index > 0 ? articles[index - 1] : undefined,
  };
}
