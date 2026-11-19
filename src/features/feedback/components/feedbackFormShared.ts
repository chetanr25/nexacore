import type { FeedbackRating, FeedbackRatings } from '../types/types'

export const RATING_OPTIONS: { value: FeedbackRating; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'very-high', label: 'Very High' },
]

export const RATING_FIELDS: { key: keyof FeedbackRatings; label: string }[] = [
  { key: 'shoppingExperience', label: 'Shopping experience' },
  { key: 'itemsVariety', label: 'Items variety' },
  { key: 'support', label: 'Support' },
]

export type FeedbackFormProps = {
  onSubmitted?: () => void
}