'use client'

import { useEffect, useRef } from 'react'

// cursor.png should be placed in /public/cursor.png
// Recommended size: 64×64px
// Hotspot: tip of the sistrum handle (bottom-right of the image) → approx 52 32
const CURSOR_URL = '/cursor.png'
const HOTSPOT_X  = 56  // px from left edge — tip of sistrum handle
const HOTSPOT_Y  = 36  // px from top edge

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ring = ringRef.current
    if (!ring) return

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0
    let rafId: number

    function onMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

    function tick() {
      ringX = lerp(ringX, mouseX, 0.1)
      ringY = lerp(ringY, mouseY, 0.1)
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      rafId = requestAnimationFrame(tick)
    }

    function onEnterLink() { ring.classList.add('cursor-hover') }
    function onLeaveLink() { ring.classList.remove('cursor-hover') }

    document.addEventListener('mousemove', onMove)

    const bindLinks = () =>
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
    bindLinks()

    const observer = new MutationObserver(bindLinks)
    observer.observe(document.body, { childList: true, subtree: true })

    rafId = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Lagging gold ring — subtle glow that follows the sistrum cursor */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#C9A84C]/30 transition-[width,height,border-color] duration-200"
        style={{ willChange: 'transform' }}
      />

      <style>{`
        *,
        *:hover,
        *:active {
          cursor: url('${CURSOR_URL}') ${HOTSPOT_X} ${HOTSPOT_Y}, auto !important;
        }

        .cursor-ring.cursor-hover {
          width: 3.5rem;
          height: 3.5rem;
          border-color: rgba(201, 168, 76, 0.6);
        }
      `}</style>
    </>
  )
}
