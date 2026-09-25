import { useEffect, useId, useRef, useState } from 'react'
import { cta, navItems } from '../content'
import { SiteLink } from './SiteLink'

const desktopQuery = '(min-width: 56rem)'

export function Header() {
  const [open, setOpen] = useState(false)
  const [desktop, setDesktop] = useState(() => window.matchMedia(desktopQuery).matches)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const dialog = open && !desktop

  useEffect(() => {
    const media = window.matchMedia(desktopQuery)
    const onChange = () => {
      setDesktop(media.matches)
      if (media.matches) setOpen(false)
    }
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!dialog) return

    closeRef.current?.focus()
    document.body.classList.add('nav-open')
    const main = document.getElementById('tresc')
    const footer = document.querySelector('footer')
    if (main) main.inert = true
    if (footer instanceof HTMLElement) footer.inert = true

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (event.key !== 'Tab') return
      const root = panelRef.current
      if (!root) return
      const items = [...root.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')].filter(
        (el) => !el.hasAttribute('disabled') && el.tabIndex !== -1 && el.getClientRects().length > 0,
      )
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('nav-open')
      if (main) main.inert = false
      if (footer instanceof HTMLElement) footer.inert = false
    }
  }, [dialog])

  const close = (returnFocus: boolean) => {
    setOpen(false)
    if (returnFocus) toggleRef.current?.focus()
  }

  return (
    <header className="site-header">
      <div className="wrap nav-bar">
        <SiteLink className="brand" href="/#top">
          <span className="brand__mark" aria-hidden="true">
            JP
          </span>
          <span className="brand__name">John Pavulon</span>
        </SiteLink>

        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
          onClick={() => (open ? close(false) : setOpen(true))}
        >
          Menu
        </button>

        <div
          id="site-nav"
          ref={panelRef}
          className={open ? 'nav-panel is-open' : 'nav-panel'}
          role={dialog ? 'dialog' : undefined}
          aria-modal={dialog ? true : undefined}
          aria-labelledby={dialog ? titleId : undefined}
        >
          <div className="nav-panel__top">
            <p id={titleId} className="nav-panel__label">
              Menu
            </p>
            <button ref={closeRef} className="nav-close" type="button" onClick={() => close(true)}>
              Zamknij
            </button>
          </div>
          <nav className="nav-links" aria-label="Sekcje">
            {navItems.map((item) => (
              <SiteLink key={item.id} href={item.href} onNavigate={() => setOpen(false)}>
                {item.label}
              </SiteLink>
            ))}
          </nav>
          <SiteLink className="btn btn-primary nav-cta" href={cta.href} onNavigate={() => setOpen(false)}>
            {cta.label}
          </SiteLink>
        </div>
      </div>
    </header>
  )
}
