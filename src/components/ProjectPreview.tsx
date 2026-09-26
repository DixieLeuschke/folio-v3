import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import type { ProjectPreview as PreviewData } from '../content'
import { toPublicPath } from '../router'

type Viewport = 'fit' | 'phone' | 'desktop'

const viewportLabels: Record<Viewport, string> = {
  fit: 'Dopasuj',
  phone: 'Telefon',
  desktop: 'Pulpit',
}

function viewportsFor(canvas: PreviewData['canvas']): Viewport[] {
  return canvas === 'wide' ? ['fit', 'phone', 'desktop'] : ['fit', 'phone']
}

function previewDomId(prefix: string, file: string) {
  return `${prefix}-${file.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')}`
}

export function ProjectPreview({ projectTitle, previews }: { projectTitle: string; previews: PreviewData[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [viewport, setViewport] = useState<Viewport>('fit')
  const [isLoading, setIsLoading] = useState(true)
  const [frameVersion, setFrameVersion] = useState(0)
  const descriptionId = useId()
  const panelId = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const active = previews[activeIndex] ?? previews[0]
  const hasTabs = previews.length > 1
  const canvas = active?.canvas
  const sizes = canvas ? viewportsFor(canvas) : []

  useEffect(() => {
    setActiveIndex(0)
    setViewport('fit')
  }, [projectTitle])

  useEffect(() => {
    if (!canvas) return
    if (!viewportsFor(canvas).includes(viewport)) setViewport('fit')
  }, [canvas, viewport])

  if (!active) return null

  const source = `${toPublicPath(`/work/${active.file}`)}?embed=1`
  const activeTabId = previewDomId('preview-tab', active.file)

  function selectPreview(index: number) {
    setIsLoading(true)
    setActiveIndex(index)
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!hasTabs) return
    const last = previews.length - 1
    let next = activeIndex
    if (event.key === 'ArrowRight') next = activeIndex === last ? 0 : activeIndex + 1
    else if (event.key === 'ArrowLeft') next = activeIndex === 0 ? last : activeIndex - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last
    else return

    event.preventDefault()
    selectPreview(next)
    queueMicrotask(() => tabRefs.current[next]?.focus())
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
        {hasTabs ? (
          <div className="preview__tabs" role="tablist" aria-label="Widoki projektu" onKeyDown={onTabKeyDown}>
            {previews.map((preview, index) => (
              <button
                key={preview.file}
                ref={(node) => {
                  tabRefs.current[index] = node
                }}
                id={previewDomId('preview-tab', preview.file)}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls={panelId}
                tabIndex={activeIndex === index ? 0 : -1}
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
          {sizes.map((value) => (
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

      <div
        className={`preview__stage preview__stage--${viewport}`}
        role={hasTabs ? 'tabpanel' : undefined}
        id={hasTabs ? panelId : undefined}
        aria-labelledby={hasTabs ? activeTabId : undefined}
      >
        <div className="preview__browser" aria-busy={isLoading}>
          <div className="preview__chrome" aria-hidden="true">
            <span />
            <span />
            <span />
            <p>{active.file}</p>
          </div>
          {isLoading ? (
            <div className="preview__loading">
              <span />
              Ładowanie podglądu…
            </div>
          ) : null}
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
