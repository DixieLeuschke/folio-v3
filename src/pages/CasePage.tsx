import { useEffect } from 'react'
import { CaseStudy } from '../components/CaseStudy'
import { SiteLink } from '../components/SiteLink'
import { caseBySlug } from '../content'

export function CasePage({ slug }: { slug: string }) {
  const study = caseBySlug(slug)

  useEffect(() => {
    if (study) return
    document.title = 'Nie ma tej strony — John Pavulon'
    window.scrollTo(0, 0)
    document.getElementById('missing-title')?.focus({ preventScroll: true })
  }, [study])

  if (!study) {
    return (
      <section className="band">
        <div className="wrap case__wrap">
          <h1 id="missing-title" tabIndex={-1}>
            Nie ma tej strony.
          </h1>
          <p className="text-muted">Case study o tym adresie nie jest w tym portfolio.</p>
          <SiteLink className="case__back" href="/#prace">
            Wróć do prac
          </SiteLink>
        </div>
      </section>
    )
  }

  return <CaseStudy study={study} />
}
