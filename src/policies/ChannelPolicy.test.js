import { checkChannel, ERROR_MESSAGES } from './ChannelPolicy'

const validChannel = ["1/3 1/3 1/3", "1/3 1/3 1/3", "1/3 1/3 1/3"]
const invalidChannelA = []
const invalidChannelB = ["1/3, 1/3, 1/3", "1/3, 1/3, 1/3", "1/3, 1/3, 1/3"]
const invalidChannelC = ["1/1/3, 1/3", "1/3 1/3 1/3", "1/3 1/3 1/3"]
const invalidChannelD = ["1/3 1/3 1/3", "1/3 1/3", "1/3 1/3 1/3"]
const invalidChannelE = ["1/3 1/3 1/3", "1/3 1/3 1/3", "1/3 1/3 1/3 1/3"]
const invalidChannelF = null
const invalidChannelG = ""

describe('with valid parameters', () => {
  it('does not return error flag or error messages', () => {
    const { channelHasErrors, channelErrorMessages, transformedChannel } = checkChannel(validChannel)

    expect(channelHasErrors).toBeFalsy()
    expect(channelErrorMessages).toEqual([])
  })
})

describe('with invalid parameters', () => {
  it('returns error flag and invalid string message - empty list', () => {
    const { channelHasErrors, channelErrorMessages, transformedChannel } = checkChannel(invalidChannelA)

    expect(channelHasErrors).toBeTruthy()
    expect(channelErrorMessages).toContain(ERROR_MESSAGES.invalidString)
  })

  it('returns error flag and invalid string message - null', () => {
    const { channelHasErrors, channelErrorMessages, transformedChannel } = checkChannel(invalidChannelF)

    expect(channelHasErrors).toBeTruthy()
    expect(channelErrorMessages).toContain(ERROR_MESSAGES.invalidString)
  })

  it('returns error flag and invalid string message - empty string', () => {
    const { channelHasErrors, channelErrorMessages, transformedChannel } = checkChannel(invalidChannelG)

    expect(channelHasErrors).toBeTruthy()
    expect(channelErrorMessages).toContain(ERROR_MESSAGES.invalidString)
  })

  it('returns error flag and invalid format message', () => {
    const { channelHasErrors, channelErrorMessages, transformedChannel } = checkChannel(invalidChannelB)

    expect(channelHasErrors).toBeTruthy()
    expect(channelErrorMessages).toContain(ERROR_MESSAGES.invalidFormat)
  })

  it('returns error flag and invalid format message', () => {
    const { channelHasErrors, channelErrorMessages, transformedChannel } = checkChannel(invalidChannelC)

    expect(channelHasErrors).toBeTruthy()
    expect(channelErrorMessages).toContain(ERROR_MESSAGES.invalidFormat)
  })

  it('returns error flag and invalid sum message', () => {
    const { channelHasErrors, channelErrorMessages, transformedChannel } = checkChannel(invalidChannelD)

    expect(channelHasErrors).toBeTruthy()
    expect(channelErrorMessages).toContain(ERROR_MESSAGES.inputSum)
  })

  it('returns error flag and invalid quantity message', () => {
    const { channelHasErrors, channelErrorMessages, transformedChannel } = checkChannel(invalidChannelE)

    expect(channelHasErrors).toBeTruthy()
    expect(channelErrorMessages).toContain(ERROR_MESSAGES.quantityOfInputs)
  })
})
