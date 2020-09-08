import React from 'react'
import { render } from '@testing-library/react'
import Form from './Header'

test('renders an empty prior and channel forms', () => {
  const { getByText } = render(<Footer />)
  
})

test('shows the results when the Calculate! button is clicked', () => {

})

test('does not calculate if one of the fields are empty', () => {

})

test('does not calculate if the prior`s sum is different of 1', () => {

})

test('does not calculate if the channel column`s sum is different of 1', () => {

})

test('does not calculate if the prior has more than 3 elements', () => {

})

test('does not calculate if the prior has less than 3 elements', () => {

})
