import { useSyncExternalStore } from 'react'
import { TOPICS } from '../data/topics'
import type { TopicId } from '../data/topics'

export type Route =
  'home' | 'topics' | 'lesson' | 'library' | 'practice' | 'achievements' | 'profile'

const ROUTES: Record<string, Route> = {
  '#/': 'home',
  '#/topics': 'topics',
  '#/lesson': 'lesson',
  '#/library': 'library',
  '#/practice': 'practice',
  '#/achievements': 'achievements',
  '#/profile': 'profile',
}

const LESSON_PREFIX = '#/lesson/'

function readRoute(): Route {
  const hash = window.location.hash
  if (hash.startsWith(LESSON_PREFIX)) return 'lesson'
  return ROUTES[hash] ?? 'home'
}

/** Topic of the open lesson: `#/lesson/tense` is the Tense lesson; plain `#/lesson` is Sentence. */
function readLessonTopic(): TopicId {
  const id = window.location.hash.slice(LESSON_PREFIX.length)
  return TOPICS.find((topic) => topic.id === id)?.id ?? 'sentence'
}

function subscribe(listener: () => void) {
  window.addEventListener('hashchange', listener)
  return () => window.removeEventListener('hashchange', listener)
}

/** Minimal hash router: a handful of screens does not justify a routing dependency. */
export function useHashRoute(): Route {
  return useSyncExternalStore(subscribe, readRoute, () => 'home' as Route)
}

export function useLessonTopic(): TopicId {
  return useSyncExternalStore(subscribe, readLessonTopic, () => 'sentence' as TopicId)
}
