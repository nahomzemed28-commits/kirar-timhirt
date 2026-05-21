import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  await supabase.auth.signOut()
  const origin = request.headers.get('origin') ?? 'http://localhost:3000'
  return NextResponse.redirect(new URL('/', origin))
}
