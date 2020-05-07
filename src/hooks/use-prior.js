import { evaluate } from 'mathjs'
import { useState, useEffect } from 'react'

const logBase2 = number => Math.log( 1/number ) / Math.log(2)

const splitProbabilitiesWithoutBlankSpaces = (number) => {
  return number.split(/(\s+)/).filter( e => e.trim().length > 0)
}

export default function Prior() {
  const [priorString, setPriorString] = useState('')
  const [priorProbabilities, setPriorProbabilities] = useState([])
  const [priorShannonEntropy, setPriorShannonEntropy] = useState()

  useEffect(() => {
    if (priorString) {
      const trimmedPrior = splitProbabilitiesWithoutBlankSpaces(priorString)
      const listOfProbabilities = trimmedPrior.map(number => evaluate(number))
      setPriorProbabilities(listOfProbabilities)
    }
  }, [priorString])

  useEffect(() => {
    if(priorProbabilities.length !== 0) {
      const entropy = priorProbabilities.reduce( (acc, current) => current * logBase2(current))
        setPriorShannonEntropy(entropy)
    }
  }, [priorProbabilities])

  return [setPriorString, priorProbabilities, priorShannonEntropy]
}
