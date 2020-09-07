import React from 'react'
import { defaultTheme } from 'evergreen-ui'
import Array from '../array/Array'
import Matrix from '../matrix/Matrix'
import './Results.scss'

export default function Results({
  priorShannonEntropy,
  jointDistribution,
  jointMarginalDistribution,
  posteriorDistribution,
  posteriorMarginalDistribution,
  hyperDistibution,
  hyperMarginalDistribution,
  decimals
}) {

  return (
    <div className="intermediate-calculations" style={{color: defaultTheme.colors.text.default}}>
      <div> Prior's Shannon Entropy:
        <br/>
        <pre>{ priorShannonEntropy ? priorShannonEntropy.toFixed(decimals) : null }</pre>
      </div>
      <br/>
      <div className="matrices-and-marginals">
        <div>
          Joint:
          <Matrix values={jointDistribution} decimals={decimals} />
          <br/>
          Joint Marginal:
          <Array values={jointMarginalDistribution} decimals={decimals} />
        </div>

        <div>
          Posterior:
          <Matrix values={posteriorDistribution} decimals={decimals} />
          <br/>
          Posterior Marginal:
          <Array values={jointMarginalDistribution} decimals={decimals} />
        </div>

        <div>
          Hyper:
          <Matrix values={hyperDistibution} decimals={decimals} />
          <br/>
          Hyper Marginal:
          <Array values={jointMarginalDistribution} decimals={decimals} />
        </div>
      </div>
    </div>
  )
}
