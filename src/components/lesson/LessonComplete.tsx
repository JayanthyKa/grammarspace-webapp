import { useEffect, useRef } from 'react'
import { Button } from '../Button'
import { Icon } from '../Icon'

interface LessonCompleteProps {
  title: string
  total: number
  onRestart: () => void
}

export function LessonComplete({ title, total, onRestart }: LessonCompleteProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <section
      aria-labelledby="complete-title"
      className="rounded-2xl border border-line bg-surface px-6 py-12 text-center shadow-card sm:px-10 sm:py-16"
    >
      <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-teal-tint text-teal-text">
        <Icon name="trophy" size={34} strokeWidth={1.7} />
      </span>
      <p className="mt-6 text-xs font-extrabold tracking-[0.1em] text-teal-text uppercase">
        {title}
      </p>
      <h2
        id="complete-title"
        ref={headingRef}
        tabIndex={-1}
        className="font-display mt-2 text-3xl font-bold text-ink outline-none"
      >
        Lesson complete
      </h2>
      <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-ink-soft">
        You reached the end of the path and placed all {total} words correctly.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button onClick={onRestart}>
          Restart lesson
          <Icon name="refresh" size={18} />
        </Button>
        <Button variant="secondary" href="#/achievements">
          See my badges
        </Button>
        <Button variant="secondary" href="#/topics">
          Back to topics
        </Button>
      </div>
    </section>
  )
}
