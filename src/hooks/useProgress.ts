import { useSyncExternalStore } from 'react'

/** Learner progress, kept in this browser only (localStorage). No account, no server. */
export interface Progress {
  xp: number
  correctAnswers: number
  lessonsCompleted: number
  bestStreak: number
  rulesRead: string[]
}

export const XP_PER_CORRECT = 10
export const XP_PER_LESSON = 40

const STORAGE_KEY = 'gs-progress'
const EMPTY: Progress = {
  xp: 0,
  correctAnswers: 0,
  lessonsCompleted: 0,
  bestStreak: 0,
  rulesRead: [],
}
const listeners = new Set<() => void>()

function load(): Progress {
  try {
    const saved = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? 'null',
    ) as Partial<Progress> | null
    if (!saved || typeof saved !== 'object') return EMPTY
    return {
      xp: Number(saved.xp) || 0,
      correctAnswers: Number(saved.correctAnswers) || 0,
      lessonsCompleted: Number(saved.lessonsCompleted) || 0,
      bestStreak: Number(saved.bestStreak) || 0,
      rulesRead: Array.isArray(saved.rulesRead) ? saved.rulesRead.map(String) : [],
    }
  } catch {
    return EMPTY
  }
}

let current = load()

function update(change: (progress: Progress) => Progress) {
  current = change(current)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current))
  } catch {
    // Storage can be unavailable; progress then lasts for this visit only.
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export const progressActions = {
  correctAnswer: () =>
    update((p) => ({ ...p, xp: p.xp + XP_PER_CORRECT, correctAnswers: p.correctAnswers + 1 })),
  lessonCompleted: () =>
    update((p) => ({ ...p, xp: p.xp + XP_PER_LESSON, lessonsCompleted: p.lessonsCompleted + 1 })),
  streak: (length: number) =>
    update((p) => (length > p.bestStreak ? { ...p, bestStreak: length } : p)),
  ruleRead: (id: string) =>
    update((p) => (p.rulesRead.includes(id) ? p : { ...p, rulesRead: [...p.rulesRead, id] })),
  reset: () => update(() => EMPTY),
}

export function useProgress(): Progress {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => EMPTY,
  )
}
