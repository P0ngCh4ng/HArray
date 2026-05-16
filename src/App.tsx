import { useState } from 'react';
import { vocabulary, Word } from './data/vocabulary';
import { IntroCards } from './components/IntroCards';
import { TypingQuiz } from './components/TypingQuiz';
import { FlashCard } from './components/FlashCard';
import { SentenceQuiz } from './components/SentenceQuiz';
import { WordList } from './components/WordList';
import { StatsPage } from './components/StatsPage';
import { useProgress, getMasteryLevel } from './hooks/useProgress';
import { useStreak } from './hooks/useStreak';
import { Progress } from './context/ProgressContext';

type Mode = 'flashcard' | 'typing-kr' | 'typing-jp' | 'typing-both' | 'sentence';

type Screen =
  | { type: 'home' }
  | { type: 'stats' }
  | { type: 'intro'; words: Word[]; mode: Mode }
  | { type: 'study'; words: Word[]; mode: Mode }
  | { type: 'list' };

const MODE_LABELS: Record<Mode, { icon: string; label: string; desc: string }> = {
  flashcard:    { icon: '🃏', label: 'フラッシュカード', desc: '見て覚える' },
  'typing-kr':  { icon: '🇰🇷', label: '韓 → 日',        desc: 'ハングルを見て意味を入力' },
  'typing-jp':  { icon: '🇯🇵', label: '日 → 韓',        desc: '意味を見てハングルを入力' },
  'typing-both':{ icon: '✏️',  label: '韓 ↔ 日',        desc: '両方向をランダムで出題' },
  'sentence':   { icon: '📝',  label: '例文で覚える',     desc: '文の中で単語を答える' },
};

const SESSION_SIZES = [5, 10, 20, Infinity] as const;

function selectWords(all: Word[], progress: Progress, count: number): Word[] {
  const unseen = all.filter(w => !progress[w.id]).sort(() => Math.random() - 0.5);
  const seen = all
    .filter(w => progress[w.id])
    .sort((a, b) => getMasteryLevel(progress[a.id]) - getMasteryLevel(progress[b.id]));
  const ordered = [...unseen, ...seen];
  return count === Infinity ? ordered : ordered.slice(0, count);
}

