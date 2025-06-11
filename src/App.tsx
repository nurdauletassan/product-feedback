import {
  Box,
  Container,
  Flex,
  Heading,
  Select,
  Stack,
  useColorMode,
  IconButton,
  Text,
} from '@chakra-ui/react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useFeedbackStore } from './store/feedbackStore'
import AddFeedbackForm from './components/AddFeedbackForm'
import FeedbackCard from './components/FeedbackCard'
import { useState } from 'react'

type SortOption = 'date' | 'popularity'

export default function App() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { feedbacks, theme, toggleTheme } = useFeedbackStore()
  const [sortBy, setSortBy] = useState<SortOption>('date')

  const sortedFeedbacks = [...feedbacks].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
    return b.likes - b.dislikes - (a.likes - a.dislikes)
  })

  return (
    <Box minH="100vh" bg={colorMode === 'light' ? 'gray.50' : 'gray.900'}>
      <Container maxW="container.md" py={8}>
        <Flex justify="space-between" align="center" mb={8}>
          <Heading>Product Feedback Board</Heading>
          <IconButton
            aria-label="Toggle theme"
            icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
            onClick={() => {
              toggleColorMode()
              toggleTheme()
            }}
          />
        </Flex>

        <Stack spacing={8}>
          <Box bg={colorMode === 'light' ? 'white' : 'gray.800'} p={6} borderRadius="lg">
            <AddFeedbackForm />
          </Box>

          <Box>
            <Flex justify="space-between" align="center" mb={4}>
              <Flex align="center" gap={2}>
                <Heading size="md">Feedback List</Heading>
                <Text color="gray.500">({feedbacks.length})</Text>
              </Flex>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                width="200px"
              >
                <option value="date">Sort by Date</option>
                <option value="popularity">Sort by Popularity</option>
              </Select>
            </Flex>

            {sortedFeedbacks.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} />
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  )
} 