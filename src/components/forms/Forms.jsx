import React, { useState } from 'react'
import { Button, FormField, TextInputField } from 'evergreen-ui'
import { checkPrior, checkChannel } from '../../policies'
import { Engine } from '../../hooks'
import Results from '../results/Results'
import './Forms.scss'

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
    jointMarginalDistribution,
    posteriorDistribution,
    posteriorMarginalDistribution,
    hyperDistribution,
    hyperMarginalDistribution
  ] = Engine()
  const [validationMessage, setValidationMessage] = useState(null)
  const [results, showResults] = useState(false)

  const resultsComponent = (
    <Results
      priorShannonEntropy={priorShannonEntropy}
      jointDistribution={jointDistribution}
      jointMarginalDistribution={jointMarginalDistribution}
      posteriorDistribution={posteriorDistribution}
      posteriorMarginalDistribution={posteriorMarginalDistribution}
      hyperDistibution={hyperDistribution}
      hyperMarginalDistribution={hyperMarginalDistribution}
      decimals={3}
    />
  )

  const executeActions = () => {
    const channel = [channel1stEntry, channel2ndEntry, channel3rdEntry]

    const { priorHasErrors, priorErrorMessages, transformedPrior } = checkPrior(formPrior)
    const { channelHasErrors, channelErrorMessages, transformedChannel } = checkChannel(channel)

    if(!priorHasErrors && !channelHasErrors) {
      setValidationMessage(null)
      setPrior(transformedPrior)
      setChannel(transformedChannel)
      showResults(true)
      return
    }

    const errors = priorErrorMessages
                    .concat(channelErrorMessages)
                    .join(", ")

    setValidationMessage(errors)
    showResults(false)
  }

  return (
    <div className="main_container">
      <FormField
        className="forms_wrapper"
        label=""
        hint="Use numbers (0 or 1) or fractions (e.g. 1/3, 1/7, 1/2...) separated by spaces"
        validationMessage={validationMessage}
      >
        <div className="input_data_wrapper">
          <div className="input_data_wrapper__prior">
            <TextInputField
              label="Prior"
              placeholder="Prior values"
              id="prior-input"
              isInvalid={false}
              onChange={e => setFormPrior(e.target.value)}
            />
          </div>
          <div className="input_data_wrapper__channel">
            <TextInputField
              label="Channel"
              placeholder="Channel's first entry"
              id="channel-input-1"
              isInvalid={false}
              onChange={e => setChannel1stEntry(e.target.value)}
            />
            <TextInputField
              label=""
              placeholder="Channel's second entry"
              id="channel-input-2"
              isInvalid={false}
              onChange={e => setChannel2ndEntry(e.target.value)}
            />
            <TextInputField
              label=""
              placeholder="Channel's third entry"
              id="channel-input-3"
              isInvalid={false}
              onChange={e => setChannel3rdEntry(e.target.value)}
            />
          </div>
        </div>
        <Button
          height={32}
          className="action_button"
          onClick={executeActions}
        >
          Calculate!
        </Button>
      </FormField>
      {results && resultsComponent}
    </div>
  )
}
