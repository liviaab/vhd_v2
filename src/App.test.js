import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import App from './App';

const validValue = "1/3 1/3 1/3"
const invalidValue = "1/3, 1/3, 1/3"

test('does not show calculations when first rendered', () => {
  const { queryByTitle } = render(<App />)

  expect(queryByTitle('Calculations\' results')).toBe(null)
})

describe("with valid inputs", () => {
  it('shows the results when the form is filles and Calculate! button is clicked', async () => {
    const {
      getByLabelText,
      getByPlaceholderText,
      getByRole,
      getByText
    } = render(<App />)

    const validEventValue = { target: { value: validValue } }

    await act(async () => {
      fireEvent.change(getByLabelText('Prior'), validEventValue)
      fireEvent.change(getByPlaceholderText('Channel\'s first entry'), validEventValue)
      fireEvent.change(getByPlaceholderText('Channel\'s second entry'), validEventValue)
      fireEvent.change(getByPlaceholderText('Channel\'s third entry'), validEventValue)
    })

    await act(async () => {
      fireEvent.click(getByRole("button", { name: "Calculate!" }))
    })

    expect(getByText(/Prior's Shannon Entropy/)).not.toBe(null)
    expect(getByText(/Joint Marginal/)).not.toBe(null)
    expect(getByText(/Posterior Marginal/)).not.toBe(null)
    expect(getByText(/Hyper Marginal/)).not.toBe(null)
  })
})

describe("with invalid inputs", () => {
  it('does not calculate if one or more fields are empty', async () => {
    const {
      queryByTitle,
      getByRole
    } = render(<App />)

    await act(async () => {
      fireEvent.click(getByRole("button", { name: "Calculate!" }))
    })

    expect(queryByTitle('Calculations\' results')).toBe(null)
    expect(getByRole('alert'))
      .toHaveTextContent('Invalid prior string, You must provide at least one probability, The sum of the input MUST be one')
  })

  it('does not calculate if the prior separator is a comma', async() => {
    const {
      getByLabelText,
      getByPlaceholderText,
      getByRole,
      queryByTitle
    } = render(<App />)

    const invalidEventValue = { target: { value: invalidValue } }
    const validEventValue = { target: { value: validValue } }

    await act(async () => {
      fireEvent.change(getByLabelText('Prior'), invalidEventValue)
      fireEvent.change(getByPlaceholderText('Channel\'s first entry'), validEventValue)
      fireEvent.change(getByPlaceholderText('Channel\'s second entry'), validEventValue)
      fireEvent.change(getByPlaceholderText('Channel\'s third entry'), validEventValue)
    })

    await act(async () => {
      fireEvent.click(getByRole("button", { name: "Calculate!" }))
    })

    expect(queryByTitle('Calculations\' results')).toBe(null)
    expect(getByRole('alert')).toHaveTextContent('One of the probabilities has the wrong format or there are invalid separators')
  })

  it.todo('does not calculate if the channel column`s sum is different of 1')
  it.todo('does not calculate if the channel`s separator is a comma')
  it.todo('does not calculate if the prior has less than 3 elements')
})
