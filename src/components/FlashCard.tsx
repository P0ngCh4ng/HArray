import { useState, useEffect } from 'react';
import { Word } from '../data/vocabulary';
import { useAdaptiveQueue } from '../hooks/useAdaptiveQueue';
import { SessionComplete } from './SessionComplete';
import { SpeakButton } from './SpeakButton';

interface Props {
  words: Word[];
  onBack: () => void;
  onComplete?: () => void;
}

export function FlashCard({ words, onBack, onComplete }: Props) {
  const { current, graduated, total, finished, submitAnswer, restart, hardWords, sessionAccuracy } =
    useAdaptiveQueue(words);
  const [flipped, setFlipped] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [current]);

  useEffect(() => {
    if (finished) onComplete?.();
  }, [finished, onComplete]);

  const flip = () => {
    if (!flipped && !animating) setFlipped(true);
  };

  const answer = (correct: boolean) => {
    if (!flipped || animating) return;
    setAnimating(true);
    setTimeout(() => {
      submitAnswer(correct);
      setAnimating(false);
    }, 180);
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
    <div className="flex flex-col items-center gap-6 px-4 py-6 max-w-lg mx-auto">
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

      {/* Flip card */}
      <div
        className="w-full h-56 cursor-pointer [perspective:1200px]"
        onClick={flip}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
            flipped ? '[transform:rotateY(180deg)]' : ''
          } ${animating ? 'opacity-60' : ''}`}
        >
          {/* Front */}
          <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 p-6">
            <span className="text-xs font-medium text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">
              {current.word.category}
            </span>
            <p className="text-5xl font-bold text-gray-900 font-korean">{current.word.korean}</p>
            <SpeakButton text={current.word.korean} className="mt-1" />
            <p className="text-sm text-gray-400 mt-1">タップして意味を確認</p>
          </div>

          {/* Back */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-indigo-50 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 p-6">
            <p className="text-3xl font-bold text-gray-800">{current.word.meaning}</p>
            <p className="text-lg text-gray-500">{current.word.reading}</p>
            <span className="text-xs font-medium text-indigo-500 bg-white px-3 py-1 rounded-full mt-1">
              {current.word.category}
            </span>
          </div>
        </div>
      </div>

      {/* Assessment buttons */}
      <div className={`w-full flex gap-3 transition-opacity duration-200 ${flipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button
          onClick={() => answer(false)}
          className="flex-1 py-4 bg-red-100 text-red-700 rounded-xl font-bold text-lg hover:bg-red-200 transition-colors active:scale-95"
        >
          😕 知らなかった
        </button>
        <button
          onClick={() => answer(true)}
          className="flex-1 py-4 bg-green-100 text-green-700 rounded-xl font-bold text-lg hover:bg-green-200 transition-colors active:scale-95"
        >
          😊 知ってた！
        </button>
      </div>

      {!flipped && (
        <p className="text-sm text-gray-400">カードをタップして意味を見る</p>
      )}

      <button onClick={onBack} className="text-sm text-gray-400 hover:text-gray-600">
        ← 戻る
      </button>
    </div>
  );
}
