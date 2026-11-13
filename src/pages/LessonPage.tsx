import { useReducer } from 'react'
import { AppShell } from '../components/AppShell'
import { Icon } from '../components/Icon'
import { ExerciseCard } from '../components/lesson/ExerciseCard'
import { JourneyPath } from '../components/lesson/JourneyPath'
import { LessonComplete } from '../components/lesson/LessonComplete'
import { UnitPathPanel } from '../components/lesson/UnitPathPanel'
import type { Lesson } from '../data/lessons'
import { progressActions } from '../hooks/useProgress'
import {
  completedSteps,
  createLessonState,
  lessonReducer,
  orderedQueue,
} from '../lesson/lessonState'
import type { LessonAction } from '../lesson/lessonState'

export function LessonPage({ lesson }: { lesson: Lesson }) {
  const { exercises } = lesson
  const totalSteps = exercises.length
  const [state, dispatch] = useReducer(lessonReducer, totalSteps, (count) =>
    createLessonState(orderedQueue(count)),
  )
  const completed = completedSteps(state, totalSteps)
  const exercise = state.queue.length > 0 ? exercises[state.queue[0]] : null
  const isLast = state.queue.length === 1

  // Record XP for the Achievements page alongside the lesson state change.
  const act = (action: LessonAction) => {
    if (action.type === 'check' && action.correct && state.status === 'idle') {
      progressActions.correctAnswer()
    }
    if (action.type === 'next' && state.status === 'correct' && isLast) {
      progressActions.lessonCompleted()
    }
    dispatch(action)
  }

  return (
    <AppShell current="lesson" eyebrow={lesson.eyebrow} title={lesson.heading}>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_285px]">
        <div className="min-w-0">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
            <a
              href="#/topics"
              className="inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg text-sm font-bold text-muted transition-colors hover:text-ink md:mb-1 md:self-auto"
            >
              <Icon name="arrowLeft" size={16} />
              Back to path
            </a>
            <div className="w-full md:max-w-[460px]">
              <JourneyPath completed={completed} total={totalSteps} />
            </div>
          </div>

          <div className="pt-5">
            {exercise ? (
              <ExerciseCard
                title={lesson.title}
                tip={lesson.tip}
                exercise={exercise}
                placed={state.placed}
                status={state.status}
                nextLabel={isLast ? 'Finish lesson' : 'Continue'}
                canSkip={state.status !== 'correct' && state.queue.length > 1}
                dispatch={act}
              />
            ) : (
              <LessonComplete
                title={lesson.title}
                total={totalSteps}
                onRestart={() => dispatch({ type: 'restart', queue: orderedQueue(totalSteps) })}
              />
            )}
          </div>
        </div>

        <div className="xl:pt-12">
          <UnitPathPanel lesson={lesson} completed={completed} total={totalSteps} />
        </div>
      </div>
    </AppShell>
  )
}
