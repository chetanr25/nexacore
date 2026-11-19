import { z } from 'zod'

const feedbackRatingSchema = z.enum(['low', 'medium', 'high', 'very-high'], {
  error: 'Please select a rating.',
})

export const feedbackFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required.')
    .email('Enter a valid email address.'),
  title: z.string().trim().min(10, 'Title must be at least 10 characters.'),
  comments: z.string().max(250, 'Comments must be 250 characters or fewer.'),
  ratings: z.object({
    shoppingExperience: feedbackRatingSchema,
    itemsVariety: feedbackRatingSchema,
    support: feedbackRatingSchema,
  }),
})

export type FeedbackFormSchema = z.infer<typeof feedbackFormSchema>