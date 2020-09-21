import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import App from './App';

  // const { getByText } = render(<App />);
  // const linkElement = getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();

test('does not show calculations when first rendered', () => {
  const { queryByTitle } = render(<App />)

  expect(queryByTitle('Results')).toBe(null)
})

describe("with valid inputs", () => {
  it('shows the results when the form is filles and Calculate! button is clicked', async () => {
    const {
      getByLabelText,
      getByPlaceholderText,
      getByRole,
      getByText
    } = render(<App />)

    const inputValue = { target: { value: "1/3 1/3 1/3" } }
    await act(async () => {
      fireEvent.change(getByLabelText('Prior'), inputValue)
      fireEvent.change(getByPlaceholderText('Channel\'s first entry'), inputValue)
      fireEvent.change(getByPlaceholderText('Channel\'s second entry'), inputValue)
      fireEvent.change(getByPlaceholderText('Channel\'s third entry'), inputValue)
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
  it.todo('does not calculate if one of the fields are empty')
  it.todo('does not calculate if the separator is a comma')
  it.todo('does not calculate if the prior`s sum is different of 1')
  it.todo('does not calculate if the channel column`s sum is different of 1')
  it.todo('does not calculate if the prior has more than 3 elements')
  it.todo('does not calculate if the prior has less than 3 elements')
})
