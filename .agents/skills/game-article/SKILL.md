---
name: game-article
description: ゲームを紹介する記事(単独紹介・週間まとめ・おすすめ選など)でタイトルごとに必ず行う標準処理。ストアボタン=対応機種表示、キービジュアル画像の取得と配置、スペック表、画像引用注記まで。
---

# ゲーム紹介記事の標準処理

ゲームを紹介する記事では、タイトルごとに必ず次の処理を行う。文体などの常時ルールは `AGENTS.md` に従う。

## 1. 全ストアのリンクをボタンで貼る(=対応機種表示)

確認できた全ストアのリンクを `store-btn` ボタンで貼る。**ボタン群が「対応機種」の表示を兼ねる**。

- 機種はSteamだけと思い込まず、コンソール版の有無を毎回調べる(移植の時間差に注意: コンソール先行→後からSteam版、その逆もある)
- **並び順は Switch → PS → Xbox → Steam → 公式サイト で固定**。Battle.net等のPCストアはSteam枠の位置

```html
<div class="store-links">
  <a class="store-btn store-btn--switch" href="..." target="_blank" rel="noopener">Switch</a>
  <a class="store-btn store-btn--ps" href="..." target="_blank" rel="noopener">PS Store</a>
  <a class="store-btn store-btn--xbox" href="..." target="_blank" rel="noopener">Xbox</a>
  <a class="store-btn store-btn--steam" href="..." target="_blank" rel="noopener">Steam</a>
</div>
```

色クラスは `src/styles/global.css` で定義(switch赤 / ps青 / xbox緑 / steam紺 / youtube赤 / obs黒)。

## 2. ゲーム画像を必ず取得して掲載

- 優先順: **Switch/PSストアの公式画像 → なければSteamのheader/capsule画像**
- WebP変換(quality 80、幅1280まで)して `public/images/articles/games/<slug>.webp` に置く
- 見出し(### ゲームタイトル)の直後に `![タイトルのキービジュアル](/images/articles/games/<slug>.webp)` で挿入

### 取得テク

- Steam: `https://store.steampowered.com/api/appdetails?appids=<id>&cc=jp&l=japanese` で情報取得(発売前は価格未取得)。画像はレスポンスの `header_image`
- 任天堂ストア: curl不可(bot遮断)。ブラウザで開くこと。検索ページはJS描画なのでDOMから `/item/software/D...` のURLを取得。商品ページの `og:image` はサーバーレンダリング済みで取得可。`demandware.static` の画像URLはcurlでダウンロード可能
- **画像利用不可メーカーに注意**: MAGES作品は画像利用NG。利用不可が判明したメーカーはこのリストに追記していく

## 3. スペック表

各タイトルの画像直後に、次の形式の表を置く(週間まとめ記事の形式):

```markdown
| 機種 | 価格 | 開発 | ジャンル |
| --- | --- | --- | --- |
| PC(Steam)、Switchは7/23 | ¥1,900 | 開発元 | ジャンル |
```

- 価格は執筆時点の情報である旨を記事冒頭の注記に書く
- 機種欄には発売日の差(移植の時間差)も書き、買い間違いを防ぐ

## 4. 紹介文

- 3〜4文で「どんなゲームか+誰に刺さりそうか」まで書く。プレイフィールや比較(「〜ライク」)を使う
- 日本語非対応のタイトルはその旨を明記する
- 用語:「バレットヘブン」と書くときは「(ヴァンサバライク)」を併記する
- 「インディー」と書かない(AGENTS.md参照)

## 5. 記事末尾の注記

画像引用の注記を入れる(既存記事 `kuroroji-best-games.md` と同文):

> ※ゲーム画像は各タイトルの公式サイト・ストアページより引用しています。

## 6. 動画連動

対応するYouTube動画がある場合は、リード部分に埋め込む:

```html
<div class="video-embed">
  <iframe src="https://www.youtube.com/embed/<videoId>" title="..." loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
```
