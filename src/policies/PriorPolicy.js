import { add, evaluate } from 'mathjs'

export const ERROR_MESSAGES = {
  invalidString: 'Invalid prior string',
  quantityOfInputs: 'You must provide three prior probability values',
  inputSum: 'The sum of the input MUST be one',
  invalidFormat: 'One of the probabilities has the wrong format or there are invalid separators'
}

/*
* Checks the validity of the prior string
* @param  {String}  prior             Space delimited sequence of fractions
*
* @return {Objetc}  priorHasErrors         If the string fails one or more validations
*                   priorErrorMessages     Error messages related to the validations
*                   transformedPrior  The string has to be transformed to go through the validations. Some may consider a side-effect.
*
*/
export function checkPrior(prior) {
  let priorHasErrors = false
  let priorErrorMessages = []

  const { hasInputError, inputErrorMessage } = verifyInputString(prior)
  const { hasQttyInputError, qttyInputErrorMessage, intermediatePrior } = verifyInputQuantity(prior)
  const { hasFormatError, formatErrorMessages, transformedPrior } = verifyFormat(intermediatePrior)
  const { hasSumError, incorrectSumMessage } = verifySum(transformedPrior)

  priorHasErrors = hasInputError || hasQttyInputError || hasFormatError || hasSumError

  priorErrorMessages = priorErrorMessages
    .concat(inputErrorMessage)
    .concat(qttyInputErrorMessage)
    .concat(formatErrorMessages)
    .concat(incorrectSumMessage)

  return {
    priorHasErrors,
    priorErrorMessages,
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
  let qttyInputErrorMessage = []

  const intermediatePrior = splitProbabilitiesWithoutBlankSpaces(prior)

  if (intermediatePrior.length !== 3) {
    hasQttyInputError = true
    qttyInputErrorMessage.push(ERROR_MESSAGES.quantityOfInputs)
  }

  return {
    hasQttyInputError,
    qttyInputErrorMessage,
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
    transformedPrior = prior.map(number => evaluate(number))

    if(transformedPrior.length !== prior.length) {
      hasFormatError = true
    }
  } catch {
    hasFormatError = true
  } finally {
    hasFormatError && formatErrorMessages.push(ERROR_MESSAGES.invalidFormat)

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
    sum = prior.reduce((acc, current) => add(acc, current))

    if(sum !== 1) {
      hasSumError = true
    }
  } catch (e) {
    hasSumError = true
  }

  hasSumError && incorrectSumMessage.push(ERROR_MESSAGES.inputSum)

  return {
    hasSumError,
    incorrectSumMessage
  }
}
