export type Category = 'あいさつ' | '数字' | '食べ物' | '色' | '家族' | '日常会話' | '動詞' | '形容詞' | '場所' | '時間';

export interface Word {
  id: number;
  korean: string;
  reading: string;
  meaning: string;
  category: Category;
  level: 1 | 2 | 3;
}

export const vocabulary: Word[] = [
  // あいさつ
  { id: 1, korean: '안녕하세요', reading: 'アンニョンハセヨ', meaning: 'こんにちは', category: 'あいさつ', level: 1 },
  { id: 2, korean: '감사합니다', reading: 'カムサハムニダ', meaning: 'ありがとうございます', category: 'あいさつ', level: 1 },
  { id: 3, korean: '죄송합니다', reading: 'チェソンハムニダ', meaning: '申し訳ありません', category: 'あいさつ', level: 1 },
  { id: 4, korean: '안녕히 가세요', reading: 'アンニョンヒ カセヨ', meaning: 'さようなら（去る人へ）', category: 'あいさつ', level: 1 },
  { id: 5, korean: '안녕히 계세요', reading: 'アンニョンヒ ケセヨ', meaning: 'さようなら（残る人へ）', category: 'あいさつ', level: 1 },
  { id: 6, korean: '잘 부탁드립니다', reading: 'チャル プタッドゥリムニダ', meaning: 'よろしくお願いします', category: 'あいさつ', level: 1 },
  { id: 7, korean: '처음 뵙겠습니다', reading: 'チョウム ペッケッスムニダ', meaning: 'はじめまして', category: 'あいさつ', level: 1 },
  { id: 8, korean: '오래간만이에요', reading: 'オレガンマニエヨ', meaning: 'お久しぶりです', category: 'あいさつ', level: 2 },

  // 数字
  { id: 9, korean: '일', reading: 'イル', meaning: '一（漢数字）', category: '数字', level: 1 },
  { id: 10, korean: '이', reading: 'イ', meaning: '二（漢数字）', category: '数字', level: 1 },
  { id: 11, korean: '삼', reading: 'サム', meaning: '三（漢数字）', category: '数字', level: 1 },
  { id: 12, korean: '사', reading: 'サ', meaning: '四（漢数字）', category: '数字', level: 1 },
  { id: 13, korean: '오', reading: 'オ', meaning: '五（漢数字）', category: '数字', level: 1 },
  { id: 14, korean: '하나', reading: 'ハナ', meaning: '一つ（固有数字）', category: '数字', level: 1 },
  { id: 15, korean: '둘', reading: 'トゥル', meaning: '二つ（固有数字）', category: '数字', level: 1 },
  { id: 16, korean: '셋', reading: 'セッ', meaning: '三つ（固有数字）', category: '数字', level: 1 },

  // 食べ物
  { id: 17, korean: '밥', reading: 'パプ', meaning: 'ご飯', category: '食べ物', level: 1 },
  { id: 18, korean: '물', reading: 'ムル', meaning: '水', category: '食べ物', level: 1 },
  { id: 19, korean: '김치', reading: 'キムチ', meaning: 'キムチ', category: '食べ物', level: 1 },
  { id: 20, korean: '불고기', reading: 'プルゴギ', meaning: 'プルゴギ（焼き肉）', category: '食べ物', level: 1 },
  { id: 21, korean: '라면', reading: 'ラミョン', meaning: 'ラーメン', category: '食べ物', level: 1 },
  { id: 22, korean: '떡볶이', reading: 'トッポッキ', meaning: 'トッポッキ', category: '食べ物', level: 1 },
  { id: 23, korean: '삼겹살', reading: 'サムギョプサル', meaning: 'サムギョプサル（豚バラ焼き）', category: '食べ物', level: 1 },
  { id: 24, korean: '치킨', reading: 'チキン', meaning: 'フライドチキン', category: '食べ物', level: 1 },
  { id: 25, korean: '맥주', reading: 'メクチュ', meaning: 'ビール', category: '食べ物', level: 1 },
  { id: 26, korean: '커피', reading: 'コピ', meaning: 'コーヒー', category: '食べ物', level: 1 },

  // 色
  { id: 27, korean: '빨간색', reading: 'パルガンセク', meaning: '赤色', category: '色', level: 1 },
  { id: 28, korean: '파란색', reading: 'パランセク', meaning: '青色', category: '色', level: 1 },
  { id: 29, korean: '노란색', reading: 'ノランセク', meaning: '黄色', category: '色', level: 1 },
  { id: 30, korean: '초록색', reading: 'チョロクセク', meaning: '緑色', category: '色', level: 1 },
  { id: 31, korean: '하얀색', reading: 'ハヤンセク', meaning: '白色', category: '色', level: 1 },
  { id: 32, korean: '검은색', reading: 'コムンセク', meaning: '黒色', category: '色', level: 1 },

  // 家族
  { id: 33, korean: '아버지', reading: 'アボジ', meaning: '父', category: '家族', level: 1 },
  { id: 34, korean: '어머니', reading: 'オモニ', meaning: '母', category: '家族', level: 1 },
  { id: 35, korean: '형', reading: 'ヒョン', meaning: '兄（男性から）', category: '家族', level: 1 },
  { id: 36, korean: '언니', reading: 'オンニ', meaning: '姉（女性から）', category: '家族', level: 1 },
  { id: 37, korean: '동생', reading: 'トンセン', meaning: '弟・妹', category: '家族', level: 1 },
  { id: 38, korean: '친구', reading: 'チング', meaning: '友達', category: '家族', level: 1 },

  // 日常会話
  { id: 39, korean: '네', reading: 'ネ', meaning: 'はい', category: '日常会話', level: 1 },
  { id: 40, korean: '아니요', reading: 'アニヨ', meaning: 'いいえ', category: '日常会話', level: 1 },
  { id: 41, korean: '괜찮아요', reading: 'クェンチャナヨ', meaning: '大丈夫です', category: '日常会話', level: 1 },
  { id: 42, korean: '모르겠어요', reading: 'モルゲッソヨ', meaning: 'わかりません', category: '日常会話', level: 1 },
  { id: 43, korean: '얼마예요?', reading: 'オルマエヨ', meaning: 'いくらですか？', category: '日常会話', level: 1 },
  { id: 44, korean: '어디예요?', reading: 'オディエヨ', meaning: 'どこですか？', category: '日常会話', level: 1 },
  { id: 45, korean: '화장실', reading: 'ファジャンシル', meaning: 'トイレ', category: '日常会話', level: 1 },
  { id: 46, korean: '맛있어요', reading: 'マシッソヨ', meaning: '美味しいです', category: '日常会話', level: 1 },

  // 動詞
  { id: 47, korean: '가다', reading: 'カダ', meaning: '行く', category: '動詞', level: 1 },
  { id: 48, korean: '오다', reading: 'オダ', meaning: '来る', category: '動詞', level: 1 },
  { id: 49, korean: '먹다', reading: 'モクタ', meaning: '食べる', category: '動詞', level: 1 },
  { id: 50, korean: '마시다', reading: 'マシダ', meaning: '飲む', category: '動詞', level: 1 },
  { id: 51, korean: '보다', reading: 'ポダ', meaning: '見る', category: '動詞', level: 1 },
  { id: 52, korean: '듣다', reading: 'トゥッタ', meaning: '聞く', category: '動詞', level: 1 },
  { id: 53, korean: '말하다', reading: 'マラダ', meaning: '話す', category: '動詞', level: 1 },
  { id: 54, korean: '읽다', reading: 'イッタ', meaning: '読む', category: '動詞', level: 1 },
  { id: 55, korean: '쓰다', reading: 'スダ', meaning: '書く', category: '動詞', level: 2 },
  { id: 56, korean: '사다', reading: 'サダ', meaning: '買う', category: '動詞', level: 1 },
  { id: 57, korean: '팔다', reading: 'パルダ', meaning: '売る', category: '動詞', level: 2 },
  { id: 58, korean: '자다', reading: 'チャダ', meaning: '寝る', category: '動詞', level: 1 },

  // 形容詞
  { id: 59, korean: '크다', reading: 'クダ', meaning: '大きい', category: '形容詞', level: 1 },
  { id: 60, korean: '작다', reading: 'チャクタ', meaning: '小さい', category: '形容詞', level: 1 },
  { id: 61, korean: '많다', reading: 'マンタ', meaning: '多い', category: '形容詞', level: 1 },
  { id: 62, korean: '적다', reading: 'チョクタ', meaning: '少ない', category: '形容詞', level: 1 },
  { id: 63, korean: '좋다', reading: 'チョッタ', meaning: '良い', category: '形容詞', level: 1 },
  { id: 64, korean: '나쁘다', reading: 'ナップダ', meaning: '悪い', category: '形容詞', level: 1 },
  { id: 65, korean: '예쁘다', reading: 'イェップダ', meaning: '綺麗だ・可愛い', category: '形容詞', level: 1 },
  { id: 66, korean: '빠르다', reading: 'パルダ', meaning: '速い', category: '形容詞', level: 2 },
  { id: 67, korean: '느리다', reading: 'ヌリダ', meaning: '遅い', category: '形容詞', level: 2 },
  { id: 68, korean: '바쁘다', reading: 'パップダ', meaning: '忙しい', category: '形容詞', level: 1 },

  // 場所
  { id: 69, korean: '학교', reading: 'ハッキョ', meaning: '学校', category: '場所', level: 1 },
  { id: 70, korean: '병원', reading: 'ピョンウォン', meaning: '病院', category: '場所', level: 1 },
  { id: 71, korean: '은행', reading: 'ウネン', meaning: '銀行', category: '場所', level: 1 },
  { id: 72, korean: '편의점', reading: 'ピョニジョム', meaning: 'コンビニ', category: '場所', level: 1 },
  { id: 73, korean: '백화점', reading: 'ペッカジョム', meaning: 'デパート', category: '場所', level: 1 },
  { id: 74, korean: '공항', reading: 'コンハン', meaning: '空港', category: '場所', level: 1 },
  { id: 75, korean: '지하철역', reading: 'チハチョルリョク', meaning: '地下鉄駅', category: '場所', level: 1 },

  // 時間
  { id: 76, korean: '오늘', reading: 'オヌル', meaning: '今日', category: '時間', level: 1 },
  { id: 77, korean: '내일', reading: 'ネイル', meaning: '明日', category: '時間', level: 1 },
  { id: 78, korean: '어제', reading: 'オジェ', meaning: '昨日', category: '時間', level: 1 },
  { id: 79, korean: '지금', reading: 'チグム', meaning: '今', category: '時間', level: 1 },
  { id: 80, korean: '아침', reading: 'アチム', meaning: '朝', category: '時間', level: 1 },
  { id: 81, korean: '점심', reading: 'チョムシム', meaning: '昼', category: '時間', level: 1 },
  { id: 82, korean: '저녁', reading: 'チョニョク', meaning: '夕方・夕食', category: '時間', level: 1 },
  { id: 83, korean: '밤', reading: 'パム', meaning: '夜', category: '時間', level: 1 },
];

export const categories: Category[] = [
  'あいさつ', '数字', '食べ物', '色', '家族', '日常会話', '動詞', '形容詞', '場所', '時間'
];