export default function App() {
  const [screen, setScreen] = useState<Screen>({ type: 'home' });
  const [sessionSize, setSessionSize] = useState<number>(10);
  const { totalStudied, accuracy, resetProgress, progress } = useProgress();
  const { streak, checkIn } = useStreak();

  const startSession = (mode: Mode, size: number) => {
    const words = selectWords(vocabulary, progress, size);
    const hasNew = words.some(w => !progress[w.id]);
    if (hasNew) {
      setScreen({ type: 'intro', words, mode });
    } else {
      setScreen({ type: 'study', words, mode });
    }
  };

  if (screen.type === 'stats') {
    return <StatsPage onBack={() => setScreen({ type: 'home' })} />;
  }

  if (screen.type === 'intro') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b px-4 py-3 flex items-center gap-3">
          <button onClick={() => setScreen({ type: 'home' })} className="text-gray-500 hover:text-gray-700">←</button>
          <h1 className="font-bold text-gray-800">単語を覚えよう</h1>
        </header>
        <IntroCards
          words={screen.words}
          onComplete={() => setScreen({ type: 'study', words: screen.words, mode: screen.mode })}
          onBack={() => setScreen({ type: 'home' })}
        />
      </div>
    );
  }

  if (screen.type === 'study') {
    const { words, mode } = screen;
    const onComplete = () => { checkIn(); setScreen({ type: 'home' }); };
    const onBack = () => setScreen({ type: 'home' });
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700">←</button>
          <h1 className="font-bold text-gray-800">{MODE_LABELS[mode].label}</h1>
          <span className="text-sm text-gray-400 ml-auto">{words.length}語</span>
        </header>
        {mode === 'flashcard'   && <FlashCard words={words} onBack={onBack} onComplete={onComplete} />}
        {mode === 'typing-kr'   && <TypingQuiz words={words} direction="kr-jp" onBack={onBack} onComplete={onComplete} />}
        {mode === 'typing-jp'   && <TypingQuiz words={words} direction="jp-kr" onBack={onBack} onComplete={onComplete} />}
        {mode === 'typing-both' && <TypingQuiz words={words} direction="both"  onBack={onBack} onComplete={onComplete} />}
        {mode === 'sentence'    && <SentenceQuiz words={words} onBack={onBack} onComplete={onComplete} />}
      </div>
    );
  }

  if (screen.type === 'list') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b px-4 py-3 flex items-center gap-3">
          <button onClick={() => setScreen({ type: 'home' })} className="text-gray-500 hover:text-gray-700">←</button>
          <h1 className="font-bold text-gray-800">全単語 ({vocabulary.length}語)</h1>
        </header>
        <div className="py-4"><WordList words={vocabulary} /></div>
      </div>
    );
  }

  // Home screen
  const todayWords = selectWords(vocabulary, progress, 10);
  const todayHasNew = todayWords.some(w => !progress[w.id]);
  const unseenCount = vocabulary.filter(w => !progress[w.id]).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-indigo-600">한국어 단어장</h1>
          <p className="text-sm text-gray-400">韓国語単語帳</p>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-full">
            <span className="text-lg">🔥</span>
            <span className="font-bold text-orange-600">{streak}日</span>
          </div>
        )}
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-3xl font-bold text-indigo-600">{vocabulary.length}</p>
            <p className="text-xs text-gray-400 mt-1">総単語数</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-3xl font-bold text-green-600">{totalStudied}</p>
            <p className="text-xs text-gray-400 mt-1">学習済み</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-3xl font-bold text-yellow-500">{accuracy}%</p>
            <p className="text-xs text-gray-400 mt-1">正解率</p>
          </div>
        </div>

        {/* Today's lesson */}
        <button
          onClick={() => startSession('typing-both', 10)}
          className="w-full bg-indigo-600 text-white rounded-2xl p-5 text-left hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <p className="text-lg font-bold">
            {todayHasNew ? '📚 今日のレッスン' : '🔄 復習する'}
          </p>
          <p className="text-sm text-indigo-200 mt-1">
            {todayHasNew
              ? `新しい単語 ${unseenCount}語を含む10語`
              : '学習済みの単語を復習'}
          </p>
        </button>

        {/* Session size */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">1回のセッション</p>
          <div className="grid grid-cols-4 gap-2">
            {SESSION_SIZES.map(size => {
              const actual = size === Infinity ? vocabulary.length : Number(size);
              return (
                <button
                  key={size}
                  onClick={() => setSessionSize(Number(size))}
                  className={`py-2 rounded-xl text-sm font-semibold transition-all ${
                    sessionSize === Number(size)
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  {size === Infinity ? `全${actual}` : `${actual}語`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mode buttons */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">学習モード</p>
          <div className="space-y-2">
            {(Object.entries(MODE_LABELS) as [Mode, typeof MODE_LABELS[Mode]][]).map(([mode, info]) => (
              <button
                key={mode}
                onClick={() => startSession(mode, sessionSize)}
                className="w-full flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-left active:scale-95"
              >
                <span className="text-3xl">{info.icon}</span>
                <div>
                  <p className="font-bold text-gray-800">{info.label}</p>
                  <p className="text-sm text-gray-400">{info.desc}</p>
                </div>
                <span className="ml-auto text-gray-300">›</span>
              </button>
            ))}
          </div>
        </div>

        {/* Secondary links */}
        <div className="space-y-2">
          <button
            onClick={() => setScreen({ type: 'stats' })}
            className="w-full flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-left active:scale-95"
          >
            <span className="text-3xl">📈</span>
            <div>
              <p className="font-bold text-gray-800">積み上げを見る</p>
              <p className="text-sm text-gray-400">カレンダー・レベル分布</p>
            </div>
            <span className="ml-auto text-gray-300">›</span>
          </button>
          <button
            onClick={() => setScreen({ type: 'list' })}
            className="w-full flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-left active:scale-95"
          >
            <span className="text-3xl">📖</span>
            <div>
              <p className="font-bold text-gray-800">単語一覧</p>
              <p className="text-sm text-gray-400">全{vocabulary.length}語を確認</p>
            </div>
            <span className="ml-auto text-gray-300">›</span>
          </button>
        </div>

        <div className="text-center pb-8">
          <button
            onClick={() => { if (confirm('学習データをリセットしますか？')) resetProgress(); }}
            className="text-sm text-gray-400 hover:text-red-400 transition-colors"
          >
            学習データをリセット
          </button>
        </div>
      </div>
    </div>
  );
}
