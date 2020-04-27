import React from 'react'
import './Forms.scss'

export default function Forms() {
  return (
    <div className="forms_wrapper">
      <div className="data_wrapper">
        <div className="data_wrapper__prior">
          <input type="text" placeholder="Prior" id="prior-input" />
        </div>
        <div className="data_wrapper__channel">
          <input type="text" placeholder="Channel" id="channel-input-1" />
          <input type="text" placeholder="Channel" id="channel-input-2" />
          <input type="text" placeholder="Channel" id="channel-input-3" />
        </div>
      </div>
      <button type="button">Calculate!</button>
    </div>
  )
}
