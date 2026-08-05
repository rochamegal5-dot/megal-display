'use client'

import { useCallback, useEffect, useState } from 'react'

export function useApi<T>(loader: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const load = useCallback(async () => {
    try {
      setError(false)
      const json = await loader()
      setData(json)
    } catch (e) {
      console.error(e)
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [loader])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void load()
    }, 0)
    const intervalId = setInterval(() => {
      void load()
    }, 60000)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [load])

  return {
    data,
    loading,
    error,
    reload: load,
  }
}
