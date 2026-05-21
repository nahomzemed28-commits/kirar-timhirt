'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const LEVELS = [
  { num: '01', href: '/lessons/foundations', label: 'Foundations' },
  { num: '02', href: '/lessons/patterns',    label: 'Patterns'    },
  { num: '03', href: '/lessons/real-music',  label: 'Real Music'  },
  { num: '04', href: '/lessons/expression',  label: 'Expression'  },
]

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <aside className="w-52 shrink-0 border-r border-[rgba(201,168,76,0.15)] bg-[#120e06] flex flex-col py-6 px-4 min-h-screen">

      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-2 mb-8">
        <Image
          src="/assets/kirar-logo.png"
          alt="Kirar"
          width={345}
          height={516}
          className="w-6 h-auto object-contain"
        />
        <span className="text-[#C9A84C] tracking-widest uppercase text-xs font-semibold">
          Kirar Timhirt
        </span>
      </Link>

      {/* Dashboard */}
      <nav className="flex flex-col gap-0.5">
        <Link
          href="/dashboard"
          className={`text-sm px-3 py-2 rounded transition-colors ${
            pathname === '/dashboard'
              ? 'bg-[rgba(201,168,76,0.1)] text-[#C9A84C]'
              : 'text-[#F5EDD6]/50 hover:text-[#F5EDD6]/80'
          }`}
        >
          Dashboard
        </Link>

        {/* Levels section */}
        <p className="text-[#C9A84C]/30 text-[10px] uppercase tracking-[0.2em] px-3 pt-5 pb-2">
          Levels
        </p>

        {LEVELS.map(({ num, href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-sm px-3 py-2 rounded transition-colors flex items-center gap-2.5 ${
              isActive(href)
                ? 'bg-[rgba(201,168,76,0.1)] text-[#C9A84C]'
                : 'text-[#F5EDD6]/50 hover:text-[#F5EDD6]/80'
            }`}
          >
            <span className="text-[10px] font-bold text-[#C9A84C]/40 w-4 shrink-0">{num}</span>
            {label}
          </Link>
        ))}
      </nav>

      {/* Sign out */}
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
