import type { APIContext } from 'astro';

/**
 * robots.txt を生成する。
 * サイトマップのURLは astro.config.mjs の site 設定から自動で組み立てられる。
 */
export function GET(context: APIContext) {
  const sitemapURL = new URL('sitemap-index.xml', context.site);
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${sitemapURL.href}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
