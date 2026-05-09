import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface WordProgress {
  correct: number;
  incorrect: number;
  lastStudied: number;
}

export type Progress = Record<number, WordProgress>;

const STORAGE_KEY = 'korean-vocab-progress';

function load(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
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
  recordResult: (wordId: number, correct: boolean) => void;
  resetProgress: () => void;
  getWordProgress: (wordId: number) => WordProgress;
  getMastery: (wordId: number) => 0 | 1 | 2 | 3;
  totalStudied: number;
  accuracy: number;
}

const Ctx = createContext<ProgressCtx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(load);

  const recordResult = useCallback((wordId: number, correct: boolean) => {
    setProgress(prev => {
      const existing = prev[wordId] ?? { correct: 0, incorrect: 0, lastStudied: 0 };
      const updated: Progress = {
        ...prev,
        [wordId]: {
          correct: existing.correct + (correct ? 1 : 0),
          incorrect: existing.incorrect + (correct ? 0 : 1),
          lastStudied: Date.now(),
        },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress({});
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

  return (
    <Ctx.Provider value={{ progress, recordResult, resetProgress, getWordProgress, getMastery, totalStudied, accuracy }}>
      {children}
    </Ctx.Provider>
  );
}

export function useProgressCtx() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useProgressCtx outside ProgressProvider');
  return ctx;
}
