import type { Lesson } from '../../data/lessons'
import { Icon } from '../Icon'

interface UnitPathPanelProps {
  lesson: Lesson
  completed: number
  total: number
}

/** "Your path" side panel: where this lesson sits inside its unit. */
export function UnitPathPanel({ lesson, completed, total }: UnitPathPanelProps) {
  const lessonDone = completed >= total
  // One of four lessons is already finished; this lesson fills the second quarter.
  const percent = Math.round(((1 + completed / total) / 4) * 100)

  return (
    <aside
      aria-labelledby="unit-title"
      className="rounded-2xl border border-line bg-surface p-5 sm:p-[22px]"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold tracking-[0.12em] text-primary-text uppercase">
            Your path
          </p>
          <h2 id="unit-title" className="font-display pt-0.5 text-lg font-semibold text-ink">
            {lesson.unit}
          </h2>
        </div>
        <span className="text-sm font-extrabold text-primary-text">{percent}%</span>
      </div>

      <div
        role="progressbar"
        aria-label={`${lesson.unit} progress`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="mt-3.5 h-1.5 overflow-hidden rounded-full bg-off"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500 motion-reduce:transition-none"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ol className="mt-5 grid gap-1.5">
        <li className="flex min-h-[60px] items-center gap-2.5 rounded-[9px] px-2 py-2.5">
          <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-teal-deep text-white">
            <Icon name="check" size={17} strokeWidth={2.4} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold text-muted line-through">
              {lesson.done.title}
            </span>
            <span className="block pt-0.5 text-xs text-muted">{lesson.done.detail}</span>
          </span>
        </li>

        <li
          aria-current="step"
          className="flex min-h-[60px] items-center gap-2.5 rounded-[9px] bg-primary-tint px-2 py-2.5"
        >
          <span
            className={`grid size-7 shrink-0 place-items-center rounded-lg text-xs font-extrabold text-white ${
              lessonDone ? 'bg-teal-deep' : 'bg-primary'
            }`}
          >
            {lessonDone ? <Icon name="check" size={17} strokeWidth={2.4} /> : 2}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold text-primary-text">{lesson.title}</span>
            <span className="block pt-0.5 text-xs text-muted">
              {lessonDone ? 'Completed' : `In progress · ${completed} of ${total}`}
            </span>
          </span>
          {!lessonDone && <Icon name="play" size={17} className="shrink-0 text-primary-text" />}
        </li>

        {lesson.upcoming.map((item, index) => (
          <li
            key={item.title}
            className="flex min-h-[60px] items-center gap-2.5 rounded-[9px] px-2 py-2.5"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-off text-xs font-extrabold text-muted">
              {index + 3}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold text-ink-soft">{item.title}</span>
              <span className="block pt-0.5 text-xs text-muted">{item.detail}</span>
            </span>
            <Icon name="lock" size={16} className="shrink-0 text-muted" />
            <span className="sr-only">Locked</span>
          </li>
        ))}
      </ol>

      <div className="mt-5 flex items-center gap-2.5 rounded-[10px] bg-lav-tint p-3.5 text-lav-text">
        <Icon name="trophy" size={24} strokeWidth={1.7} className="shrink-0" />
        <p className="min-w-0 flex-1">
          <span className="block text-[11px] font-extrabold tracking-[0.08em] uppercase">
            Next reward
          </span>
          <span className="block text-sm font-bold">Grammar Explorer</span>
        </p>
        <span className="text-xs">2 lessons</span>
      </div>
    </aside>
  )
}
