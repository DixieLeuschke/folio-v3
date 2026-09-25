import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type RouterValue = {
  path: string
  navigate: (to: string) => void
}

const RouterContext = createContext<RouterValue | null>(null)

export function normalizePath(pathname: string) {
  const trimmed = pathname.replace(/\/+$/, '')
  return trimmed === '' ? '/' : trimmed
}

function basePath() {
  const base = import.meta.env.BASE_URL
  return base.endsWith('/') ? base.slice(0, -1) : base
}

export function toAppPath(pathname: string) {
  const prefix = basePath()
  const stripped = prefix && pathname.startsWith(prefix) ? pathname.slice(prefix.length) : pathname
  return normalizePath(stripped || '/')
}

export function toPublicPath(path: string) {
  if (!path.startsWith('/')) return path
  return `${basePath()}${path}`
}

export function reveal(hash: string) {
  if (!hash) {
    window.scrollTo(0, 0)
    return
  }

  const el = document.getElementById(hash.slice(1))
  if (!el) return
  el.scrollIntoView()
  el.focus({ preventScroll: true })
}

function scheduleReveal(hash: string) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => reveal(hash))
  })
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => toAppPath(window.location.pathname))

  const navigate = useCallback((to: string) => {
    const url = new URL(toPublicPath(to), window.location.origin)
    const next = toAppPath(url.pathname)
    const samePath = next === toAppPath(window.location.pathname)
    window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`)
    setPath(next)
    if (samePath) scheduleReveal(url.hash)
  }, [])

  useEffect(() => {
    const onPop = () => {
      setPath(toAppPath(window.location.pathname))
      scheduleReveal(window.location.hash)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const value = useMemo(() => ({ path, navigate }), [path, navigate])

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter() {
  const value = useContext(RouterContext)
  if (!value) throw new Error('useRouter poza RouterProvider')
  return value
}
