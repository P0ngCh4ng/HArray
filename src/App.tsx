import { useState } from 'react';
import { vocabulary, categories, Category } from './data/vocabulary';
import { CategoryCard } from './components/CategoryCard';
import { TypingQuiz } from './components/TypingQuiz';
import { WordList } from './components/WordList';
import { useProgress } from './hooks/useProgress';

type Screen =
  | { type: 'home' }
  | { type: 'category'; category: Category }
  | { type: 'quiz'; category: Category | 'all' }
  | { type: 'list'; category: Category | 'all' };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ type: 'home' });
  const { totalStudied, accuracy, resetProgress } = useProgress();

  const wordsFor = (cat: Category | 'all') =>
    cat === 'all' ? vocabulary : vocabulary.filter(w => w.category === cat);

  if (screen.type === 'quiz') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b px-4 py-3 flex items-center gap-3">
          <button
            onClick={() =>
              setScreen(screen.category === 'all' ? { type: 'home' } : { type: 'category', category: screen.category as Category })
            }
            className="text-gray-500 hover:text-gray-700"
          >
            ←
          </button>
          <h1 className="font-bold text-gray-800">
            {screen.category === 'all' ? '全単語' : screen.category} クイズ
          </h1>
        </header>
        <TypingQuiz
          words={wordsFor(screen.category)}
          onBack={() =>
            setScreen(screen.category === 'all' ? { type: 'home' } : { type: 'category', category: screen.category as Category })
          }
        />
      </div>
    );
  }

  if (screen.type === 'list') {
    const words = wordsFor(screen.category);
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b px-4 py-3 flex items-center gap-3">
          <button
            onClick={() =>
              setScreen(screen.category === 'all' ? { type: 'home' } : { type: 'category', category: screen.category as Category })
            }
            className="text-gray-500 hover:text-gray-700"
          >
            ←
          </button>
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

  if (screen.type === 'category') {
    const { category } = screen;
    const words = wordsFor(category);
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b px-4 py-3 flex items-center gap-3">
          <button onClick={() => setScreen({ type: 'home' })} className="text-gray-500 hover:text-gray-700">
            ←
          </button>
          <h1 className="font-bold text-gray-800">{category}</h1>
        </header>
        <div className="px-4 py-6 max-w-lg mx-auto space-y-4">
          <p className="text-gray-500 text-center">{words.length}単語</p>
          <button
            onClick={() => setScreen({ type: 'quiz', category })}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            ✏️ タイピングクイズ
          </button>
          <button
            onClick={() => setScreen({ type: 'list', category })}
            className="w-full py-4 bg-white text-gray-700 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-colors shadow-sm border border-gray-200"
          >
            📖 単語一覧
          </button>
        </div>
      </div>
    );
  }

  // Home screen
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-4 py-4">
        <h1 className="text-2xl font-bold text-indigo-600">한국어 단어장</h1>
        <p className="text-sm text-gray-400">韓国語単語帳</p>
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
        <div className="flex gap-3">
          <button
            onClick={() => setScreen({ type: 'quiz', category: 'all' })}
            className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-base hover:bg-indigo-700 transition-colors shadow-sm"
          >
            ✏️ 全単語クイズ
          </button>
          <button
            onClick={() => setScreen({ type: 'list', category: 'all' })}
            className="flex-1 py-4 bg-white text-gray-700 rounded-2xl font-semibold text-base hover:bg-gray-50 transition-colors shadow-sm border border-gray-200"
          >
            📖 全単語一覧
          </button>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-bold text-gray-700 mb-3">カテゴリ</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map(cat => (
              <CategoryCard key={cat} category={cat} onSelect={c => setScreen({ type: 'category', category: c })} />
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
