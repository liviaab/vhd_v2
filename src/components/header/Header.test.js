import React from 'react'
import { render } from '@testing-library/react'
import Header from './Header'

test('renders the header', () => {
  const { getByText } = render(<Header />)
  const headerText = getByText(/Visualization of Hyper-Distributions/i)
  expect(headerText).toBeInTheDocument()
})
