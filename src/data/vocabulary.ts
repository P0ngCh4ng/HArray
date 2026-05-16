export type Category = 'あいさつ' | '数字' | '食べ物' | '色' | '家族' | '日常会話' | '動詞' | '形容詞' | '場所' | '時間';

export interface Example {
  korean: string;
  japanese: string;
}

export interface Word {
  id: number;
  korean: string;
  reading: string;
  meaning: string;
  category: Category;
  level: 1 | 2 | 3;
  example: Example;
}

export const vocabulary: Word[] = [
  // あいさつ
  { id: 1, korean: '안녕하세요', reading: 'アンニョンハセヨ', meaning: 'こんにちは', category: 'あいさつ', level: 1, example: { korean: '[[안녕하세요]], 처음 뵙겠습니다.', japanese: '[[こんにちは]]、はじめまして。' } },
  { id: 2, korean: '감사합니다', reading: 'カムサハムニダ', meaning: 'ありがとうございます', category: 'あいさつ', level: 1, example: { korean: '도와주셔서 [[감사합니다]].', japanese: '助けてくれて[[ありがとうございます]]。' } },
  { id: 3, korean: '죄송합니다', reading: 'チェソンハムニダ', meaning: '申し訳ありません', category: 'あいさつ', level: 1, example: { korean: '늦어서 [[죄송합니다]].', japanese: '遅れて[[申し訳ありません]]。' } },
  { id: 4, korean: '안녕히 가세요', reading: 'アンニョンヒ カセヨ', meaning: 'さようなら（去る人へ）', category: 'あいさつ', level: 1, example: { korean: '그럼, [[안녕히 가세요]].', japanese: 'では、[[さようなら（去る人へ）]]。' } },
  { id: 5, korean: '안녕히 계세요', reading: 'アンニョンヒ ケセヨ', meaning: 'さようなら（残る人へ）', category: 'あいさつ', level: 1, example: { korean: '저는 먼저 갈게요. [[안녕히 계세요]].', japanese: '私はお先に失礼します。[[さようなら（残る人へ）]]。' } },
  { id: 6, korean: '잘 부탁드립니다', reading: 'チャル プタッドゥリムニダ', meaning: 'よろしくお願いします', category: 'あいさつ', level: 1, example: { korean: '앞으로도 [[잘 부탁드립니다]].', japanese: 'これからも[[よろしくお願いします]]。' } },
  { id: 7, korean: '처음 뵙겠습니다', reading: 'チョウム ペッケッスムニダ', meaning: 'はじめまして', category: 'あいさつ', level: 1, example: { korean: '[[처음 뵙겠습니다]]. 박지수입니다.', japanese: '[[はじめまして]]。パク・ジスです。' } },
  { id: 8, korean: '오래간만이에요', reading: 'オレガンマニエヨ', meaning: 'お久しぶりです', category: 'あいさつ', level: 2, example: { korean: '[[오래간만이에요]]! 잘 지냈어요?', japanese: '[[お久しぶりです]]！元気でしたか？' } },

  // 数字
  { id: 9, korean: '일', reading: 'イル', meaning: '一（漢数字）', category: '数字', level: 1, example: { korean: '[[일]]층에 편의점이 있어요.', japanese: '[[一]]階にコンビニがあります。' } },
  { id: 10, korean: '이', reading: 'イ', meaning: '二（漢数字）', category: '数字', level: 1, example: { korean: '자녀가 [[이]]명 있어요.', japanese: '子供が[[二]]人います。' } },
  { id: 11, korean: '삼', reading: 'サム', meaning: '三（漢数字）', category: '数字', level: 1, example: { korean: '[[삼]]일 동안 쉬었어요.', japanese: '[[三]]日間休みました。' } },
  { id: 12, korean: '사', reading: 'サ', meaning: '四（漢数字）', category: '数字', level: 1, example: { korean: '[[사]]월에 벚꽃이 피어요.', japanese: '[[四]]月に桜が咲きます。' } },
  { id: 13, korean: '오', reading: 'オ', meaning: '五（漢数字）', category: '数字', level: 1, example: { korean: '[[오]]분 후에 도착해요.', japanese: '[[五]]分後に到着します。' } },
  { id: 14, korean: '하나', reading: 'ハナ', meaning: '一つ（固有数字）', category: '数字', level: 1, example: { korean: '사과 [[하나]] 주세요.', japanese: 'りんご[[一つ]]ください。' } },
  { id: 15, korean: '둘', reading: 'トゥル', meaning: '二つ（固有数字）', category: '数字', level: 1, example: { korean: '커피 [[둘]] 주세요.', japanese: 'コーヒー[[二つ]]ください。' } },
  { id: 16, korean: '셋', reading: 'セッ', meaning: '三つ（固有数字）', category: '数字', level: 1, example: { korean: '고양이가 [[셋]] 있어요.', japanese: '猫が[[三匹]]います。' } },

  // 食べ物
  { id: 17, korean: '밥', reading: 'パプ', meaning: 'ご飯', category: '食べ物', level: 1, example: { korean: '[[밥]]을 맛있게 먹었어요.', japanese: '[[ご飯]]をおいしく食べました。' } },
  { id: 18, korean: '물', reading: 'ムル', meaning: '水', category: '食べ物', level: 1, example: { korean: '[[물]] 한 잔 주세요.', japanese: '[[水]]を一杯ください。' } },
  { id: 19, korean: '김치', reading: 'キムチ', meaning: 'キムチ', category: '食べ物', level: 1, example: { korean: '한국 사람은 [[김치]]를 매일 먹어요.', japanese: '韓国人は[[キムチ]]を毎日食べます。' } },
  { id: 20, korean: '불고기', reading: 'プルゴギ', meaning: 'プルゴギ（焼き肉）', category: '食べ物', level: 1, example: { korean: '오늘 저녁은 [[불고기]]예요.', japanese: '今夜は[[プルゴギ（焼き肉）]]です。' } },
  { id: 21, korean: '라면', reading: 'ラミョン', meaning: 'ラーメン', category: '食べ物', level: 1, example: { korean: '[[라면]]을 끓여 먹었어요.', japanese: '[[ラーメン]]を作って食べました。' } },
  { id: 22, korean: '떡볶이', reading: 'トッポッキ', meaning: 'トッポッキ', category: '食べ物', level: 1, example: { korean: '[[떡볶이]]가 너무 매워요.', japanese: '[[トッポッキ]]がとても辛いです。' } },
  { id: 23, korean: '삼겹살', reading: 'サムギョプサル', meaning: 'サムギョプサル（豚バラ焼き）', category: '食べ物', level: 1, example: { korean: '주말에 [[삼겹살]]을 먹었어요.', japanese: '週末に[[サムギョプサル（豚バラ焼き）]]を食べました。' } },
  { id: 24, korean: '치킨', reading: 'チキン', meaning: 'フライドチキン', category: '食べ物', level: 1, example: { korean: '오늘 [[치킨]] 시켜 먹을까요?', japanese: '今日[[フライドチキン]]を注文しませんか？' } },
  { id: 25, korean: '맥주', reading: 'メクチュ', meaning: 'ビール', category: '食べ物', level: 1, example: { korean: '[[맥주]] 한 캔 마셔요.', japanese: '[[ビール]]を一缶飲みます。' } },
  { id: 26, korean: '커피', reading: 'コピ', meaning: 'コーヒー', category: '食べ物', level: 1, example: { korean: '아침마다 [[커피]]를 마셔요.', japanese: '毎朝[[コーヒー]]を飲みます。' } },

  // 色
  { id: 27, korean: '빨간색', reading: 'パルガンセク', meaning: '赤色', category: '色', level: 1, example: { korean: '장미는 [[빨간색]]이에요.', japanese: 'バラは[[赤色]]です。' } },
  { id: 28, korean: '파란색', reading: 'パランセク', meaning: '青色', category: '色', level: 1, example: { korean: '하늘이 [[파란색]]이에요.', japanese: '空が[[青色]]です。' } },
  { id: 29, korean: '노란색', reading: 'ノランセク', meaning: '黄色', category: '色', level: 1, example: { korean: '해바라기는 [[노란색]]이에요.', japanese: 'ひまわりは[[黄色]]です。' } },
  { id: 30, korean: '초록색', reading: 'チョロクセク', meaning: '緑色', category: '色', level: 1, example: { korean: '나뭇잎은 [[초록색]]이에요.', japanese: '葉は[[緑色]]です。' } },
  { id: 31, korean: '하얀색', reading: 'ハヤンセク', meaning: '白色', category: '色', level: 1, example: { korean: '눈은 [[하얀색]]이에요.', japanese: '雪は[[白色]]です。' } },
  { id: 32, korean: '검은색', reading: 'コムンセク', meaning: '黒色', category: '色', level: 1, example: { korean: '밤하늘은 [[검은색]]이에요.', japanese: '夜空は[[黒色]]です。' } },

  // 家族
  { id: 33, korean: '아버지', reading: 'アボジ', meaning: '父', category: '家族', level: 1, example: { korean: '[[아버지]]는 요리를 잘해요.', japanese: '[[父]]は料理が上手です。' } },
  { id: 34, korean: '어머니', reading: 'オモニ', meaning: '母', category: '家族', level: 1, example: { korean: '[[어머니]]께 전화했어요.', japanese: '[[母]]に電話しました。' } },
  { id: 35, korean: '형', reading: 'ヒョン', meaning: '兄（男性から）', category: '家族', level: 1, example: { korean: '[[형]]이 저보다 키가 커요.', japanese: '[[兄（男性から）]]が私より背が高いです。' } },
  { id: 36, korean: '언니', reading: 'オンニ', meaning: '姉（女性から）', category: '家族', level: 1, example: { korean: '[[언니]]와 쇼핑했어요.', japanese: '[[姉（女性から）]]と買い物しました。' } },
  { id: 37, korean: '동생', reading: 'トンセン', meaning: '弟・妹', category: '家族', level: 1, example: { korean: '[[동생]]이 학교에 갔어요.', japanese: '[[弟・妹]]が学校に行きました。' } },
  { id: 38, korean: '친구', reading: 'チング', meaning: '友達', category: '家族', level: 1, example: { korean: '[[친구]]와 밥을 먹었어요.', japanese: '[[友達]]とご飯を食べました。' } },

  // 日常会話
  { id: 39, korean: '네', reading: 'ネ', meaning: 'はい', category: '日常会話', level: 1, example: { korean: '[[네]], 알겠어요.', japanese: '[[はい]]、わかりました。' } },
  { id: 40, korean: '아니요', reading: 'アニヨ', meaning: 'いいえ', category: '日常会話', level: 1, example: { korean: '[[아니요]], 괜찮아요.', japanese: '[[いいえ]]、大丈夫です。' } },
  { id: 41, korean: '괜찮아요', reading: 'クェンチャナヨ', meaning: '大丈夫です', category: '日常会話', level: 1, example: { korean: '걱정 마세요. [[괜찮아요]].', japanese: '心配しないでください。[[大丈夫です]]。' } },
  { id: 42, korean: '모르겠어요', reading: 'モルゲッソヨ', meaning: 'わかりません', category: '日常会話', level: 1, example: { korean: '그 단어 뜻을 [[모르겠어요]].', japanese: 'その単語の意味が[[わかりません]]。' } },
  { id: 43, korean: '얼마예요?', reading: 'オルマエヨ', meaning: 'いくらですか？', category: '日常会話', level: 1, example: { korean: '이 가방 [[얼마예요?]]', japanese: 'このバッグ[[いくらですか？]]' } },
  { id: 44, korean: '어디예요?', reading: 'オディエヨ', meaning: 'どこですか？', category: '日常会話', level: 1, example: { korean: '역이 [[어디예요?]]', japanese: '駅は[[どこですか？]]' } },
  { id: 45, korean: '화장실', reading: 'ファジャンシル', meaning: 'トイレ', category: '日常会話', level: 1, example: { korean: '[[화장실]]이 어디에 있어요?', japanese: '[[トイレ]]はどこにありますか？' } },
  { id: 46, korean: '맛있어요', reading: 'マシッソヨ', meaning: '美味しいです', category: '日常会話', level: 1, example: { korean: '이 음식 정말 [[맛있어요]].', japanese: 'この料理は本当に[[美味しいです]]。' } },

  // 動詞
  { id: 47, korean: '가다', reading: 'カダ', meaning: '行く', category: '動詞', level: 1, example: { korean: '내일 서울에 [[가요]].', japanese: '明日ソウルに[[行きます]]。' } },
  { id: 48, korean: '오다', reading: 'オダ', meaning: '来る', category: '動詞', level: 1, example: { korean: '친구가 집에 [[와요]].', japanese: '友達が家に[[来ます]]。' } },
  { id: 49, korean: '먹다', reading: 'モクタ', meaning: '食べる', category: '動詞', level: 1, example: { korean: '저는 김치를 자주 [[먹어요]].', japanese: '私はキムチをよく[[食べます]]。' } },
  { id: 50, korean: '마시다', reading: 'マシダ', meaning: '飲む', category: '動詞', level: 1, example: { korean: '물을 [[마셔요]].', japanese: '水を[[飲みます]]。' } },
  { id: 51, korean: '보다', reading: 'ポダ', meaning: '見る', category: '動詞', level: 1, example: { korean: '영화를 [[봐요]].', japanese: '映画を[[見ます]]。' } },
  { id: 52, korean: '듣다', reading: 'トゥッタ', meaning: '聞く', category: '動詞', level: 1, example: { korean: '음악을 [[들어요]].', japanese: '音楽を[[聞きます]]。' } },
  { id: 53, korean: '말하다', reading: 'マラダ', meaning: '話す', category: '動詞', level: 1, example: { korean: '한국어로 [[말해요]].', japanese: '韓国語で[[話します]]。' } },
  { id: 54, korean: '읽다', reading: 'イッタ', meaning: '読む', category: '動詞', level: 1, example: { korean: '책을 [[읽어요]].', japanese: '本を[[読みます]]。' } },
  { id: 55, korean: '쓰다', reading: 'スダ', meaning: '書く', category: '動詞', level: 2, example: { korean: '편지를 [[써요]].', japanese: '手紙を[[書きます]]。' } },
  { id: 56, korean: '사다', reading: 'サダ', meaning: '買う', category: '動詞', level: 1, example: { korean: '슈퍼에서 과일을 [[사요]].', japanese: 'スーパーで果物を[[買います]]。' } },
  { id: 57, korean: '팔다', reading: 'パルダ', meaning: '売る', category: '動詞', level: 2, example: { korean: '이 가게에서 옷을 [[팔아요]].', japanese: 'このお店で服を[[売ります]]。' } },
  { id: 58, korean: '자다', reading: 'チャダ', meaning: '寝る', category: '動詞', level: 1, example: { korean: '밤에 일찍 [[자요]].', japanese: '夜早く[[寝ます]]。' } },

  // 形容詞
  { id: 59, korean: '크다', reading: 'クダ', meaning: '大きい', category: '形容詞', level: 1, example: { korean: '저 건물이 정말 [[커요]].', japanese: 'あのビルは本当に[[大きいです]]。' } },
  { id: 60, korean: '작다', reading: 'チャクタ', meaning: '小さい', category: '形容詞', level: 1, example: { korean: '이 방이 너무 [[작아요]].', japanese: 'この部屋はとても[[小さいです]]。' } },
  { id: 61, korean: '많다', reading: 'マンタ', meaning: '多い', category: '形容詞', level: 1, example: { korean: '사람이 정말 [[많아요]].', japanese: '人が本当に[[多いです]]。' } },
  { id: 62, korean: '적다', reading: 'チョクタ', meaning: '少ない', category: '形容詞', level: 1, example: { korean: '시간이 [[적어요]].', japanese: '時間が[[少ないです]]。' } },
  { id: 63, korean: '좋다', reading: 'チョッタ', meaning: '良い', category: '形容詞', level: 1, example: { korean: '오늘 날씨가 [[좋아요]].', japanese: '今日の天気が[[良いです]]。' } },
  { id: 64, korean: '나쁘다', reading: 'ナップダ', meaning: '悪い', category: '形容詞', level: 1, example: { korean: '오늘은 기분이 [[나빠요]].', japanese: '今日は気分が[[悪いです]]。' } },
  { id: 65, korean: '예쁘다', reading: 'イェップダ', meaning: '綺麗だ・可愛い', category: '形容詞', level: 1, example: { korean: '꽃이 정말 [[예뻐요]].', japanese: '花が本当に[[綺麗です]]。' } },
  { id: 66, korean: '빠르다', reading: 'パルダ', meaning: '速い', category: '形容詞', level: 2, example: { korean: '이 기차가 정말 [[빨라요]].', japanese: 'この電車は本当に[[速いです]]。' } },
  { id: 67, korean: '느리다', reading: 'ヌリダ', meaning: '遅い', category: '形容詞', level: 2, example: { korean: '거북이는 [[느려요]].', japanese: '亀は[[遅いです]]。' } },
  { id: 68, korean: '바쁘다', reading: 'パップダ', meaning: '忙しい', category: '形容詞', level: 1, example: { korean: '요즘 일이 많아서 [[바빠요]].', japanese: '最近仕事が多くて[[忙しいです]]。' } },

  // 場所
  { id: 69, korean: '학교', reading: 'ハッキョ', meaning: '学校', category: '場所', level: 1, example: { korean: '아이가 [[학교]]에 갔어요.', japanese: '子供が[[学校]]に行きました。' } },
  { id: 70, korean: '병원', reading: 'ピョンウォン', meaning: '病院', category: '場所', level: 1, example: { korean: '아파서 [[병원]]에 갔어요.', japanese: '体調が悪くて[[病院]]に行きました。' } },
  { id: 71, korean: '은행', reading: 'ウネン', meaning: '銀行', category: '場所', level: 1, example: { korean: '[[은행]]에서 돈을 찾았어요.', japanese: '[[銀行]]でお金を引き出しました。' } },
  { id: 72, korean: '편의점', reading: 'ピョニジョム', meaning: 'コンビニ', category: '場所', level: 1, example: { korean: '[[편의점]]에서 음료수를 샀어요.', japanese: '[[コンビニ]]で飲み物を買いました。' } },
  { id: 73, korean: '백화점', reading: 'ペッカジョム', meaning: 'デパート', category: '場所', level: 1, example: { korean: '[[백화점]]에서 옷을 샀어요.', japanese: '[[デパート]]で服を買いました。' } },
  { id: 74, korean: '공항', reading: 'コンハン', meaning: '空港', category: '場所', level: 1, example: { korean: '[[공항]]에서 친구를 기다렸어요.', japanese: '[[空港]]で友達を待ちました。' } },
  { id: 75, korean: '지하철역', reading: 'チハチョルリョク', meaning: '地下鉄駅', category: '場所', level: 1, example: { korean: '[[지하철역]]까지 어떻게 가요?', japanese: '[[地下鉄駅]]まではどう行きますか？' } },

  // 時間
  { id: 76, korean: '오늘', reading: 'オヌル', meaning: '今日', category: '時間', level: 1, example: { korean: '[[오늘]] 날씨가 좋아요.', japanese: '[[今日]]は天気がいいです。' } },
  { id: 77, korean: '내일', reading: 'ネイル', meaning: '明日', category: '時間', level: 1, example: { korean: '[[내일]] 같이 갈까요?', japanese: '[[明日]]一緒に行きましょうか？' } },
  { id: 78, korean: '어제', reading: 'オジェ', meaning: '昨日', category: '時間', level: 1, example: { korean: '[[어제]] 영화를 봤어요.', japanese: '[[昨日]]映画を見ました。' } },
  { id: 79, korean: '지금', reading: 'チグム', meaning: '今', category: '時間', level: 1, example: { korean: '[[지금]] 뭐 해요?', japanese: '[[今]]何していますか？' } },
  { id: 80, korean: '아침', reading: 'アチム', meaning: '朝', category: '時間', level: 1, example: { korean: '[[아침]]에 빵을 먹었어요.', japanese: '[[朝]]パンを食べました。' } },
  { id: 81, korean: '점심', reading: 'チョムシム', meaning: '昼', category: '時間', level: 1, example: { korean: '[[점심]]은 같이 먹어요.', japanese: '[[昼]]ご飯は一緒に食べましょう。' } },
  { id: 82, korean: '저녁', reading: 'チョニョク', meaning: '夕方・夕食', category: '時間', level: 1, example: { korean: '[[저녁]] 먹었어요?', japanese: '[[夕方・夕食]]食べましたか？' } },
  { id: 83, korean: '밤', reading: 'パム', meaning: '夜', category: '時間', level: 1, example: { korean: '[[밤]]에 혼자 공부해요.', japanese: '[[夜]]一人で勉強します。' } },
];

export const categories: Category[] = [
  'あいさつ', '数字', '食べ物', '色', '家族', '日常会話', '動詞', '形容詞', '場所', '時間'
];
