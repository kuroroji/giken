/**
 * 使用機材・利用サービスの一元管理。
 * 機材ページとトップページの「稼働状況」は、このデータから自動集計される。
 * 追加・変更はこの配列を編集するだけでよい。
 *
 * status:
 *   '稼働中'  … 現在実際に使っているもの
 *   '検証中'  … 導入を試している最中のもの
 */
export type EquipmentStatus = '稼働中' | '検証中';
export type EquipmentGroup = '制作ツール' | '機材' | 'サービス';

export interface EquipmentItem {
  name: string;
  group: EquipmentGroup;
  status: EquipmentStatus;
  description: string;
  /** 関連記事やメーカーページなどのURL（任意） */
  url?: string;
}

export const EQUIPMENT: EquipmentItem[] = [
  // --- 制作ツール ---
  {
    name: 'OBS Studio',
    group: '制作ツール',
    status: '稼働中',
    description: 'ゲーム録画と配信の中核。プロファイルを録画用と配信用で分けて運用中。',
  },
  {
    name: 'DaVinci Resolve',
    group: '制作ツール',
    status: '稼働中',
    description: '動画編集のメイン。無料版でもカット編集とテロップには十分。',
  },
  {
    name: 'faster-whisper',
    group: '制作ツール',
    status: '稼働中',
    description: '文字起こしと字幕生成に使用。ローカルで動くので長尺動画でも気兼ねなく回せる。',
  },
  {
    name: 'Audacity',
    group: '制作ツール',
    status: '稼働中',
    description: '音声の簡単な整音とノイズ除去に使用。',
  },
  {
    name: 'Claude Code',
    group: '制作ツール',
    status: '稼働中',
    description: '自作ツールの開発と、このサイトの構築に使用。',
  },
  {
    name: '画像生成AI（サムネイル用途）',
    group: '制作ツール',
    status: '検証中',
    description: 'サムネイル素材づくりに使えるか検証中。結果はレポートにまとめる予定。',
  },
  {
    name: 'AIノイズ除去プラグイン',
    group: '制作ツール',
    status: '検証中',
    description: 'マイク音声のノイズ処理を自動化できるか比較検証中。',
  },
  // --- 機材 ---
  {
    name: '自作PC（Ryzen 7 / 32GB RAM）',
    group: '機材',
    status: '稼働中',
    description: '録画・編集・エンコードを1台でこなす作業機。',
  },
  {
    name: 'コンデンサーマイク',
    group: '機材',
    status: '稼働中',
    description: 'ナレーション収録用。オーディオインターフェイス経由で接続。',
  },
  {
    name: 'HDMIキャプチャーボード',
    group: '機材',
    status: '稼働中',
    description: '家庭用ゲーム機の映像をPCに取り込むために使用。',
  },
  // --- サービス ---
  {
    name: 'Cloudflare',
    group: 'サービス',
    status: '検証中',
    description: 'このサイトの公開基盤として導入を進めている。',
  },
];

/** 稼働状況ダッシュボード用の集計 */
export function countByStatus(status: EquipmentStatus): number {
  return EQUIPMENT.filter((e) => e.status === status).length;
}
