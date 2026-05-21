'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LEVELS = [
  { num: '01', title: 'Foundations', desc: 'Holding, posture & tuning', href: '/dashboard' },
  { num: '02', title: 'Patterns',    desc: 'Rhythm, speed & transitions', href: '/dashboard' },
  { num: '03', title: 'Real Music',  desc: 'Traditional melodies & Mezmur', href: '/dashboard' },
  { num: '04', title: 'Expression',  desc: 'Improvisation & feel', href: '/dashboard' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [lessonsOpen, setLessonsOpen] = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [scrolled, setScrolled]       = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-[#C9A84C] font-bold tracking-[0.2em] uppercase text-sm flex items-center gap-2"
        >
          <span className="text-lg">✛</span>
          Kirar Timhirt
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">

          {/* Lessons dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setLessonsOpen(true)}
            onMouseLeave={() => setLessonsOpen(false)}
          >
            <button className="text-sm text-[#F5EDD6]/70 hover:text-[#F5EDD6] transition-colors flex items-center gap-1.5 py-5">
              Lessons
              <span
                className={`text-[#C9A84C] text-[10px] transition-transform duration-200 ${
                  lessonsOpen ? 'rotate-180' : ''
                }`}
              >
                ▾
              </span>
            </button>

            {/* Dropdown panel */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-0 w-72 transition-all duration-200 origin-top ${
                lessonsOpen
                  ? 'opacity-100 scale-y-100 pointer-events-auto'
                  : 'opacity-0 scale-y-95 pointer-events-none'
              }`}
            >
              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-3 h-3 rotate-45 border-l border-t border-[rgba(201,168,76,0.25)] bg-[#120e06] -mb-1.5 relative z-10" />
              </div>

              <div className="rounded-xl border border-[rgba(201,168,76,0.22)] bg-[#120e06] shadow-2xl shadow-black/60 overflow-hidden">
                <div className="px-2 py-2">
                  {LEVELS.map((l) => (
                    <Link
                      key={l.num}
                      href={l.href}
                      onClick={() => setLessonsOpen(false)}
                      className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-[rgba(201,168,76,0.08)] transition-colors group"
                    >
                      <span className="text-[#C9A84C]/50 text-xs font-bold mt-0.5 w-5 shrink-0 group-hover:text-[#C9A84C] transition-colors">
                        {l.num}
                      </span>
                      <div>
                        <p className="text-[#F5EDD6] text-sm font-semibold group-hover:text-[#C9A84C] transition-colors leading-none mb-0.5">
                          {l.title}
                        </p>
                        <p className="text-[#F5EDD6]/40 text-xs">{l.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-[rgba(201,168,76,0.1)] px-4 py-3">
                  <Link
                    href="/dashboard"
                    className="text-xs text-[#C9A84C] hover:text-[#E2C97E] transition-colors"
                  >
                    View all lessons →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <a
            href="#how-it-works"
            className="text-sm text-[#F5EDD6]/70 hover:text-[#F5EDD6] transition-colors"
          >
            How it works
          </a>
          <a
            href="#pricing"
            className="text-sm text-[#F5EDD6]/70 hover:text-[#F5EDD6] transition-colors"
          >
            Pricing
          </a>
        </nav>

        {/* Auth CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-[#F5EDD6]/60 hover:text-[#F5EDD6] transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="text-sm px-5 py-2 rounded-lg bg-[#C9A84C] text-[#1A1209] font-bold hover:bg-[#E2C97E] transition-colors tracking-wide"
          >
            Start free
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden text-[#C9A84C] text-xl w-8 h-8 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-[500px]' : 'max-h-0'
        }`}
      >
        <div className="border-t border-[rgba(201,168,76,0.15)] bg-[#120e06] px-6 py-5 flex flex-col gap-1">
          <p className="text-[#C9A84C] text-[10px] uppercase tracking-[0.2em] mb-2">Lessons</p>
          {LEVELS.map((l) => (
            <Link
              key={l.num}
              href={l.href}
              className="flex items-center gap-3 py-2.5 text-[#F5EDD6]/70 hover:text-[#F5EDD6] transition-colors"
            >
              <span className="text-[#C9A84C]/50 text-xs font-bold w-5">{l.num}</span>
              <span className="text-sm">{l.title}</span>
            </Link>
          ))}

          <div className="border-t border-[rgba(201,168,76,0.1)] mt-3 pt-4 flex flex-col gap-3">
            <a href="#how-it-works" className="text-sm text-[#F5EDD6]/70">How it works</a>
            <a href="#pricing" className="text-sm text-[#F5EDD6]/70">Pricing</a>
            <Link href="/login" className="text-sm text-[#F5EDD6]/70">Sign in</Link>
            <Link
              href="/signup"
              className="block text-center py-3 rounded-lg bg-[#C9A84C] text-[#1A1209] font-bold text-sm mt-1"
            >
              Start free
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
