import React, { Fragment } from 'react'

const Array = ({values, decimals = 3}) => {
  if (!values || values.length === 0) {
    return <Fragment />
  }

  if (decimals) {
    values = values.map(item => item.toFixed(decimals))
  }

  return (
    <pre>
      {values.join('\t')}
    </pre>
  )
}

export default Array
