import type { CaseStudy } from '../content'
import { toPublicPath } from '../router'
import { SiteLink } from './SiteLink'

function previewCountLabel(count: number) {
  if (count === 1) return '1 podgląd'
  if (count >= 2 && count <= 4) return `${count} podglądy`
  return `${count} podglądów`
}

export function ProjectCard({
  study,
  featured = false,
}: {
  study: CaseStudy
  featured?: boolean
}) {
  const pair = Boolean(study.thumbnailSecondary)
  const mediaClass = pair ? 'project-card__media project-card__media--pair' : 'project-card__media'

  return (
    <article className={featured ? 'project-card project-card--featured' : 'project-card'}>
      <div className={mediaClass} aria-hidden="true">
        <img
          src={toPublicPath(study.thumbnail)}
          alt=""
          width={1280}
          height={800}
          loading="lazy"
          decoding="async"
        />
        {study.thumbnailSecondary ? (
          <img
            src={toPublicPath(study.thumbnailSecondary)}
            alt=""
            width={1280}
            height={800}
            loading="lazy"
            decoding="async"
          />
        ) : null}
        <span className="project-card__open">Otwórz ↗</span>
      </div>
      <div className="project-card__body">
        <div className="project-card__meta">
          <p className="type-badge text-muted">{study.type}</p>
          <p className="status-badge type-badge">{study.status}</p>
        </div>
        <h3>
          <SiteLink className="project-card__link" href={`/prace/${study.slug}`}>
            {study.title}
            <span className="visually-hidden"> — zobacz projekt</span>
          </SiteLink>
        </h3>
        <p className="text-muted">{study.summary}</p>
        <div className="project-card__foot">
          <p className="project-card__count type-badge text-muted">{previewCountLabel(study.previews.length)}</p>
          <p className="project-card__more" aria-hidden="true">
            Zobacz projekt <span>↗</span>
          </p>
        </div>
      </div>
    </article>
  )
}
