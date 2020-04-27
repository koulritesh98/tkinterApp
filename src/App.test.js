import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import App from './App'
import Quiz from './components/Quiz'
import SelectionQuiz from './components/QuizSelection'
import QuizService from './services/QuizService'

jest.mock('./components/Quiz')
jest.mock('./components/QuizSelection')
jest.mock('./services/QuizService')

describe(App, () => {
  const service = new QuizService();

  it('renders the app', () => {
    const { queryByText } = render(<App quizService={service} />)
    expect(queryByText('PubQuiz')).not.toBeNull()
  })

  describe('QuizSelection', () => {
    it('goes to the QuizSelection when no quiz is selected', () => {
      const { queryByText } = render(<App quizService={service} />)

      expect(queryByText('MockedQuizSelection')).not.toBeNull()
      expect(queryByText('MockedQuiz')).toBeNull()
    })

    it('retrieves quizes from service', () => {
      const mockedList = jest.fn()
      service.list = mockedList

      render(<App quizService={service} />)

      expect(mockedList).toHaveBeenCalled()
    })
  })

  describe('Starting a Quiz', () => {
    it('goes to the Quiz when quiz is selected', () => {
      const { queryByText } = render(<App quizService={service} />)

      fireEvent.click(queryByText('Select'))

      expect(queryByText('MockedQuizSelection')).toBeNull()
      expect(queryByText('MockedQuiz')).not.toBeNull()
    })

    it('loads the selected quiz', () => {
      const mockedLoad = jest.fn()
      service.loadQuiz = mockedLoad

      const { queryByText } = render(<App quizService={service} />)
      fireEvent.click(queryByText('Select'))

      expect(mockedLoad).toHaveBeenCalledWith(1)
    })
  })
})
