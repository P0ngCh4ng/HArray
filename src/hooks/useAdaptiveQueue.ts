import { useState, useCallback } from 'react';
import { Word } from '../data/vocabulary';
import { useProgress } from './useProgress';

interface QueueItem {
  word: Word;
  streak: number;
}

interface SessionAttempt {
  attempts: number;
  correct: number;
}

// 2連続正解で「習得」
const GRADUATION_STREAK = 2;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function useAdaptiveQueue(words: Word[]) {
  const { recordResult } = useProgress();

  const [queue, setQueue] = useState<QueueItem[]>(() =>
    shuffle(words).map(w => ({ word: w, streak: 0 }))
  );
  const [graduated, setGraduated] = useState(0);
  const [sessionAttempts, setSessionAttempts] = useState<Record<number, SessionAttempt>>({});
  const [finished, setFinished] = useState(false);

  const current = queue[0] ?? null;

  const submitAnswer = useCallback(
    (correct: boolean) => {
      if (!current || finished) return;

      recordResult(current.word.id, correct);

      const id = current.word.id;
      setSessionAttempts(prev => ({
        ...prev,
        [id]: {
          attempts: (prev[id]?.attempts ?? 0) + 1,
          correct: (prev[id]?.correct ?? 0) + (correct ? 1 : 0),
        },
      }));

      const [head, ...tail] = queue;

      if (correct && head.streak + 1 >= GRADUATION_STREAK) {
        setGraduated(g => g + 1);
        setQueue(tail);
        if (tail.length === 0) setFinished(true);
      } else if (correct) {
        setQueue([...tail, { ...head, streak: head.streak + 1 }]);
      } else {
        // 不正解: 2枚後に再挿入
        const item = { ...head, streak: 0 };
        const newTail = [...tail];
        newTail.splice(Math.min(2, newTail.length), 0, item);
        setQueue(newTail);
      }
    },
    [current, queue, finished, recordResult]
  );

  const restart = useCallback(() => {
    setQueue(shuffle(words).map(w => ({ word: w, streak: 0 })));
    setGraduated(0);
    setSessionAttempts({});
    setFinished(false);
  }, [words]);

  const sessionCorrect = Object.values(sessionAttempts).reduce((s, a) => s + a.correct, 0);
  const sessionTotal = Object.values(sessionAttempts).reduce((s, a) => s + a.attempts, 0);

  const hardWords = Object.entries(sessionAttempts)
    .filter(([, a]) => a.attempts > 1)
    .sort(([, a], [, b]) => b.attempts - a.attempts)
    .slice(0, 5)
    .map(([id, a]) => ({ word: words.find(w => w.id === Number(id))!, attempts: a.attempts }))
    .filter(x => x.word != null);

  return {
    current,
    graduated,
    total: words.length,
    remaining: queue.length,
    finished,
    submitAnswer,
    restart,
    hardWords,
    sessionAccuracy: sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0,
  };
}
