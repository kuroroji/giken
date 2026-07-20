# くろろじ技研 — プロジェクト引き継ぎ情報

## これは何か
ゲーム発掘YouTuber「くろろじ」の公式サイト。3つの役割を持つ：
1. YouTubeチャンネル「くろろじちゃんねる」の紹介
2. ゲーム会社向け動画プロモーションの案件窓口
3. 記事メディア「くろろじコラム」（カテゴリーは「ゲーム」「YouTubeの始め方」「ゲームプロモーション」の3つ）

技術: Astro 5 + TypeScript + Tailwind CSS v4（`@tailwindcss/vite`方式）。静的生成・React不使用・クライアントJSは問い合わせフォームの数行のみ。

## 作業の進め方（ユーザーの意向）
- ユーザーは非エンジニアの個人事業主。実装・起動・確認まで全面委任スタイル
- 開発サーバーを起動し、ブラウザで見える状態にしてから判断を仰ぐ
- 細かい確認で止まらない。重大な判断（公開・お金・会社関連の認証・データの場所）だけ質問する
- サイト改善は才流（sairu.co.jp）のメソッド準拠：ファーストビュー内CTA+実績明示、記事は前半テキストCTA+末尾リッチCTA、フォームは必須項目最小限

## 環境の注意
- Node.js はポータブル導入。シェルで見つからない場合: `$env:Path += ";$env:LOCALAPPDATA\Programs\nodejs"`
- Google Drive（G:）にプロジェクトを置くとnpmが壊れる。必ずローカル（D:\dev\giken）で作業する
- GitHub: https://github.com/kuroroji/giken （認証はgikenリポジトリ限定のfine-grained PAT。ユーザーの会社組織cryptulには絶対に触れない）
- Cloudflare公開時: ビルド`npm run build`／出力`dist`／`NODE_VERSION=24`。公開後に`astro.config.mjs`の`site`を本番URLへ変更

## 主要ファイル
| 場所 | 役割 |
| --- | --- |
| `src/data/site.ts` | サイト名・キャッチコピー・著者情報 |
| `src/data/business.ts` | チャンネル・動画プロモーション・無料相談・問い合わせ種別・コラム設定 |
| `src/data/categories.ts` | コラムのカテゴリー（3つ。増やすときはここに追記） |
| `src/styles/global.css` | デザイントークン一元管理（@theme）+ 背景アニメーション定義 |
| `src/components/Button.astro` | 全ボタン共通（ピル型ガラス・3バリアント） |
| `src/components/Logo.astro` | ロゴ（明朝体テキスト表記） |
| `src/content/articles/` | 記事Markdown（draft: trueで下書き） |

## デザインの決定事項
- モノクロ基調（白ベース+黒 #111）+ オーロラ調の淡いグラデーション演出（.aurora-blob、FVと全体背景に使用）
- 明朝体はキャッチコピーと見出し（h1/h2）のみ。他はゴシック
- ガラスデザイン（glass / glass-dark ユーティリティ）+ ピル型ボタン
- セクションは白黒交互。背景は全セクションでCSSアニメーション（01斜線+波／02幾何学／03縦線／04バブル／フッターはパーティクル）
- 装飾ラインは1〜2px。派手なグラデーション禁止
- キャッチコピー:「あなたの積みゲーを増やします。」

## 仮置き・未完了（要対応）
- `CHANNEL.url`（business.ts）: 現在は案件再生リストのURLを仮置き。正式なチャンネルURLに差し替える
- `AUTHOR.links`のSNSリンク: 空欄（設定すると表示される）
- ゲームカテゴリーの記事2本は【サンプル記事】。実記事に差し替える
- Cloudflareへの公開: 未実施
