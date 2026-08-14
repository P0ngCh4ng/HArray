// 解答のゆれを吸収する判定ユーティリティ。
//
// 日本語はゆるく判定する: 漢字/かな、カタカナ/ひらがな、丁寧形の語尾、
// 記号や空白、そして軽いタイプミスまで許容する。
// 韓国語は厳しく判定する（空白と記号だけ無視）。ハングルは1文字違いで
// 別の単語になることが多いため（안녕히 가세요 / 안녕히 계세요 など）。

const PARENS = /[（(][^）)]*[）)]/g;
const PUNCT = /[。、，,．.！!？?…‥・「」『』〜~"'"'’‘]/g;
const SPACES = /[\s　]/g;
const POLITE = /(でした|です|ました|ます|である|だ)$/;

function katakanaToHiragana(s: string): string {
  return s.replace(/[ァ-ヶ]/g, ch =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  );
}

/** 記号・空白・括弧書きを落とす。kana:true でカタカナ→ひらがな＋丁寧形の語尾も落とす。 */
export function normalizeAnswer(s: string, opts: { kana?: boolean } = {}): string {
  let out = s
    .normalize('NFKC')
    .toLowerCase()
    .replace(PARENS, '')
    .replace(PUNCT, '')
    .replace(SPACES, '');

  if (opts.kana) {
    out = katakanaToHiragana(out);
    // 「です」だけの解答を空にしないよう、空になる場合は落とさない
    out = out.replace(POLITE, '') || out;
  }
  return out;
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    for (let j = 1; j <= b.length; j++) {
      curr[j] = Math.min(
        prev[j] + 1,
        curr[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    prev = curr;
  }
  return prev[b.length];
}

// 短い語ほど厳しく。「がっこう」と「くうこう」のような近い語を
// 取り違えないよう、4文字以下は完全一致のみとする。
function typoTolerance(len: number): number {
  if (len <= 4) return 0;
  if (len <= 9) return 1;
  return 2;
}

/** 日本語の解答判定。candidates のどれかに（ゆるく）一致すれば正解。 */
export function checkJapanese(input: string, candidates: string[]): boolean {
  const got = normalizeAnswer(input, { kana: true });
  if (!got) return false;

  return candidates.some(c => {
    const want = normalizeAnswer(c, { kana: true });
    if (!want) return false;
    if (got === want) return true;
    const tol = typoTolerance(want.length);
    return tol > 0 && levenshtein(got, want) <= tol;
  });
}

/** 韓国語（ハングル）の解答判定。空白・記号のみ無視し、それ以外は完全一致。 */
export function checkKorean(input: string, candidates: string[]): boolean {
  const got = normalizeAnswer(input);
  if (!got) return false;
  return candidates.some(c => normalizeAnswer(c) === got);
}
