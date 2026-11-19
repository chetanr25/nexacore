import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type DefaultValues } from 'react-hook-form'
import { feedbackService } from '../services/FeedbackService'
import type { FeedbackFormData } from '../types/types'
import { feedbackFormSchema, type FeedbackFormSchema } from './feedbackFormSchema'
import { RATING_FIELDS, RATING_OPTIONS, type FeedbackFormProps } from './feedbackFormShared'

const defaultValues: DefaultValues<FeedbackFormSchema> = {
  email: '',
  title: '',
  comments: '',
  ratings: {
    shoppingExperience: undefined,
    itemsVariety: undefined,
    support: undefined,
  },
}

export function FeedbackFormZod({ onSubmitted }: FeedbackFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackFormSchema>({
    defaultValues,
    resolver: zodResolver(feedbackFormSchema),
    mode: 'onBlur',
  })

  const comments = watch('comments')

  const onValid = async (values: FeedbackFormSchema) => {
    const payload: FeedbackFormData = {
      email: values.email,
      title: values.title,
      comments: values.comments,
      ratings: values.ratings,
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
      <label>
        Email <span aria-hidden="true">*</span>
        <input
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          {...register('email')}
        />
        {errors.email && <span className="feedback-form__error">{errors.email.message}</span>}
      </label>

      <label>
        Title <span aria-hidden="true">*</span>
        <input aria-invalid={Boolean(errors.title)} {...register('title')} />
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
            <div className="feedback-form__rating-row">
              {RATING_OPTIONS.map(({ value, label: optionLabel }) => (
                <label key={value} className="feedback-form__radio">
                  <input type="radio" value={value} {...register(field)} />
                  {optionLabel}
                </label>
              ))}
            </div>
            {fieldError && (
              <span className="feedback-form__error">{fieldError.message}</span>
            )}
          </fieldset>
        )
      })}

      <label>
        Comments
        <textarea rows={4} aria-invalid={Boolean(errors.comments)} {...register('comments')} />
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