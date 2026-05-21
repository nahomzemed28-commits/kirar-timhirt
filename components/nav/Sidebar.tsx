'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/dashboard', label: 'Start Here' },
  { href: '/dashboard', label: 'Lessons' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-52 shrink-0 border-r border-[rgba(201,168,76,0.15)] bg-[#120e06] flex flex-col py-6 px-4 min-h-screen">
      {/* Logo */}
      <Link href="/dashboard" className="text-[#C9A84C] tracking-widest uppercase text-xs font-semibold mb-8 block">
        Kirar Timhirt
      </Link>

      {/* Cross divider */}
      <div className="text-[#C9A84C]/30 text-center text-sm mb-6 select-none">✛</div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1">
        {NAV.map(({ href, label }) => {
          const active = pathname === href
          return (
            <Link
              key={label}
              href={href}
              className={`text-sm px-3 py-2 rounded transition-colors ${
                active
                  ? 'bg-[rgba(201,168,76,0.1)] text-[#C9A84C]'
                  : 'text-[#F5EDD6]/50 hover:text-[#F5EDD6]/80'
              }`}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Spacer + sign out */}
      <div className="mt-auto">
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="text-xs text-[#F5EDD6]/30 hover:text-[#F5EDD6]/60 transition-colors"
          >
            Sign out
          </button>
        </form>
      </div>
    </aside>
  )
}
