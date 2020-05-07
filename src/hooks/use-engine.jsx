import { useState, useEffect } from 'react'
import { Channel, Prior } from './'
import {
  columnsOfZeroes,
  columnsOfMultiples,
  hasInvalidValues,
  removeColumns
} from '../matrix_operations/operations'

export default function Engine() {
  const [ setChannelString, channelProbabilities ] = Channel()
  const [ setPriorString, priorProbabilities, priorShannonEntropy ] = Prior()

  const [ jointDistribution, setJointDistribution ] = useState([])
  const [ marginalDistribution, setMarginalDistribution ] = useState([])
  const [ posteriorDistribution, setPosteriorDistribution ] = useState([])
  const [ hyperDistribution, setHyperDistribution ] = useState([])
  const [ hyperMarginalDistribution, setHyperMarginalDistribution ] = useState([])

  // Calculate Joint Distribution
  useEffect(() => {
    if(priorProbabilities && priorProbabilities.length !== 0
        && channelProbabilities && channelProbabilities.length !== 0
        && !hasInvalidValues(channelProbabilities)) {
      const jointDistribution = multiply(priorProbabilities, channelProbabilities)
      setJointDistribution(jointDistribution)
    }
  }, [priorProbabilities, channelProbabilities])

  // Calculate Marginal Distribution
  useEffect(() => {
    if (!jointDistribution || jointDistribution.length === 0 || hasInvalidValues(jointDistribution)) {
      return
    }

    const initialValue = Array(jointDistribution[0].length).fill(0)
    const marginalDist = jointDistribution.reduce((acc, current) => {
      return acc.map((elem, index) => elem + current[index])
    }, initialValue)
    setMarginalDistribution(marginalDist)
  }, [jointDistribution])

  // Calculate posterior Distribution
  useEffect(() => {
    if(!jointDistribution || hasInvalidValues(jointDistribution)
        || !marginalDistribution || marginalDistribution.length === 0) {
      return
    }

   let posterior = []
   jointDistribution.forEach((jointLine, lineIndex) => {
     let posteriorLine = jointLine.map((value, index) => value * marginalDistribution[index])
     posterior.push(posteriorLine)
   })
   setPosteriorDistribution(posterior)
  }, [jointDistribution, marginalDistribution])

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

    const initialValue = Array(hyperDistribution[0].length).fill(0)
    const marginalDist = hyperDistribution.reduce((acc, current) => {
      return acc.map((elem, index) => elem + current[index])
    }, initialValue)
    setHyperMarginalDistribution(marginalDist)
  }, [hyperDistribution])

  return [
    setPriorString,
    setChannelString,
    priorShannonEntropy,
    jointDistribution,
    marginalDistribution,
    posteriorDistribution,
    hyperDistribution,
    hyperMarginalDistribution
  ]
}

const multiply = (prior, channel) => {
  let jointDistribution = []
  prior.forEach((priorValue, priorIndex) => {
    let resultLine = channel[priorIndex].map(channelValue => channelValue * priorValue)
    jointDistribution.push(resultLine)
  })

  return jointDistribution
}
