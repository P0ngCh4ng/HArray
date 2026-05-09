import { Word } from '../data/vocabulary';
import { useProgress } from '../hooks/useProgress';

interface Props {
  words: Word[];
}

export function WordList({ words }: Props) {
  const { getWordProgress } = useProgress();

  return (
    <div className="space-y-2 px-4">
      {words.map(word => {
        const p = getWordProgress(word.id);
        const attempts = p.correct + p.incorrect;
        const accuracy = attempts > 0 ? Math.round((p.correct / attempts) * 100) : null;

        return (
          <div
            key={word.id}
            className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-2xl font-bold text-gray-900 font-korean">{word.korean}</span>
                <span className="text-sm text-gray-400">{word.reading}</span>
              </div>
              <p className="text-gray-600 mt-0.5">{word.meaning}</p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="text-xs text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">
                {word.category}
              </span>
              {accuracy !== null && (
                <span className={`text-xs font-medium ${accuracy >= 70 ? 'text-green-600' : accuracy >= 40 ? 'text-yellow-600' : 'text-red-500'}`}>
                  正解率 {accuracy}%
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
