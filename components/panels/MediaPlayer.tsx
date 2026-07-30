'use client'

import { useEffect, useRef, useState } from 'react'

interface MediaItem {
  type: 'video' | 'image'
  src: string
  duration?: number
}

export default function MediaPlayer() {

  const [playlist, setPlaylist] = useState<MediaItem[]>([])
  const [index, setIndex] = useState(0)

  const timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {

    async function cargarPlaylist() {

      try {

        const res = await fetch('/media/playlist.json', {
          cache: 'no-store',
        })

        const data = await res.json()

        setPlaylist(data)

      } catch (e) {

        console.error('No se pudo cargar playlist', e)

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

      }, actual.duration || 8000)

    }

    return () => {

      if (timer.current) clearTimeout(timer.current)

    }

  }, [index, playlist])

  function siguiente() {

    setIndex((i) => (i + 1) % playlist.length)

  }

  if (!playlist.length) {

    return (

      <div className="media-player loading-media">

        Cargando publicidad...

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

          onEnded={siguiente}

        />

        :

        <img

          key={actual.src}

          src={actual.src}

          alt="Publicidad"

        />

      }

    </div>

  )

}
