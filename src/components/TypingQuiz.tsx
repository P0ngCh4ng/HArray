import { useState, useEffect, useRef } from 'react';
import { Word } from '../data/vocabulary';
import { useAdaptiveQueue } from '../hooks/useAdaptiveQueue';
import { SessionComplete } from './SessionComplete';
import { SpeakButton } from './SpeakButton';

interface Props {
  words: Word[];
  onBack: () => void;
  onComplete?: () => void;
}

type Phase = 'question' | 'correct' | 'wrong';

function normalize(s: string) {
  return s.trim().replace(/\s+/g, ' ');
}

export function TypingQuiz({ words, onBack, onComplete }: Props) {
  const { current, graduated, total, finished, submitAnswer, restart, hardWords, sessionAccuracy } =
    useAdaptiveQueue(words);

  const [input, setInput] = useState('');
  const [phase, setPhase] = useState<Phase>('question');
  const [showReading, setShowReading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInput('');
    setPhase('question');
    setShowReading(false);
    inputRef.current?.focus();
  }, [current]);

  useEffect(() => {
    if (finished) onComplete?.();
  }, [finished, onComplete]);

  const check = () => {
    if (phase !== 'question' || !input.trim() || !current) return;
    const correct = normalize(input) === normalize(current.word.meaning);
    setPhase(correct ? 'correct' : 'wrong');
  };

  const next = () => {
    if (phase === 'question' || !current) return;
    submitAnswer(phase === 'correct');
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      phase === 'question' ? check() : next();
    }
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

      {/* Card */}
      <div className={`w-full rounded-2xl shadow-sm p-8 text-center transition-colors duration-200 ${
        phase === 'correct' ? 'bg-green-50 border-2 border-green-400'
        : phase === 'wrong' ? 'bg-red-50 border-2 border-red-400'
        : 'bg-white'
      }`}>
        <span className="text-xs font-medium text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">
          {current.word.category}
        </span>
        <div className="flex items-center justify-center gap-2 mt-4 mb-2">
          <p className="text-5xl font-bold text-gray-900 font-korean">{current.word.korean}</p>
          <SpeakButton text={current.word.korean} />
        </div>

        {showReading || phase !== 'question' ? (
          <p className="text-gray-400">{current.word.reading}</p>
        ) : (
          <button onClick={() => setShowReading(true)} className="text-sm text-gray-300 hover:text-indigo-400 underline">
            読み方を表示
          </button>
        )}

        {phase !== 'question' && (
          <p className={`mt-3 font-semibold ${phase === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
            {phase === 'correct' ? '✓ 正解！' : `✗ 正解：${current.word.meaning}`}
          </p>
        )}
      </div>

      {/* Input */}
      <div className="w-full space-y-3">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          disabled={phase !== 'question'}
          placeholder="日本語で意味を入力…"
          className={`w-full px-4 py-3 rounded-xl border-2 text-lg outline-none transition-colors ${
            phase === 'correct' ? 'border-green-400 bg-green-50 text-green-700'
            : phase === 'wrong' ? 'border-red-400 bg-red-50 text-red-700'
            : 'border-gray-200 focus:border-indigo-400 bg-white'
          }`}
        />

        {phase === 'question' ? (
          <button
            onClick={check}
            disabled={!input.trim()}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 disabled:opacity-40 transition-colors"
          >
            確認 (Enter)
          </button>
        ) : (
          <button
            onClick={next}
            className={`w-full py-3 rounded-xl font-semibold text-lg text-white transition-colors ${
              phase === 'correct' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            次へ (Enter)
          </button>
        )}
      </div>

      <button onClick={onBack} className="text-sm text-gray-400 hover:text-gray-600">
        ← 戻る
      </button>
    </div>
  );
}
