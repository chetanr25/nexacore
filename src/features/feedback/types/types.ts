export type FeedbackRating = 'low' | 'medium' | 'high' | 'very-high'

export type FeedbackRatings = {
  shoppingExperience: FeedbackRating
  itemsVariety: FeedbackRating
  support: FeedbackRating
}

export type FeedbackFormData = {
  email: string
  title: string
  ratings: FeedbackRatings
  comments: string
}

export type Feedback = FeedbackFormData & {
  id: number
  submittedAt: string
}