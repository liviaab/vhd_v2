import React from 'react'
import { render } from '@testing-library/react'
import Footer from './Footer'

test('renders the footer', () => {
  const { getByText } = render(<Footer />)
  const footerText = getByText(/Developed by Lívia Almeida Barbosa/i)
  expect(footerText).toBeInTheDocument()
})
