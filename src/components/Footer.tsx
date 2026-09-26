import { contactEmail, navItems } from '../content'
import { SiteLink } from './SiteLink'
import { useActiveSection } from '../useActiveSection'

export function Footer() {
  const activeSection = useActiveSection()

  return (
    <footer className="site-footer">
      <div className="wrap footer__grid">
        <div>
          <p className="brand__mark brand__mark--static" aria-hidden="true">
            JP
          </p>
          <p className="footer__name">John Pavulon</p>
          <p className="text-muted">Strony internetowe, aplikacje mobilne i projekty interfejsów.</p>
        </div>
        <nav aria-label="Sekcje w stopce">
          <ul className="footer__links">
            {navItems.map((item) => (
              <li key={item.id}>
                <SiteLink href={item.href} current={activeSection === item.id}>
                  {item.label}
                </SiteLink>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="type-badge text-muted">E-mail</p>
          <p>
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
