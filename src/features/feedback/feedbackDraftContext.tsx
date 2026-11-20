import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'
import type { FieldValues, UseFormWatch } from 'react-hook-form'
import type { FeedbackRatings } from './types/types'

export type FeedbackDraft = {
  email: string
  title: string
  comments: string
  ratings: Partial<FeedbackRatings>
}

export const EMPTY_FEEDBACK_DRAFT: FeedbackDraft = {
  email: '',
  title: '',
  comments: '',
  ratings: {},
}

type FeedbackDraftContextValue = {
  draft: FeedbackDraft
  setDraft: Dispatch<SetStateAction<FeedbackDraft>>
  clearDraft: () => void
}

const FeedbackDraftContext = createContext<FeedbackDraftContextValue | null>(null)

export function FeedbackDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<FeedbackDraft>(EMPTY_FEEDBACK_DRAFT)

  return (
    <FeedbackDraftContext.Provider
      value={{ draft, setDraft, clearDraft: () => setDraft(EMPTY_FEEDBACK_DRAFT) }}
    >
      {children}
    </FeedbackDraftContext.Provider>
  )
}

export function useFeedbackDraft() {
  const value = useContext(FeedbackDraftContext)
  if (!value) {
    throw new Error('useFeedbackDraft must be used within FeedbackDraftProvider')
  }
  return value
}

export function useSyncRhfToDraft<T extends FieldValues>(watch: UseFormWatch<T>) {
  const { setDraft } = useFeedbackDraft()

  useEffect(() => {
    const subscription = watch((values) => {
      setDraft({
        email: values.email ?? '',
        title: values.title ?? '',
        comments: values.comments ?? '',
        ratings: { ...values.ratings },
      })
    })
    return () => subscription.unsubscribe()
  }, [watch, setDraft])
}