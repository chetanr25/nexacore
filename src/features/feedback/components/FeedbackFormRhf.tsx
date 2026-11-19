import { useForm } from 'react-hook-form'
import { feedbackService } from '../services/FeedbackService'
import type { FeedbackFormData, FeedbackRatings } from '../types/types'
import { FeedbackFormProps, RATING_FIELDS, RATING_OPTIONS } from './feedbackFormShared'

type FeedbackFormValues = {
  email: string
  title: string
  comments: string
  ratings: Partial<FeedbackRatings>
}

const defaultValues: FeedbackFormValues = {
  email: '',
  title: '',
  comments: '',
  ratings: {},
}

export function FeedbackFormRhf({ onSubmitted }: FeedbackFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackFormValues>({ defaultValues, mode: 'onBlur' })

  const comments = watch('comments')

  const onValid = async (values: FeedbackFormValues) => {
    const payload: FeedbackFormData = {
      email: values.email.trim(),
      title: values.title.trim(),
      comments: values.comments,
      ratings: values.ratings as FeedbackRatings,
    }

    try {
      await feedbackService.submitFeedback(payload)
      reset(defaultValues)
      onSubmitted?.()
    } catch (err) {
      setError('root.server', {
        type: 'server',
        message: (err as Error).message,
      })
    }
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit(onValid)} noValidate>
      <p className="feedback-form__variant-label">Variant: React Hook Form (no Zod)</p>

      <label>
        Email <span aria-hidden="true">*</span>
        <input
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          {...register('email', {
            required: 'Email is required.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address.',
            },
          })}
        />
        {errors.email && <span className="feedback-form__error">{errors.email.message}</span>}
      </label>

      <label>
        Title <span aria-hidden="true">*</span>
        <input
          aria-invalid={Boolean(errors.title)}
          {...register('title', {
            required: 'Title is required.',
            minLength: { value: 10, message: 'Title must be at least 10 characters.' },
          })}
        />
        <span className="feedback-form__hint">At least 10 characters</span>
        {errors.title && <span className="feedback-form__error">{errors.title.message}</span>}
      </label>

      {RATING_FIELDS.map(({ key, label }) => {
        const field = `ratings.${key}` as const
        const fieldError = errors.ratings?.[key]

        return (
          <fieldset key={key} className="feedback-form__ratings">
            <legend>
              {label} <span aria-hidden="true">*</span>
            </legend>
            {RATING_OPTIONS.map(({ value, label: optionLabel }) => (
              <label key={value} className="feedback-form__radio">
                <input
                  type="radio"
                  value={value}
                  {...register(field, {
                    required: `Please select a rating for ${label.toLowerCase()}.`,
                  })}
                />
                {optionLabel}
              </label>
            ))}
            {fieldError && (
              <span className="feedback-form__error">{fieldError.message}</span>
            )}
          </fieldset>
        )
      })}

      <label>
        Comments
        <textarea
          rows={4}
          aria-invalid={Boolean(errors.comments)}
          {...register('comments', {
            maxLength: { value: 250, message: 'Comments must be 250 characters or fewer.' },
          })}
        />
        <span className="feedback-form__hint">{comments.length}/250</span>
        {errors.comments && (
          <span className="feedback-form__error">{errors.comments.message}</span>
        )}
      </label>

      {errors.root?.server && (
        <p className="feedback-form__error" role="alert">
          {errors.root.server.message}
        </p>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting…' : 'Submit feedback'}
      </button>
    </form>
  )
}