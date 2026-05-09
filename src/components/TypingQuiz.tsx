import { useState, useEffect, useRef, useCallback } from 'react';
import { Word } from '../data/vocabulary';
import { useProgress } from '../hooks/useProgress';

interface Props {
  words: Word[];
  onBack: () => void;
}

type Phase = 'question' | 'correct' | 'incorrect';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function TypingQuiz({ words, onBack }: Props) {
  const { recordResult } = useProgress();
  const [queue, setQueue] = useState<Word[]>(() => shuffle(words));
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [phase, setPhase] = useState<Phase>('question');
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showReading, setShowReading] = useState(false);
  const [finished, setFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const current = queue[index];

  useEffect(() => {
    if (phase === 'question') {
      inputRef.current?.focus();
      setShowReading(false);
    }
  }, [phase, index]);

  const normalize = (s: string) =>
    s.trim().replace(/[　 ]/g, ' ').replace(/[（(]/g, '（').replace(/[）)]/g, '）');

  const checkAnswer = useCallback(() => {
    if (phase !== 'question' || !input.trim()) return;
    const userAnswer = normalize(input);
    const correctAnswer = normalize(current.meaning);
    const isCorrect = userAnswer === correctAnswer;
    recordResult(current.id, isCorrect);
    setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
    setPhase(isCorrect ? 'correct' : 'incorrect');
  }, [phase, input, current, recordResult]);

  const next = useCallback(() => {
    if (index + 1 >= queue.length) {
      setFinished(true);
    } else {
      setIndex(i => i + 1);
      setInput('');
      setPhase('question');
    }
  }, [index, queue.length]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (phase === 'question') checkAnswer();
      else next();
    }
  };

  const restart = () => {
    setQueue(shuffle(words));
    setIndex(0);
    setInput('');
    setPhase('question');
    setScore({ correct: 0, total: 0 });
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score.correct / score.total) * 100);
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
        <div className="text-6xl">{pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '💪'}</div>
        <h2 className="text-2xl font-bold text-gray-800">クイズ完了！</h2>
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center space-y-3">
          <p className="text-5xl font-bold text-indigo-600">{pct}%</p>
          <p className="text-gray-500">{score.total}問中 {score.correct}問 正解</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={restart}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            もう一度
          </button>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-6 max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="w-full">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>{index + 1} / {queue.length}</span>
          <span>正解 {score.correct} / {score.total}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((index) / queue.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div
        className={`w-full rounded-2xl shadow-lg p-8 text-center transition-colors duration-300 ${
          phase === 'correct'
            ? 'bg-green-50 border-2 border-green-400'
            : phase === 'incorrect'
            ? 'bg-red-50 border-2 border-red-400'
            : 'bg-white'
        }`}
      >
        <span className="inline-block text-xs font-medium text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full mb-4">
          {current.category}
        </span>
        <p className="text-5xl font-bold text-gray-900 mb-2 font-korean">{current.korean}</p>
        {showReading || phase !== 'question' ? (
          <p className="text-lg text-gray-400 mt-1">{current.reading}</p>
        ) : (
          <button
            onClick={() => setShowReading(true)}
            className="text-sm text-gray-400 hover:text-indigo-500 mt-1 underline"
          >
            読み方を表示
          </button>
        )}

        {phase !== 'question' && (
          <div className={`mt-4 text-lg font-semibold ${phase === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
            {phase === 'correct' ? '✓ 正解！' : `✗ 正解：${current.meaning}`}
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="w-full space-y-3">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={phase !== 'question'}
          placeholder="日本語で意味を入力..."
          className={`w-full px-4 py-3 rounded-xl border-2 text-lg outline-none transition-colors ${
            phase === 'correct'
              ? 'border-green-400 bg-green-50 text-green-700'
              : phase === 'incorrect'
              ? 'border-red-400 bg-red-50 text-red-700'
              : 'border-gray-200 focus:border-indigo-400 bg-white'
          }`}
        />

        {phase === 'question' ? (
          <button
            onClick={checkAnswer}
            disabled={!input.trim()}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
