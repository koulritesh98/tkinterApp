import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import QuizSelection from './QuizSelection'

describe(QuizSelection, () => {
  const text = "What quiz would you like to play?"
  const index = [
    {
      "id": "1",
      "name": "Nerd Quiz",
      "file": "nerd-quiz.json"
    },
    {
      "id": "2",
      "name": "Rock Quiz",
      "file": "rock-quiz.json"
    }
  ]

  it('asks which quiz the player would like to select', () => {
    const { queryByText } = render(<QuizSelection index={index} />)
    expect(queryByText(text)).not.toBeNull()
  })

  it('shows all the quizes', () => {
    const { queryByText } = render(<QuizSelection index={index} />)
    expect(queryByText(index[0].name)).not.toBeNull()
    expect(queryByText(index[1].name)).not.toBeNull()
  })

  it('selects a quiz', () => {
    const callback = jest.fn()
    const { getByText } = render(<QuizSelection index={index} handleQuizSelection={callback} />)

    fireEvent.click(getByText(index[1].name))

    expect(callback).toHaveBeenCalledWith(index[1].id)
  })
})
