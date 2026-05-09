import { useState, useCallback } from 'react';

export interface WordProgress {
  correct: number;
  incorrect: number;
  lastStudied: number;
}

export interface Progress {
  [wordId: number]: WordProgress;
}

const STORAGE_KEY = 'korean-vocab-progress';

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress: Progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(loadProgress);

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
      saveProgress(updated);
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

  const totalStudied = Object.keys(progress).length;
  const totalCorrect = Object.values(progress).reduce((sum, p) => sum + p.correct, 0);
  const totalAttempts = Object.values(progress).reduce(
    (sum, p) => sum + p.correct + p.incorrect,
    0
  );
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  return { progress, recordResult, resetProgress, getWordProgress, totalStudied, accuracy };
}
