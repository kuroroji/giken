// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// ============================================================
// 本番公開時は site を実際のドメインに変更してください。
// 例: 'https://giken.kuroroji.com'
// この値は canonical URL・OGP・サイトマップ・RSS の生成に使われます。
// ============================================================
export default defineConfig({
  site: 'https://kuroroji.site',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
