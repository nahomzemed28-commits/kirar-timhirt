import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import VideoPlayer from '@/components/lesson/VideoPlayer'
import GifLoop from '@/components/lesson/GifLoop'
import MarkComplete from '@/components/lesson/MarkComplete'

interface Props {
  params: Promise<{ id: string }>
}

export default async function LessonPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*, levels(title, order_index)')
    .eq('id', id)
    .single()

  if (!lesson) notFound()

  // Check access: free lesson or subscriber
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user.id)
    .single()

  const hasAccess =
    lesson.is_free ||
    profile?.subscription_status === 'active' ||
    profile?.subscription_status === 'lifetime'

  // Fetch completion status
  const { data: progress } = await supabase
    .from('user_progress')
    .select('completed')
    .eq('user_id', user.id)
    .eq('lesson_id', lesson.id)
    .maybeSingle()

  const isCompleted = progress?.completed ?? false

  // Next lesson in same level
  const { data: nextLesson } = await supabase
    .from('lessons')
    .select('id, title')
    .eq('level_id', lesson.level_id)
    .gt('order_index', lesson.order_index)
    .order('order_index', { ascending: true })
    .limit(1)
    .maybeSingle()

  return (
    <div className="px-6 py-10 max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <p className="text-[#C9A84C]/60 text-xs uppercase tracking-widest mb-4">
        {(lesson.levels as { title: string })?.title} · Lesson {lesson.order_index}
      </p>

      <h1 className="text-[#F5EDD6] text-2xl font-bold mb-6">{lesson.title}</h1>

      {/* Video Player */}
      {hasAccess ? (
        <VideoPlayer url={lesson.video_url} />
      ) : (
        <div className="aspect-video rounded-xl border border-[rgba(201,168,76,0.2)] bg-[#0d0a05] flex flex-col items-center justify-center text-center p-8 mb-6">
          <div className="text-[#C9A84C] text-2xl mb-3 opacity-60">✛</div>
          <p className="text-[#F5EDD6] font-semibold mb-1">This lesson requires a subscription</p>
          <p className="text-[#F5EDD6]/40 text-sm mb-5">
            First 2 lessons are free. Upgrade to unlock everything.
          </p>
          <a
            href="/#pricing"
            className="px-5 py-2.5 bg-[#C9A84C] text-[#1A1209] text-sm font-semibold rounded hover:bg-[#E2C97E] transition-colors"
          >
            See pricing
          </a>
        </div>
      )}

      {hasAccess && (
        <>
          {/* Description */}
          {lesson.description && (
            <p className="text-[#F5EDD6]/60 text-sm leading-relaxed mb-8">
              {lesson.description}
            </p>
          )}

          {/* GIF Loop Section */}
          {lesson.pattern_gif_url && (
            <div className="mb-8">
              <div className="divider-cross mb-6">
                <span className="relative z-10 px-4 text-[#C9A84C] text-xs tracking-widest uppercase bg-[#1A1209]">
                  Pattern guide
                </span>
              </div>
              <GifLoop
                gifUrl={lesson.pattern_gif_url}
                title="Finger pattern"
                description="Study this loop until the movement feels natural. Focus on the right-hand pluck — not speed."
              />
            </div>
          )}

          {/* Challenge */}
          {lesson.challenge_text && (
            <div className="card-kirar p-5 mb-8 border-l-2 border-l-[#C9A84C]">
              <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-2">
                Mini challenge
              </p>
              <p className="text-[#F5EDD6] text-sm leading-relaxed">
                {lesson.challenge_text}
              </p>
            </div>
          )}

          {/* Mark Complete */}
          <MarkComplete
            lessonId={lesson.id}
            userId={user.id}
            isCompleted={isCompleted}
            nextLesson={nextLesson ?? null}
          />
        </>
      )}
    </div>
  )
}
