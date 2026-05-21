'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { CrossSimple } from '@/components/ui/crosses'

export default function ForgotPasswordPage() {
  const [email, setEmail]     = useState('')
  const [error, setError]     = useState('')
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#1A1209]">
        <div className="card-kirar w-full max-w-sm p-8 text-center">
          <CrossSimple className="w-8 h-8 text-[#C9A84C] mx-auto mb-4 opacity-60" />
          <h1 className="text-[#F5EDD6] text-xl font-semibold mb-3">Check your inbox</h1>
          <p className="text-[#F5EDD6]/50 text-sm leading-relaxed mb-6">
            We sent a password reset link to{' '}
            <span className="text-[#C9A84C]">{email}</span>.
            The link expires in 1 hour.
          </p>
          <Link href="/login" className="text-[#C9A84C] text-sm hover:underline">
            Back to sign in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#1A1209]">
      <Link href="/" className="text-[#C9A84C] tracking-widest uppercase text-sm mb-10">
        Kirar Timhirt
      </Link>

      <div className="card-kirar w-full max-w-sm p-8">
        <CrossSimple className="w-6 h-6 text-[#C9A84C] mx-auto mb-3 opacity-60" />
        <h1 className="text-[#F5EDD6] text-xl font-semibold text-center mb-2">
          Reset password
        </h1>
        <p className="text-[#F5EDD6]/40 text-xs text-center mb-6">
          Enter your email and we will send a reset link.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[#F5EDD6]/50 text-xs uppercase tracking-wider">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#0d0a05] border border-[rgba(201,168,76,0.25)] rounded px-3 py-2.5 text-[#F5EDD6] text-sm outline-none focus:border-[#C9A84C] transition-colors placeholder:text-[#F5EDD6]/20"
              placeholder="you@example.com"
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
            {loading ? 'Sending…' : 'Send reset link'}
          </button>
        </form>

        <p className="text-center text-[#F5EDD6]/40 text-xs mt-6">
          <Link href="/login" className="text-[#C9A84C] hover:underline">Back to sign in</Link>
        </p>
      </div>
    </div>
  )
}
