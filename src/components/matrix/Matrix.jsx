import React, { Fragment } from 'react'

const Matrix = ({values, decimals = 3}) => {
  if (values.length === 0) return <Fragment />

  if (decimals) {
    values = values.map(row => row.map(cell => cell.toFixed(decimals)))
  }

  return (
    <div>
      {values.map((row, index) => <p key={"matrix-row-" + index}>{row.join('  ')}</p>)}
    </div>
  )
}

export default Matrix
