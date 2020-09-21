import { checkPrior, ERROR_MESSAGES } from './PriorPolicy'

const validPrior = "1/3 1/3 1/3"
const invalidPriorA = ""
const invalidPriorB = "1/3, 1/3, 1/3"
const invalidPriorC = "1/1/3, 1/3"
const invalidPriorD = "1/3 1/3"
const invalidPriorE = "1/3 1/3 1/3 1/3"

describe('with valid parameters', () => {
  it('does not return error flag or error messages', () => {
    const { priorHasErrors, priorErrorMessages, transformedPrior } = checkPrior(validPrior)

    expect(priorHasErrors).toBeFalsy()
    expect(priorErrorMessages).toEqual([])
  })
})

describe('with invalid parameters', () => {
  it('returns error flag and invalid string message', () => {
    const { priorHasErrors, priorErrorMessages, transformedPrior } = checkPrior(invalidPriorA)

    expect(priorHasErrors).toBeTruthy()
    expect(priorErrorMessages).toEqual([
      ERROR_MESSAGES.invalidString,
      ERROR_MESSAGES.minInputs,
      ERROR_MESSAGES.inputSum
    ])
  })

  it('returns error flag and invalid format message', () => {
    const { priorHasErrors, priorErrorMessages, transformedPrior } = checkPrior(invalidPriorB)

    expect(priorHasErrors).toBeTruthy()
    expect(priorErrorMessages).toEqual([
      ERROR_MESSAGES.invalidFormat
    ])
  })

  it('returns error flag and invalid format message', () => {
    const { priorHasErrors, priorErrorMessages, transformedPrior } = checkPrior(invalidPriorC)

    expect(priorHasErrors).toBeTruthy()
    expect(priorErrorMessages).toEqual([
      ERROR_MESSAGES.invalidFormat
    ])
  })

  it('returns error flag and invalid sum message', () => {
    const { priorHasErrors, priorErrorMessages, transformedPrior } = checkPrior(invalidPriorD)

    expect(priorHasErrors).toBeTruthy()
    expect(priorErrorMessages).toEqual([
      ERROR_MESSAGES.inputSum
    ])
  })

  it('returns error flag and invalid quantity message', () => {
    const { priorHasErrors, priorErrorMessages, transformedPrior } = checkPrior(invalidPriorE)

    expect(priorHasErrors).toBeTruthy()
    expect(priorErrorMessages).toEqual([
      ERROR_MESSAGES.maxInputs,
      ERROR_MESSAGES.inputSum
    ])
  })
})
