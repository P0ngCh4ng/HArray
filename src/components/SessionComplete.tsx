import { Word } from '../data/vocabulary';

interface Props {
  graduated: number;
  total: number;
  sessionAccuracy: number;
  hardWords: Array<{ word: Word; attempts: number }>;
  onRestart: () => void;
  onBack: () => void;
}

export function SessionComplete({ graduated, total, sessionAccuracy, hardWords, onRestart, onBack }: Props) {
  const emoji = sessionAccuracy >= 80 ? '🎉' : sessionAccuracy >= 50 ? '👍' : '💪';

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8 max-w-sm mx-auto">
      <div className="text-6xl">{emoji}</div>
      <h2 className="text-2xl font-bold text-gray-800">セッション完了！</h2>

      <div className="w-full bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <div className="flex justify-around">
          <div className="text-center">
            <p className="text-4xl font-bold text-indigo-600">{graduated}/{total}</p>
            <p className="text-sm text-gray-400 mt-1">習得</p>
          </div>
          <div className="w-px bg-gray-100" />
          <div className="text-center">
            <p className="text-4xl font-bold text-green-600">{sessionAccuracy}%</p>
            <p className="text-sm text-gray-400 mt-1">正解率</p>
          </div>
        </div>
      </div>

      {hardWords.length > 0 && (
        <div className="w-full bg-amber-50 rounded-2xl p-4 space-y-2">
          <p className="text-sm font-semibold text-amber-700">🔁 もう少し練習が必要な単語</p>
          {hardWords.map(({ word, attempts }) => (
            <div key={word.id} className="flex items-center justify-between">
              <span className="font-bold text-gray-800 font-korean">{word.korean}</span>
              <span className="text-sm text-gray-500">{word.meaning}</span>
              <span className="text-xs text-amber-600 ml-2">×{attempts}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-3 w-full">
        <button
          onClick={onRestart}
          className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
        >
          もう一度
        </button>
        <button
          onClick={onBack}
          className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
        >
          戻る
        </button>
      </div>
    </div>
  );
}
