import { useState, useEffect, useRef } from 'react';
import { Word } from '../data/vocabulary';
import { useAdaptiveQueue } from '../hooks/useAdaptiveQueue';
import { SessionComplete } from './SessionComplete';
import { useSpeech } from '../hooks/useSpeech';

interface Props {
  words: Word[];
  onBack: () => void;
  onComplete?: () => void;
}

type Phase = 'question' | 'correct' | 'wrong';

function stripParens(s: string) {
  return s.replace(/（[^）]*）/g, '').replace(/\([^)]*\)/g, '').trim();
}

function normalize(s: string) {
  return s.trim().replace(/[。、！？!?.…,，]/g, '').replace(/\s+/g, ' ').trim();
}

export function ListeningQuiz({ words, onBack, onComplete }: Props) {
  const { current, graduated, total, finished, submitAnswer, restart, hardWords, sessionAccuracy } =
    useAdaptiveQueue(words);
  const { speak, isSupported } = useSpeech();

  const [input, setInput] = useState('');
  const [phase, setPhase] = useState<Phase>('question');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInput('');
    setPhase('question');
    if (current) {
      const t = setTimeout(() => speak(current.word.korean), 200);
      return () => clearTimeout(t);
    }
  }, [current]);

  useEffect(() => {
    if (phase === 'question') inputRef.current?.focus();
  }, [phase, current]);

  useEffect(() => {
    if (finished) onComplete?.();
  }, [finished, onComplete]);

  const correctAnswer = current ? stripParens(current.word.meaning) : '';

  const check = () => {
    if (phase !== 'question' || !input.trim() || !current) return;
    setPhase(normalize(input) === normalize(correctAnswer) ? 'correct' : 'wrong');
  };

  const next = () => {
    if (phase === 'question' || !current) return;
    submitAnswer(phase === 'correct');
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') phase === 'question' ? check() : next();
  };

  if (!isSupported) {
    return (
      <div className="flex flex-col items-center gap-4 px-4 py-12 text-center">
        <p className="text-gray-500">このブラウザは音声合成に対応していません。</p>
        <button onClick={onBack} className="text-indigo-500 underline">戻る</button>
      </div>
    );
  }

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
        <span className="inline-block text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full mb-3">
          音声 → 日
        </span>
        <span className="block text-xs font-medium text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full mb-6">
          {current.word.category}
        </span>

        {/* Speaker button */}
        <button
          onClick={() => speak(current.word.korean)}
          className="w-20 h-20 rounded-full bg-indigo-100 hover:bg-indigo-200 active:scale-95 transition-all mx-auto flex items-center justify-center text-4xl"
          aria-label="もう一度聞く"
        >
          🔊
        </button>
        <p className="text-xs text-gray-400 mt-2">タップでもう一度</p>

        {phase !== 'question' && (
          <div className="mt-4">
            <p className="text-3xl font-bold font-korean text-gray-800">{current.word.korean}</p>
            <p className="text-sm text-gray-400 mt-1">{current.word.reading}</p>
            <p className={`mt-3 font-semibold ${phase === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
              {phase === 'correct' ? '✓ 正解！' : `✗ 正解：${correctAnswer}`}
            </p>
          </div>
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
          placeholder="聞こえた単語の意味を日本語で…"
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
