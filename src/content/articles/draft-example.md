---
title: 【下書きの例】AIノイズ除去プラグイン比較（執筆中）
description: この記事は下書き機能のサンプルです。frontmatterの draft を true にすると、開発中のプレビューでは見えますが、本番のビルドには含まれません。
publishedAt: 2026-07-15
category: youtube-guide
tags: [下書き]
draft: true
sourceLinks: []
---

この記事は**下書き機能の動作確認用サンプル**です。

frontmatter（ファイル冒頭の設定欄）に `draft: true` と書くと、

- ローカルの開発サーバー（npm run dev）では表示される
- 本番ビルド（npm run build）には含まれない

という動きになります。執筆途中の記事はこの状態にしておけば、誤って公開される心配がありません。

## 公開するときは

`draft: true` の行を削除するか、`draft: false` に変更してから、公開日（publishedAt）を実際の公開日に直してください。
