import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Category = 'UI' | 'Performance' | 'Feature'

export interface Feedback {
  id: string
  text: string
  category: Category
  createdAt: string
  likes: number
  dislikes: number
}

interface FeedbackState {
  feedbacks: Feedback[]
  theme: 'light' | 'dark'
  addFeedback: (feedback: Omit<Feedback, 'id' | 'createdAt' | 'likes' | 'dislikes'>) => void
  removeFeedback: (id: string) => void
  updateFeedback: (id: string, text: string) => void
  likeFeedback: (id: string) => void
  dislikeFeedback: (id: string) => void
  toggleTheme: () => void
}

export const useFeedbackStore = create<FeedbackState>()(
  persist(
    (set) => ({
      feedbacks: [],
      theme: 'light',
      addFeedback: (feedback) =>
        set((state) => ({
          feedbacks: [
            ...state.feedbacks,
            {
              ...feedback,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              likes: 0,
              dislikes: 0,
            },
          ],
        })),
      removeFeedback: (id) =>
        set((state) => ({
          feedbacks: state.feedbacks.filter((feedback) => feedback.id !== id),
        })),
      updateFeedback: (id, text) =>
        set((state) => ({
          feedbacks: state.feedbacks.map((feedback) =>
            feedback.id === id ? { ...feedback, text } : feedback
          ),
        })),
      likeFeedback: (id) =>
        set((state) => ({
          feedbacks: state.feedbacks.map((feedback) =>
            feedback.id === id ? { ...feedback, likes: feedback.likes + 1 } : feedback
          ),
        })),
      dislikeFeedback: (id) =>
        set((state) => ({
          feedbacks: state.feedbacks.map((feedback) =>
            feedback.id === id ? { ...feedback, dislikes: feedback.dislikes + 1 } : feedback
          ),
        })),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'feedback-storage',
    }
  )
) 