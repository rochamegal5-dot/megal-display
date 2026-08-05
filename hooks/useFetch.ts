'use client'

import { useCallback, useEffect, useState } from 'react'

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const cargar = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch(url, {
        cache: 'no-store',
      })
      const json = await res.json()
      setData(json)
      setError(false)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void cargar()
    }, 0)
    const intervalId = setInterval(() => {
      void cargar()
    }, 60000)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [cargar])

  return {
    data,
    loading,
    error,
    reload: cargar,
  }
}
