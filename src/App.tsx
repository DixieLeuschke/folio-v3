import { useEffect } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { CasePage } from './pages/CasePage'
import { HomePage } from './pages/HomePage'
import { SiteLink } from './components/SiteLink'
import { normalizePath, RouterProvider, useRouter } from './router'
import './styles/layout.css'

function Shell() {
  const { path } = useRouter()
  const normalized = normalizePath(path)
  const caseSlug = normalized.startsWith('/prace/')
    ? decodeURIComponent(normalized.slice('/prace/'.length))
    : ''

  return (
    <>
      <a
        className="skip-link"
        href="#tresc"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('tresc')?.focus()
        }}
      >
        Przejdź do treści
      </a>
      <Header />
      <main id="tresc" tabIndex={-1}>
        {normalized === '/' ? <HomePage /> : caseSlug ? <CasePage slug={caseSlug} /> : <Missing />}
      </main>
      <Footer />
    </>
  )
}

function Missing() {
  useEffect(() => {
    document.title = 'Nie ma tej strony — John Pavulon'
    window.scrollTo(0, 0)
    document.getElementById('missing-title')?.focus({ preventScroll: true })
  }, [])

  return (
    <section className="band">
      <div className="wrap case__wrap">
        <h1 id="missing-title" tabIndex={-1}>
          Nie ma tej strony.
        </h1>
        <p className="text-muted">Ten adres nie prowadzi do portfolio ani do case study.</p>
        <SiteLink className="case__back" href="/#prace">
          Wróć do prac
        </SiteLink>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <RouterProvider>
      <Shell />
    </RouterProvider>
  )
}
