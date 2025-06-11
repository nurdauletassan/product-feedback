import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useFeedbackStore } from '../store/feedbackStore'

interface EditFeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  feedbackId: string
  initialText: string
}

export default function EditFeedbackModal({
  isOpen,
  onClose,
  feedbackId,
  initialText,
}: EditFeedbackModalProps) {
  const [text, setText] = useState(initialText)
  const { updateFeedback } = useFeedbackStore()

  const handleSubmit = () => {
    updateFeedback(feedbackId, text)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Feedback</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Feedback Text</FormLabel>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your feedback"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
} 