'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { CrossSimple } from '@/components/ui/crosses'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword]   = useState('')
  const [confirm, setConfirm]     = useState('')
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error: authError } = await supabase.auth.updateUser({ password })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#1A1209]">
      <Link href="/" className="text-[#C9A84C] tracking-widest uppercase text-sm mb-10">
        Kirar Timhirt
      </Link>

      <div className="card-kirar w-full max-w-sm p-8">
        <CrossSimple className="w-6 h-6 text-[#C9A84C] mx-auto mb-3 opacity-60" />
        <h1 className="text-[#F5EDD6] text-xl font-semibold text-center mb-6">
          Choose a new password
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[#F5EDD6]/50 text-xs uppercase tracking-wider">
              New password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#0d0a05] border border-[rgba(201,168,76,0.25)] rounded px-3 py-2.5 text-[#F5EDD6] text-sm outline-none focus:border-[#C9A84C] transition-colors placeholder:text-[#F5EDD6]/20"
              placeholder="8+ characters"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#F5EDD6]/50 text-xs uppercase tracking-wider">
              Confirm password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="bg-[#0d0a05] border border-[rgba(201,168,76,0.25)] rounded px-3 py-2.5 text-[#F5EDD6] text-sm outline-none focus:border-[#C9A84C] transition-colors placeholder:text-[#F5EDD6]/20"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-[#8B1A1A] border border-[#8B1A1A]/30 rounded px-3 py-2 bg-[#8B1A1A]/10">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 py-2.5 rounded bg-[#C9A84C] text-[#1A1209] font-semibold text-sm hover:bg-[#E2C97E] transition-colors disabled:opacity-50"
          >
            {loading ? 'Updating…' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  )
}
