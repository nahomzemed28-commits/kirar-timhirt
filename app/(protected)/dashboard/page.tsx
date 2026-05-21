import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  // Fetch all lessons with levels, ordered
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, title, order_index, level_id, levels(title, order_index)')
    .order('order_index', { ascending: true })

  // Fetch user's completed lessons
  const { data: progress } = await supabase
    .from('user_progress')
    .select('lesson_id, completed')
    .eq('user_id', user!.id)
    .eq('completed', true)

  const completedIds = new Set((progress ?? []).map((p) => p.lesson_id))
  const completedCount = completedIds.size
  const totalCount = lessons?.length ?? 0

  // Find next recommended lesson
  const nextLesson = lessons?.find((l) => !completedIds.has(l.id))

  return (
    <div className="px-6 py-10 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-1">Your progress</p>
        <h1 className="text-[#F5EDD6] text-2xl font-bold">
          {completedCount === 0 ? 'Ready to begin?' : `${completedCount} of ${totalCount} complete`}
        </h1>

        {/* Progress bar */}
        <div className="mt-4 h-1.5 bg-[rgba(201,168,76,0.15)] rounded-full overflow-hidden w-full max-w-md">
          <div
            className="h-full bg-[#C9A84C] rounded-full transition-all duration-500"
            style={{ width: totalCount ? `${(completedCount / totalCount) * 100}%` : '0%' }}
          />
        </div>
      </div>

      {/* Next lesson CTA */}
      {nextLesson && (
        <div className="card-kirar p-5 mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-0.5">Up next</p>
            <p className="text-[#F5EDD6] font-semibold">{nextLesson.title}</p>
          </div>
          <Link
            href={`/lessons/${nextLesson.id}`}
            className="shrink-0 px-4 py-2 bg-[#C9A84C] text-[#1A1209] text-sm font-semibold rounded hover:bg-[#E2C97E] transition-colors"
          >
            Continue →
          </Link>
        </div>
      )}

      {/* Lesson list */}
      <div>
        <div className="divider-cross mb-6">
          <span className="relative z-10 px-4 text-[#C9A84C] text-xs tracking-widest uppercase bg-[#1A1209]">
            All lessons
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {lessons?.map((lesson) => {
            const done = completedIds.has(lesson.id)
            return (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                className="card-kirar px-5 py-4 flex items-center justify-between gap-4 hover:border-[rgba(201,168,76,0.5)] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ${
                    done
                      ? 'border-[#C9A84C] bg-[#C9A84C] text-[#1A1209]'
                      : 'border-[rgba(201,168,76,0.3)] text-transparent'
                  }`}>
                    ✓
                  </span>
                  <span className={`text-sm ${done ? 'text-[#F5EDD6]/50 line-through' : 'text-[#F5EDD6]'}`}>
                    {lesson.title}
                  </span>
                </div>
                <span className="text-[#C9A84C] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
