import { useState, useEffect, useMemo } from 'react';
import { Word, vocabulary } from '../data/vocabulary';
import { useAdaptiveQueue } from '../hooks/useAdaptiveQueue';
import { SessionComplete } from './SessionComplete';
import { SpeakButton } from './SpeakButton';

interface Props {
  words: Word[];
  onBack: () => void;
  onComplete?: () => void;
}

function buildChoices(correct: Word): string[] {
  const wrongs = vocabulary
    .filter(w => w.id !== correct.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(w => w.meaning);
  return [...wrongs, correct.meaning].sort(() => Math.random() - 0.5);
}

type Phase = 'answering' | 'correct' | 'wrong';

export function MultipleChoice({ words, onBack, onComplete }: Props) {
  const { current, graduated, total, finished, submitAnswer, restart, hardWords, sessionAccuracy } =
    useAdaptiveQueue(words);

  const [phase, setPhase] = useState<Phase>('answering');
  const [selected, setSelected] = useState<string | null>(null);
  const [choices, setChoices] = useState<string[]>([]);

  useEffect(() => {
    if (current) {
      setChoices(buildChoices(current.word));
      setPhase('answering');
      setSelected(null);
    }
  }, [current]);

  useEffect(() => {
    if (finished) onComplete?.();
  }, [finished, onComplete]);

  const choiceStyle = useMemo(
    () => (choice: string): string => {
      if (phase === 'answering') {
        return 'bg-white border-2 border-gray-200 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50 active:scale-95';
      }
      if (!current) return '';
      const isCorrect = choice === current.word.meaning;
      const isSelected = choice === selected;
      if (isCorrect) return 'bg-green-100 border-2 border-green-500 text-green-800';
      if (isSelected && !isCorrect) return 'bg-red-100 border-2 border-red-500 text-red-800';
      return 'bg-white border-2 border-gray-100 text-gray-400';
    },
    [phase, current, selected]
  );

  const pick = (choice: string) => {
    if (phase !== 'answering' || !current) return;
    const correct = choice === current.word.meaning;
    setSelected(choice);
    setPhase(correct ? 'correct' : 'wrong');
  };

  const next = () => {
    if (phase === 'answering') return;
    submitAnswer(phase === 'correct');
  };

  if (finished) {
    return (
      <SessionComplete
        graduated={graduated}
        total={total}
        sessionAccuracy={sessionAccuracy}
        hardWords={hardWords}
        onRestart={restart}
        onBack={onBack}
      />
    );
  }

  if (!current) return null;

  const pct = Math.round((graduated / total) * 100);

  return (
    <div className="flex flex-col items-center gap-5 px-4 py-6 max-w-lg mx-auto">
      {/* Progress */}
      <div className="w-full">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>習得 {graduated}/{total}</span>
          <span>{pct}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className={`w-full rounded-2xl shadow-sm p-8 text-center transition-colors duration-200 ${
        phase === 'correct' ? 'bg-green-50' : phase === 'wrong' ? 'bg-red-50' : 'bg-white'
      }`}>
        <span className="text-xs font-medium text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">
          {current.word.category}
        </span>
        <div className="flex items-center justify-center gap-2 mt-4 mb-2">
          <p className="text-5xl font-bold text-gray-900 font-korean">{current.word.korean}</p>
          <SpeakButton text={current.word.korean} />
        </div>
        <p className="text-gray-400">{current.word.reading}</p>
        {phase !== 'answering' && (
          <p className={`mt-3 font-semibold ${phase === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
            {phase === 'correct' ? '✓ 正解！' : `✗ 正解：${current.word.meaning}`}
          </p>
        )}
      </div>

      {/* Choices */}
      <div className="w-full grid grid-cols-2 gap-3">
        {choices.map(choice => (
          <button
            key={choice}
            onClick={() => pick(choice)}
            className={`py-4 px-3 rounded-xl font-medium text-sm text-left transition-all duration-150 ${choiceStyle(choice)}`}
          >
            {choice}
          </button>
        ))}
      </div>

      {phase !== 'answering' && (
        <button
          onClick={next}
          className={`w-full py-3 rounded-xl font-semibold text-white transition-colors ${
            phase === 'correct' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          次へ →
        </button>
      )}

      <button onClick={onBack} className="text-sm text-gray-400 hover:text-gray-600">
        ← 戻る
      </button>
    </div>
  );
}
