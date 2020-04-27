import React from 'react';
import { render } from '@testing-library/react';
import Results from './Results';

describe(Results, () => {
  const questions = [{
    id: 'unique_id_1',
    text: 'What is the answer to life, the universe and everything?',
    choices: ['40', '41', '42', '43'],
    answer: '42',
    timeLimitInSeconds: 10
  }, {
    id: 'unique_id_2',
    text: 'What is the name of the Colour of Magic?',
    choices: ['Octopus', 'Octarine', 'Ocarina', 'Octagon'],
    answer: 'Octarine',
    timeLimitInSeconds: 5
  }]

  it("shows incorrect when player hasn't answered", () => {
    const { queryByText } = render(<Results questions={questions} />)
    expect(queryByText('Question 0: Incorrect')).not.toBeNull()
    expect(queryByText('Question 1: Incorrect')).not.toBeNull()
  })

  it('shows that all questions were answered correctly', () => {
    questions[0].playerAnswer = '42'
    questions[1].playerAnswer = 'Octarine'

    const { queryByText } = render(<Results questions={questions} />)
    expect(queryByText('Question 0: Correct!')).not.toBeNull()
    expect(queryByText('Question 1: Correct!')).not.toBeNull()
  })

  it('shows that one of the questions was answered correctly', () => {
    questions[0].playerAnswer = '43'
    questions[1].playerAnswer = 'Octarine'

    const { queryByText } = render(<Results questions={questions} />)
    expect(queryByText('Question 0: Incorrect')).not.toBeNull()
    expect(queryByText('Question 1: Correct!')).not.toBeNull()
  })

  it('shows that all questions were answered incorrectly', () => {
    questions[0].playerAnswer = '43'
    questions[1].playerAnswer = 'Octarina'

    const { queryByText } = render(<Results questions={questions} />)
    expect(queryByText('Question 0: Incorrect')).not.toBeNull()
    expect(queryByText('Question 1: Incorrect')).not.toBeNull()
  })
})
