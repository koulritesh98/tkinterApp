import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Question from './Question';

describe(Question, () => {
  const question = {
    text: 'What is the answer to life, the universe and everything?',
    choices: ['40', '41', '42', '43']
  }

  it('shows the question', () => {
    const { queryByText } = render(<Question question={question} />)

    expect(queryByText(question.text)).not.toBeNull()
  })

  it('shows the choices', () => {
    const { queryByDisplayValue } = render(<Question question={question} />)

    const choices = question.choices
    expect(queryByDisplayValue(choices[0])).not.toBeNull()
    expect(queryByDisplayValue(choices[1])).not.toBeNull()
    expect(queryByDisplayValue(choices[2])).not.toBeNull()
    expect(queryByDisplayValue(choices[3])).not.toBeNull()
  })

  it("handles the player's answer", () => {
    const mockedHandleAnswer = jest.fn()
    const { getByDisplayValue, getByTestId } = render(<Question question={question} handlePlayerAnswer={mockedHandleAnswer}/>)

    fireEvent.click(getByDisplayValue('42'))

    expect(mockedHandleAnswer).toBeCalledWith('42')
  })
})
