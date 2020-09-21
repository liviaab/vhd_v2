import { checkPrior, ERROR_MESSAGES } from './PriorPolicy'

const validPrior = "1/3 1/3 1/3"
const invalidPriorA = ""
const invalidPriorB = "1/3, 1/3, 1/3"
const invalidPriorC = "1/1/3, 1/3"
const invalidPriorD = "1/3 1/3"
const invalidPriorE = "1/3 1/3 1/3 1/3"

describe('with valid parameters', () => {
  it('does not return error flag or error messages', () => {
    const { hasErrors, errorMessages, transformedPrior } = checkPrior(validPrior)

    expect(hasErrors).toBeFalsy()
    expect(errorMessages).toEqual([])
  })
})

describe('with invalid parameters', () => {
  it('returns error flag and invalid string message', () => {
    const { hasErrors, errorMessages, transformedPrior } = checkPrior(invalidPriorA)

    expect(hasErrors).toBeTruthy()
    expect(errorMessages).toEqual([
      ERROR_MESSAGES.invalidString,
      ERROR_MESSAGES.minInputs,
      ERROR_MESSAGES.inputSum
    ])
  })

  it('returns error flag and invalid format message', () => {
    const { hasErrors, errorMessages, transformedPrior } = checkPrior(invalidPriorB)

    expect(hasErrors).toBeTruthy()
    expect(errorMessages).toEqual([
      ERROR_MESSAGES.invalidFormat
    ])
  })

  it('returns error flag and invalid format message', () => {
    const { hasErrors, errorMessages, transformedPrior } = checkPrior(invalidPriorC)

    expect(hasErrors).toBeTruthy()
    expect(errorMessages).toEqual([
      ERROR_MESSAGES.invalidFormat
    ])
  })

  it('returns error flag and invalid sum message', () => {
    const { hasErrors, errorMessages, transformedPrior } = checkPrior(invalidPriorD)

    expect(hasErrors).toBeTruthy()
    expect(errorMessages).toEqual([
      ERROR_MESSAGES.inputSum
    ])
  })

  it('returns error flag and invalid quantity message', () => {
    const { hasErrors, errorMessages, transformedPrior } = checkPrior(invalidPriorE)

    expect(hasErrors).toBeTruthy()
    expect(errorMessages).toEqual([
      ERROR_MESSAGES.maxInputs,
      ERROR_MESSAGES.inputSum
    ])
  })
})
