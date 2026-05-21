import Link from 'next/link'

const PLANNED_LESSONS = [
  { num: '01', title: 'The basic 4-beat pattern', desc: 'Right-hand rhythm over all six strings. The backbone of Kirar playing.' },
  { num: '02', title: 'String skipping', desc: 'Moving cleanly between non-adjacent strings without pausing.' },
  { num: '03', title: 'Building speed safely', desc: 'How to practise at 50% tempo and why it makes you faster.' },
  { num: '04', title: 'The walking bass pattern', desc: 'Left-hand root movement while the right hand keeps rhythm.' },
  { num: '05', title: 'Transitions without stopping', desc: 'Moving between patterns seamlessly. The test of Level 01 mastery.' },
]

export default function PatternsPage() {
  return (
    <div className="px-6 py-10 max-w-3xl mx-auto">

      <Link href="/dashboard" className="text-[#C9A84C]/60 text-xs uppercase tracking-widest hover:text-[#C9A84C] transition-colors mb-8 block">
        ← Dashboard
      </Link>

      <div className="mb-10">
        <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-2">Level 02</p>
        <h1 className="text-[#F5EDD6] text-3xl font-bold mb-3">Patterns</h1>
        <p className="text-[#F5EDD6]/50 text-base leading-relaxed max-w-xl">
          Repeating patterns, right-hand rhythm, and building speed safely.
          This is where the Kirar starts to feel like an instrument and not just strings.
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
        <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-1">Unlocks after Level 01</p>
        <p className="text-[#F5EDD6]/50 text-sm">
          Complete all Foundations lessons to unlock this level.
          Lessons are also being recorded and will appear here soon.
        </p>
      </div>

    </div>
  )
}
