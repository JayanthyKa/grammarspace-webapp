import { TOPICS } from '../data/topics'
import type { TopicId } from '../data/topics'
import { UNITS } from '../data/units'
import type { UnitLesson } from '../data/units'

/**
 * Every lesson in the order it is taken: all lessons of the first unit, then the second
 * unit, and so on. Finishing a lesson unlocks the one after it, so a unit opens only when
 * the whole unit before it is finished.
 */
export const ALL_LESSONS: UnitLesson[] = TOPICS.flatMap((topic) => UNITS[topic.id].lessons)

export function isLessonUnlocked(lesson: UnitLesson, completedLessons: string[]): boolean {
  const index = ALL_LESSONS.indexOf(lesson)
  return index <= 0 || completedLessons.includes(ALL_LESSONS[index - 1].id)
}

export function isUnitUnlocked(topic: TopicId, completedLessons: string[]): boolean {
  return isLessonUnlocked(UNITS[topic].lessons[0], completedLessons)
}

export function isUnitComplete(topic: TopicId, completedLessons: string[]): boolean {
  return UNITS[topic].lessons.every((lesson) => completedLessons.includes(lesson.id))
}

/** The lesson to do next inside a unit: the first unfinished one, or the first if all are done. */
export function currentLessonInUnit(topic: TopicId, completedLessons: string[]): UnitLesson {
  const { lessons } = UNITS[topic]
  return lessons.find((lesson) => !completedLessons.includes(lesson.id)) ?? lessons[0]
}

/** The lesson to do next overall. */
export function firstOpenLesson(completedLessons: string[]): UnitLesson {
  return ALL_LESSONS.find((lesson) => !completedLessons.includes(lesson.id)) ?? ALL_LESSONS[0]
}

/** The lesson that follows this one, in the same unit or at the start of the next unit. */
export function lessonAfter(lesson: UnitLesson): UnitLesson | null {
  return ALL_LESSONS[ALL_LESSONS.indexOf(lesson) + 1] ?? null
}

export function previousTopic(topic: TopicId): TopicId | null {
  return TOPICS[TOPICS.findIndex((item) => item.id === topic) - 1]?.id ?? null
}
