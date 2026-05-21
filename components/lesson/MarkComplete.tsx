'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface Props {
  lessonId: number
  userId: string
  isCompleted: boolean
  nextLesson: { id: number; title: string } | null
}

export default function MarkComplete({ lessonId, userId, isCompleted, nextLesson }: Props) {
  const router = useRouter()
  const [done, setDone] = useState(isCompleted)
  const [loading, setLoading] = useState(false)

  async function handleMark() {
    if (done) return
    setLoading(true)

    const supabase = createClient()
    await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString(),
      })

    setDone(true)
    setLoading(false)
    router.refresh()
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
      <button
        onClick={handleMark}
        disabled={done || loading}
        className={`px-6 py-2.5 rounded font-semibold text-sm transition-colors ${
          done
            ? 'bg-[rgba(201,168,76,0.15)] border border-[#C9A84C]/40 text-[#C9A84C] cursor-default'
            : 'bg-[#C9A84C] text-[#1A1209] hover:bg-[#E2C97E] disabled:opacity-50'
        }`}
      >
        {done ? '✓ Lesson complete' : loading ? 'Saving…' : 'Mark as complete'}
      </button>

      {done && nextLesson && (
        <a
          href={`/lessons/${nextLesson.id}`}
          className="text-sm text-[#C9A84C] hover:text-[#E2C97E] transition-colors underline underline-offset-2"
        >
          Next: {nextLesson.title} →
        </a>
      )}
    </div>
  )
}
