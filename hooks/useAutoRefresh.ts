'use client'

import { useEffect, useRef } from 'react'

export function useAutoRefresh(
  callback: () => void | Promise<void>,
  interval = 60000
) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void callbackRef.current()
    }, 0)
    const intervalId = setInterval(() => {
      void callbackRef.current()
    }, interval)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [interval])
}
