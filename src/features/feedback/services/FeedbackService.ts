import { feedbackEntries } from '../../../data/feedback'
import type { Feedback, FeedbackFormData } from '../types/types'

const FEEDBACK_API = 'https://jsonplaceholder.typicode.com/posts'

export class FeedbackService {
  public async getFeedback(): Promise<Feedback[]> {
    await delay(200)
    return [...feedbackEntries]
  }

  public async submitFeedback(data: FeedbackFormData): Promise<Feedback> {
    const response = await fetch(FEEDBACK_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: data.title,
        body: JSON.stringify(data),
        userId: 1,
      }),
    })

    if (!response.ok) {
      throw new Error(`Feedback submit failed: ${response.status}`)
    }

    const entry: Feedback = {
      ...data,
      id: feedbackEntries.length + 1,
      submittedAt: new Date().toISOString(),
    }
    feedbackEntries.push(entry)
    return entry
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const feedbackService = new FeedbackService()