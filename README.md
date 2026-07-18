# くろろじ技研（KUROROJI GIKEN）

個人技術メディア「くろろじ技研」のウェブサイトです。
AI・自動化・動画制作・配信機材などを実際に試して記録するメディアで、
静的サイトジェネレーター「Astro」で作られています。

- 記事は Markdown ファイル（テキストファイル）で管理します
- データベースや管理画面はありません
- ビルドすると `dist` フォルダに完成したサイトが出力されます

> **プロジェクトの場所：** `D:\dev\giken`
> Google Drive などの同期フォルダに置くと `npm install` や開発サーバーが
> 正常に動かないため、必ずローカルディスク上で作業してください。
> バックアップと他PCとの共有は GitHub が担います。

---

## 必要なソフト

| ソフト | 用途 | 備考 |
| --- | --- | --- |
| Node.js (v20以上) | サイトの生成に必要 | このPCにはインストール済み（v24.18.0） |
| Git | 変更履歴の管理・GitHubへの反映 | インストール済み |

> Node.js は `C:\Users\buhol\AppData\Local\Programs\nodejs` に配置済みです。
> ターミナルで `node --version` と打って番号が出れば使えます。

## 初回セットアップ

このフォルダでターミナル（PowerShell）を開き、次を実行します。

```
npm install
```

数十秒で完了します。エラーが出た場合は、もう一度実行してみてください。

## ローカルでサイトを見る

```
npm run dev
```

と実行して、ブラウザで http://localhost:4321 を開きます。
ファイルを保存すると、画面は自動で更新されます。

**停止するには**：ターミナルで `Ctrl + C` を押します。

---

## 記事を追加する

1. `src/content/articles/` の中に、新しい `.md` ファイルを作ります
   - ファイル名がそのままURLになります（例：`my-new-article.md` → `/articles/my-new-article/`）
   - ファイル名は英数字とハイフンのみ使ってください
2. ファイルの先頭に、記事の情報（frontmatter）を書きます

```markdown
---
title: 記事のタイトル
description: 記事の説明文（検索結果や一覧に表示されます）
publishedAt: 2026-08-01
category: ai-automation
tags: [タグ1, タグ2]
---

ここから本文をMarkdownで書きます。

## 見出し（目次に自動で載ります）

本文…
```

`category` に使える値は `src/data/categories.ts` にある slug です
（`game`＝ゲーム / `youtube-guide`＝YouTubeの始め方）。

### 使える追加項目（任意）

```yaml
updatedAt: 2026-08-10          # 更新日
featured: true                  # トップページの「注目記事」に表示
affiliateDisclosure: true       # アフィリエイトリンクを含む記事に表記を出す
thumbnail: /images/articles/xxx.png   # アイキャッチ画像
thumbnailAlt: 画像の説明
sourceLinks:                    # 参考リンク
  - label: 公式サイト
    url: https://example.com
```

## 記事を下書きにする

frontmatter に次の1行を足すと、本番サイトには出なくなります
（ローカルの `npm run dev` では確認できます）。

```yaml
draft: true
```

公開するときは、この行を消して `publishedAt` を実際の公開日に直してください。

## 画像を追加する

1. 画像ファイルを `public/images/articles/` に入れます（フォルダがなければ作成）
2. 記事からは `/images/articles/ファイル名.png` というパスで参照します

```markdown
![画像の説明](/images/articles/screenshot.png)
```

## カテゴリーを追加する

`src/data/categories.ts` を開き、既存の項目をコピーして追記します。

```ts
{
  slug: 'new-category',        // URLに使われる英数字
  name: '新カテゴリー名',
  description: 'カテゴリーの説明文',
},
```

これだけで、カテゴリー一覧・記事の選択肢・トップページに自動で反映されます。

---

## デザインを変更する

### 色・フォント・余白などを変える場所

`src/styles/global.css` の先頭にある `@theme { ... }` ブロックで
サイト全体の色や幅を一元管理しています。
例えばアクセント色を変えたいときは `--color-accent` の値を変えるだけです。

### サイト名・説明文を変える場所

- サイト名・キャッチコピー・説明文・著者情報 → `src/data/site.ts`
- チャンネル紹介・動画プロモーション・無料相談・問い合わせ種別の文言 → `src/data/business.ts`
- YouTubeチャンネルのURL → `src/data/business.ts` の `CHANNEL.url`
- プロフィール画像 → `public/images/profile.png` を差し替える
- 本番のURL（ドメイン） → `astro.config.mjs` の `site`

### 機材・ツール一覧を変える場所

`src/data/equipment.ts` を編集します。
トップページの「稼働状況」の数字も、ここから自動で集計されます。

---

## ビルド（本番用ファイルの生成）

```
npm run build
```

`dist` フォルダに完成品が出力されます。出来上がりを確認するには：

```
npm run preview
```

型チェック（記事の設定ミスなどの検出）：

```
npm run check
```

## GitHubへ反映する

初回のみ（GitHubで空のリポジトリを作ってから）：

```
git remote add origin https://github.com/あなたのユーザー名/リポジトリ名.git
```

変更を反映するとき（毎回）：

```
git add -A
git commit -m "変更内容のメモ"
git push -u origin main
```

## Cloudflareへ公開する（Cloudflare Pages / Workers Assets）

Cloudflareのダッシュボードで「Workers & Pages」→ GitHubリポジトリを接続し、
次の設定値を入力します。

| 設定項目 | 値 |
| --- | --- |
| フレームワーク プリセット | Astro |
| ビルドコマンド | `npm run build` |
| ビルド出力ディレクトリ | `dist` |
| 環境変数 `NODE_VERSION` | `24` |

公開後、独自ドメインを設定したら **`astro.config.mjs` の `site` を
実際のURLに書き換えて**、再度ビルド・プッシュしてください
（サイトマップやOGPのURLに使われるため重要です）。

---

## エラーが出たら最初に確認する場所

1. **ターミナルの赤い文字**：ファイル名と行数が出ていることが多いです
2. **記事のfrontmatter**：`title` や `category` の書き間違い・全角コロンに注意
3. **`npm install` のやり直し**：`node_modules` 関連のエラーは、
   `npm install` をもう一度実行すると直ることが多いです
4. それでも直らないときは `node_modules` フォルダを削除して `npm install` し直します

## 将来の自動投稿機能を追加する場所

- **記事の自動生成**：記事はただの `.md` ファイルなので、
  生成した文章を `src/content/articles/` に保存して git push すれば公開されます。
  生成スクリプトは `scripts/` フォルダ（新規作成）に置く想定です
- **Cloudflare Workers / R2 連携**：Cloudflare側のAPIや画像置き場が必要になったら、
  プロジェクト直下に `workers/` を作って独立して管理する想定です
- 現在のサイト本体は静的ファイルのみなので、これらを追加しても既存部分の変更はほぼ不要です

## フォルダ構成

```
src/
  layouts/     ページ共通の枠組み
  components/  部品（ヘッダー、記事カードなど）
  pages/       各ページ（URLと1対1で対応）
  content/     記事のMarkdownファイル
  data/        サイト設定・カテゴリー・機材データ
  styles/      デザイントークン（色・幅の一元管理）
  utils/       記事の取得・日付表示などの共通処理
public/        画像・favicon・OGP画像などそのまま配信されるファイル
```
