import { useState, useEffect } from 'react'
import { Channel, Prior } from './'


const multiply = (prior, channel) => {
  let jointDistribution = []
  prior.forEach((priorValue, priorIndex) => {
    let resultLine = channel[priorIndex].map(channelValue => channelValue * priorValue)
    jointDistribution.push(resultLine)
  })
  return jointDistribution
}

export default function Engine() {
  const [ setChannelString, channelProbabilities ] = Channel()
  const [ setPriorString, priorProbabilities, priorShannonEntropy ] = Prior()

  const [ jointDistribution, setJointDistribution ] = useState([])
  const [ marginalDistribution, setMarginalDistribution ] = useState([])
  const [ posteriorDistribution, setPosteriorDistribution ] = useState([])
  const [ hyperDistribution, setHyperDistribution ] = useState([])
  const [ hyperMarginalDistribution, setHyperMarginalDistribution ] = useState([])

  // Calculate Joint Distribution
  useEffect(() =>{
    if(priorProbabilities && priorProbabilities.length !== 0 && channelProbabilities && channelProbabilities.length !== 0) {
      const jointDistribution = multiply(priorProbabilities, channelProbabilities)
      setJointDistribution(jointDistribution)
    }
  }, [priorProbabilities, channelProbabilities])

  // Calculate Marginal Distribution
  useEffect(() => {
    if (!jointDistribution || jointDistribution.length === 0) {
      return
    }

    const initialValue = Array(jointDistribution[0].length).fill(0)
    const marginalDist = jointDistribution.reduce((acc, current) => {
      return acc.map((elem, index) => elem + current[index])
    }, initialValue)
    setMarginalDistribution(marginalDist)
  }, [jointDistribution])

  useEffect(() => {
     let posteriorDistribution = []

     jointDistribution.forEach((jointLine, lineIndex) => {
       let posteriorLine = jointLine.map((value, index) => value * marginalDistribution[index])
       posteriorDistribution.push(posteriorLine)
     })

     setPosteriorDistribution(posteriorDistribution)

  }, [jointDistribution, marginalDistribution])

  // Calculate Hyper Distribution
  useEffect(() => {
    if (!jointDistribution || jointDistribution.length === 0) {
      return
    }




  }, [jointDistribution])

  // Calculate Hyper Marginal Distribution

  useEffect(() => {
    if (!hyperDistribution || hyperDistribution.length === 0) {
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
