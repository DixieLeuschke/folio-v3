import { useEffect, useState } from 'react'
import { navItems } from './content'
import { useRouter } from './router'

const sectionIds = navItems.map((item) => item.id)

export function useActiveSection() {
  const { path } = useRouter()
  const [active, setActive] = useState('')

  useEffect(() => {
    if (path !== '/') {
      setActive(path.startsWith('/prace/') ? 'prace' : '')
      return
    }

    const hash = window.location.hash.slice(1)
    if (sectionIds.includes(hash as (typeof sectionIds)[number])) setActive(hash)

    const ratios = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })
        let next = ''
        let best = 0
        ratios.forEach((ratio, id) => {
          if (ratio > best) {
            best = ratio
            next = id
          }
        })
        if (next) setActive(next)
      },
      { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.15, 0.35, 0.6, 1] },
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [path])

  return active
}
