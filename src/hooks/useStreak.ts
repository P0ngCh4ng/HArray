import { useState, useCallback } from 'react';

interface StreakData {
  count: number;
  lastDate: string;
}

const KEY = 'korean-vocab-streak';

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function load(): StreakData {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : { count: 0, lastDate: '' };
  } catch {
    return { count: 0, lastDate: '' };
  }
}

export function useStreak() {
  const [data, setData] = useState<StreakData>(load);

  const checkIn = useCallback(() => {
    const today = todayStr();
    setData(prev => {
      if (prev.lastDate === today) return prev;
      const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
      const count = prev.lastDate === yesterday ? prev.count + 1 : 1;
      const next = { count, lastDate: today };
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { streak: data.count, checkIn };
}
