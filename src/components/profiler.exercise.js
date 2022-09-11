import React from 'react'
import {client} from 'utils/api-client'

let queue = []

const sendProfileQueue = () => {
  if (queue.length === 0) {
    return Promise.resolve({success: true})
  }
  const queueToSend = [...queue]
  queue = []
  return client('profile', {data: queueToSend})
}

setInterval(sendProfileQueue, 5000)

const Profiler = ({phases, metadata, ...props}) => {
  const reportProfile = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions,
  ) => {
    console.log(phases, phase)
    if (!phases || phases.includes(phase)) {
      queue.push({
        metadata,
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
      })
    }
  }

  return <React.Profiler onRender={reportProfile} {...props} />
}

export {Profiler}
