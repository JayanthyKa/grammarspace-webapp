import tapeUrl from '../assets/tape.svg'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { TOPICS } from '../data/topics'

export function TopicsPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[1346px] flex-col px-5 py-6 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
      <SiteHeader variant="topics" />

      <main className="flex-1 py-12 sm:py-16">
        <h1 className="sr-only">Choose a topic</h1>
        <div className="relative mx-auto max-w-[1210px]">
          <ul className="grid gap-6 rounded-2xl bg-surface p-5 shadow-card sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10 sm:p-8 lg:gap-x-24 lg:p-12 xl:gap-x-44">
            {TOPICS.map((topic) => (
              <li key={topic.title}>
                <a
                  href={`#/lesson/${topic.id}`}
                  className={`group flex h-full flex-col gap-7 rounded-2xl border border-transparent px-7 py-6 transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:px-10 ${topic.cardClass}`}
                >
                  <span aria-hidden="true" className={`text-2xl ${topic.markClass}`}>
                    {topic.mark}
                  </span>
                  <span className="text-xl text-ink">{topic.title}</span>
                  <span className="text-base text-ink-soft">{topic.description}</span>
                </a>
              </li>
            ))}
          </ul>
          <img
            src={tapeUrl}
            alt=""
            className="pointer-events-none absolute -top-7 -right-6 h-auto w-24 rotate-[42deg] sm:-right-9 sm:w-[120px]"
          />
          <img
            src={tapeUrl}
            alt=""
            className="pointer-events-none absolute -bottom-7 -left-6 h-auto w-24 rotate-[42deg] sm:-left-9 sm:w-[120px]"
          />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
