import React from 'react'
import { render } from '@testing-library/react'
import TimeLimiter from './TimeLimiter'
import ProgressBar from './ProgressBar'

jest.mock('./ProgressBar')

describe(TimeLimiter, () => {
  beforeEach(() => {
    jest.useFakeTimers();
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  it('renders the progress bar', () => {
    const callback = jest.fn()
    const { queryByText } = render(<TimeLimiter callbackFunction={callback} totalTimeInSeconds={1} />)

    expect(queryByText('MockedProgressBar')).not.toBeNull()
  })

  it('notifies when total time has elapsed', () => {
    const callback = jest.fn()
    render(<TimeLimiter callbackFunction={callback} totalTimeInSeconds={1} />)

    jest.runAllTimers()

    expect(callback).toHaveBeenCalled()
  })

  it('passes the initial percentage to the progress bar', () => {
    const callback = jest.fn()
    const { queryByText } = render(<TimeLimiter callbackFunction={callback} totalTimeInSeconds={1} />)

    expect(queryByText('MockedProgressBar')).not.toBeNull()
    expect(queryByText('Percentage: 100')).not.toBeNull()
  })

  it('updates percentage to the progress bar', () => {
    const callback = jest.fn()
    const { queryByText, debug } = render(<TimeLimiter callbackFunction={callback} totalTimeInSeconds={1} />)

    jest.runAllTimers()

    expect(queryByText('MockedProgressBar')).not.toBeNull()
    expect(queryByText('Percentage: 0')).not.toBeNull()
  })

  it('updates percentage multiple times', () => {
    const callback = jest.fn()
    const { queryByText } = render(<TimeLimiter callbackFunction={callback} totalTimeInSeconds={4} />)

    const expectedPercentages = ['100', '75', '50', '25', '0']
    expectedPercentages.forEach((expected) => {
      expect(queryByText('Percentage: ' + expected)).not.toBeNull()
      jest.advanceTimersByTime(1000)
    })
  })
})
