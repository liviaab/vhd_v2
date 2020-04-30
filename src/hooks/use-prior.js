import { evaluate } from 'mathjs'
import { useState, useEffect } from 'react'

const logBase2 = number => Math.log( 1/number ) / Math.log(2)

export default function Prior() {
  const [priorString, setPriorString] = useState('')
  const [priorNumbers, setPriorNumbers] = useState([])
  const [priorShannonEntropy, setPriorShannonEntropy] = useState(0)

  useEffect(() => {
    const listOfNumbers = priorString.split(" ").map(number => evaluate(number))
    setPriorNumbers(listOfNumbers)
  }, [priorString])

  useEffect(() => {
    if(priorNumbers.length !== 0) {
      const entropy = priorNumbers.reduce( (acc, current) => current * logBase2(current))
      setPriorShannonEntropy(entropy)
    }
  }, [priorNumbers])

  return [setPriorString, priorNumbers, priorShannonEntropy]
}
