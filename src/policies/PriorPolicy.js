import { add, fraction, number } from 'mathjs'

export const ERROR_MESSAGES = {
  invalidString: 'Invalid prior string',
  minInputs: 'You must provide at least one probability',
  maxInputs: 'The maximum number of inputs is three',
  inputSum: 'The sum of the input MUST be one',
  invalidFormat: 'One of the probabilities has the wrong format or there are invalid separators'
}

/*
* Checks the validity of the prior string
* @param  {String}  prior             Space delimited sequence of fractions
*
* @return {Objetc}  hasErrors         If the string fails one or more validations
*                   errorMessages     Error messages related to the validations
*                   transformedPrior  The string has to be transformed to go through the validations. Some may consider a side-effect.
*
*/
export function checkPrior(prior) {
  let hasErrors = false
  let errorMessages = []

  const { hasInputError, inputErrorMessage } = verifyInputString(prior)
  const { hasQttyInputError, qttyInputErrorMessages, intermediatePrior } = verifyInputQuantity(prior)
  const { hasFormatError, formatErrorMessages, transformedPrior } = verifyFormat(intermediatePrior)
  const { hasSumError, incorrectSumMessage } = verifySum(transformedPrior)

  hasErrors = hasInputError || hasQttyInputError || hasFormatError || hasSumError

  errorMessages = errorMessages
    .concat(inputErrorMessage)
    .concat(qttyInputErrorMessages)
    .concat(formatErrorMessages)
    .concat(incorrectSumMessage)

  return {
    hasErrors,
    errorMessages,
    transformedPrior
  }
}

function verifyInputString(prior) {
  let hasInputError = false
  let inputErrorMessage = []

  if (!prior || prior === "" || prior === undefined || prior == null) {
    hasInputError = true
    inputErrorMessage.push(ERROR_MESSAGES.invalidString)
  }

  return {
    hasInputError,
    inputErrorMessage
  }
}

function verifyInputQuantity(prior) {
  let hasQttyInputError = false
  let qttyInputErrorMessages = []

  const intermediatePrior = splitProbabilitiesWithoutBlankSpaces(prior)

  if (intermediatePrior.length === 0) {
    hasQttyInputError = true
    qttyInputErrorMessages.push(ERROR_MESSAGES.minInputs)
  }

  if (intermediatePrior.length > 3) {
    hasQttyInputError = true
    qttyInputErrorMessages.push(ERROR_MESSAGES.maxInputs)
  }

  return {
    hasQttyInputError,
    qttyInputErrorMessages,
    intermediatePrior
  }
}

const splitProbabilitiesWithoutBlankSpaces = (string) => {
  return string.split(/(\s+)/).filter( e => e.trim().length > 0)
}

function verifyFormat(prior) {
  let hasFormatError = false
  let formatErrorMessages = []
  let transformedPrior = prior

  try {
    transformedPrior = prior.map(number => fraction(number))

    if(transformedPrior.length !== prior.length) {
      hasFormatError = true
      formatErrorMessages.push(ERROR_MESSAGES.invalidFormat)
    }
  } catch {
    hasFormatError = true
    formatErrorMessages.push(ERROR_MESSAGES.invalidFormat)
  } finally {
    return {
      hasFormatError,
      formatErrorMessages,
      transformedPrior
    }
  }
}

function verifySum(prior) {
  let hasSumError = false
  let incorrectSumMessage = []
  let sum = 0;

  try {
    if (prior.length === 0) {
      hasSumError = true
      incorrectSumMessage.push(ERROR_MESSAGES.inputSum)
    } else {
      sum = number(prior.reduce((acc, current) => add(acc, current)))

      if(sum !== 1) {
        hasSumError = true
        incorrectSumMessage.push(ERROR_MESSAGES.inputSum)
      }
    }
  } catch (e) {
    // Invalid format error already informed
  }

  return {
    hasSumError,
    incorrectSumMessage
  }
}
