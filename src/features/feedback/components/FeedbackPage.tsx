import { useEffect, useState } from 'react'
import { feedbackService } from '../services/FeedbackService'
import type { Feedback } from '../types/types'
import { FeedbackFormPlain } from './FeedbackFormPlain'
import { FeedbackFormRhf } from './FeedbackFormRhf'
import { FeedbackFormZod } from './FeedbackFormZod'
import './FeedbackPage.css'

type FormVariant = 'plain' | 'rhf' | 'zod'

const VARIANTS: { id: FormVariant; label: string; short: string }[] = [
  { id: 'plain', label: 'Plain TypeScript', short: 'if validation' },
  { id: 'rhf', label: 'React Hook Form', short: 'no Zod' },
  { id: 'zod', label: 'RHF + Zod', short: 'schema resolver' },
]

function formatRating(value: string) {
  return value.replace(/-/g, ' ')
}

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

  const activeVariant = VARIANTS.find((v) => v.id === variant)!

  return (
    <section className="product-list-page feedback-page">
      <header className="feedback-page__header">
        <h1 className="product-list-page__title">Share your feedback</h1>
        <p className="feedback-page__subtitle">
          Tell us about your shopping experience. Compare three form styles below — same
          validation rules, different implementation.
        </p>
      </header>

      {loadError && <p className="store-empty">{loadError}</p>}

      <div className="feedback-page__tabs" role="tablist" aria-label="Form implementation">
        {VARIANTS.map(({ id, label, short }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={variant === id}
            className={`feedback-page__tab${variant === id ? ' is-active' : ''}`}
            onClick={() => setVariant(id)}
          >
            {label}
            <span className="feedback-form__hint"> · {short}</span>
          </button>
        ))}
      </div>

      <div className="feedback-page__layout">
        <FormComponent onSubmitted={loadFeedback} />

        <aside className="feedback-panel" aria-labelledby="recent-feedback-heading">
          <h2 id="recent-feedback-heading" className="feedback-panel__title">
            Recent submissions
          </h2>

          {entries.length === 0 ? (
            <p className="feedback-panel__empty">
              Nothing yet for <strong>{activeVariant.label}</strong>. Submit the form to see entries
              here.
            </p>
          ) : (
            <ul className="feedback-list">
              {entries.map((entry) => (
                <li key={entry.id} className="feedback-card">
                  <h3 className="feedback-card__title">{entry.title}</h3>
                  <p className="feedback-card__email">{entry.email}</p>
                  <div className="feedback-card__meta">
                    <span className="feedback-card__tag">
                      Shop: {formatRating(entry.ratings.shoppingExperience)}
                    </span>
                    <span className="feedback-card__tag">
                      Variety: {formatRating(entry.ratings.itemsVariety)}
                    </span>
                    <span className="feedback-card__tag">
                      Support: {formatRating(entry.ratings.support)}
                    </span>
                  </div>
                  <time className="feedback-card__time" dateTime={entry.submittedAt}>
                    {new Date(entry.submittedAt).toLocaleString()}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </section>
  )
}