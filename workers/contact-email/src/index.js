/**
 * お問い合わせフォームの送信を受け取り、Cloudflare Email Routing 経由で
 * kuroroji.ch@gmail.com にメールを届けるWorker。
 * 外部のメール送信サービスは使わない（send_email バインディングのみ）。
 */
import { EmailMessage } from 'cloudflare:email';

const FROM = 'contact@kuroroji.site';
const DEST = 'kuroroji.ch@gmail.com';

/** 文字列をUTF-8のBase64にする（btoaはASCII前提のため一度バイト列に落とす） */
function b64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

/** ヘッダー用のMIMEエンコード（日本語件名・差出人名） */
const mimeWord = (s) => `=?UTF-8?B?${b64(s)}?=`;

/** 本文用Base64（MIMEの規定に合わせて76文字で改行） */
const b64Body = (s) => b64(s).replace(/(.{76})/g, '$1\r\n');

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return json({ ok: false, error: 'method_not_allowed' }, 405);
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return json({ ok: false, error: 'bad_request' }, 400);
    }

    const company = String(data.company ?? '').trim();
    const name = String(data.name ?? '').trim();
    const email = String(data.email ?? '').trim();
    const topic = String(data.topic ?? '').trim();
    const detail = String(data.detail ?? '').trim();
    const honeypot = String(data.website ?? '');

    // ハニーポット: 人間には見えない欄が埋まっていたらボットとみなし、成功を装って捨てる
    if (honeypot) return json({ ok: true });

    if (!name || !email || !topic || !detail) {
      return json({ ok: false, error: 'missing_fields' }, 400);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return json({ ok: false, error: 'invalid_email' }, 400);
    }
    if (name.length > 200 || company.length > 200 || topic.length > 100 || detail.length > 5000) {
      return json({ ok: false, error: 'too_long' }, 400);
    }

    const body = [
      'くろろじ技研のお問い合わせフォームから、新しいメッセージが届きました。',
      '',
      `■ 会社名・団体名`,
      company || '（未記入）',
      '',
      `■ お名前`,
      name,
      '',
      `■ メールアドレス`,
      email,
      '',
      `■ 相談内容の種類`,
      topic,
      '',
      `■ 詳細内容`,
      detail,
      '',
      '---',
      'このメールにそのまま返信すると、送信者宛てに返信できます（Reply-To設定済み）。',
    ].join('\n');

    const raw = [
      `From: ${mimeWord('くろろじ技研 お問い合わせ')} <${FROM}>`,
      `To: ${DEST}`,
      `Reply-To: ${email}`,
      `Subject: ${mimeWord(`【お問い合わせ】${topic} - ${name}様`)}`,
      `Date: ${new Date().toUTCString()}`,
      `Message-ID: <${crypto.randomUUID()}@kuroroji.site>`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=UTF-8',
      'Content-Transfer-Encoding: base64',
      '',
      b64Body(body),
    ].join('\r\n');

    try {
      await env.SEND_EMAIL.send(new EmailMessage(FROM, DEST, raw));
    } catch (err) {
      console.error('send_email failed:', err instanceof Error ? err.message : err);
      return json({ ok: false, error: 'send_failed' }, 500);
    }

    return json({ ok: true });
  },
};
