/**
 * kuroroji-giken.pages.dev へのアクセスを本番ドメイン kuroroji.site へ301リダイレクトする。
 * （プレビューデプロイの *.kuroroji-giken.pages.dev には影響しない）
 */
export const onRequest: PagesFunction = async ({ request, next }) => {
  const url = new URL(request.url);
  if (url.hostname === 'kuroroji-giken.pages.dev') {
    url.hostname = 'kuroroji.site';
    return Response.redirect(url.toString(), 301);
  }
  return next();
};
