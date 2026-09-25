import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { contactEmail, projectKinds } from '../content'

type FieldId = 'brief-name' | 'brief-email' | 'brief-kind' | 'brief-message'

type Values = Record<FieldId, string>

const initialValues: Values = {
  'brief-name': '',
  'brief-email': '',
  'brief-kind': '',
  'brief-message': '',
}

const checks: { id: FieldId; message: string; valid: (value: string) => boolean }[] = [
  { id: 'brief-name', message: 'Podaj imię.', valid: (value) => value.trim().length > 1 },
  {
    id: 'brief-email',
    message: 'Podaj poprawny e-mail.',
    valid: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
  },
  { id: 'brief-kind', message: 'Wybierz typ projektu.', valid: (value) => value.trim() !== '' },
  {
    id: 'brief-message',
    message: 'Opisz projekt w co najmniej jednym zdaniu.',
    valid: (value) => value.trim().length >= 12,
  },
]

export function BriefForm() {
  const [values, setValues] = useState<Values>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<FieldId, string>>>({})
  const [problems, setProblems] = useState<{ id: FieldId; message: string }[]>([])
  const [attempt, setAttempt] = useState(0)
  const [mailtoHref, setMailtoHref] = useState('')
  const summaryRef = useRef<HTMLDivElement>(null)
  const summaryTitleId = useId()

  useEffect(() => {
    if (attempt === 0) return
    summaryRef.current?.focus()
  }, [attempt])

  function update(id: FieldId, value: string) {
    setValues((current) => ({ ...current, [id]: value }))
    setErrors((current) => ({ ...current, [id]: undefined }))
    setProblems((current) => current.filter((item) => item.id !== id))
    setMailtoHref('')
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: Partial<Record<FieldId, string>> = {}
    const nextProblems: { id: FieldId; message: string }[] = []

    checks.forEach((field) => {
      if (!field.valid(values[field.id])) {
        nextErrors[field.id] = field.message
        nextProblems.push({ id: field.id, message: field.message })
      }
    })

    setErrors(nextErrors)
    setProblems(nextProblems)
    setAttempt((current) => current + 1)

    if (nextProblems.length > 0) {
      setMailtoHref('')
      return
    }

    const name = values['brief-name'].trim()
    const email = values['brief-email'].trim()
    const kind = values['brief-kind']
    const message = values['brief-message'].trim()
    const body = `Imię: ${name}\nE-mail: ${email}\nTyp: ${kind}\n\n${message}`
    const href = `mailto:${contactEmail}?subject=${encodeURIComponent(`Nowy projekt — ${kind}`)}&body=${encodeURIComponent(body)}`
    setMailtoHref(href)
    window.location.href = href
  }

  return (
    <form className="brief" noValidate onSubmit={onSubmit}>
      {problems.length > 0 ? (
        <div
          ref={summaryRef}
          id="form-errors"
          className="form-errors"
          tabIndex={-1}
          aria-labelledby={summaryTitleId}
        >
          <p id={summaryTitleId}>Uzupełnij formularz, zanim go wyślesz.</p>
          <ul>
            {problems.map((problem) => (
              <li key={problem.id}>
                <a
                  href={`#${problem.id}`}
                  onClick={(event) => {
                    event.preventDefault()
                    document.getElementById(problem.id)?.focus()
                  }}
                >
                  {problem.message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="form-row">
        <Field
          id="brief-name"
          label="Imię"
          error={errors['brief-name']}
          value={values['brief-name']}
          autoComplete="name"
          onChange={(value) => update('brief-name', value)}
        />
        <Field
          id="brief-email"
          label="E-mail"
          error={errors['brief-email']}
          value={values['brief-email']}
          type="email"
          autoComplete="email"
          inputMode="email"
          onChange={(value) => update('brief-email', value)}
        />
      </div>

      <div className="field">
        <label htmlFor="brief-kind">Typ projektu</label>
        <select
          id="brief-kind"
          name="kind"
          value={values['brief-kind']}
          aria-required="true"
          aria-invalid={errors['brief-kind'] ? 'true' : 'false'}
          aria-describedby="brief-kind-error"
          onChange={(event) => update('brief-kind', event.target.value)}
        >
          <option value="">Wybierz</option>
          {projectKinds.map((kind) => (
            <option key={kind} value={kind}>
              {kind}
            </option>
          ))}
        </select>
        <p id="brief-kind-error" className="field-error">
          {errors['brief-kind'] ?? ''}
        </p>
      </div>

      <div className="field">
        <label htmlFor="brief-message">Na czym polega projekt</label>
        <textarea
          id="brief-message"
          name="message"
          rows={6}
          value={values['brief-message']}
          aria-required="true"
          aria-invalid={errors['brief-message'] ? 'true' : 'false'}
          aria-describedby="brief-message-error"
          onChange={(event) => update('brief-message', event.target.value)}
        />
        <p id="brief-message-error" className="field-error">
          {errors['brief-message'] ?? ''}
        </p>
      </div>

      <div className="actions">
        <button className="btn btn-primary" type="submit">
          Przygotuj wiadomość
        </button>
      </div>

      <p className="form-ok" role="status" aria-live="polite">
        {mailtoHref ? (
          <>
            Wiadomość jest gotowa. Otwieram ją w programie pocztowym.{' '}
            <a href={mailtoHref}>Jeśli program pocztowy się nie otworzył, użyj tego linku.</a>
          </>
        ) : null}
      </p>
    </form>
  )
}

function Field({
  id,
  label,
  error,
  value,
  onChange,
  type = 'text',
  autoComplete,
  inputMode,
}: {
  id: FieldId
  label: string
  error?: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email'
  autoComplete?: string
  inputMode?: 'email'
}) {
  const errorId = `${id}-error`
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-required="true"
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={errorId}
        onChange={(event) => onChange(event.target.value)}
      />
      <p id={errorId} className="field-error">
        {error ?? ''}
      </p>
    </div>
  )
}
