import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'dsa-war-progress';
const STREAK_KEY = 'dsa-war-streak';
const NOTES_KEY = 'dsa-war-notes';
const GOAL_KEY = 'dsa-war-daily-goal';
const THEME_KEY = 'dsa-war-theme';
const HEATMAP_KEY = 'dsa-war-heatmap';
const TIMESTAMPS_KEY = 'dsa-war-timestamps';

function getToday() {
  return new Date().toISOString().split('T')[0];
}

export function useProgress() {
  const [completed, setCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  const [timestamps, setTimestamps] = useState(() => {
    try {
      const saved = localStorage.getItem(TIMESTAMPS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }, [completed]);

  useEffect(() => {
    localStorage.setItem(TIMESTAMPS_KEY, JSON.stringify(timestamps));
  }, [timestamps]);

  const toggleComplete = useCallback((topicId, subtopicId, childIdx) => {
    const key = `${topicId}__${subtopicId}__${childIdx}`;
    setCompleted(prev => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
        setTimestamps(p => { const n = { ...p }; delete n[key]; return n; });
      } else {
        next[key] = true;
        setTimestamps(p => ({ ...p, [key]: new Date().toISOString() }));
      }
      return next;
    });
  }, []);

  const isComplete = useCallback((topicId, subtopicId, childIdx) => {
    return !!completed[`${topicId}__${subtopicId}__${childIdx}`];
  }, [completed]);

  const getTimestamp = useCallback((topicId, subtopicId, childIdx) => {
    return timestamps[`${topicId}__${subtopicId}__${childIdx}`] || null;
  }, [timestamps]);

  return { completed, toggleComplete, isComplete, getTimestamp, setCompleted, setTimestamps };
}

export function useStreak() {
  const [streakData, setStreakData] = useState(() => {
    try {
      const saved = localStorage.getItem(STREAK_KEY);
      return saved ? JSON.parse(saved) : { currentStreak: 0, lastActiveDate: null, longestStreak: 0 };
    } catch { return { currentStreak: 0, lastActiveDate: null, longestStreak: 0 }; }
  });

  useEffect(() => {
    localStorage.setItem(STREAK_KEY, JSON.stringify(streakData));
  }, [streakData]);

  const recordActivity = useCallback(() => {
    const today = getToday();
    setStreakData(prev => {
      if (prev.lastActiveDate === today) return prev;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      let newStreak;
      if (prev.lastActiveDate === yesterdayStr) {
        newStreak = prev.currentStreak + 1;
      } else if (prev.lastActiveDate === today) {
        newStreak = prev.currentStreak;
      } else {
        newStreak = 1;
      }
      const longestStreak = Math.max(prev.longestStreak, newStreak);
      return { currentStreak: newStreak, lastActiveDate: today, longestStreak };
    });
  }, []);

  return { ...streakData, recordActivity };
}

export function useNotes() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(NOTES_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  const setNote = useCallback((topicId, subtopicId, note) => {
    const key = `${topicId}__${subtopicId}`;
    setNotes(prev => ({ ...prev, [key]: note }));
  }, []);

  const getNote = useCallback((topicId, subtopicId) => {
    return notes[`${topicId}__${subtopicId}`] || '';
  }, [notes]);

  return { notes, setNote, getNote, setNotes };
}

export function useDailyGoal() {
  const [goalData, setGoalData] = useState(() => {
    try {
      const saved = localStorage.getItem(GOAL_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.date !== getToday()) {
          return { target: parsed.target || 5, completed: 0, date: getToday() };
        }
        return parsed;
      }
      return { target: 5, completed: 0, date: getToday() };
    } catch { return { target: 5, completed: 0, date: getToday() }; }
  });

  useEffect(() => {
    localStorage.setItem(GOAL_KEY, JSON.stringify(goalData));
  }, [goalData]);

  const incrementGoal = useCallback(() => {
    setGoalData(prev => {
      const today = getToday();
      if (prev.date !== today) {
        return { target: prev.target, completed: 1, date: today };
      }
      return { ...prev, completed: prev.completed + 1 };
    });
  }, []);

  const decrementGoal = useCallback(() => {
    setGoalData(prev => ({
      ...prev,
      completed: Math.max(0, prev.completed - 1)
    }));
  }, []);

  const setTarget = useCallback((target) => {
    setGoalData(prev => ({ ...prev, target: Math.max(1, target) }));
  }, []);

  return { ...goalData, incrementGoal, decrementGoal, setTarget };
}

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      return saved ? JSON.parse(saved) : true;
    } catch { return true; }
  });

  useEffect(() => {
    localStorage.setItem(THEME_KEY, JSON.stringify(isDark));
    if (isDark) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => setIsDark(p => !p), []);
  return { isDark, toggleTheme };
}

export function useHeatmap() {
  const [heatmap, setHeatmap] = useState(() => {
    try {
      const saved = localStorage.getItem(HEATMAP_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem(HEATMAP_KEY, JSON.stringify(heatmap));
  }, [heatmap]);

  const recordDay = useCallback((count = 1) => {
    const today = getToday();
    setHeatmap(prev => ({
      ...prev,
      [today]: (prev[today] || 0) + count
    }));
  }, []);

  return { heatmap, recordDay, setHeatmap };
}

export function useExportImport(completed, notes, streakData, heatmap, timestamps) {
  const exportData = useCallback(() => {
    const data = {
      version: 1,
      exportDate: new Date().toISOString(),
      completed: JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'),
      notes: JSON.parse(localStorage.getItem(NOTES_KEY) || '{}'),
      streak: JSON.parse(localStorage.getItem(STREAK_KEY) || '{}'),
      heatmap: JSON.parse(localStorage.getItem(HEATMAP_KEY) || '{}'),
      timestamps: JSON.parse(localStorage.getItem(TIMESTAMPS_KEY) || '{}'),
      dailyGoal: JSON.parse(localStorage.getItem(GOAL_KEY) || '{}'),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dsa-war-backup-${getToday()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const importData = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.completed) localStorage.setItem(STORAGE_KEY, JSON.stringify(data.completed));
          if (data.notes) localStorage.setItem(NOTES_KEY, JSON.stringify(data.notes));
          if (data.streak) localStorage.setItem(STREAK_KEY, JSON.stringify(data.streak));
          if (data.heatmap) localStorage.setItem(HEATMAP_KEY, JSON.stringify(data.heatmap));
          if (data.timestamps) localStorage.setItem(TIMESTAMPS_KEY, JSON.stringify(data.timestamps));
          if (data.dailyGoal) localStorage.setItem(GOAL_KEY, JSON.stringify(data.dailyGoal));
          resolve(data);
        } catch (err) { reject(err); }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }, []);

  return { exportData, importData };
}
