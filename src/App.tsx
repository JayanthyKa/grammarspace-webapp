import { useEffect } from 'react'
import { LESSONS } from './data/lessons'
import { useHashRoute, useLessonTopic } from './hooks/useHashRoute'
import type { Route } from './hooks/useHashRoute'
import { AchievementsPage } from './pages/AchievementsPage'
import { HomePage } from './pages/HomePage'
import { LessonPage } from './pages/LessonPage'
import { LibraryPage } from './pages/LibraryPage'
import { PracticePage } from './pages/PracticePage'
import { ProfilePage } from './pages/ProfilePage'
import { TopicsPage } from './pages/TopicsPage'

const TITLES: Record<Route, string> = {
  home: 'GrammarSpace — Write with clarity',
  topics: 'Choose a topic — GrammarSpace',
  lesson: 'Subject–verb agreement — GrammarSpace',
  library: 'Library — GrammarSpace',
  practice: 'Practice — GrammarSpace',
  achievements: 'Achievements — GrammarSpace',
  profile: 'Your profile — GrammarSpace',
}

function App() {
  const route = useHashRoute()
  const lessonTopic = useLessonTopic()

  useEffect(() => {
    document.title =
      route === 'lesson' ? `${LESSONS[lessonTopic].title} — GrammarSpace` : TITLES[route]
    window.scrollTo(0, 0)
  }, [route, lessonTopic])

  // Keyed by topic so each lesson starts with its own fresh journey.
  if (route === 'lesson') return <LessonPage key={lessonTopic} lesson={LESSONS[lessonTopic]} />
  if (route === 'library') return <LibraryPage />
  if (route === 'practice') return <PracticePage />
  if (route === 'achievements') return <AchievementsPage />
  if (route === 'profile') return <ProfilePage />
  if (route === 'topics') return <TopicsPage />
  return <HomePage />
}

export default App
