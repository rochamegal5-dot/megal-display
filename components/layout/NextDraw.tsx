'use client'

import { useEffect, useMemo, useState } from 'react'

export default function NextDraw() {
  const target = useMemo(() => {
    const date = new Date()
    date.setHours(21, 0, 0, 0)
    return date
  }, [])

  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const diff = target.getTime() - Date.now()
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)

      setTime(`${h}h ${m}m ${s}s`)
    }

    update()
    const id = setInterval(update, 1000)

    return () => clearInterval(id)
  }, [target])

  return (
    <div className="nextdraw">
      ⏳ Próximo sorteo
      <strong>{time}</strong>
    </div>
  )
}
