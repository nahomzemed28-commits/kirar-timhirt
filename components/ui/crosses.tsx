/**
 * Ethiopian Orthodox cross SVG components.
 *
 * CrossOrnate — Lalibela-inspired lattice cross. Open-work grid cut through each arm,
 * three knob circles at every terminal, wide decorative terminal bars. Use at 120px+.
 *
 * CrossSimple — Clean processional-style cross with terminal bars and knobs. Works at
 * any size from 16px up.
 */

interface CrossProps {
  className?: string
}

interface CrossOrnateProps extends CrossProps {
  /** Must be unique per page when rendering multiple instances */
  maskId?: string
}

export function CrossOrnate({ className, maskId = 'cross-ornate' }: CrossOrnateProps) {
  // Lattice holes — top & bottom arm bodies (x: 67–93, y: 18–67 / 93–142)
  const holeX     = [69, 77, 85]
  const topHoleY  = [21, 30, 39, 48, 57]
  const botHoleY  = [96, 105, 114, 123, 132]

  // Lattice holes — left & right arm bodies (x: 18–67 / 93–142, y: 67–93)
  const leftHoleX  = [21, 30, 39, 48, 57]
  const rightHoleX = [96, 105, 114, 123, 132]
  const holeY      = [69, 77, 85]

  return (
    <svg
      viewBox="0 0 160 160"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <mask id={maskId}>
          {/* Everything is visible by default */}
          <rect width="160" height="160" fill="white" />

          {/* Cut lattice holes into each arm body */}
          {holeX.flatMap(x => topHoleY.map(y => (
            <rect key={`t-${x}-${y}`} x={x} y={y} width="6" height="7" rx="1" fill="black" />
          )))}
          {holeX.flatMap(x => botHoleY.map(y => (
            <rect key={`b-${x}-${y}`} x={x} y={y} width="6" height="7" rx="1" fill="black" />
          )))}
          {leftHoleX.flatMap(x => holeY.map(y => (
            <rect key={`l-${x}-${y}`} x={x} y={y} width="7" height="6" rx="1" fill="black" />
          )))}
          {rightHoleX.flatMap(x => holeY.map(y => (
            <rect key={`r-${x}-${y}`} x={x} y={y} width="7" height="6" rx="1" fill="black" />
          )))}
        </mask>
      </defs>

      {/* ── Cross body (masked) ───────────────────────────────────────── */}
      <g mask={`url(#${maskId})`}>
        {/* Arm shafts */}
        <rect x="67" y="4"  width="26" height="152" />
        <rect x="4"  y="67" width="152" height="26" />

        {/* Wide terminal bars at each arm end */}
        <rect x="52" y="4"   width="56" height="14" rx="2" />
        <rect x="52" y="142" width="56" height="14" rx="2" />
        <rect x="4"   y="52" width="14" height="56" rx="2" />
        <rect x="142" y="52" width="14" height="56" rx="2" />
      </g>

      {/* ── Terminal knobs (three circles per arm tip, unmasked) ─────── */}
      {/* Top */}
      <circle cx="58"  cy="7"   r="5" />
      <circle cx="80"  cy="5"   r="5" />
      <circle cx="102" cy="7"   r="5" />
      {/* Bottom */}
      <circle cx="58"  cy="153" r="5" />
      <circle cx="80"  cy="155" r="5" />
      <circle cx="102" cy="153" r="5" />
      {/* Left */}
      <circle cx="7"   cy="58"  r="5" />
      <circle cx="5"   cy="80"  r="5" />
      <circle cx="7"   cy="102" r="5" />
      {/* Right */}
      <circle cx="153" cy="58"  r="5" />
      <circle cx="155" cy="80"  r="5" />
      <circle cx="153" cy="102" r="5" />
    </svg>
  )
}

export function CrossSimple({ className }: CrossProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Arm shafts */}
      <rect x="17.5" y="7"    width="5"  height="26" />
      <rect x="7"    y="17.5" width="26" height="5"  />

      {/* Terminal bars */}
      <rect x="13" y="4"  width="14" height="5" rx="1" />
      <rect x="13" y="31" width="14" height="5" rx="1" />
      <rect x="4"  y="13" width="5"  height="14" rx="1" />
      <rect x="31" y="13" width="5"  height="14" rx="1" />

      {/* Terminal knobs */}
      <circle cx="20"   cy="4.5"  r="2.5" />
      <circle cx="20"   cy="35.5" r="2.5" />
      <circle cx="4.5"  cy="20"   r="2.5" />
      <circle cx="35.5" cy="20"   r="2.5" />
    </svg>
  )
}
