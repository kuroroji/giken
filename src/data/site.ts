/**
 * サイト全体の基本情報。
 * サイト名や説明文を変えたいときは、このファイルを編集する。
 * （本番URLの変更は astro.config.mjs の site を編集する）
 * （チャンネル・案件・相談まわりの文言は src/data/business.ts にある）
 */
export const SITE = {
  name: 'くろろじ技研',
  nameEn: 'KUROROJI GIKEN',
  /** ファーストビューの大見出し（1行で使う場面用） */
  tagline: 'あなたの積みゲーを増やします。',
  /** ファーストビューでの改行位置（表示用） */
  taglineLines: ['あなたの積みゲーを', '増やします。'],
  /** ファーストビューの説明文・meta description */
  description:
    'ゲームの発掘・紹介を中心に、YouTube動画、ゲーム記事、ゲームの届け方に関する相談を行っています。',
  /** サイト開設年（フッターの著作権表記に使用） */
  since: 2026,
} as const;

/**
 * 運営者（著者）の情報。
 * プロフィールページ・記事の著者欄・構造化データに使われる。
 */
export const AUTHOR = {
  name: 'くろろじ',
  role: 'ゲーム発掘YouTuber',
  bio: '新作から埋もれた良作まで、実際に遊んでから紹介するゲーム発掘YouTuber。YouTubeチャンネル「くろろじちゃんねる」を運営しながら、ゲーム会社向けの動画プロモーションや、ゲームの届け方に関する相談も行っている。',
  /** プロフィール画像（顔アップ。public/images/ 配下に置く） */
  avatar: '/images/profile.jpg',
  /** 立ち絵（透過PNG。ファーストビューで使用） */
  standingImage: '/images/kuroroji-standing.png',
  /**
   * SNS等のリンク。URLを設定すると各ページに表示される。
   * 空文字 '' のままなら表示されない。
   */
  links: {
    youtube: 'https://www.youtube.com/@KUROROJI',
    x: 'https://x.com/KUROROJI',
  },
} as const;

/**
 * 問い合わせページの設定。
 * フォームの送信機能は未接続のため、送信ボタンは案内表示のみ行う。
 */
export const CONTACT = {
  /** 公開してよい連絡先メールアドレス（未定なら空のまま） */
  email: '',
  note: 'フォームの送信機能は現在準備中です。お急ぎの場合は、YouTubeチャンネルのコメント欄、またはSNSのダイレクトメッセージにてご連絡ください。',
} as const;
