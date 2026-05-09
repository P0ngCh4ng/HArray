import { useState } from 'react';
import { vocabulary, categories, Category } from './data/vocabulary';
import { CategoryCard } from './components/CategoryCard';
import { TypingQuiz } from './components/TypingQuiz';
import { FlashCard } from './components/FlashCard';
import { MultipleChoice } from './components/MultipleChoice';
import { WordList } from './components/WordList';
import { useProgress } from './hooks/useProgress';
import { useStreak } from './hooks/useStreak';

type Mode = 'flashcard' | 'choice' | 'typing';

type Screen =
  | { type: 'home' }
  | { type: 'category'; category: Category | 'all' }
  | { type: 'study'; category: Category | 'all'; mode: Mode }
  | { type: 'list'; category: Category | 'all' };

const MODE_LABELS: Record<Mode, { icon: string; label: string; desc: string }> = {
  flashcard: { icon: '🃏', label: 'フラッシュカード', desc: 'カードをめくって確認' },
  choice:    { icon: '🔤', label: '4択クイズ',        desc: '4つから正解を選ぶ' },
  typing:    { icon: '✏️', label: 'タイピング',        desc: '意味を入力して回答' },
};

export default function App() {
  const [screen, setScreen] = useState<Screen>({ type: 'home' });
  const { totalStudied, accuracy, resetProgress } = useProgress();
  const { streak, checkIn } = useStreak();

  const wordsFor = (cat: Category | 'all') =>
    cat === 'all' ? vocabulary : vocabulary.filter(w => w.category === cat);

  const goBack = (cat: Category | 'all') =>
    setScreen(cat === 'all' ? { type: 'home' } : { type: 'category', category: cat });

  // Study screens
  if (screen.type === 'study') {
    const words = wordsFor(screen.category);
    const onComplete = () => checkIn();
    const onBack = () => goBack(screen.category);
    const header = (
      <header className="bg-white border-b px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700">←</button>
        <h1 className="font-bold text-gray-800">
          {screen.category === 'all' ? '全単語' : screen.category} — {MODE_LABELS[screen.mode].label}
        </h1>
      </header>
    );

    return (
      <div className="min-h-screen bg-gray-50">
        {header}
        {screen.mode === 'flashcard' && (
          <FlashCard words={words} onBack={onBack} onComplete={onComplete} />
        )}
        {screen.mode === 'choice' && (
          <MultipleChoice words={words} onBack={onBack} onComplete={onComplete} />
        )}
        {screen.mode === 'typing' && (
          <TypingQuiz words={words} onBack={onBack} onComplete={onComplete} />
        )}
      </div>
    );
  }

  // Word list
  if (screen.type === 'list') {
    const words = wordsFor(screen.category);
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b px-4 py-3 flex items-center gap-3">
          <button onClick={() => goBack(screen.category)} className="text-gray-500 hover:text-gray-700">←</button>
          <h1 className="font-bold text-gray-800">
            {screen.category === 'all' ? '全単語' : screen.category} 一覧 ({words.length}語)
          </h1>
        </header>
        <div className="py-4">
          <WordList words={words} />
        </div>
      </div>
    );
  }

  // Category screen
  if (screen.type === 'category') {
    const { category } = screen;
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b px-4 py-3 flex items-center gap-3">
          <button onClick={() => setScreen({ type: 'home' })} className="text-gray-500 hover:text-gray-700">←</button>
          <h1 className="font-bold text-gray-800">
            {category === 'all' ? '全単語' : category}
          </h1>
        </header>
        <div className="px-4 py-6 max-w-lg mx-auto space-y-3">
          <p className="text-gray-400 text-center text-sm mb-4">{wordsFor(category).length}単語 — 学習モードを選択</p>

          {(Object.entries(MODE_LABELS) as [Mode, typeof MODE_LABELS[Mode]][]).map(([mode, info]) => (
            <button
              key={mode}
              onClick={() => setScreen({ type: 'study', category, mode })}
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

        {/* Quick start */}
        <button
          onClick={() => setScreen({ type: 'category', category: 'all' })}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          📚 全単語で学習する
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

        {/* Reset */}
        <div className="text-center pb-8">
          <button
            onClick={() => {
              if (confirm('学習データをリセットしますか？')) resetProgress();
            }}
            className="text-sm text-gray-400 hover:text-red-400 transition-colors"
          >
            学習データをリセット
          </button>
        </div>
      </div>
    </div>
  );
}
