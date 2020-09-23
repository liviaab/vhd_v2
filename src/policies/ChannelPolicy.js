import { add, evaluate } from 'mathjs'

export const ERROR_MESSAGES = {
  invalidString: 'Invalid channel string',
  quantityOfInputs: 'You must provide nine channel probability values (row and column)',
  inputSum: 'The sum of each channel column MUST be one',
  invalidFormat: 'One of the probabilities has the wrong format or there are invalid separators'
}

/*
* Checks the validity of the strings representing the channel
* @param  {String}  channel                 Array containing three strings.
*
* @return {Objetc}  channelHasErrors         If the string fails one or more validations
*                   channelErrorMessages     Error messages related to the validations
*                   transformedChannel  The string has to be transformed to go through the validations. Some may consider a side-effect.
*
*/
export function checkChannel(channel) {
  let channelHasErrors = false
  let channelErrorMessages = []

  const { hasInputError, inputErrorMessage } = verifyInputString(channel)
  // console.log(hasInputError, inputErrorMessage );
  const { hasQttyInputError, qttyInputErrorMessage, intermediateChannel } = verifyInputQuantity(channel)
  // console.log(hasQttyInputError, qttyInputErrorMessage, intermediateChannel);
  const { hasFormatError, formatErrorMessage, transformedChannel } = verifyFormat(intermediateChannel)
  // console.log(hasFormatError, formatErrorMessage, transformedChannel)
  const { hasSumError, incorrectSumMessage } = verifySum(transformedChannel)
  // console.log(hasSumError, incorrectSumMessage);

  channelHasErrors = hasInputError || hasQttyInputError || hasFormatError || hasSumError

  channelErrorMessages = channelErrorMessages
    .concat(inputErrorMessage)
    .concat(qttyInputErrorMessage)
    .concat(formatErrorMessage)
    .concat(incorrectSumMessage)

  return {
    channelHasErrors,
    channelErrorMessages,
    transformedChannel
  }
}

function verifyInputString(channel) {
  let hasInputError = false
  let inputErrorMessage = []

  if(!channel || channel.length === 0 || channel === "") {
    hasInputError = true
    inputErrorMessage.push(ERROR_MESSAGES.invalidString)

    return {
      hasInputError,
      inputErrorMessage
    }
  }

  for (var entry of channel) {
    if (!entry || entry === "") {
      hasInputError = true
      inputErrorMessage.push(ERROR_MESSAGES.invalidString)
    }
  }

  return {
    hasInputError,
    inputErrorMessage
  }
}

function verifyInputQuantity(channel) {
  let hasQttyInputError = false
  let qttyInputErrorMessage = []
  let intermediateChannel = []

  if (!channel || channel.length !== 3) {
    hasQttyInputError = true
    qttyInputErrorMessage.push(ERROR_MESSAGES.quantityOfInputs)

    return {
      hasQttyInputError,
      qttyInputErrorMessage,
      intermediateChannel
    }
  }

  for (var entry of channel) {
    const parsedEntry = splitProbabilitiesWithoutBlankSpaces(entry)

    if (parsedEntry.length !== 3) {
      hasQttyInputError = true
    }
    intermediateChannel.push(parsedEntry)
  }

  hasQttyInputError && qttyInputErrorMessage.push(ERROR_MESSAGES.quantityOfInputs)

  return {
    hasQttyInputError,
    qttyInputErrorMessage,
    intermediateChannel
  }
}

const splitProbabilitiesWithoutBlankSpaces = (string) => {
  return string.split(/(\s+)/).filter( e => e.trim().length > 0)
}


function verifyFormat(channel) {
  let hasFormatError = false
  let formatErrorMessage = []
  let transformedChannel = []

  if(!channel || channel.length === 0 || channel === "") {
    hasFormatError = true
    formatErrorMessage.push(ERROR_MESSAGES.invalidFormat)

    return {
      hasFormatError,
      formatErrorMessage,
      transformedChannel
    }
  }

  try {
    for (var entry of channel) {
      const parsedEntry = entry.map(number => evaluate(number))
      transformedChannel.push(parsedEntry)
    }

    if( transformedChannel &&
        (transformedChannel.length !== channel.length ||
        transformedChannel[0].length !== 3 ||
        transformedChannel[1].length !== 3 ||
        transformedChannel[2].length !== 3 )) {
      hasFormatError = true
    }
  } catch {
    hasFormatError = true
  } finally {
    hasFormatError && formatErrorMessage.push(ERROR_MESSAGES.invalidFormat)

    return {
      hasFormatError,
      formatErrorMessage,
      transformedChannel
    }
  }
}

function verifySum(channel) {
  let hasSumError = false
  let incorrectSumMessage = []
  const columnsIndexes = [0, 1, 2]
  const rowsIndexes = [0, 1, 2]

  try{
    // sum the values of each column
    for (var j in columnsIndexes) {
      let acc = 0

      for (var i in rowsIndexes) {
          acc = add(channel[i][j], acc)
      }

      if(acc !== 1) {
        hasSumError = true
      }
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
