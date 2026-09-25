import { useEffect } from 'react'
import type { CaseStudy as CaseStudyData } from '../content'
import { ProjectPreview } from './ProjectPreview'
import { SiteLink } from './SiteLink'

export function CaseStudy({ study }: { study: CaseStudyData }) {
  useEffect(() => {
    document.title = `${study.title} — John Pavulon`
    window.scrollTo(0, 0)
    document.getElementById('case-title')?.focus({ preventScroll: true })
  }, [study])

  return (
    <article className="case band">
      <div className="wrap case__wrap">
        <SiteLink className="case__back" href="/#prace">
          Wróć do prac
        </SiteLink>
        <header className="case__head">
          <div className="project-card__meta">
            <p className="type-badge text-muted">{study.type}</p>
            <p className="status-badge type-badge">{study.status}</p>
          </div>
          <h1 id="case-title" tabIndex={-1}>
            {study.title}
          </h1>
          <p className="type-body-lg text-muted">{study.summary}</p>
        </header>

        <ProjectPreview projectTitle={study.title} previews={study.previews} />

        {study.blocks.map((block, index) => (
          <section key={block.title} className="case__block" aria-labelledby={`case-${study.slug}-${index}`}>
            <p className="type-badge text-muted">{String(index + 1).padStart(2, '0')}</p>
            <h2 id={`case-${study.slug}-${index}`}>{block.title}</h2>
            {block.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-muted">
                {paragraph}
              </p>
            ))}
            {block.items ? (
              <ul className="case__items">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <section className="case__block" aria-labelledby={`case-${study.slug}-tools`}>
          <p className="type-badge text-muted">{String(study.blocks.length + 1).padStart(2, '0')}</p>
          <h2 id={`case-${study.slug}-tools`}>Narzędzia</h2>
          <ul className="tool-list" aria-label={`Narzędzia ${study.title}`}>
            {study.tools.map((tool) => (
              <li key={tool} className="status-badge type-badge">
                {tool}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  )
}
