import React, { useState } from 'react'
import { Button, FormField, TextInputField } from 'evergreen-ui'
import { Engine } from '../../hooks'
import Array from '../array/Array'
import Matrix from '../matrix/Matrix'
import './Forms.scss'


// falta validar o form 1/3 1/3 1/3
export default function Forms() {
  const [formPrior, setFormPrior] = useState('')
  const [channel1stEntry, setChannel1stEntry] = useState('')
  const [channel2ndEntry, setChannel2ndEntry] = useState('')
  const [channel3rdEntry, setChannel3rdEntry] = useState('')
  const [
    setPrior,
    setChannel,
    priorShannonEntropy,
    jointDistribution,
    marginalDistribution,
    posteriorDistribution,
    hyperDistibution,
    hyperMarginalDistribution
  ] = Engine()

  const executeEffects = () => {
    setPrior(formPrior)
    const channelFromInputs = [channel1stEntry, channel2ndEntry, channel3rdEntry]
    setChannel(channelFromInputs)
  }

  return (
    <div>
      <FormField
        className="forms_wrapper"
        label=""
        hint="Use numbers (0 or 1) or fractions (e.g. 1/3, 1/7, 1/2...) separated by spaces"
      >
        <div className="data_wrapper">
          <div className="data_wrapper__prior">
            <TextInputField
              label="Prior"
              id="prior-input"
              isInvalid={false}
              onChange={e => setFormPrior(e.target.value)}
            />
          </div>
          <div className="data_wrapper__channel">
            <TextInputField
              label="Channel"
              id="channel-input-1"
              isInvalid={false}
              onChange={e => setChannel1stEntry(e.target.value)}
            />
            <TextInputField
              label=""
              id="channel-input-2"
              isInvalid={false}
              onChange={e => setChannel2ndEntry(e.target.value)}
            />
            <TextInputField
              label=""
              id="channel-input-3"
              isInvalid={false}
              onChange={e => setChannel3rdEntry(e.target.value)}
            />
          </div>
        </div>
        <Button
          height={32}
          className="action_button"
          onClick={executeEffects}
        >
          Calculate!
        </Button>
      </FormField>
      <div className="charts">
        <br/>
        Entropia de Shannon da entrada:
        <Array values={[priorShannonEntropy]} />
        <br/>
        <br/>
        Joint:
        <Matrix values={jointDistribution} decimals={2} />
        <br/>
        Marginal:
        <Array values={marginalDistribution} />

        <br/>
        posterior:
        <Matrix values={posteriorDistribution} />
        <br/>
        Hyper: {hyperDistibution}
        <br/>
        Hyper prob: {hyperMarginalDistribution}
        <br/>
      </div>
    </div>
  )
}
