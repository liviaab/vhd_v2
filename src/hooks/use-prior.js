import { useState, useEffect } from 'react'

const logBase2 = number => Math.log( 1/number ) / Math.log(2)

export default function Prior() {
  const [priorProbabilities, setPriorProbabilities] = useState([])
  const [priorShannonEntropy, setPriorShannonEntropy] = useState()

  useEffect(() => {
    if(priorProbabilities.length !== 0) {
      const entropy = priorProbabilities.reduce( (acc, current) => current * logBase2(current))
        setPriorShannonEntropy(entropy)
    }
  }, [priorProbabilities])

  return [priorProbabilities, setPriorProbabilities, priorShannonEntropy]
}
