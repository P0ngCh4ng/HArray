import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface WordProgress {
  correct: number;
  incorrect: number;
  lastStudied: number;
  interval?: number;   // days until next review (SRS)
  nextReview?: number; // timestamp ms
}

export type Progress = Record<number, WordProgress>;
export type Activity = Record<string, number>; // 'YYYY-MM-DD' → answer count

const STORAGE_KEY = 'korean-vocab-progress';
const ACTIVITY_KEY = 'korean-vocab-activity';

function load(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function loadActivity(): Activity {
  try {
    const raw = localStorage.getItem(ACTIVITY_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getMasteryLevel(p: WordProgress): 0 | 1 | 2 | 3 {
  const total = p.correct + p.incorrect;
  if (total === 0) return 0;
  const acc = p.correct / total;
  if (p.correct >= 5 && acc >= 0.7) return 3;
  if (p.correct >= 3 && acc >= 0.5) return 2;
  return 1;
}

interface ProgressCtx {
  progress: Progress;
  activity: Activity;
  recordResult: (wordId: number, correct: boolean) => void;
  resetProgress: () => void;
  getWordProgress: (wordId: number) => WordProgress;
  getMastery: (wordId: number) => 0 | 1 | 2 | 3;
  totalStudied: number;
  accuracy: number;
  xp: number;
}

const Ctx = createContext<ProgressCtx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(load);
  const [activity, setActivity] = useState<Activity>(loadActivity);

  const recordResult = useCallback((wordId: number, correct: boolean) => {
    setProgress(prev => {
      const existing = prev[wordId] ?? { correct: 0, incorrect: 0, lastStudied: 0 };
      // SM-2-style: correct → interval ×2.5, incorrect → reset to 1 day
      const currentInterval = existing.interval ?? 1;
      const newInterval = correct ? Math.max(1, Math.round(currentInterval * 2.5)) : 1;
      const updated: Progress = {
        ...prev,
        [wordId]: {
          correct: existing.correct + (correct ? 1 : 0),
          incorrect: existing.incorrect + (correct ? 0 : 1),
          lastStudied: Date.now(),
          interval: newInterval,
          nextReview: Date.now() + newInterval * 86_400_000,
        },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    setActivity(prev => {
      const today = new Date().toISOString().slice(0, 10);
      const next = { ...prev, [today]: (prev[today] ?? 0) + 1 };
      localStorage.setItem(ACTIVITY_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ACTIVITY_KEY);
    setProgress({});
    setActivity({});
  }, []);

  const getWordProgress = useCallback(
    (wordId: number): WordProgress =>
      progress[wordId] ?? { correct: 0, incorrect: 0, lastStudied: 0 },
    [progress]
  );

  const getMastery = useCallback(
    (wordId: number): 0 | 1 | 2 | 3 =>
      getMasteryLevel(progress[wordId] ?? { correct: 0, incorrect: 0, lastStudied: 0 }),
    [progress]
  );

  const totalStudied = Object.keys(progress).length;
  const totalCorrect = Object.values(progress).reduce((s, p) => s + p.correct, 0);
  const totalAttempts = Object.values(progress).reduce((s, p) => s + p.correct + p.incorrect, 0);
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
  const xp = totalCorrect * 10;

  return (
    <Ctx.Provider value={{ progress, activity, recordResult, resetProgress, getWordProgress, getMastery, totalStudied, accuracy, xp }}>
      {children}
    </Ctx.Provider>
  );
}

export function useProgressCtx() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useProgressCtx outside ProgressProvider');
  return ctx;
}
