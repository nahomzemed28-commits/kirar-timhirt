import { redirect } from 'next/navigation'
import Sidebar from '@/components/nav/Sidebar'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const configured = url && key && url !== 'your-supabase-url'

  if (configured) {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-[#1A1209]">
        {children}
      </main>
    </div>
  )
}
