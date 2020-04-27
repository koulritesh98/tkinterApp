import '@testing-library/jest-dom/extend-expect'

import React from 'react'
import { render } from '@testing-library/react'
import ProgressBar from './ProgressBar'

describe(ProgressBar, () => {
  it('uses the percentage as width', () => {
    const { getByTestId } = render(<ProgressBar percentage={42} />)

    expect(getByTestId('progress-bar')).toHaveStyle('width: 42%;')
  })

  it("is high when it's 100%", () => {
    const { getByTestId } = render(<ProgressBar percentage={100} />)
    expect(getByTestId('progress-bar')).toHaveClass('high')
  })

  it("is high when it's 60%", () => {
    const { getByTestId } = render(<ProgressBar percentage={60} />)
    expect(getByTestId('progress-bar')).toHaveClass('high')
  })

  it("is middle when it's 59%", () => {
    const { getByTestId } = render(<ProgressBar percentage={59} />)
    expect(getByTestId('progress-bar')).toHaveClass('middle')
  })

  it("is middle when it's 30%", () => {
    const { getByTestId } = render(<ProgressBar percentage={30} />)
    expect(getByTestId('progress-bar')).toHaveClass('middle')
  })

  it("is low when it's 29%", () => {
    const { getByTestId } = render(<ProgressBar percentage={29} />)
    expect(getByTestId('progress-bar')).toHaveClass('low')
  })

  it("is low when it's 10%", () => {
    const { getByTestId } = render(<ProgressBar percentage={10} />)
    expect(getByTestId('progress-bar')).toHaveClass('low')
  })
})
