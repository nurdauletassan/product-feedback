import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Category, useFeedbackStore } from '../store/feedbackStore'

export default function AddFeedbackForm() {
  const [text, setText] = useState('')
  const [category, setCategory] = useState<Category>('Feature')
  const { addFeedback } = useFeedbackStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      addFeedback({ text, category })
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Feedback Text</FormLabel>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your feedback"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <Select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
            <option value="UI">UI</option>
            <option value="Performance">Performance</option>
            <option value="Feature">Feature</option>
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full">
          Add Feedback
        </Button>
      </VStack>
    </form>
  )
} 