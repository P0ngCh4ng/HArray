import { useMemo } from 'react';
import { vocabulary, categories, Category } from '../data/vocabulary';
import { useProgressCtx, getMasteryLevel } from '../context/ProgressContext';
import { useStreak } from '../hooks/useStreak';

interface Props {
  onBack: () => void;
}

const CATEGORY_EMOJI: Record<Category, string> = {
  'あいさつ': '👋', '数字': '🔢', '食べ物': '🍜', '色': '🎨',
  '家族': '👨‍👩‍👧', '日常会話': '💬', '動詞': '🏃', '形容詞': '✨',
  '場所': '📍', '時間': '⏰',
};

const LEVEL_META = [
  { label: '未学習', color: 'bg-gray-200' },
  { label: '学習中', color: 'bg-indigo-200' },
  { label: '理解中', color: 'bg-indigo-400' },
  { label: '習得',   color: 'bg-indigo-600' },
];

function activityColor(count: number): string {
  if (count === 0) return 'bg-gray-100';
  if (count < 5)  return 'bg-indigo-200';
  if (count < 15) return 'bg-indigo-400';
  return 'bg-indigo-600';
}

export function StatsPage({ onBack }: Props) {
  const { progress, activity } = useProgressCtx();
  const { streak } = useStreak();

  const levelCounts = useMemo(() => {
    const counts = [0, 0, 0, 0];
    vocabulary.forEach(w => {
      const p = progress[w.id];
      counts[p ? getMasteryLevel(p) : 0]++;
    });
    return counts;
  }, [progress]);

  const catStats = useMemo(() =>
    categories.map(cat => {
      const words = vocabulary.filter(w => w.category === cat);
      const mastered = words.filter(w => {
        const p = progress[w.id];
        return p && getMasteryLevel(p) === 3;
      }).length;
      const studied = words.filter(w => progress[w.id]).length;
      return { cat, total: words.length, mastered, studied };
    }), [progress]);

  // Build 12-week calendar grid (84 days, Monday-aligned)
  const { weeks, dayLabels } = useMemo(() => {
    const days = Array.from({ length: 84 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (83 - i));
      const date = d.toISOString().slice(0, 10);
      return { date, count: activity[date] ?? 0 };
    });
    // Monday-first offset
    const firstDow = new Date(days[0].date).getDay();
    const offset = (firstDow + 6) % 7;
    const padded: (typeof days[0] | null)[] = [...Array(offset).fill(null), ...days];
    while (padded.length % 7 !== 0) padded.push(null);
    const wks: (typeof days[0] | null)[][] = [];
    for (let i = 0; i < padded.length; i += 7) wks.push(padded.slice(i, i + 7));
    return { weeks: wks, dayLabels: ['月', '火', '水', '木', '金', '土', '日'] };
  }, [activity]);

  const totalAnswers = Object.values(progress).reduce((s, p) => s + p.correct + p.incorrect, 0);
  const activeDays = Object.keys(activity).length;
  const mastered = levelCounts[3];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700">←</button>
        <h1 className="font-bold text-gray-800">積み上げ</h1>
      </header>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-6">

        {/* Hero stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-3xl">🔥</p>
            <p className="text-2xl font-bold text-orange-500 mt-1">{streak}日</p>
            <p className="text-xs text-gray-400 mt-0.5">連続</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-3xl">⭐</p>
            <p className="text-2xl font-bold text-indigo-600 mt-1">{mastered}語</p>
            <p className="text-xs text-gray-400 mt-0.5">習得済み</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-3xl">📝</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{totalAnswers}</p>
            <p className="text-xs text-gray-400 mt-0.5">総回答数</p>
          </div>
        </div>

        {/* Activity calendar */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-gray-700">学習カレンダー</p>
            <p className="text-xs text-gray-400">{activeDays}日学習</p>
          </div>
          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col gap-1 mr-1">
              {dayLabels.map(d => (
                <span key={d} className="text-[10px] text-gray-300 h-3 leading-3 w-3 text-center">{d}</span>
              ))}
            </div>
            {/* Week columns */}
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((day, di) =>
                  day ? (
                    <div
                      key={di}
                      className={`w-3 h-3 rounded-sm ${activityColor(day.count)}`}
                      title={`${day.date}: ${day.count}問`}
                    />
                  ) : (
                    <div key={di} className="w-3 h-3" />
                  )
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 mt-2 justify-end">
            <span className="text-[10px] text-gray-300">少</span>
            {['bg-gray-100', 'bg-indigo-200', 'bg-indigo-400', 'bg-indigo-600'].map(c => (
              <div key={c} className={`w-3 h-3 rounded-sm ${c}`} />
            ))}
            <span className="text-[10px] text-gray-300">多</span>
          </div>
        </div>

        {/* Mastery breakdown */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <p className="text-sm font-bold text-gray-700 mb-3">習得レベル分布</p>
          <div className="space-y-2.5">
            {LEVEL_META.map(({ label, color }, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-10 shrink-0">{label}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-500 ${color}`}
                    style={{ width: `${(levelCounts[i] / vocabulary.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-600 w-8 text-right">{levelCounts[i]}語</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category progress */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <p className="text-sm font-bold text-gray-700 mb-3">カテゴリ別進捗</p>
          <div className="space-y-3">
            {catStats.map(({ cat, total, mastered, studied }) => {
              const pct = Math.round((mastered / total) * 100);
              const studiedPct = Math.round((studied / total) * 100);
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">{CATEGORY_EMOJI[cat]} {cat}</span>
                    <span className="text-xs text-gray-400">{mastered}/{total}語習得</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 relative">
                    <div
                      className="h-2 rounded-full bg-indigo-200 absolute transition-all duration-500"
                      style={{ width: `${studiedPct}%` }}
                    />
                    <div
                      className="h-2 rounded-full bg-indigo-600 absolute transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-2 rounded-full bg-indigo-200" />
              <span className="text-xs text-gray-400">学習中</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-2 rounded-full bg-indigo-600" />
              <span className="text-xs text-gray-400">習得済み</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
