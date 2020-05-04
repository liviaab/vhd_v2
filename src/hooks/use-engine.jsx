import { evaluate } from 'mathjs'
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
  const [ hyperDistribution, setHyperDistribution ] = useState([])
  const [ hyperMarginalDistribution, setHyperMarginalDistribution ] = useState([])

  // Calculate Joint Distribution
  useEffect(() =>{
    console.log(priorProbabilities, channelProbabilities, jointDistribution);
    if(priorProbabilities && priorProbabilities.length !== 0 && channelProbabilities && channelProbabilities.length !== 0) {
      const jointDistribution = multiply(priorProbabilities, channelProbabilities)
      setJointDistribution(jointDistribution)
      console.log(priorProbabilities, channelProbabilities, jointDistribution);
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

  // Calculate Hyper Distribution
  useEffect(() => {
    if (!jointDistribution || jointDistribution.length === 0) {
      return
    }



  }, [jointDistribution])
  return [
    setPriorString,
    setChannelString,
    priorShannonEntropy,
    jointDistribution,
    marginalDistribution
    //,
    // hyperDistibution,
    // hyperMarginalDistribution
  ]
}
