import { useEffect, useState } from 'react'
import { feedbackService } from '../services/FeedbackService'
import type { Feedback } from '../types/types'
import { FeedbackFormPlain } from './FeedbackFormPlain'
import { FeedbackFormRhf } from './FeedbackFormRhf'
import { FeedbackFormZod } from './FeedbackFormZod'

type FormVariant = 'plain' | 'rhf' | 'zod'

const VARIANTS: { id: FormVariant; label: string }[] = [
  { id: 'plain', label: '1. Plain TS (if)' },
  { id: 'rhf', label: '2. RHF (no Zod)' },
  { id: 'zod', label: '3. RHF + Zod' },
]

export function FeedbackPage() {
  const [entries, setEntries] = useState<Feedback[]>([])
  const [loadError, setLoadError] = useState('')
  const [variant, setVariant] = useState<FormVariant>('rhf')

  const loadFeedback = () => {
    feedbackService
      .getFeedback()
      .then(setEntries)
      .catch((e: Error) => setLoadError(e.message))
  }

  useEffect(() => {
    loadFeedback()
  }, [])

  const FormComponent =
    variant === 'plain'
      ? FeedbackFormPlain
      : variant === 'zod'
        ? FeedbackFormZod
        : FeedbackFormRhf

  return (
    <section className="product-list-page">
      <h1 className="product-list-page__title">Feedback</h1>
      {loadError && <p className="store-empty">{loadError}</p>}

      <fieldset className="feedback-form__variant-picker">
        <legend>Form implementation</legend>
        {VARIANTS.map(({ id, label }) => (
          <label key={id} className="feedback-form__radio">
            <input
              type="radio"
              name="form-variant"
              value={id}
              checked={variant === id}
              onChange={() => setVariant(id)}
            />
            {label}
          </label>
        ))}
      </fieldset>

      <FormComponent onSubmitted={loadFeedback} />

      {entries.length > 0 && (
        <div className="feedback-list">
          <h2>Recent submissions</h2>
          <ul>
            {entries.map((entry) => (
              <li key={entry.id}>
                <strong>{entry.title}</strong> — {entry.email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}