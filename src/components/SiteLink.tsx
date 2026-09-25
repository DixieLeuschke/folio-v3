import type { ReactNode } from 'react'
import { toPublicPath, useRouter } from '../router'

type SiteLinkProps = {
  href: string
  className?: string
  children: ReactNode
  onNavigate?: () => void
}

export function SiteLink({ href, className, children, onNavigate }: SiteLinkProps) {
  const { navigate } = useRouter()

  return (
    <a
      href={toPublicPath(href)}
      className={className}
      onClick={(event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return
        }
        event.preventDefault()
        onNavigate?.()
        navigate(href)
      }}
    >
      {children}
    </a>
  )
}
