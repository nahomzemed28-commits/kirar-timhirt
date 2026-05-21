'use client'

import { useRef, useState } from 'react'

const SPEEDS = [0.5, 0.75, 1] as const

export default function VideoPlayer({ url }: { url: string | null }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [speed, setSpeed] = useState<number>(1)

  if (!url) return null

  // YouTube / Vimeo embeds — no playback-rate control possible via iframe,
  // so we detect native video vs embed
  const isEmbed = url.includes('youtube') || url.includes('vimeo') || url.includes('embed')

  function setPlaybackRate(rate: number) {
    setSpeed(rate)
    if (videoRef.current) videoRef.current.playbackRate = rate
  }

  return (
    <div className="mb-6">
      <div className="aspect-video rounded-xl overflow-hidden border border-[rgba(201,168,76,0.2)] bg-[#0d0a05]">
        {isEmbed ? (
          <iframe
            src={url}
            title="Lesson video"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            ref={videoRef}
            src={url}
            controls
            className="w-full h-full"
          />
        )}
      </div>

      {/* Playback speed — only useful for native video */}
      {!isEmbed && (
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[#F5EDD6]/40 text-xs uppercase tracking-wider">Speed</span>
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => setPlaybackRate(s)}
              className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                speed === s
                  ? 'border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]'
                  : 'border-[rgba(201,168,76,0.25)] text-[#F5EDD6]/40 hover:border-[#C9A84C]/50 hover:text-[#F5EDD6]/70'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
