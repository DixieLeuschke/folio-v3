import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { CasePage } from './pages/CasePage'
import { HomePage } from './pages/HomePage'
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
  return (
    <section className="band">
      <div className="wrap">
        <h1>Nie ma tej strony.</h1>
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
