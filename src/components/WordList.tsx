import { Word } from '../data/vocabulary';
import { useProgress, getMasteryLevel } from '../hooks/useProgress';

interface Props {
  words: Word[];
}

const STARS = ['☆☆☆', '★☆☆', '★★☆', '★★★'];
const STAR_COLORS = ['text-gray-300', 'text-yellow-400', 'text-yellow-400', 'text-yellow-500'];

export function WordList({ words }: Props) {
  const { getWordProgress } = useProgress();

  return (
    <div className="space-y-2 px-4">
      {words.map(word => {
        const p = getWordProgress(word.id);
        const mastery = getMasteryLevel(p);

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
              <span className={`text-sm font-medium ${STAR_COLORS[mastery]}`}>
                {STARS[mastery]}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
