import { useState } from 'react';
import { vocabulary, categories, Category, Word } from './data/vocabulary';
import { CategoryCard } from './components/CategoryCard';
import { IntroCards } from './components/IntroCards';
import { TypingQuiz } from './components/TypingQuiz';
import { FlashCard } from './components/FlashCard';
import { WordList } from './components/WordList';
import { useProgress, getMasteryLevel } from './hooks/useProgress';
import { useStreak } from './hooks/useStreak';
import { Progress } from './context/ProgressContext';

type Mode = 'flashcard' | 'typing';

type Screen =
  | { type: 'home' }
  | { type: 'category'; category: Category | 'all' }
  | { type: 'intro'; words: Word[]; mode: Mode; returnTo: Category | 'all' }
  | { type: 'study'; words: Word[]; mode: Mode; returnTo: Category | 'all' }
  | { type: 'list'; category: Category | 'all' };

const MODE_LABELS: Record<Mode, { icon: string; label: string; desc: string }> = {
  flashcard: { icon: '🃏', label: 'フラッシュカード', desc: '見て覚える' },
  typing:    { icon: '✏️', label: 'タイピング',        desc: '韓↔日 入力で覚える' },
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

  const allWordsFor = (cat: Category | 'all') =>
    cat === 'all' ? vocabulary : vocabulary.filter(w => w.category === cat);

  const startSession = (category: Category | 'all', mode: Mode, size: number) => {
    const words = selectWords(allWordsFor(category), progress, size);
    const hasNew = words.some(w => !progress[w.id]);
    if (hasNew) {
      setScreen({ type: 'intro', words, mode, returnTo: category });
    } else {
      setScreen({ type: 'study', words, mode, returnTo: category });
    }
  };

  const goBack = (to: Category | 'all') =>
    setScreen(to === 'all' ? { type: 'home' } : { type: 'category', category: to });

  // Intro phase
  if (screen.type === 'intro') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b px-4 py-3 flex items-center gap-3">
          <button onClick={() => goBack(screen.returnTo)} className="text-gray-500 hover:text-gray-700">←</button>
          <h1 className="font-bold text-gray-800">単語を覚えよう</h1>
        </header>
        <IntroCards
          words={screen.words}
          onComplete={() =>
            setScreen({ type: 'study', words: screen.words, mode: screen.mode, returnTo: screen.returnTo })
          }
          onBack={() => goBack(screen.returnTo)}
        />
      </div>
    );
  }

  // Study (quiz) phase
  if (screen.type === 'study') {
    const { words, mode, returnTo } = screen;
    const onComplete = () => checkIn();
    const onBack = () => goBack(returnTo);
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700">←</button>
          <h1 className="font-bold text-gray-800">{MODE_LABELS[mode].label}</h1>
          <span className="text-sm text-gray-400 ml-auto">{words.length}語</span>
        </header>
        {mode === 'flashcard' && <FlashCard words={words} onBack={onBack} onComplete={onComplete} />}
        {mode === 'typing'    && <TypingQuiz words={words} onBack={onBack} onComplete={onComplete} />}
      </div>
    );
  }

  // Word list
  if (screen.type === 'list') {
    const words = allWordsFor(screen.category);
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b px-4 py-3 flex items-center gap-3">
          <button onClick={() => goBack(screen.category)} className="text-gray-500 hover:text-gray-700">←</button>
          <h1 className="font-bold text-gray-800">
            {screen.category === 'all' ? '全単語' : screen.category} ({words.length}語)
          </h1>
        </header>
        <div className="py-4"><WordList words={words} /></div>
      </div>
    );
  }

  // Category screen
  if (screen.type === 'category') {
    const { category } = screen;
    const allWords = allWordsFor(category);
    const unseenCount = allWords.filter(w => !progress[w.id]).length;

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b px-4 py-3 flex items-center gap-3">
          <button onClick={() => setScreen({ type: 'home' })} className="text-gray-500 hover:text-gray-700">←</button>
          <div>
            <h1 className="font-bold text-gray-800">{category === 'all' ? '全単語' : category}</h1>
            {unseenCount > 0 && (
              <p className="text-xs text-indigo-500">新しい単語 {unseenCount}語</p>
            )}
          </div>
        </header>

        <div className="px-4 py-5 max-w-lg mx-auto space-y-5">
          {/* Session size */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">1回のセッション</p>
            <div className="grid grid-cols-4 gap-2">
              {SESSION_SIZES.map(size => {
                const actual = size === Infinity ? allWords.length : Math.min(Number(size), allWords.length);
                const disabled = allWords.length < Number(size) && size !== Infinity;
                return (
                  <button
                    key={size}
                    onClick={() => setSessionSize(Number(size))}
                    disabled={disabled}
                    className={`py-2 rounded-xl text-sm font-semibold transition-all ${
                      sessionSize === Number(size)
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'
                    } ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
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
                  onClick={() => startSession(category, mode, sessionSize)}
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

          {/* Word list link */}
          <button
            onClick={() => setScreen({ type: 'list', category })}
            className="w-full flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-left active:scale-95"
          >
            <span className="text-3xl">📖</span>
            <div>
              <p className="font-bold text-gray-800">単語一覧</p>
              <p className="text-sm text-gray-400">全単語を確認する</p>
            </div>
            <span className="ml-auto text-gray-300">›</span>
          </button>
        </div>
      </div>
    );
  }

  // Home screen
  const todayWords = selectWords(vocabulary, progress, 10);
  const todayHasNew = todayWords.some(w => !progress[w.id]);

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

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
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
          onClick={() => {
            setSessionSize(10);
            startSession('all', 'typing', 10);
          }}
          className="w-full bg-indigo-600 text-white rounded-2xl p-5 text-left hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <p className="text-lg font-bold">
            {todayHasNew ? '📚 今日のレッスン' : '🔄 復習する'}
          </p>
          <p className="text-sm text-indigo-200 mt-1">
            {todayHasNew
              ? `新しい単語 ${todayWords.filter(w => !progress[w.id]).length}語を含む10語`
              : '学習済みの単語を復習'}
          </p>
        </button>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-bold text-gray-700 mb-3">カテゴリ別</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map(cat => (
              <CategoryCard
                key={cat}
                category={cat}
                onSelect={c => setScreen({ type: 'category', category: c })}
              />
            ))}
          </div>
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
