import { useEffect, useId, useState } from 'react'
import type { ProjectPreview as PreviewData } from '../content'

type Viewport = 'fit' | 'phone' | 'desktop'

const viewportLabels: Record<Viewport, string> = {
  fit: 'Dopasuj',
  phone: 'Telefon',
  desktop: 'Pulpit',
}

export function ProjectPreview({ projectTitle, previews }: { projectTitle: string; previews: PreviewData[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [viewport, setViewport] = useState<Viewport>('fit')
  const [isLoading, setIsLoading] = useState(true)
  const [frameVersion, setFrameVersion] = useState(0)
  const descriptionId = useId()
  const active = previews[activeIndex] ?? previews[0]

  useEffect(() => {
    setActiveIndex(0)
    setViewport('fit')
  }, [projectTitle])

  if (!active) return null

  const source = `/work/${active.file}?embed=1`

  function selectPreview(index: number) {
    setIsLoading(true)
    setActiveIndex(index)
  }

  return (
    <section className="preview" aria-labelledby="preview-title">
      <div className="preview__heading">
        <div>
          <p className="type-badge text-muted">Działająca wersja</p>
          <h2 id="preview-title">Podgląd projektu</h2>
        </div>
        <a className="preview__external" href={source} target="_blank" rel="noreferrer">
          Pełny ekran <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="preview__toolbar">
        {previews.length > 1 ? (
          <div className="preview__tabs" role="tablist" aria-label="Widoki projektu">
            {previews.map((preview, index) => (
              <button
                key={preview.file}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                onClick={() => selectPreview(index)}
              >
                {preview.label}
              </button>
            ))}
          </div>
        ) : (
          <p className="preview__view-name">{active.label}</p>
        )}

        <div className="preview__sizes" aria-label="Szerokość podglądu">
          {(Object.keys(viewportLabels) as Viewport[]).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={viewport === value}
              onClick={() => setViewport(value)}
            >
              {viewportLabels[value]}
            </button>
          ))}
        </div>
      </div>

      <p id={descriptionId} className="preview__description text-muted">
        {active.description}
      </p>

      <div className={`preview__stage preview__stage--${viewport}`}>
        <div className="preview__browser" aria-busy={isLoading}>
          <div className="preview__chrome" aria-hidden="true">
            <span />
            <span />
            <span />
            <p>{active.file}</p>
          </div>
          {isLoading ? <div className="preview__loading"><span />Ładowanie podglądu…</div> : null}
          <iframe
            key={`${active.file}-${frameVersion}`}
            className="preview__frame"
            src={source}
            title={`${projectTitle} — ${active.label}`}
            aria-describedby={descriptionId}
            loading="eager"
            sandbox="allow-scripts allow-forms allow-modals allow-popups"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>

      <button
        className="preview__reload"
        type="button"
        onClick={() => {
          setIsLoading(true)
          setFrameVersion((version) => version + 1)
        }}
      >
        Uruchom ponownie podgląd
      </button>
    </section>
  )
}
