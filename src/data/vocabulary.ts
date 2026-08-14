export type Category =
  | 'あいさつ' | '数字' | '食べ物' | '色' | '家族' | '日常会話' | '動詞' | '形容詞' | '場所' | '時間'
  | '天気' | '交通' | '身体' | '動物' | '職業' | '疑問詞';

export interface Example {
  korean: string;
  japanese: string;
  accept?: string[]; // [[target]] 部分の別解（かな読みなど）
}

export interface Word {
  id: number;
  korean: string;
  reading: string;
  meaning: string;
  accept?: string[]; // meaning の別解（かな読み・短縮形・同義語）
  category: Category;
  level: 1 | 2 | 3;
  example: Example;
}

export const vocabulary: Word[] = [
  // あいさつ
  { id: 1, korean: '안녕하세요', reading: 'アンニョンハセヨ', meaning: 'こんにちは', category: 'あいさつ', level: 1, example: { korean: '[[안녕하세요]], 처음 뵙겠습니다.', japanese: '[[こんにちは]]、はじめまして。' } },
  { id: 2, korean: '감사합니다', reading: 'カムサハムニダ', meaning: 'ありがとうございます', accept: ['ありがとう', 'ありがとうございました'], category: 'あいさつ', level: 1, example: { korean: '도와주셔서 [[감사합니다]].', japanese: '助けてくれて[[ありがとうございます]]。', accept: ['ありがとう', 'ありがとうございました'] } },
  { id: 3, korean: '죄송합니다', reading: 'チェソンハムニダ', meaning: '申し訳ありません', accept: ['もうしわけありません', 'すみません', 'ごめんなさい'], category: 'あいさつ', level: 1, example: { korean: '늦어서 [[죄송합니다]].', japanese: '遅れて[[申し訳ありません]]。', accept: ['もうしわけありません', 'すみません', 'ごめんなさい'] } },
  { id: 4, korean: '안녕히 가세요', reading: 'アンニョンヒ カセヨ', meaning: 'さようなら（去る人へ）', accept: ['さよなら', 'またね'], category: 'あいさつ', level: 1, example: { korean: '그럼, [[안녕히 가세요]].', japanese: 'では、[[さようなら（去る人へ）]]。', accept: ['さよなら', 'またね'] } },
  { id: 5, korean: '안녕히 계세요', reading: 'アンニョンヒ ケセヨ', meaning: 'さようなら（残る人へ）', accept: ['さよなら'], category: 'あいさつ', level: 1, example: { korean: '저는 먼저 갈게요. [[안녕히 계세요]].', japanese: '私はお先に失礼します。[[さようなら（残る人へ）]]。', accept: ['さよなら'] } },
  { id: 6, korean: '잘 부탁드립니다', reading: 'チャル プタッドゥリムニダ', meaning: 'よろしくお願いします', accept: ['よろしくおねがいします', 'よろしく'], category: 'あいさつ', level: 1, example: { korean: '앞으로도 [[잘 부탁드립니다]].', japanese: 'これからも[[よろしくお願いします]]。', accept: ['よろしくおねがいします', 'よろしく'] } },
  { id: 7, korean: '처음 뵙겠습니다', reading: 'チョウム ペッケッスムニダ', meaning: 'はじめまして', category: 'あいさつ', level: 1, example: { korean: '[[처음 뵙겠습니다]]. 박지수입니다.', japanese: '[[はじめまして]]。パク・ジスです。' } },
  { id: 8, korean: '오래간만이에요', reading: 'オレガンマニエヨ', meaning: 'お久しぶりです', accept: ['おひさしぶりです', 'ひさしぶり'], category: 'あいさつ', level: 2, example: { korean: '[[오래간만이에요]]! 잘 지냈어요?', japanese: '[[お久しぶりです]]！元気でしたか？', accept: ['おひさしぶりです', 'ひさしぶり'] } },

  // 数字
  { id: 9, korean: '일', reading: 'イル', meaning: '一（漢数字）', accept: ['1', 'いち', '一'], category: '数字', level: 1, example: { korean: '[[일]]층에 편의점이 있어요.', japanese: '[[一]]階にコンビニがあります。', accept: ['いち', '1'] } },
  { id: 10, korean: '이', reading: 'イ', meaning: '二（漢数字）', accept: ['2', 'に', '二'], category: '数字', level: 1, example: { korean: '자녀가 [[이]]명 있어요.', japanese: '子供が[[二]]人います。', accept: ['に', '2'] } },
  { id: 11, korean: '삼', reading: 'サム', meaning: '三（漢数字）', accept: ['3', 'さん', '三'], category: '数字', level: 1, example: { korean: '[[삼]]일 동안 쉬었어요.', japanese: '[[三]]日間休みました。', accept: ['さん', '3'] } },
  { id: 12, korean: '사', reading: 'サ', meaning: '四（漢数字）', accept: ['4', 'よん', '四'], category: '数字', level: 1, example: { korean: '[[사]]월에 벚꽃이 피어요.', japanese: '[[四]]月に桜が咲きます。', accept: ['よん', '4'] } },
  { id: 13, korean: '오', reading: 'オ', meaning: '五（漢数字）', accept: ['5', 'ご', '五'], category: '数字', level: 1, example: { korean: '[[오]]분 후에 도착해요.', japanese: '[[五]]分後に到着します。', accept: ['ご', '5'] } },
  { id: 14, korean: '하나', reading: 'ハナ', meaning: '一つ（固有数字）', accept: ['1つ', 'ひとつ', '一つ'], category: '数字', level: 1, example: { korean: '사과 [[하나]] 주세요.', japanese: 'りんご[[一つ]]ください。', accept: ['ひとつ', '1つ'] } },
  { id: 15, korean: '둘', reading: 'トゥル', meaning: '二つ（固有数字）', accept: ['2つ', 'ふたつ', '二つ'], category: '数字', level: 1, example: { korean: '커피 [[둘]] 주세요.', japanese: 'コーヒー[[二つ]]ください。', accept: ['ふたつ', '2つ'] } },
  { id: 16, korean: '셋', reading: 'セッ', meaning: '三つ（固有数字）', accept: ['3つ', 'みっつ', '三つ'], category: '数字', level: 1, example: { korean: '고양이가 [[셋]] 있어요.', japanese: '猫が[[三匹]]います。', accept: ['さんびき', '3匹', '3びき'] } },

  // 食べ物
  { id: 17, korean: '밥', reading: 'パプ', meaning: 'ご飯', accept: ['ごはん'], category: '食べ物', level: 1, example: { korean: '[[밥]]을 맛있게 먹었어요.', japanese: '[[ご飯]]をおいしく食べました。', accept: ['ごはん'] } },
  { id: 18, korean: '물', reading: 'ムル', meaning: '水', accept: ['みず'], category: '食べ物', level: 1, example: { korean: '[[물]] 한 잔 주세요.', japanese: '[[水]]を一杯ください。', accept: ['みず'] } },
  { id: 19, korean: '김치', reading: 'キムチ', meaning: 'キムチ', category: '食べ物', level: 1, example: { korean: '한국 사람은 [[김치]]를 매일 먹어요.', japanese: '韓国人は[[キムチ]]を毎日食べます。' } },
  { id: 20, korean: '불고기', reading: 'プルゴギ', meaning: 'プルゴギ（焼き肉）', category: '食べ物', level: 1, example: { korean: '오늘 저녁은 [[불고기]]예요.', japanese: '今夜は[[プルゴギ（焼き肉）]]です。' } },
  { id: 21, korean: '라면', reading: 'ラミョン', meaning: 'ラーメン', category: '食べ物', level: 1, example: { korean: '[[라면]]을 끓여 먹었어요.', japanese: '[[ラーメン]]を作って食べました。' } },
  { id: 22, korean: '떡볶이', reading: 'トッポッキ', meaning: 'トッポッキ', category: '食べ物', level: 1, example: { korean: '[[떡볶이]]가 너무 매워요.', japanese: '[[トッポッキ]]がとても辛いです。' } },
  { id: 23, korean: '삼겹살', reading: 'サムギョプサル', meaning: 'サムギョプサル（豚バラ焼き）', category: '食べ物', level: 1, example: { korean: '주말에 [[삼겹살]]을 먹었어요.', japanese: '週末に[[サムギョプサル（豚バラ焼き）]]を食べました。' } },
  { id: 24, korean: '치킨', reading: 'チキン', meaning: 'フライドチキン', accept: ['チキン', 'ちきん', 'からあげ'], category: '食べ物', level: 1, example: { korean: '오늘 [[치킨]] 시켜 먹을까요?', japanese: '今日[[フライドチキン]]を注文しませんか？', accept: ['チキン', 'ちきん', 'からあげ'] } },
  { id: 25, korean: '맥주', reading: 'メクチュ', meaning: 'ビール', category: '食べ物', level: 1, example: { korean: '[[맥주]] 한 캔 마셔요.', japanese: '[[ビール]]を一缶飲みます。' } },
  { id: 26, korean: '커피', reading: 'コピ', meaning: 'コーヒー', category: '食べ物', level: 1, example: { korean: '아침마다 [[커피]]를 마셔요.', japanese: '毎朝[[コーヒー]]を飲みます。' } },

  // 色
  { id: 27, korean: '빨간색', reading: 'パルガンセク', meaning: '赤色', accept: ['あかいろ', 'あか'], category: '色', level: 1, example: { korean: '장미는 [[빨간색]]이에요.', japanese: 'バラは[[赤色]]です。', accept: ['あかいろ', 'あか'] } },
  { id: 28, korean: '파란색', reading: 'パランセク', meaning: '青色', accept: ['あおいろ', 'あお'], category: '色', level: 1, example: { korean: '하늘이 [[파란색]]이에요.', japanese: '空が[[青色]]です。', accept: ['あおいろ', 'あお'] } },
  { id: 29, korean: '노란색', reading: 'ノランセク', meaning: '黄色', accept: ['きいろ'], category: '色', level: 1, example: { korean: '해바라기는 [[노란색]]이에요.', japanese: 'ひまわりは[[黄色]]です。', accept: ['きいろ'] } },
  { id: 30, korean: '초록색', reading: 'チョロクセク', meaning: '緑色', accept: ['みどりいろ', 'みどり'], category: '色', level: 1, example: { korean: '나뭇잎은 [[초록색]]이에요.', japanese: '葉は[[緑色]]です。', accept: ['みどりいろ', 'みどり'] } },
  { id: 31, korean: '하얀색', reading: 'ハヤンセク', meaning: '白色', accept: ['しろいろ', 'しろ'], category: '色', level: 1, example: { korean: '눈은 [[하얀색]]이에요.', japanese: '雪は[[白色]]です。', accept: ['しろいろ', 'しろ'] } },
  { id: 32, korean: '검은색', reading: 'コムンセク', meaning: '黒色', accept: ['くろいろ', 'くろ'], category: '色', level: 1, example: { korean: '밤하늘은 [[검은색]]이에요.', japanese: '夜空は[[黒色]]です。', accept: ['くろいろ', 'くろ'] } },

  // 家族
  { id: 33, korean: '아버지', reading: 'アボジ', meaning: '父', accept: ['ちち', 'おとうさん'], category: '家族', level: 1, example: { korean: '[[아버지]]는 요리를 잘해요.', japanese: '[[父]]は料理が上手です。', accept: ['ちち', 'おとうさん'] } },
  { id: 34, korean: '어머니', reading: 'オモニ', meaning: '母', accept: ['はは', 'おかあさん'], category: '家族', level: 1, example: { korean: '[[어머니]]께 전화했어요.', japanese: '[[母]]に電話しました。', accept: ['はは', 'おかあさん'] } },
  { id: 35, korean: '형', reading: 'ヒョン', meaning: '兄（男性から）', accept: ['あに', 'おにいさん'], category: '家族', level: 1, example: { korean: '[[형]]이 저보다 키가 커요.', japanese: '[[兄（男性から）]]が私より背が高いです。', accept: ['あに', 'おにいさん'] } },
  { id: 36, korean: '언니', reading: 'オンニ', meaning: '姉（女性から）', accept: ['あね', 'おねえさん'], category: '家族', level: 1, example: { korean: '[[언니]]와 쇼핑했어요.', japanese: '[[姉（女性から）]]と買い物しました。', accept: ['あね', 'おねえさん'] } },
  { id: 37, korean: '동생', reading: 'トンセン', meaning: '弟・妹', accept: ['おとうと', 'いもうと'], category: '家族', level: 1, example: { korean: '[[동생]]이 학교에 갔어요.', japanese: '[[弟・妹]]が学校に行きました。', accept: ['おとうと', 'いもうと'] } },
  { id: 38, korean: '친구', reading: 'チング', meaning: '友達', accept: ['ともだち'], category: '家族', level: 1, example: { korean: '[[친구]]와 밥을 먹었어요.', japanese: '[[友達]]とご飯を食べました。', accept: ['ともだち'] } },

  // 日常会話
  { id: 39, korean: '네', reading: 'ネ', meaning: 'はい', category: '日常会話', level: 1, example: { korean: '[[네]], 알겠어요.', japanese: '[[はい]]、わかりました。' } },
  { id: 40, korean: '아니요', reading: 'アニヨ', meaning: 'いいえ', category: '日常会話', level: 1, example: { korean: '[[아니요]], 괜찮아요.', japanese: '[[いいえ]]、大丈夫です。' } },
  { id: 41, korean: '괜찮아요', reading: 'クェンチャナヨ', meaning: '大丈夫です', accept: ['だいじょうぶです', 'だいじょうぶ'], category: '日常会話', level: 1, example: { korean: '걱정 마세요. [[괜찮아요]].', japanese: '心配しないでください。[[大丈夫です]]。', accept: ['だいじょうぶです', 'だいじょうぶ'] } },
  { id: 42, korean: '모르겠어요', reading: 'モルゲッソヨ', meaning: 'わかりません', accept: ['わからない'], category: '日常会話', level: 1, example: { korean: '그 단어 뜻을 [[모르겠어요]].', japanese: 'その単語の意味が[[わかりません]]。', accept: ['わからない'] } },
  { id: 43, korean: '얼마예요?', reading: 'オルマエヨ', meaning: 'いくらですか？', accept: ['いくら'], category: '日常会話', level: 1, example: { korean: '이 가방 [[얼마예요?]]', japanese: 'このバッグ[[いくらですか？]]', accept: ['いくら'] } },
  { id: 44, korean: '어디예요?', reading: 'オディエヨ', meaning: 'どこですか？', accept: ['どちらですか'], category: '日常会話', level: 1, example: { korean: '역이 [[어디예요?]]', japanese: '駅は[[どこですか？]]', accept: ['どちらですか'] } },
  { id: 45, korean: '화장실', reading: 'ファジャンシル', meaning: 'トイレ', accept: ['おてあらい', 'お手洗い', 'べんじょ'], category: '日常会話', level: 1, example: { korean: '[[화장실]]이 어디에 있어요?', japanese: '[[トイレ]]はどこにありますか？', accept: ['おてあらい', 'お手洗い', 'べんじょ'] } },
  { id: 46, korean: '맛있어요', reading: 'マシッソヨ', meaning: '美味しいです', accept: ['おいしいです', 'おいしい'], category: '日常会話', level: 1, example: { korean: '이 음식 정말 [[맛있어요]].', japanese: 'この料理は本当に[[美味しいです]]。', accept: ['おいしいです', 'おいしい'] } },

  // 動詞
  { id: 47, korean: '가다', reading: 'カダ', meaning: '行く', accept: ['いく', 'いきます', '行きます'], category: '動詞', level: 1, example: { korean: '내일 서울에 [[가요]].', japanese: '明日ソウルに[[行きます]]。', accept: ['いきます', '行く', 'いく'] } },
  { id: 48, korean: '오다', reading: 'オダ', meaning: '来る', accept: ['くる', 'きます', '来ます'], category: '動詞', level: 1, example: { korean: '친구가 집에 [[와요]].', japanese: '友達が家に[[来ます]]。', accept: ['きます', '来る', 'くる'] } },
  { id: 49, korean: '먹다', reading: 'モクタ', meaning: '食べる', accept: ['たべる', 'たべます', '食べます'], category: '動詞', level: 1, example: { korean: '저는 김치를 자주 [[먹어요]].', japanese: '私はキムチをよく[[食べます]]。', accept: ['たべます', '食べる', 'たべる'] } },
  { id: 50, korean: '마시다', reading: 'マシダ', meaning: '飲む', accept: ['のむ', 'のみます', '飲みます'], category: '動詞', level: 1, example: { korean: '물을 [[마셔요]].', japanese: '水を[[飲みます]]。', accept: ['のみます', '飲む', 'のむ'] } },
  { id: 51, korean: '보다', reading: 'ポダ', meaning: '見る', accept: ['みる', 'みます', '見ます'], category: '動詞', level: 1, example: { korean: '영화를 [[봐요]].', japanese: '映画を[[見ます]]。', accept: ['みます', '見る', 'みる'] } },
  { id: 52, korean: '듣다', reading: 'トゥッタ', meaning: '聞く', accept: ['きく', 'ききます', '聞きます'], category: '動詞', level: 1, example: { korean: '음악을 [[들어요]].', japanese: '音楽を[[聞きます]]。', accept: ['ききます', '聞く', 'きく'] } },
  { id: 53, korean: '말하다', reading: 'マラダ', meaning: '話す', accept: ['はなす', 'はなします', '話します'], category: '動詞', level: 1, example: { korean: '한국어로 [[말해요]].', japanese: '韓国語で[[話します]]。', accept: ['はなします', '話す', 'はなす'] } },
  { id: 54, korean: '읽다', reading: 'イッタ', meaning: '読む', accept: ['よむ', 'よみます', '読みます'], category: '動詞', level: 1, example: { korean: '책을 [[읽어요]].', japanese: '本を[[読みます]]。', accept: ['よみます', '読む', 'よむ'] } },
  { id: 55, korean: '쓰다', reading: 'スダ', meaning: '書く', accept: ['かく', 'かきます', '書きます'], category: '動詞', level: 2, example: { korean: '편지를 [[써요]].', japanese: '手紙を[[書きます]]。', accept: ['かきます', '書く', 'かく'] } },
  { id: 56, korean: '사다', reading: 'サダ', meaning: '買う', accept: ['かう', 'かいます', '買います'], category: '動詞', level: 1, example: { korean: '슈퍼에서 과일을 [[사요]].', japanese: 'スーパーで果物を[[買います]]。', accept: ['かいます', '買う', 'かう'] } },
  { id: 57, korean: '팔다', reading: 'パルダ', meaning: '売る', accept: ['うる', 'うります', '売ります'], category: '動詞', level: 2, example: { korean: '이 가게에서 옷을 [[팔아요]].', japanese: 'このお店で服を[[売ります]]。', accept: ['うります', '売る', 'うる'] } },
  { id: 58, korean: '자다', reading: 'チャダ', meaning: '寝る', accept: ['ねる', 'ねます', '寝ます'], category: '動詞', level: 1, example: { korean: '밤에 일찍 [[자요]].', japanese: '夜早く[[寝ます]]。', accept: ['ねます', '寝る', 'ねる'] } },

  // 形容詞
  { id: 59, korean: '크다', reading: 'クダ', meaning: '大きい', accept: ['おおきい', 'おおきいです'], category: '形容詞', level: 1, example: { korean: '저 건물이 정말 [[커요]].', japanese: 'あのビルは本当に[[大きいです]]。', accept: ['おおきいです', 'おおきい', '大きい'] } },
  { id: 60, korean: '작다', reading: 'チャクタ', meaning: '小さい', accept: ['ちいさい', 'ちいさいです'], category: '形容詞', level: 1, example: { korean: '이 방이 너무 [[작아요]].', japanese: 'この部屋はとても[[小さいです]]。', accept: ['ちいさいです', 'ちいさい', '小さい'] } },
  { id: 61, korean: '많다', reading: 'マンタ', meaning: '多い', accept: ['おおい', 'おおいです'], category: '形容詞', level: 1, example: { korean: '사람이 정말 [[많아요]].', japanese: '人が本当に[[多いです]]。', accept: ['おおいです', 'おおい', '多い'] } },
  { id: 62, korean: '적다', reading: 'チョクタ', meaning: '少ない', accept: ['すくない', 'すくないです'], category: '形容詞', level: 1, example: { korean: '시간이 [[적어요]].', japanese: '時間が[[少ないです]]。', accept: ['すくないです', 'すくない', '少ない'] } },
  { id: 63, korean: '좋다', reading: 'チョッタ', meaning: '良い', accept: ['いい', 'よい', 'いいです'], category: '形容詞', level: 1, example: { korean: '오늘 날씨가 [[좋아요]].', japanese: '今日の天気が[[良いです]]。', accept: ['いいです', 'いい', 'よい'] } },
  { id: 64, korean: '나쁘다', reading: 'ナップダ', meaning: '悪い', accept: ['わるい', 'わるいです'], category: '形容詞', level: 1, example: { korean: '오늘은 기분이 [[나빠요]].', japanese: '今日は気分が[[悪いです]]。', accept: ['わるいです', 'わるい', '悪い'] } },
  { id: 65, korean: '예쁘다', reading: 'イェップダ', meaning: '綺麗だ・可愛い', accept: ['きれいだ', 'きれい', 'かわいい'], category: '形容詞', level: 1, example: { korean: '꽃이 정말 [[예뻐요]].', japanese: '花が本当に[[綺麗です]]。', accept: ['きれいです', 'きれい', 'かわいい'] } },
  { id: 66, korean: '빠르다', reading: 'パルダ', meaning: '速い', accept: ['はやい', 'はやいです'], category: '形容詞', level: 2, example: { korean: '이 기차가 정말 [[빨라요]].', japanese: 'この電車は本当に[[速いです]]。', accept: ['はやいです', 'はやい', '速い'] } },
  { id: 67, korean: '느리다', reading: 'ヌリダ', meaning: '遅い', accept: ['おそい', 'おそいです'], category: '形容詞', level: 2, example: { korean: '거북이는 [[느려요]].', japanese: '亀は[[遅いです]]。', accept: ['おそいです', 'おそい', '遅い'] } },
  { id: 68, korean: '바쁘다', reading: 'パップダ', meaning: '忙しい', accept: ['いそがしい', 'いそがしいです'], category: '形容詞', level: 1, example: { korean: '요즘 일이 많아서 [[바빠요]].', japanese: '最近仕事が多くて[[忙しいです]]。', accept: ['いそがしいです', 'いそがしい', '忙しい'] } },

  // 場所
  { id: 69, korean: '학교', reading: 'ハッキョ', meaning: '学校', accept: ['がっこう'], category: '場所', level: 1, example: { korean: '아이가 [[학교]]에 갔어요.', japanese: '子供が[[学校]]に行きました。', accept: ['がっこう'] } },
  { id: 70, korean: '병원', reading: 'ピョンウォン', meaning: '病院', accept: ['びょういん'], category: '場所', level: 1, example: { korean: '아파서 [[병원]]에 갔어요.', japanese: '体調が悪くて[[病院]]に行きました。', accept: ['びょういん'] } },
  { id: 71, korean: '은행', reading: 'ウネン', meaning: '銀行', accept: ['ぎんこう'], category: '場所', level: 1, example: { korean: '[[은행]]에서 돈을 찾았어요.', japanese: '[[銀行]]でお金を引き出しました。', accept: ['ぎんこう'] } },
  { id: 72, korean: '편의점', reading: 'ピョニジョム', meaning: 'コンビニ', category: '場所', level: 1, example: { korean: '[[편의점]]에서 음료수를 샀어요.', japanese: '[[コンビニ]]で飲み物を買いました。' } },
  { id: 73, korean: '백화점', reading: 'ペッカジョム', meaning: 'デパート', category: '場所', level: 1, example: { korean: '[[백화점]]에서 옷을 샀어요.', japanese: '[[デパート]]で服を買いました。' } },
  { id: 74, korean: '공항', reading: 'コンハン', meaning: '空港', accept: ['くうこう'], category: '場所', level: 1, example: { korean: '[[공항]]에서 친구를 기다렸어요.', japanese: '[[空港]]で友達を待ちました。', accept: ['くうこう'] } },
  { id: 75, korean: '지하철역', reading: 'チハチョルリョク', meaning: '地下鉄駅', accept: ['ちかてつえき'], category: '場所', level: 1, example: { korean: '[[지하철역]]까지 어떻게 가요?', japanese: '[[地下鉄駅]]まではどう行きますか？', accept: ['ちかてつえき'] } },

  // 時間
  { id: 76, korean: '오늘', reading: 'オヌル', meaning: '今日', accept: ['きょう'], category: '時間', level: 1, example: { korean: '[[오늘]] 날씨가 좋아요.', japanese: '[[今日]]は天気がいいです。', accept: ['きょう'] } },
  { id: 77, korean: '내일', reading: 'ネイル', meaning: '明日', accept: ['あした', 'あす'], category: '時間', level: 1, example: { korean: '[[내일]] 같이 갈까요?', japanese: '[[明日]]一緒に行きましょうか？', accept: ['あした', 'あす'] } },
  { id: 78, korean: '어제', reading: 'オジェ', meaning: '昨日', accept: ['きのう'], category: '時間', level: 1, example: { korean: '[[어제]] 영화를 봤어요.', japanese: '[[昨日]]映画を見ました。', accept: ['きのう'] } },
  { id: 79, korean: '지금', reading: 'チグム', meaning: '今', accept: ['いま'], category: '時間', level: 1, example: { korean: '[[지금]] 뭐 해요?', japanese: '[[今]]何していますか？', accept: ['いま'] } },
  { id: 80, korean: '아침', reading: 'アチム', meaning: '朝', accept: ['あさ'], category: '時間', level: 1, example: { korean: '[[아침]]에 빵을 먹었어요.', japanese: '[[朝]]パンを食べました。', accept: ['あさ'] } },
  { id: 81, korean: '점심', reading: 'チョムシム', meaning: '昼', accept: ['ひる'], category: '時間', level: 1, example: { korean: '[[점심]]은 같이 먹어요.', japanese: '[[昼]]ご飯は一緒に食べましょう。', accept: ['ひる'] } },
  { id: 82, korean: '저녁', reading: 'チョニョク', meaning: '夕方・夕食', accept: ['ゆうがた', 'ゆうしょく'], category: '時間', level: 1, example: { korean: '[[저녁]] 먹었어요?', japanese: '[[夕方・夕食]]食べましたか？', accept: ['ゆうがた', 'ゆうしょく'] } },
  { id: 83, korean: '밤', reading: 'パム', meaning: '夜', accept: ['よる'], category: '時間', level: 1, example: { korean: '[[밤]]에 혼자 공부해요.', japanese: '[[夜]]一人で勉強します。', accept: ['よる'] } },

  // あいさつ（追加）
  { id: 84, korean: '잘 지냈어요?', reading: 'チャル チネッソヨ', meaning: '元気でしたか？', accept: ['げんきでしたか', 'おげんきでしたか'], category: 'あいさつ', level: 2, example: { korean: '오랜만이에요! [[잘 지냈어요?]]', japanese: 'お久しぶりです！[[元気でしたか？]]', accept: ['げんきでしたか'] } },
  { id: 85, korean: '실례합니다', reading: 'シルレハムニダ', meaning: '失礼します', accept: ['しつれいします'], category: 'あいさつ', level: 2, example: { korean: '[[실례합니다]], 길 좀 묻겠습니다.', japanese: '[[失礼します]]、道をお尋ねします。', accept: ['しつれいします'] } },
  { id: 86, korean: '잘 먹겠습니다', reading: 'チャル モッケッスムニダ', meaning: 'いただきます', category: 'あいさつ', level: 2, example: { korean: '[[잘 먹겠습니다]]!', japanese: '[[いただきます]]！' } },

  // 数字（追加）
  { id: 87, korean: '육', reading: 'ユク', meaning: '六（漢数字）', accept: ['6', 'ろく', '六'], category: '数字', level: 1, example: { korean: '[[육]]월에 여행 가요.', japanese: '[[六]]月に旅行に行きます。', accept: ['ろく', '6'] } },
  { id: 88, korean: '칠', reading: 'チル', meaning: '七（漢数字）', accept: ['7', 'しち', 'なな', '七'], category: '数字', level: 1, example: { korean: '[[칠]]시에 만나요.', japanese: '[[七]]時に会いましょう。', accept: ['しち', 'なな', '7'] } },
  { id: 89, korean: '팔', reading: 'パル', meaning: '八（漢数字）', accept: ['8', 'はち', '八'], category: '数字', level: 1, example: { korean: '[[팔]]층에 살아요.', japanese: '[[八]]階に住んでいます。', accept: ['はち', '8'] } },
  { id: 90, korean: '구', reading: 'ク', meaning: '九（漢数字）', accept: ['9', 'きゅう', 'く', '九'], category: '数字', level: 1, example: { korean: '[[구]]월은 시원해요.', japanese: '[[九]]月は涼しいです。', accept: ['きゅう', '9'] } },
  { id: 91, korean: '십', reading: 'シプ', meaning: '十（漢数字）', accept: ['10', 'じゅう', '十'], category: '数字', level: 1, example: { korean: '[[십]]분만 기다려 주세요.', japanese: '[[十]]分だけ待ってください。', accept: ['じゅう', '10'] } },
  { id: 92, korean: '넷', reading: 'ネッ', meaning: '四つ（固有数字）', accept: ['4つ', 'よっつ', '四つ'], category: '数字', level: 1, example: { korean: '사과가 [[넷]] 있어요.', japanese: 'りんごが[[四つ]]あります。', accept: ['よっつ', '4つ'] } },

  // 食べ物（追加）
  { id: 93, korean: '빵', reading: 'ッパン', meaning: 'パン', category: '食べ物', level: 1, example: { korean: '아침에 [[빵]]을 먹어요.', japanese: '朝[[パン]]を食べます。' } },
  { id: 94, korean: '우유', reading: 'ウユ', meaning: '牛乳', accept: ['ぎゅうにゅう', 'ミルク'], category: '食べ物', level: 1, example: { korean: '[[우유]]를 매일 마셔요.', japanese: '[[牛乳]]を毎日飲みます。', accept: ['ぎゅうにゅう', 'ミルク'] } },
  { id: 95, korean: '고기', reading: 'コギ', meaning: '肉', accept: ['にく'], category: '食べ物', level: 1, example: { korean: '[[고기]]를 구워 먹어요.', japanese: '[[肉]]を焼いて食べます。', accept: ['にく'] } },
  { id: 96, korean: '생선', reading: 'センソン', meaning: '魚', accept: ['さかな'], category: '食べ物', level: 2, example: { korean: '[[생선]]을 좋아해요.', japanese: '[[魚]]が好きです。', accept: ['さかな'] } },
  { id: 97, korean: '과일', reading: 'クァイル', meaning: '果物', accept: ['くだもの', 'フルーツ'], category: '食べ物', level: 1, example: { korean: '[[과일]]을 많이 먹어요.', japanese: '[[果物]]をたくさん食べます。', accept: ['くだもの', 'フルーツ'] } },
  { id: 98, korean: '야채', reading: 'ヤチェ', meaning: '野菜', accept: ['やさい'], category: '食べ物', level: 1, example: { korean: '[[야채]]도 드세요.', japanese: '[[野菜]]も召し上がってください。', accept: ['やさい'] } },
  { id: 99, korean: '계란', reading: 'ケラン', meaning: '卵', accept: ['たまご'], category: '食べ物', level: 1, example: { korean: '[[계란]] 두 개 주세요.', japanese: '[[卵]]を二個ください。', accept: ['たまご'] } },

  // 色（追加）
  { id: 100, korean: '보라색', reading: 'ポラセク', meaning: '紫色', accept: ['むらさきいろ', 'むらさき'], category: '色', level: 2, example: { korean: '포도는 [[보라색]]이에요.', japanese: 'ぶどうは[[紫色]]です。', accept: ['むらさきいろ', 'むらさき'] } },
  { id: 101, korean: '회색', reading: 'フェセク', meaning: '灰色', accept: ['はいいろ', 'グレー'], category: '色', level: 2, example: { korean: '구름이 [[회색]]이에요.', japanese: '雲が[[灰色]]です。', accept: ['はいいろ', 'グレー'] } },

  // 家族（追加）
  { id: 102, korean: '누나', reading: 'ヌナ', meaning: '姉（男性から）', accept: ['あね', 'おねえさん'], category: '家族', level: 1, example: { korean: '[[누나]]가 요리를 해 줬어요.', japanese: '[[姉（男性から）]]が料理を作ってくれました。', accept: ['あね', 'おねえさん'] } },
  { id: 103, korean: '오빠', reading: 'オッパ', meaning: '兄（女性から）', accept: ['あに', 'おにいさん'], category: '家族', level: 1, example: { korean: '[[오빠]]는 회사에 다녀요.', japanese: '[[兄（女性から）]]は会社に通っています。', accept: ['あに', 'おにいさん'] } },
  { id: 104, korean: '아들', reading: 'アドゥル', meaning: '息子', accept: ['むすこ'], category: '家族', level: 2, example: { korean: '[[아들]]이 대학생이에요.', japanese: '[[息子]]が大学生です。', accept: ['むすこ'] } },
  { id: 105, korean: '딸', reading: 'ッタル', meaning: '娘', accept: ['むすめ'], category: '家族', level: 2, example: { korean: '[[딸]]이 노래를 잘해요.', japanese: '[[娘]]が歌が上手です。', accept: ['むすめ'] } },

  // 日常会話（追加）
  { id: 106, korean: '어서 오세요', reading: 'オソ オセヨ', meaning: 'いらっしゃいませ', category: '日常会話', level: 2, example: { korean: '[[어서 오세요]]! 몇 분이세요?', japanese: '[[いらっしゃいませ]]！何名様ですか？' } },
  { id: 107, korean: '주세요', reading: 'チュセヨ', meaning: 'ください', category: '日常会話', level: 1, example: { korean: '물 좀 [[주세요]].', japanese: '水を[[ください]]。' } },
  { id: 108, korean: '잠깐만요', reading: 'チャムッカンマニョ', meaning: 'ちょっと待ってください', accept: ['ちょっとまってください', 'ちょっとまって', 'まってください'], category: '日常会話', level: 2, example: { korean: '[[잠깐만요]], 금방 올게요.', japanese: '[[ちょっと待ってください]]、すぐ戻ります。', accept: ['ちょっとまってください', 'ちょっとまって'] } },
  { id: 109, korean: '천만에요', reading: 'チョンマネヨ', meaning: 'どういたしまして', category: '日常会話', level: 2, example: { korean: '아니에요, [[천만에요]].', japanese: 'いいえ、[[どういたしまして]]。' } },
  { id: 110, korean: '축하합니다', reading: 'チュカハムニダ', meaning: 'おめでとうございます', accept: ['おめでとう'], category: '日常会話', level: 2, example: { korean: '졸업 [[축하합니다]]!', japanese: '卒業[[おめでとうございます]]！', accept: ['おめでとう'] } },
  { id: 111, korean: '사랑해요', reading: 'サランヘヨ', meaning: '愛しています', accept: ['あいしています', 'あいしてる'], category: '日常会話', level: 1, example: { korean: '엄마, [[사랑해요]].', japanese: 'お母さん、[[愛しています]]。', accept: ['あいしています', 'あいしてる'] } },

  // 動詞（追加）
  { id: 112, korean: '하다', reading: 'ハダ', meaning: 'する', accept: ['します'], category: '動詞', level: 1, example: { korean: '숙제를 [[해요]].', japanese: '宿題を[[します]]。', accept: ['する'] } },
  { id: 113, korean: '되다', reading: 'テダ', meaning: 'なる', accept: ['なります'], category: '動詞', level: 2, example: { korean: '의사가 [[돼요]].', japanese: '医者に[[なります]]。', accept: ['なる'] } },
  { id: 114, korean: '알다', reading: 'アルダ', meaning: '知る', accept: ['しる', 'しります'], category: '動詞', level: 1, example: { korean: '그 사람을 [[알아요]].', japanese: 'その人を[[知っています]]。', accept: ['しっています', 'しっている', 'しる'] } },
  { id: 115, korean: '모르다', reading: 'モルダ', meaning: '知らない', accept: ['しらない'], category: '動詞', level: 1, example: { korean: '저는 [[몰라요]].', japanese: '私は[[知りません]]。', accept: ['しりません', 'しらない'] } },
  { id: 116, korean: '좋아하다', reading: 'チョアハダ', meaning: '好きだ', accept: ['すきだ', 'すき', '好き'], category: '動詞', level: 1, example: { korean: '저는 커피를 [[좋아해요]].', japanese: '私はコーヒーが[[好きです]]。', accept: ['すきです', 'すき'] } },
  { id: 117, korean: '싫어하다', reading: 'シロハダ', meaning: '嫌いだ', accept: ['きらいだ', 'きらい', '嫌い'], category: '動詞', level: 2, example: { korean: '저는 벌레를 [[싫어해요]].', japanese: '私は虫が[[嫌いです]]。', accept: ['きらいです', 'きらい'] } },
  { id: 118, korean: '만나다', reading: 'マンナダ', meaning: '会う', accept: ['あう', 'あいます'], category: '動詞', level: 1, example: { korean: '친구를 [[만나요]].', japanese: '友達に[[会います]]。', accept: ['あいます', '会う', 'あう'] } },
  { id: 119, korean: '기다리다', reading: 'キダリダ', meaning: '待つ', accept: ['まつ', 'まちます'], category: '動詞', level: 1, example: { korean: '여기서 [[기다려요]].', japanese: 'ここで[[待ちます]]。', accept: ['まちます', '待つ', 'まつ'] } },
  { id: 120, korean: '일하다', reading: 'イラダ', meaning: '働く', accept: ['はたらく', 'はたらきます'], category: '動詞', level: 1, example: { korean: '회사에서 [[일해요]].', japanese: '会社で[[働きます]]。', accept: ['はたらきます', '働く', 'はたらく'] } },
  { id: 121, korean: '공부하다', reading: 'コンブハダ', meaning: '勉強する', accept: ['べんきょうする', 'べんきょうします'], category: '動詞', level: 1, example: { korean: '한국어를 [[공부해요]].', japanese: '韓国語を[[勉強します]]。', accept: ['べんきょうします', '勉強する', 'べんきょうする'] } },

  // 形容詞（追加）
  { id: 122, korean: '덥다', reading: 'トプタ', meaning: '暑い', accept: ['あつい', 'あついです'], category: '形容詞', level: 1, example: { korean: '여름은 정말 [[더워요]].', japanese: '夏は本当に[[暑いです]]。', accept: ['あついです', 'あつい', '暑い'] } },
  { id: 123, korean: '춥다', reading: 'チュプタ', meaning: '寒い', accept: ['さむい', 'さむいです'], category: '形容詞', level: 1, example: { korean: '겨울은 [[추워요]].', japanese: '冬は[[寒いです]]。', accept: ['さむいです', 'さむい', '寒い'] } },
  { id: 124, korean: '재미있다', reading: 'チェミイッタ', meaning: '面白い', accept: ['おもしろい', 'おもしろいです'], category: '形容詞', level: 1, example: { korean: '이 영화는 [[재미있어요]].', japanese: 'この映画は[[面白いです]]。', accept: ['おもしろいです', 'おもしろい', '面白い'] } },
  { id: 125, korean: '어렵다', reading: 'オリョプタ', meaning: '難しい', accept: ['むずかしい', 'むずかしいです'], category: '形容詞', level: 2, example: { korean: '한국어는 조금 [[어려워요]].', japanese: '韓国語は少し[[難しいです]]。', accept: ['むずかしいです', 'むずかしい', '難しい'] } },
  { id: 126, korean: '쉽다', reading: 'シプタ', meaning: '易しい', accept: ['やさしい', 'かんたん', '簡単'], category: '形容詞', level: 2, example: { korean: '이 문제는 [[쉬워요]].', japanese: 'この問題は[[易しいです]]。', accept: ['やさしいです', 'やさしい', 'かんたん'] } },
  { id: 127, korean: '비싸다', reading: 'ピッサダ', meaning: '高い（値段）', accept: ['たかい', 'たかいです'], category: '形容詞', level: 1, example: { korean: '이 옷은 너무 [[비싸요]].', japanese: 'この服はとても[[高いです]]。', accept: ['たかいです', 'たかい', '高い'] } },
  { id: 128, korean: '싸다', reading: 'ッサダ', meaning: '安い', accept: ['やすい', 'やすいです'], category: '形容詞', level: 1, example: { korean: '이 가게는 [[싸요]].', japanese: 'この店は[[安いです]]。', accept: ['やすいです', 'やすい', '安い'] } },

  // 場所（追加）
  { id: 129, korean: '집', reading: 'チプ', meaning: '家', accept: ['いえ', 'うち'], category: '場所', level: 1, example: { korean: '[[집]]에 가고 싶어요.', japanese: '[[家]]に帰りたいです。', accept: ['いえ', 'うち'] } },
  { id: 130, korean: '회사', reading: 'フェサ', meaning: '会社', accept: ['かいしゃ'], category: '場所', level: 1, example: { korean: '[[회사]]에 다녀요.', japanese: '[[会社]]に通っています。', accept: ['かいしゃ'] } },
  { id: 131, korean: '식당', reading: 'シクタン', meaning: '食堂', accept: ['しょくどう', 'レストラン'], category: '場所', level: 1, example: { korean: '[[식당]]에서 점심을 먹어요.', japanese: '[[食堂]]で昼ご飯を食べます。', accept: ['しょくどう', 'レストラン'] } },
  { id: 132, korean: '시장', reading: 'シジャン', meaning: '市場', accept: ['いちば', 'しじょう'], category: '場所', level: 2, example: { korean: '[[시장]]에서 과일을 샀어요.', japanese: '[[市場]]で果物を買いました。', accept: ['いちば', 'しじょう'] } },
  { id: 133, korean: '공원', reading: 'コンウォン', meaning: '公園', accept: ['こうえん'], category: '場所', level: 1, example: { korean: '[[공원]]에서 산책해요.', japanese: '[[公園]]で散歩します。', accept: ['こうえん'] } },

  // 時間（追加）
  { id: 134, korean: '주말', reading: 'チュマル', meaning: '週末', accept: ['しゅうまつ'], category: '時間', level: 1, example: { korean: '[[주말]]에 뭐 해요?', japanese: '[[週末]]に何をしますか？', accept: ['しゅうまつ'] } },
  { id: 135, korean: '시간', reading: 'シガン', meaning: '時間', accept: ['じかん'], category: '時間', level: 1, example: { korean: '[[시간]]이 없어요.', japanese: '[[時間]]がありません。', accept: ['じかん'] } },
  { id: 136, korean: '하루', reading: 'ハル', meaning: '一日', accept: ['いちにち'], category: '時間', level: 2, example: { korean: '[[하루]] 종일 바빴어요.', japanese: '[[一日]]中忙しかったです。', accept: ['いちにち'] } },
  { id: 137, korean: '올해', reading: 'オレ', meaning: '今年', accept: ['ことし'], category: '時間', level: 2, example: { korean: '[[올해]]는 한국에 갈 거예요.', japanese: '[[今年]]は韓国に行くつもりです。', accept: ['ことし'] } },
  { id: 138, korean: '다음 주', reading: 'タウム チュ', meaning: '来週', accept: ['らいしゅう'], category: '時間', level: 2, example: { korean: '[[다음 주]]에 만나요.', japanese: '[[来週]]会いましょう。', accept: ['らいしゅう'] } },

  // 天気
  { id: 139, korean: '날씨', reading: 'ナルッシ', meaning: '天気', accept: ['てんき'], category: '天気', level: 1, example: { korean: '오늘 [[날씨]]가 좋아요.', japanese: '今日は[[天気]]がいいです。', accept: ['てんき'] } },
  { id: 140, korean: '비', reading: 'ピ', meaning: '雨', accept: ['あめ'], category: '天気', level: 1, example: { korean: '[[비]]가 와요.', japanese: '[[雨]]が降っています。', accept: ['あめ'] } },
  { id: 141, korean: '눈', reading: 'ヌン', meaning: '雪', accept: ['ゆき'], category: '天気', level: 1, example: { korean: '겨울에 [[눈]]이 많이 와요.', japanese: '冬に[[雪]]がたくさん降ります。', accept: ['ゆき'] } },
  { id: 142, korean: '바람', reading: 'パラム', meaning: '風', accept: ['かぜ'], category: '天気', level: 1, example: { korean: '[[바람]]이 세게 불어요.', japanese: '[[風]]が強く吹きます。', accept: ['かぜ'] } },
  { id: 143, korean: '구름', reading: 'クルム', meaning: '雲', accept: ['くも'], category: '天気', level: 2, example: { korean: '하늘에 [[구름]]이 많아요.', japanese: '空に[[雲]]が多いです。', accept: ['くも'] } },
  { id: 144, korean: '맑다', reading: 'マクタ', meaning: '晴れている', accept: ['はれている', 'はれ', '晴れ'], category: '天気', level: 2, example: { korean: '오늘은 하늘이 [[맑아요]].', japanese: '今日は空が[[晴れています]]。', accept: ['はれています', 'はれ', '晴れ'] } },

  // 交通
  { id: 145, korean: '지하철', reading: 'チハチョル', meaning: '地下鉄', accept: ['ちかてつ'], category: '交通', level: 1, example: { korean: '[[지하철]]로 회사에 가요.', japanese: '[[地下鉄]]で会社に行きます。', accept: ['ちかてつ'] } },
  { id: 146, korean: '버스', reading: 'ポス', meaning: 'バス', category: '交通', level: 1, example: { korean: '[[버스]]를 타고 왔어요.', japanese: '[[バス]]に乗って来ました。' } },
  { id: 147, korean: '택시', reading: 'テクシ', meaning: 'タクシー', category: '交通', level: 1, example: { korean: '[[택시]]를 불렀어요.', japanese: '[[タクシー]]を呼びました。' } },
  { id: 148, korean: '기차', reading: 'キチャ', meaning: '列車', accept: ['れっしゃ', 'きしゃ'], category: '交通', level: 2, example: { korean: '[[기차]]로 부산에 가요.', japanese: '[[列車]]で釜山に行きます。', accept: ['れっしゃ', 'きしゃ'] } },
  { id: 149, korean: '자전거', reading: 'チャジョンゴ', meaning: '自転車', accept: ['じてんしゃ'], category: '交通', level: 1, example: { korean: '[[자전거]]를 타요.', japanese: '[[自転車]]に乗ります。', accept: ['じてんしゃ'] } },
  { id: 150, korean: '비행기', reading: 'ピヘンギ', meaning: '飛行機', accept: ['ひこうき'], category: '交通', level: 1, example: { korean: '[[비행기]]가 곧 출발해요.', japanese: '[[飛行機]]がもうすぐ出発します。', accept: ['ひこうき'] } },

  // 身体
  { id: 151, korean: '머리', reading: 'モリ', meaning: '頭', accept: ['あたま'], category: '身体', level: 1, example: { korean: '[[머리]]가 아파요.', japanese: '[[頭]]が痛いです。', accept: ['あたま'] } },
  { id: 152, korean: '얼굴', reading: 'オルグル', meaning: '顔', accept: ['かお'], category: '身体', level: 1, example: { korean: '[[얼굴]]이 빨개졌어요.', japanese: '[[顔]]が赤くなりました。', accept: ['かお'] } },
  { id: 153, korean: '손', reading: 'ソン', meaning: '手', accept: ['て'], category: '身体', level: 1, example: { korean: '[[손]]을 씻으세요.', japanese: '[[手]]を洗ってください。', accept: ['て'] } },
  { id: 154, korean: '발', reading: 'パル', meaning: '足', accept: ['あし'], category: '身体', level: 1, example: { korean: '[[발]]이 아파요.', japanese: '[[足]]が痛いです。', accept: ['あし'] } },
  { id: 155, korean: '입', reading: 'イプ', meaning: '口', accept: ['くち'], category: '身体', level: 1, example: { korean: '[[입]]을 크게 벌리세요.', japanese: '[[口]]を大きく開けてください。', accept: ['くち'] } },
  { id: 156, korean: '배', reading: 'ペ', meaning: 'お腹', accept: ['おなか', 'はら'], category: '身体', level: 1, example: { korean: '[[배]]가 고파요.', japanese: '[[お腹]]が空きました。', accept: ['おなか', 'はら'] } },

  // 動物
  { id: 157, korean: '개', reading: 'ケ', meaning: '犬', accept: ['いぬ'], category: '動物', level: 1, example: { korean: '[[개]]를 키워요.', japanese: '[[犬]]を飼っています。', accept: ['いぬ'] } },
  { id: 158, korean: '고양이', reading: 'コヤンイ', meaning: '猫', accept: ['ねこ'], category: '動物', level: 1, example: { korean: '[[고양이]]가 자고 있어요.', japanese: '[[猫]]が寝ています。', accept: ['ねこ'] } },
  { id: 159, korean: '새', reading: 'セ', meaning: '鳥', accept: ['とり'], category: '動物', level: 1, example: { korean: '[[새]]가 노래해요.', japanese: '[[鳥]]が歌います。', accept: ['とり'] } },
  { id: 160, korean: '말', reading: 'マル', meaning: '馬', accept: ['うま'], category: '動物', level: 2, example: { korean: '[[말]]이 빨리 달려요.', japanese: '[[馬]]が速く走ります。', accept: ['うま'] } },
  { id: 161, korean: '소', reading: 'ソ', meaning: '牛', accept: ['うし'], category: '動物', level: 2, example: { korean: '[[소]]가 풀을 먹어요.', japanese: '[[牛]]が草を食べます。', accept: ['うし'] } },
  { id: 162, korean: '돼지', reading: 'テジ', meaning: '豚', accept: ['ぶた'], category: '動物', level: 2, example: { korean: '[[돼지]]는 똑똑해요.', japanese: '[[豚]]は賢いです。', accept: ['ぶた'] } },

  // 職業
  { id: 163, korean: '학생', reading: 'ハクセン', meaning: '学生', accept: ['がくせい'], category: '職業', level: 1, example: { korean: '저는 [[학생]]이에요.', japanese: '私は[[学生]]です。', accept: ['がくせい'] } },
  { id: 164, korean: '선생님', reading: 'ソンセンニム', meaning: '先生', accept: ['せんせい'], category: '職業', level: 1, example: { korean: '[[선생님]]께 질문했어요.', japanese: '[[先生]]に質問しました。', accept: ['せんせい'] } },
  { id: 165, korean: '의사', reading: 'ウィサ', meaning: '医者', accept: ['いしゃ'], category: '職業', level: 1, example: { korean: '그는 [[의사]]예요.', japanese: '彼は[[医者]]です。', accept: ['いしゃ'] } },
  { id: 166, korean: '회사원', reading: 'フェサウォン', meaning: '会社員', accept: ['かいしゃいん'], category: '職業', level: 1, example: { korean: '아버지는 [[회사원]]이에요.', japanese: '父は[[会社員]]です。', accept: ['かいしゃいん'] } },
  { id: 167, korean: '요리사', reading: 'ヨリサ', meaning: '料理人', accept: ['りょうりにん', 'コック', 'シェフ'], category: '職業', level: 2, example: { korean: '누나는 [[요리사]]예요.', japanese: '姉は[[料理人]]です。', accept: ['りょうりにん', 'コック', 'シェフ'] } },

  // 疑問詞
  { id: 168, korean: '뭐', reading: 'ムォ', meaning: '何', accept: ['なに', 'なん'], category: '疑問詞', level: 1, example: { korean: '이게 [[뭐]]예요?', japanese: 'これは[[何]]ですか？', accept: ['なに', 'なん'] } },
  { id: 169, korean: '누구', reading: 'ヌグ', meaning: '誰', accept: ['だれ'], category: '疑問詞', level: 1, example: { korean: '저 사람은 [[누구]]예요?', japanese: 'あの人は[[誰]]ですか？', accept: ['だれ'] } },
  { id: 170, korean: '언제', reading: 'オンジェ', meaning: 'いつ', category: '疑問詞', level: 1, example: { korean: '[[언제]] 만날까요?', japanese: '[[いつ]]会いましょうか？' } },
  { id: 171, korean: '어디', reading: 'オディ', meaning: 'どこ', category: '疑問詞', level: 1, example: { korean: '[[어디]]에 가요?', japanese: '[[どこ]]に行きますか？' } },
  { id: 172, korean: '왜', reading: 'ウェ', meaning: 'なぜ', accept: ['どうして'], category: '疑問詞', level: 1, example: { korean: '[[왜]] 늦었어요?', japanese: '[[なぜ]]遅れたのですか？', accept: ['どうして'] } },
  { id: 173, korean: '어떻게', reading: 'オットケ', meaning: 'どうやって', accept: ['どのように'], category: '疑問詞', level: 2, example: { korean: '[[어떻게]] 가요?', japanese: '[[どうやって]]行きますか？', accept: ['どのように'] } },
];

export const categories: Category[] = [
  'あいさつ', '数字', '食べ物', '色', '家族', '日常会話', '動詞', '形容詞', '場所', '時間',
  '天気', '交通', '身体', '動物', '職業', '疑問詞'
];
