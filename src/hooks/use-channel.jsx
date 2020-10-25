import { useState } from 'react'

/*
The channels' structure is [ "first line", "second line", "third line"],  e.g.

[ "1/3 1/3 1/3", "1/3 1/3 1/3", "1/3 1/3 1/3" ]

*/
export default function Channel() {
  const [channelProbabilities, setChannelProbabilities] = useState([])

  return [setChannelProbabilities, channelProbabilities]
}
