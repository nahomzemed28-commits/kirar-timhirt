import Link from 'next/link'

const LEVELS = [
  { num: '01', title: 'Foundations', desc: 'Posture, string names, tuning by ear, and your first clean pluck.', href: '/lessons/foundations' },
  { num: '02', title: 'Patterns',    desc: 'Repeating patterns, right-hand rhythm, and building speed safely.',  href: '/lessons/patterns'    },
  { num: '03', title: 'Real Music',  desc: 'Traditional melodies and beginner Mezmur.',                         href: '/lessons/real-music'  },
  { num: '04', title: 'Expression',  desc: 'Improvisation, feel, and making the Kirar sound like you.',         href: '/lessons/expression'  },
]

async function getLessonsData(userId: string) {
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()

    const [{ data: lessons }, { data: progress }] = await Promise.all([
      supabase.from('lessons').select('id, title, order_index, level_id').order('order_index'),
      supabase.from('user_progress').select('lesson_id').eq('user_id', userId).eq('completed', true),
    ])

    return { lessons: lessons ?? [], completedIds: new Set((progress ?? []).map(p => p.lesson_id)) }
  } catch {
    return { lessons: [], completedIds: new Set<string>() }
  }
}

async function getCurrentUser() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key || url === 'your-supabase-url') return null

    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch {
    return null
  }
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  const { lessons, completedIds } = user
    ? await getLessonsData(user.id)
    : { lessons: [], completedIds: new Set<string>() }

  const completedCount = completedIds.size
  const totalCount = lessons.length

  return (
    <div className="px-6 py-10 max-w-3xl mx-auto">

      {/* Header */}
      <div className="mb-10">
        <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-1">Your progress</p>
        <h1 className="text-[#F5EDD6] text-2xl font-bold">
          {totalCount === 0 ? 'Welcome — lessons coming soon.' : completedCount === 0 ? 'Ready to begin?' : `${completedCount} of ${totalCount} complete`}
        </h1>

        {totalCount > 0 && (
          <div className="mt-4 h-1.5 bg-[rgba(201,168,76,0.15)] rounded-full overflow-hidden w-full max-w-md">
            <div
              className="h-full bg-[#C9A84C] rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        )}
      </div>

      {/* Level grid */}
      <div className="divider-cross mb-8">
        <span className="relative z-10 px-4 text-[#C9A84C] text-xs tracking-widest uppercase bg-[#1A1209]">
          Your path
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {LEVELS.map((level) => (
          <Link
            key={level.num}
            href={level.href}
            className="card-kirar p-6 flex gap-4 items-start group hover:border-[rgba(201,168,76,0.5)] transition-colors"
          >
            <div className="step-ring shrink-0">{level.num}</div>
            <div>
              <p className="text-[#F5EDD6] font-bold text-base mb-1 group-hover:text-[#C9A84C] transition-colors">
                {level.title}
              </p>
              <p className="text-[#F5EDD6]/45 text-sm leading-relaxed">{level.desc}</p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}
