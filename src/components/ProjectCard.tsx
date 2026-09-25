import type { CaseStudy } from '../content'
import { toPublicPath } from '../router'
import { SiteLink } from './SiteLink'

export function ProjectCard({ study }: { study: CaseStudy }) {
  return (
    <article className="project-card">
      <SiteLink className="project-card__link" href={`/prace/${study.slug}`}>
        <div className="project-card__media">
          <img
            src={toPublicPath(study.thumbnail)}
            alt={study.thumbnailAlt}
            width={1280}
            height={800}
            loading="lazy"
            decoding="async"
          />
          <span className="project-card__open" aria-hidden="true">Otwórz ↗</span>
        </div>
        <div className="project-card__body">
          <div className="project-card__meta">
            <p className="type-badge text-muted">{study.type}</p>
            <p className="status-badge type-badge">{study.status}</p>
          </div>
          <h3>{study.title}</h3>
          <p className="text-muted">{study.summary}</p>
          <div className="project-card__foot">
            <p className="project-card__count type-badge text-muted">
              {study.previews.length === 1 ? '1 podgląd' : `${study.previews.length} podglądy`}
            </p>
            <p className="project-card__more">Zobacz projekt <span aria-hidden="true">↗</span></p>
          </div>
        </div>
      </SiteLink>
    </article>
  )
}
