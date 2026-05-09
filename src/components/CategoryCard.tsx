import { Category, vocabulary } from '../data/vocabulary';
import { useProgress } from '../hooks/useProgress';

const CATEGORY_EMOJI: Record<Category, string> = {
  'あいさつ': '👋',
  '数字': '🔢',
  '食べ物': '🍜',
  '色': '🎨',
  '家族': '👨‍👩‍👧',
  '日常会話': '💬',
  '動詞': '🏃',
  '形容詞': '✨',
  '場所': '📍',
  '時間': '⏰',
};

interface Props {
  category: Category;
  onSelect: (category: Category) => void;
}

export function CategoryCard({ category, onSelect }: Props) {
  const { progress } = useProgress();
  const words = vocabulary.filter(w => w.category === category);
  const studied = words.filter(w => progress[w.id]).length;
  const pct = Math.round((studied / words.length) * 100);

  return (
    <button
      onClick={() => onSelect(category)}
      className="bg-white rounded-2xl shadow-sm p-5 text-left hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
    >
      <div className="text-3xl mb-2">{CATEGORY_EMOJI[category]}</div>
      <h3 className="font-bold text-gray-800 text-lg">{category}</h3>
      <p className="text-sm text-gray-400 mb-3">{words.length}単語</p>
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div
          className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-1">{studied}/{words.length} 学習済み</p>
    </button>
  );
}
