import { useState } from 'react';
import { Word } from '../data/vocabulary';

interface Props {
  words: Word[];
  onComplete: () => void;
  onBack: () => void;
}

export function IntroCards({ words, onComplete, onBack }: Props) {
  const [index, setIndex] = useState(0);
  const word = words[index];
  const isLast = index === words.length - 1;

  const next = () => {
    if (isLast) onComplete();
    else setIndex(i => i + 1);
  };

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-6 max-w-lg mx-auto">
      {/* Progress dots */}
      <div className="flex gap-1.5">
        {words.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i < index ? 'w-4 bg-indigo-400'
              : i === index ? 'w-6 bg-indigo-600'
              : 'w-4 bg-gray-200'
            }`}
          />
        ))}
      </div>

      <p className="text-sm text-gray-400">新しい単語を覚えよう {index + 1}/{words.length}</p>

      {/* Word card — all info visible */}
      <div
        className="w-full bg-white rounded-3xl shadow-md p-8 text-center space-y-4 cursor-pointer active:scale-98 transition-transform"
        onClick={next}
      >
        <span className="inline-block text-xs font-medium text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">
          {word.category}
        </span>

        <p className="text-6xl font-bold text-gray-900 font-korean leading-tight">{word.korean}</p>

        <div className="border-t border-gray-100 pt-4 space-y-1">
          <p className="text-lg text-gray-400">{word.reading}</p>
          <p className="text-2xl font-bold text-indigo-700">{word.meaning}</p>
        </div>
      </div>

      <button
        onClick={next}
        className={`w-full py-4 rounded-2xl font-bold text-lg transition-colors ${
          isLast
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300'
        }`}
      >
        {isLast ? '📝 クイズ開始！' : '次へ →'}
      </button>

      <button onClick={onBack} className="text-sm text-gray-400 hover:text-gray-600">
        ← 戻る
      </button>
    </div>
  );
}
