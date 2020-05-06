import React, { Fragment } from 'react'

const Array = ({values, decimals = 3}) => {
  if (values.length === 0) return <Fragment />

  if (decimals) {
    values = values.map(item => item.toFixed(decimals))
  }

  return (
    <div>
      {values.join('  ')}
    </div>
  )
}

export default Array
