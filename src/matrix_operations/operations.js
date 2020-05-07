
const hasInvalidValues = (channel) => {
  channel.forEach(row => {
    row.forEach(element => {
      if(!element || typeof(element) !== "number") {
        // throw TypeError("Invalid value")
        return true
      }
    })
  })

  return false
}


const columnsOfZeroes = (channel) => {
  let columns = []
  const columnLimit = channel[0].length
  const rowLimit = channel.length

  for (var j = 0; j < columnLimit; j++) {
    let isColumnOfZeros = true

    for (var i = 0; i < rowLimit; i++) {
      if (channel[i][j]) {
        isColumnOfZeros = false
        break
      }
    }
    if(isColumnOfZeros) {
      columns.push(j)
    }
  }

  return columns
}

const columnsOfMultiples = (channel) => {
  let columns = []
  const columnLimit = channel[0].length
  const rowLimit = channel.length

  for (var j = 0; j < columnLimit; j++) {
    if (columns.includes(j)) continue

    for (var k = j + 1; k < columnLimit; k++) {
      const multiple = channel[0][k] / channel[0][j]
      let isMultiple = true

      for (var i = 1; i < rowLimit; i++) {
        if ((channel[i][k] / channel[i][j]) !== multiple) {
          isMultiple = false
          break
        }
      }

      if(isMultiple) {
        columns.push(k)
      }
    }
  }

  return columns
}

const removeColumns = (channel, columnsToRemove) => {
  if (columnsToRemove.length === 0 || hasInvalidValues(channel)) {
    return channel
  }

  let clonedChannel = []

  for (var i = 0; i < channel.length; i++) {
    clonedChannel[i] = []

    for (var j = 0; j < channel[0].length; j++) {
      if (!columnsToRemove.includes(j)) {
        clonedChannel[i].push(channel[i][j])
      }
    }
  }

  return clonedChannel
}

export { columnsOfZeroes, columnsOfMultiples, hasInvalidValues, removeColumns }
