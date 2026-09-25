import { useState } from 'react'
import { contactEmail } from '../content'

function fallbackCopy(value: string) {
  try {
    const field = document.createElement('textarea')
    field.value = value
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.left = '-9999px'
    document.body.appendChild(field)
    field.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(field)
    return ok
  } catch {
    return false
  }
}

export function CopyAddress() {
  const [message, setMessage] = useState('')

  async function onCopy() {
    let ok = false
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(contactEmail)
        ok = true
      }
    } catch {
      ok = false
    }
    if (!ok) ok = fallbackCopy(contactEmail)
    const next = ok
      ? 'Adres skopiowany'
      : 'Nie udało się skopiować. Zaznacz adres albo użyj mailto.'
    setMessage('')
    requestAnimationFrame(() => setMessage(next))
  }

  return (
    <div className="copy-address">
      <div className="actions">
        <button className="btn btn-ghost" type="button" onClick={onCopy}>
          Kopiuj adres
        </button>
        <a className="btn btn-ghost" href={`mailto:${contactEmail}`}>
          Otwórz mailto
        </a>
      </div>
      <p className="copy-status" aria-live="polite">
        {message}
      </p>
    </div>
  )
}
