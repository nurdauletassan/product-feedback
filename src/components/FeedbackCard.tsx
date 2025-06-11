import { Box, Card, CardBody, CardHeader, Flex, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import { FaThumbsUp, FaThumbsDown, FaEdit, FaTrash } from 'react-icons/fa'
import { Feedback, useFeedbackStore } from '../store/feedbackStore'
import EditFeedbackModal from './EditFeedbackModal'

interface FeedbackCardProps {
  feedback: Feedback
}

export default function FeedbackCard({ feedback }: FeedbackCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { likeFeedback, dislikeFeedback, removeFeedback } = useFeedbackStore()

  return (
    <Card mb={4}>
      <CardHeader>
        <Flex justify="space-between" align="center">
          <Text fontWeight="bold" fontSize="lg">
            {feedback.text}
          </Text>
          <Flex gap={2}>
            <IconButton
              aria-label="Edit feedback"
              icon={<FaEdit />}
              onClick={onOpen}
              size="sm"
            />
            <IconButton
              aria-label="Delete feedback"
              icon={<FaTrash />}
              onClick={() => removeFeedback(feedback.id)}
              size="sm"
              colorScheme="red"
            />
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex justify="space-between" align="center">
          <Text color="gray.500">{feedback.category}</Text>
          <Flex gap={4}>
            <Box>
              <IconButton
                aria-label="Like"
                icon={<FaThumbsUp />}
                onClick={() => likeFeedback(feedback.id)}
                size="sm"
                mr={2}
              />
              <Text as="span">{feedback.likes}</Text>
            </Box>
            <Box>
              <IconButton
                aria-label="Dislike"
                icon={<FaThumbsDown />}
                onClick={() => dislikeFeedback(feedback.id)}
                size="sm"
                mr={2}
              />
              <Text as="span">{feedback.dislikes}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardBody>
      <EditFeedbackModal
        isOpen={isOpen}
        onClose={onClose}
        feedbackId={feedback.id}
        initialText={feedback.text}
      />
    </Card>
  )
} 