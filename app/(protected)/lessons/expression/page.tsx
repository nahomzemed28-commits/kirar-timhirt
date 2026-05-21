import Link from 'next/link'

const PLANNED_LESSONS = [
  { num: '01', title: 'What improvisation means on the Kirar', desc: 'How traditional players think about melody and space.' },
  { num: '02', title: 'Playing with feel', desc: 'Dynamics, timing variations, and the moments of silence that make music breathe.' },
  { num: '03', title: 'Making a melody your own', desc: 'Taking a traditional phrase and bending it to your voice.' },
  { num: '04', title: 'Playing with a beat', desc: 'Staying in time with a drum or metronome without losing feel.' },
  { num: '05', title: 'Your own Mezmur', desc: 'A free lesson: create and record a short original piece in the style you have learned.' },
]

export default function ExpressionPage() {
  return (
    <div className="px-6 py-10 max-w-3xl mx-auto">

      <Link href="/dashboard" className="text-[#C9A84C]/60 text-xs uppercase tracking-widest hover:text-[#C9A84C] transition-colors mb-8 block">
        ← Dashboard
      </Link>

      <div className="mb-10">
        <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-2">Level 04</p>
        <h1 className="text-[#F5EDD6] text-3xl font-bold mb-3">Expression</h1>
        <p className="text-[#F5EDD6]/50 text-base leading-relaxed max-w-xl">
          Improvisation, feel, and making the Kirar sound like you.
          The instrument is no longer a puzzle — it is your voice.
        </p>
      </div>

      <div className="divider-cross mb-8">
        <span className="relative z-10 px-4 text-[#C9A84C] text-xs tracking-widest uppercase bg-[#1A1209]">
          Lessons
        </span>
      </div>

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

      <div className="card-kirar p-5 border-l-2 border-l-[#C9A84C]/40 text-center">
        <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-1">Unlocks after Level 03</p>
        <p className="text-[#F5EDD6]/50 text-sm">
          Complete all Real Music lessons to reach this level.
        </p>
      </div>

    </div>
  )
}
