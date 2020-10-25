import { useState, useEffect } from 'react'
import Channel from './use-channel'
import Prior from './use-prior'
import {
  columnsOfZeroes,
  columnsOfMultiples,
  hasInvalidValues,
  removeColumns
} from '../matrix_operations/operations'


const multiply = (prior, channel) => {
  let jointDistribution = []
  prior.forEach((priorValue, priorIndex) => {
    let resultLine = channel[priorIndex].map(channelValue => channelValue * priorValue)
    jointDistribution.push(resultLine)
  })

  return jointDistribution
}

const calculateMatrixDistribution = (matrix) => {
  const initialValue = Array(matrix[0].length).fill(0)
  const marginalDistribution = matrix.reduce((acc, current) => {
    return acc.map((elem, index) => elem + current[index])
  }, initialValue)

  return marginalDistribution
}

export default function Engine() {
  const [ setChannel, channelProbabilities ] = Channel()
  const [ priorProbabilities, setPriorProbabilities, priorShannonEntropy ] = Prior()

  const [ jointDistribution, setJointDistribution ] = useState([])
  const [ jointMarginalDistribution, setJointMarginalDistribution ] = useState([])
  const [ posteriorDistribution, setPosteriorDistribution ] = useState([])
  const [ posteriorMarginalDistribution, setPosteriorMarginalDistribution ] = useState([])
  const [ hyperDistribution, setHyperDistribution ] = useState([])
  const [ hyperMarginalDistribution, setHyperMarginalDistribution ] = useState([])

  // Calculate Joint Distribution
  useEffect(() => {
    const jointDistribution = multiply(priorProbabilities, channelProbabilities)
    setJointDistribution(jointDistribution)
  }, [priorProbabilities, channelProbabilities])

  // Calculate Marginal Distribution
  useEffect(() => {
    if (!jointDistribution || jointDistribution.length === 0 || hasInvalidValues(jointDistribution)) {
      return
    }

    const marginalDistribution = calculateMatrixDistribution(jointDistribution)
    setJointMarginalDistribution(marginalDistribution)
  }, [jointDistribution])

  // Calculate Posterior Distribution
  useEffect(() => {
    if(!jointDistribution || hasInvalidValues(jointDistribution)
        || !jointMarginalDistribution || jointMarginalDistribution.length === 0) {
      return
    }

   let posterior = []
   jointDistribution.forEach((jointLine, lineIndex) => {
     let posteriorLine = jointLine.map((value, index) => value * jointMarginalDistribution[index])
     posterior.push(posteriorLine)
   })
   setPosteriorDistribution(posterior)
 }, [jointDistribution, jointMarginalDistribution])

  // Calculate Posterior Marginal Distribution
  useEffect(() => {
    if (!posteriorDistribution || posteriorDistribution.length === 0 || hasInvalidValues(posteriorDistribution)) {
      return
    }

    const marginalDistribution = calculateMatrixDistribution(posteriorDistribution)
    setPosteriorMarginalDistribution(marginalDistribution)
  }, [posteriorDistribution])

  // Calculate Hyper Distribution
  useEffect(() => {
    if (!posteriorDistribution || posteriorDistribution.length === 0 || hasInvalidValues(posteriorDistribution)) {
      return
    }

    let columnsToRemove = []
    columnsToRemove.push(columnsOfZeroes(posteriorDistribution))
    columnsToRemove.push(columnsOfMultiples(posteriorDistribution))
    columnsToRemove = columnsToRemove.flat()

    const hyper = removeColumns(posteriorDistribution, columnsToRemove)
    setHyperDistribution(hyper)
  }, [posteriorDistribution])

  // Calculate Hyper Marginal Distribution
  useEffect(() => {
    if (!hyperDistribution || hyperDistribution.length === 0 || hasInvalidValues(hyperDistribution)) {
      return
    }

    const marginalDistribution = calculateMatrixDistribution(hyperDistribution)
    setHyperMarginalDistribution(marginalDistribution)
  }, [hyperDistribution])

  return [
    setPriorProbabilities,
    setChannel,
    priorShannonEntropy,
    jointDistribution,
    jointMarginalDistribution,
    posteriorDistribution,
    posteriorMarginalDistribution,
    hyperDistribution,
    hyperMarginalDistribution
  ]
}
