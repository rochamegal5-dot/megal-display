'use client'

import { useEffect, useState } from 'react'

interface Props {
  value: string | number
}

function FlashNumber({ value }: Props) {
  const [flash, setFlash] = useState(true)

  useEffect(() => {
    const id = setTimeout(() => setFlash(false), 1200)
    return () => clearTimeout(id)
  }, [])

  return <div className={`animated-number ${flash ? 'flash' : ''}`}>{value}</div>
}

export default function AnimatedNumber({ value }: Props) {
  return <FlashNumber key={value} value={value} />
}
