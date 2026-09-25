import { useEffect, useRef } from 'react'
import heroPhoto from '../assets/hero-interface.webp'
import { BriefForm } from '../components/BriefForm'
import { CopyAddress } from '../components/CopyAddress'
import { ProjectCard } from '../components/ProjectCard'
import { SiteLink } from '../components/SiteLink'
import {
  caseStudies,
  contactEmail,
  homeTitle,
  principles,
  processSteps,
  services,
} from '../content'
import { reveal } from '../router'

export function HomePage() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    document.title = homeTitle
    reveal(window.location.hash)

    const hero = heroRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!hero || reduceMotion.matches) return

    let frame = 0
    let pointerX = 0
    let pointerY = 0
    let scrollY = 0

    const render = () => {
      frame = 0
      hero.style.setProperty('--hero-shift-x', `${pointerX.toFixed(2)}px`)
      hero.style.setProperty('--hero-shift-y', `${pointerY.toFixed(2)}px`)
      hero.style.setProperty('--hero-scroll-y', `${scrollY.toFixed(2)}px`)
    }

    const scheduleRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const bounds = hero.getBoundingClientRect()
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 6
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 4
      scheduleRender()
    }

    const resetPointer = () => {
      pointerX = 0
      pointerY = 0
      scheduleRender()
    }

    const handleScroll = () => {
      scrollY = Math.max(-4, Math.min(4, -hero.getBoundingClientRect().top * 0.018))
      scheduleRender()
    }

    hero.addEventListener('pointermove', handlePointerMove, { passive: true })
    hero.addEventListener('pointerleave', resetPointer)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      hero.removeEventListener('pointermove', handlePointerMove)
      hero.removeEventListener('pointerleave', resetPointer)
      window.removeEventListener('scroll', handleScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <section ref={heroRef} className="hero" id="top" tabIndex={-1} aria-labelledby="hero-title">
        <img
          className="hero__bg"
          src={heroPhoto}
          alt=""
          width={1280}
          height={720}
          decoding="async"
          fetchPriority="high"
        />
        <div className="wrap hero__grid">
          <div>
            <p className="kicker type-badge">Strony · aplikacje mobilne · projektowanie</p>
            <h1 id="hero-title">
              Projektuję strony internetowe, aplikacje mobilne i nowoczesne interfejsy.
            </h1>
            <p className="type-body-lg hero__lead">
              Pomagam zamienić pomysł w przejrzysty projekt, który dobrze wygląda, jest prosty w obsłudze
              i działa na każdym ekranie.
            </p>
            <div className="actions">
              <SiteLink className="btn btn-primary" href="/#prace">
                Zobacz wybrane projekty
              </SiteLink>
              <SiteLink className="btn btn-ghost" href="/#kontakt">
                Opowiedz o projekcie
              </SiteLink>
            </div>
          </div>
          <dl className="hero__facts">
            <div>
              <dt className="type-badge text-muted">Co</dt>
              <dd>Strony, aplikacje mobilne i projekty interfejsów.</dd>
            </div>
            <div>
              <dt className="type-badge text-muted">Jak</dt>
              <dd>Od pierwszego pomysłu do gotowego, działającego projektu.</dd>
            </div>
            <div>
              <dt className="type-badge text-muted">Dalej</dt>
              <dd>Zobacz moje prace albo opowiedz, czego potrzebujesz.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="band band--surface" id="prace" tabIndex={-1} aria-labelledby="prace-title">
        <div className="wrap">
          <header className="section-head">
            <p className="kicker type-badge">01 / Prace</p>
            <h2 id="prace-title">Cztery projekty. Pięć działających widoków.</h2>
            <p className="type-body-lg text-muted">
              Otwórz wybrany projekt, zobacz go na różnych ekranach i sprawdź, jak działa.
            </p>
          </header>
          <div className="work-list">
            {caseStudies.map((study) => (
              <ProjectCard key={study.slug} study={study} />
            ))}
          </div>
        </div>
      </section>

      <section className="band band--surface" id="uslugi" tabIndex={-1} aria-labelledby="uslugi-title">
        <div className="wrap">
          <header className="section-head">
            <p className="kicker type-badge">02 / Usługi</p>
            <h2 id="uslugi-title">W czym mogę pomóc.</h2>
          </header>
          <ol className="service-list">
            {services.map((service, index) => (
              <li key={service.title}>
                <h3>
                  <span className="type-badge text-muted">{String(index + 1).padStart(2, '0')}</span>
                  {service.title}
                </h3>
                <p className="text-muted">{service.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band" id="proces" tabIndex={-1} aria-labelledby="proces-title">
        <div className="wrap">
          <header className="section-head">
            <p className="kicker type-badge">03 / Proces</p>
            <h2 id="proces-title">Prosty sposób pracy.</h2>
          </header>
          <ol className="steps">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <span className="type-badge steps__index">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p className="text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band" id="o-mnie" tabIndex={-1} aria-labelledby="o-mnie-title">
        <div className="wrap">
          <header className="section-head">
            <p className="kicker type-badge">04 / O mnie</p>
            <h2 id="o-mnie-title">Projektuję jasno i konkretnie.</h2>
            <p className="type-body-lg text-muted">
              Tworzę dla firm i osób, które potrzebują nowej strony, aplikacji mobilnej albo lepszego
              wyglądu istniejącego produktu.
            </p>
          </header>
          <ol className="principle-list">
            {principles.map((principle, index) => (
              <li key={principle.title}>
                <h3>
                  <span className="type-badge text-muted">{String(index + 1).padStart(2, '0')}</span>
                  {principle.title}
                </h3>
                <p className="text-muted">{principle.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band band--surface" id="kontakt" tabIndex={-1} aria-labelledby="kontakt-title">
        <div className="wrap">
          <header className="section-head">
            <p className="kicker type-badge">05 / Kontakt</p>
            <h2 id="kontakt-title">Opowiedz mi o swoim pomyśle.</h2>
            <p className="type-body-lg text-muted">
              Wypełnij krótki formularz albo napisz bezpośrednio. Formularz przygotuje wiadomość w Twoim
              programie pocztowym.
            </p>
          </header>
          <div className="contact-grid">
            <BriefForm />
            <aside className="contact-aside" aria-label="Bezpośredni e-mail">
              <p className="type-badge text-muted">Bezpośrednio</p>
              <p>
                <a className="contact-address" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
              </p>
              <CopyAddress />
              <p className="text-muted">
                Możesz skopiować adres lub od razu otworzyć nową wiadomość.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
