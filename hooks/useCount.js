import React, { useEffect } from 'react'

const useCountUp = ({ start, end, onEnd }) => {
  const [count, setCount] = React.useState(start)
  const _onEnd = React.useRef()
  _onEnd.current = onEnd

  useEffect(() => {
    let interval = setInterval(() => {
      setCount(curr => {
        const delta = end - curr
        // check in which directoin to walk
        const step = delta / Math.abs(delta)
        const next = curr + step
        if (next === end) {
          clearInterval(interval)
        }
        return next
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [end])

  useEffect(() => {
    if (count === end) {
      _onEnd.current()
    }
  }, [count, end])

  return count
}

export default useCountUp
