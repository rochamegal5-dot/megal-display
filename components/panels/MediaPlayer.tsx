'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

interface MediaItem {
  type: 'video' | 'image'
  src: string
  duration?: number
}

export default function MediaPlayer() {

  const [playlist, setPlaylist] = useState<MediaItem[]>([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  const timer = useRef<NodeJS.Timeout | null>(null)

  const siguiente = useCallback(() => {
    if (!playlist.length) return
    setIndex((i) => (i + 1) % playlist.length)
  }, [playlist.length])

  useEffect(() => {

    async function cargarPlaylist() {

      try {
const res = await fetch('/api/media', {
  cache: 'no-store',
})
       

        if (!res.ok) throw new Error('Playlist no encontrada')

        const data = await res.json()

        setPlaylist(data)

      } catch (e) {

        console.error(e)

      } finally {

        setLoading(false)

      }

    }

    cargarPlaylist()

  }, [])

  useEffect(() => {
    if (!playlist.length) return

    const actual = playlist[index]

    if (actual.type === 'image') {
      timer.current = setTimeout(() => {
        siguiente()
      }, actual.duration ?? 8000)
    }

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [playlist, index, siguiente])

  if (loading) {

    return (

      <div className="media-player loading-media">

        Cargando publicidad...

      </div>

    )

  }

  if (!playlist.length) {

    return (

      <div className="media-player loading-media">

        No hay contenido publicitario

      </div>

    )

  }

  const actual = playlist[index]

  return (

    <div className="media-player">

      {

        actual.type === 'video'

        ?

        <video

          key={actual.src}

          src={actual.src}

          autoPlay

          muted

          playsInline

          controls={false}

          onEnded={siguiente}

          onError={siguiente}

        />

        :

        <Image

          key={actual.src}

          src={actual.src}

          alt="Publicidad"

          onError={siguiente}

          width={800}

          height={450}

          style={{ width: '100%', height: 'auto' }}

        />

      }

    </div>

  )

}
