import Link from 'next/link'

const PLANNED_LESSONS = [
  { num: '01', title: 'How to hold the Kirar', desc: 'Body posture, arm position, and instrument angle.' },
  { num: '02', title: 'The six strings', desc: 'Naming and locating each string. Learning to pluck cleanly.' },
  { num: '03', title: 'Tuning by ear', desc: 'How to tune the Kirar to itself — no tuner needed.' },
  { num: '04', title: 'Your first clean pluck', desc: 'Right-hand technique. Getting a full, clear tone on each string.' },
  { num: '05', title: 'Left-hand damping', desc: 'Silencing strings intentionally. The basis of rhythm.' },
]

export default function FoundationsPage() {
  return (
    <div className="px-6 py-10 max-w-3xl mx-auto">

      {/* Back */}
      <Link href="/dashboard" className="text-[#C9A84C]/60 text-xs uppercase tracking-widest hover:text-[#C9A84C] transition-colors mb-8 block">
        ← Dashboard
      </Link>

      {/* Header */}
      <div className="mb-10">
        <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-2">Level 01</p>
        <h1 className="text-[#F5EDD6] text-3xl font-bold mb-3">Foundations</h1>
        <p className="text-[#F5EDD6]/50 text-base leading-relaxed max-w-xl">
          Posture, string names, tuning by ear, and your first clean pluck.
          Every technique you will ever learn on the Kirar is built on what you learn here.
        </p>
      </div>

      {/* Divider */}
      <div className="divider-cross mb-8">
        <span className="relative z-10 px-4 text-[#C9A84C] text-xs tracking-widest uppercase bg-[#1A1209]">
          Lessons
        </span>
      </div>

      {/* Lesson list */}
      <div className="flex flex-col gap-3 mb-12">
        {PLANNED_LESSONS.map((lesson) => (
          <div
            key={lesson.num}
            className="card-kirar px-5 py-4 flex items-start gap-4 opacity-60"
          >
            <span className="text-[#C9A84C]/50 text-xs font-bold w-6 shrink-0 mt-0.5">{lesson.num}</span>
            <div>
              <p className="text-[#F5EDD6] text-sm font-semibold mb-0.5">{lesson.title}</p>
              <p className="text-[#F5EDD6]/40 text-xs leading-relaxed">{lesson.desc}</p>
            </div>
            <span className="ml-auto text-[#F5EDD6]/20 text-xs shrink-0 mt-0.5">Coming soon</span>
          </div>
        ))}
      </div>

      {/* Status banner */}
      <div className="card-kirar p-5 border-l-2 border-l-[#C9A84C]/40 text-center">
        <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-1">In production</p>
        <p className="text-[#F5EDD6]/50 text-sm">
          Lessons are being recorded and will appear here soon.
          You will be notified when this level goes live.
        </p>
      </div>

    </div>
  )
}
