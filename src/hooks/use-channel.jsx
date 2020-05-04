import { evaluate } from 'mathjs'
import { useState, useEffect } from 'react'

const splitProbabilitiesWithoutBlankSpaces = (number) => {
  return number.split(/(\s+)/).filter( e => e.trim().length > 0)
}

// channel = ["first line", "second line", "third line"]
export default function Channel() {
  const [channelString, setChannelString] = useState([])
  const [channelProbabilities, setChannelProbabilities] = useState([])

  useEffect(() => {
    const channel = channelString.map((string) => {
      const channelWhitoutSpaces = splitProbabilitiesWithoutBlankSpaces(string)
      const channelProbabilities = channelWhitoutSpaces.map(probability => {
        return evaluate(probability)
      })
      return channelProbabilities
    })
    setChannelProbabilities(channel)
  }, [channelString])

  return [setChannelString, channelProbabilities]
}
