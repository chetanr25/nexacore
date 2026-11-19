import { useState, type FormEvent } from 'react'
import { feedbackService } from '../services/FeedbackService'
import type { FeedbackFormData, FeedbackRating, FeedbackRatings } from '../types/types'
import { RATING_FIELDS, RATING_OPTIONS, type FeedbackFormProps } from './feedbackFormShared'

type FeedbackFormState = {
  email: string
  title: string
  comments: string
  ratings: Partial<FeedbackRatings>
}

const EMPTY_FORM: FeedbackFormState = {
  email: '',
  title: '',
  comments: '',
  ratings: {},
}

function validateForm(data: FeedbackFormState): string | null {
  const email = data.email.trim()
  if (!email) return 'Email is required.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address.'

  const title = data.title.trim()
  if (!title) return 'Title is required.'
  if (title.length < 10) return 'Title must be at least 10 characters.'

  for (const { key, label } of RATING_FIELDS) {
    if (!data.ratings[key]) return `Please select a rating for ${label.toLowerCase()}.`
  }

  if (data.comments.length > 250) return 'Comments must be 250 characters or fewer.'

  return null
}

export function FeedbackFormPlain({ onSubmitted }: FeedbackFormProps) {
  const [form, setForm] = useState<FeedbackFormState>(EMPTY_FORM)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const setRating = (key: keyof FeedbackRatings, value: FeedbackRating) => {
    setForm((prev) => ({
      ...prev,
      ratings: { ...prev.ratings, [key]: value },
    }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    const validationError = validateForm(form)
    if (validationError) {
      setError(validationError)
      return
    }

    const payload: FeedbackFormData = {
      email: form.email.trim(),
      title: form.title.trim(),
      comments: form.comments,
      ratings: form.ratings as FeedbackRatings,
    }

    setSubmitting(true)
    try {
      await feedbackService.submitFeedback(payload)
      setForm(EMPTY_FORM)
      onSubmitted?.()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="feedback-form" onSubmit={onSubmit} noValidate>
      <p className="feedback-form__variant-label">Variant: Plain TypeScript (if validation)</p>

      <label>
        Email <span aria-hidden="true">*</span>
        <input
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </label>

      <label>
        Title <span aria-hidden="true">*</span>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <span className="feedback-form__hint">At least 10 characters</span>
      </label>

      {RATING_FIELDS.map(({ key, label }) => (
        <fieldset key={key} className="feedback-form__ratings">
          <legend>
            {label} <span aria-hidden="true">*</span>
          </legend>
          {RATING_OPTIONS.map(({ value, label: optionLabel }) => (
            <label key={value} className="feedback-form__radio">
              <input
                type="radio"
                name={key}
                value={value}
                checked={form.ratings[key] === value}
                onChange={() => setRating(key, value)}
              />
              {optionLabel}
            </label>
          ))}
        </fieldset>
      ))}

      <label>
        Comments
        <textarea
          rows={4}
          maxLength={250}
          value={form.comments}
          onChange={(e) => setForm({ ...form, comments: e.target.value })}
        />
        <span className="feedback-form__hint">{form.comments.length}/250</span>
      </label>

      {error && (
        <p className="feedback-form__error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit feedback'}
      </button>
    </form>
  )
}