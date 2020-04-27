import React from 'react'
import './Description.scss'

export default function Description() {
  return (
    <div className="description_wrapper">
      <div>
        <p>1</p>
        <p>Enter the prior probabilities</p>
      </div>

      <div>
        <p>2</p>
        <p>Enter the channel probabilities</p>
      </div>

      <div>
        <p>3</p>
        <p>Click on "Calculate!" to see the results</p>
      </div>
    </div>
  )
}
