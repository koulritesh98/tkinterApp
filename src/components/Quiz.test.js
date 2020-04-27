import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Quiz from './Quiz';
import Results from './Results';

jest.mock('./Results')

describe(Quiz, () => {
  let questions;

  beforeEach(() => {
    questions = [{
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

    jest.useFakeTimers();
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  it('renders a question', () => {
    const { queryByText } = render(<Quiz questions={questions} />)
    expect(queryByText(questions[0].text)).not.toBeNull()
  })

  it('goes to the next question', async () => {
    const { queryByText, getByLabelText } = render(<Quiz questions={questions} />)

    await fireEvent.click(getByLabelText(questions[0].answer))
    jest.advanceTimersByTime(questions[0].timeLimitInSeconds * 1000 + 1000)

    expect(queryByText(questions[1].text)).not.toBeNull()
  })

  it('goes to the results screen, passing the answers', async () => {
    const { queryByText, getByLabelText } = render(<Quiz questions={questions} />)

    await fireEvent.click(getByLabelText(questions[0].answer))
    jest.advanceTimersByTime(questions[0].timeLimitInSeconds * 1000 + 1000)

    await fireEvent.click(getByLabelText(questions[1].answer))
    jest.advanceTimersByTime(questions[1].timeLimitInSeconds * 1000 + 1000)

    expect(queryByText('MockedResults')).not.toBeNull()
    expect(queryByText('Question0: ' + questions[0].text)).not.toBeNull()
    expect(queryByText('PlayerAnswer0: ' + questions[0].playerAnswer)).not.toBeNull()
    expect(queryByText('Question1: ' + questions[1].text)).not.toBeNull()
    expect(queryByText('PlayerAnswer1: ' + questions[1].playerAnswer)).not.toBeNull()
  })

  it('goes to the results screen without answer', async() => {
    const { queryByText } = render(<Quiz questions={questions} />)

    jest.advanceTimersByTime(questions[0].timeLimitInSeconds * 1000 + 1000)
    jest.advanceTimersByTime(questions[1].timeLimitInSeconds * 1000 + 1000)

    expect(queryByText('MockedResults')).not.toBeNull()
    expect(queryByText('Question0: ' + questions[0].text)).not.toBeNull()
    expect(queryByText('PlayerAnswer0: null')).not.toBeNull()
    expect(queryByText('Question1: ' + questions[1].text)).not.toBeNull()
    expect(queryByText('PlayerAnswer1: null')).not.toBeNull()
  })
})
