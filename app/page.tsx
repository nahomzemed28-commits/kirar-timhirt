import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/nav/Navbar'
import { CrossOrnate, CrossSimple } from '@/components/ui/crosses'

const LEVELS = [
  { num: '01', title: 'Foundations', desc: 'Posture, string names, tuning by ear, and your first clean pluck.', icon: '🎵' },
  { num: '02', title: 'Patterns',    desc: 'Repeating patterns, right-hand rhythm, and building speed safely.', icon: '🔁' },
  { num: '03', title: 'Real Music',  desc: 'Traditional melodies and beginner Mezmur — the reason you started.', icon: '🎶' },
  { num: '04', title: 'Expression',  desc: 'Improvisation, feel, and making the Kirar sound like you.', icon: '✨' },
]

const STEPS = [
  {
    num: '01',
    title: 'Watch the lesson',
    desc: 'Short, focused video lessons. Use the 0.5× speed toggle to catch every detail.',
  },
  {
    num: '02',
    title: 'Study the pattern loop',
    desc: 'An endlessly looping GIF shows the exact finger movement. Watch it until your hands know it.',
  },
  {
    num: '03',
    title: 'Complete the challenge',
    desc: 'A small, concrete task. Do it clean. Mark it done. Unlock the next lesson.',
  },
]

const MONTHLY_FEATURES = [
  'Full access to all 20+ lessons',
  'All GIF pattern guides',
  'Progress tracking',
  'Cancel anytime',
]

const LIFETIME_FEATURES = [
  'Everything in monthly',
  'All future lessons included',
  'One payment, forever',
  'Priority support',
]

export default function LandingPage() {
  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden">

      {/* ── Fixed background: giant Kirar ──────────────────────────────── */}
      <div
        aria-hidden="true"
        className="fixed inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <Image
          src="/assets/Kirar.png"
          alt=""
          width={1920}
          height={1080}
          className="animate-float w-[150vw] max-w-none object-contain opacity-[0.1]"
          priority
        />
      </div>

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <Navbar />

      <main className="relative z-10 flex-1">

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* HERO — full viewport                                          */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 pt-16">

          {/* Gold radial glow */}
          <div
            aria-hidden="true"
            className="gold-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute"
          />

          {/* Angel — top-left */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 w-80 lg:w-[28rem] pointer-events-none select-none opacity-100"
          >
            <Image src="/assets/Angel head.png" alt="" width={1920} height={1080} className="w-full object-contain" />
          </div>

          {/* Angel — top-right (mirrored) */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-80 lg:w-[28rem] pointer-events-none select-none opacity-100 scale-x-[-1]"
          >
            <Image src="/assets/Angel head.png" alt="" width={1920} height={1080} className="w-full object-contain" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">

            <p className="animate-fade-up text-[#C9A84C] text-xs sm:text-sm tracking-[0.3em] uppercase mb-8 font-medium">
              Ethiopian Kirar Learning Platform
            </p>

            {/* Real Ethiopian Orthodox processional cross */}
            <div className="animate-pulse-glow-svg mb-8 select-none">
              <Image
                src="/assets/meskel-cross.png"
                alt="Ethiopian Orthodox processional cross"
                width={172}
                height={401}
                className="w-28 sm:w-36 h-auto object-contain drop-shadow-[0_0_32px_rgba(201,168,76,0.5)]"
                priority
              />
            </div>

            <h1 className="animate-fade-up-2 text-5xl sm:text-6xl lg:text-7xl font-bold text-[#F5EDD6] leading-[1.05] tracking-tight mb-6">
              Learn Kirar<br />
              <span className="text-[#C9A84C]">from scratch.</span>
            </h1>

            <p className="animate-fade-up-3 text-[#F5EDD6]/55 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
              Structured lessons, looping finger-pattern GIFs, and real traditional Mezmur.
              No teacher. No schedule. Just you and the instrument.
            </p>

            <div className="animate-fade-up-4 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/signup"
                className="px-8 py-4 bg-[#C9A84C] text-[#1A1209] font-bold rounded-lg hover:bg-[#E2C97E] transition-colors text-base tracking-wide shadow-lg shadow-[rgba(201,168,76,0.25)]"
              >
                Start Learning Free
              </Link>
              <a
                href="#how-it-works"
                className="px-8 py-4 rounded-lg border border-[rgba(201,168,76,0.35)] text-[#F5EDD6]/70 hover:border-[#C9A84C] hover:text-[#F5EDD6] transition-colors text-base"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="animate-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[#C9A84C]/50 text-[10px] uppercase tracking-[0.2em]">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-[#C9A84C]/50 to-transparent" />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* VIDEO PREVIEW                                                 */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <section className="relative px-6 py-24 max-w-5xl mx-auto w-full">
          <div className="divider-cross mb-12">
            <span className="relative z-10 px-5 text-[#C9A84C] text-xs tracking-[0.2em] uppercase bg-[#1A1209]">
              Hear the instrument
            </span>
          </div>

          <div className="relative">
            {/* Glow border effect */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[rgba(201,168,76,0.3)] to-transparent pointer-events-none" />
            <div className="w-full aspect-video rounded-2xl border border-[rgba(201,168,76,0.2)] bg-[#0d0a05] overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Kirar performance preview"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* YOUR PATH — 4 levels                                          */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <section className="relative px-6 py-24 max-w-5xl mx-auto w-full">

          {/* Meskel behind divider */}
          <div aria-hidden="true" className="absolute top-16 left-1/2 -translate-x-1/2 w-72 sm:w-96 pointer-events-none select-none opacity-[0.12]">
            <Image src="/assets/Meskel.png" alt="" width={1920} height={1080} className="w-full object-contain" />
          </div>

          <div className="divider-cross mb-4">
            <span className="relative z-10 px-5 text-[#C9A84C] text-xs tracking-[0.2em] uppercase bg-[#1A1209]">
              Your path
            </span>
          </div>
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-[#F5EDD6] mb-3 mt-6">
            Four levels. One journey.
          </h2>
          <p className="text-center text-[#F5EDD6]/50 max-w-lg mx-auto mb-14 text-base">
            Each level unlocks when you complete the one before. No skipping ahead — every step builds the next.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {LEVELS.map((l, i) => (
              <div
                key={l.num}
                className="card-kirar p-7 flex gap-5 items-start group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="shrink-0">
                  <div className="step-ring">{l.num}</div>
                </div>
                <div>
                  <p className="text-[#F5EDD6] font-bold text-lg mb-1 group-hover:text-[#C9A84C] transition-colors">
                    {l.title}
                  </p>
                  <p className="text-[#F5EDD6]/50 text-sm leading-relaxed">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* HOW IT WORKS — 3 steps                                        */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <section id="how-it-works" className="relative px-6 py-24 max-w-5xl mx-auto w-full">

          <div className="divider-cross mb-4">
            <span className="relative z-10 px-5 text-[#C9A84C] text-xs tracking-[0.2em] uppercase bg-[#1A1209]">
              How it works
            </span>
          </div>
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-[#F5EDD6] mb-3 mt-6">
            Watch. Study. Complete.
          </h2>
          <p className="text-center text-[#F5EDD6]/50 max-w-lg mx-auto mb-14 text-base">
            Every lesson follows the same three-part structure so you always know what to do next.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.num} className="relative card-kirar p-8 flex flex-col gap-4">
                {/* Connector line (hidden on last) */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-12 -right-3 w-6 h-px bg-gradient-to-r from-[rgba(201,168,76,0.4)] to-transparent z-10" />
                )}
                <div className="step-ring text-xl">{s.num}</div>
                <div>
                  <p className="text-[#F5EDD6] font-bold text-lg mb-2">{s.title}</p>
                  <p className="text-[#F5EDD6]/50 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* LESSON PREVIEW MOCKUP                                         */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <section className="relative px-6 py-24 max-w-5xl mx-auto w-full">

          {/* Meskel behind divider */}
          <div aria-hidden="true" className="absolute top-16 left-1/2 -translate-x-1/2 w-72 sm:w-96 pointer-events-none select-none opacity-[0.12]">
            <Image src="/assets/Meskel.png" alt="" width={1920} height={1080} className="w-full object-contain" />
          </div>

          <div className="divider-cross mb-4">
            <span className="relative z-10 px-5 text-[#C9A84C] text-xs tracking-[0.2em] uppercase bg-[#1A1209]">
              Inside the lesson
            </span>
          </div>
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-[#F5EDD6] mb-3 mt-6">
            Built for how you actually learn.
          </h2>
          <p className="text-center text-[#F5EDD6]/50 max-w-lg mx-auto mb-14 text-base">
            Every lesson has a video, a GIF loop to study, a challenge, and a clear completion marker.
          </p>

          {/* Mockup */}
          <div className="card-kirar overflow-hidden">
            {/* Fake top bar */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-[rgba(201,168,76,0.15)] bg-[rgba(255,255,255,0.02)]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#8B1A1A]/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#9A7A2E]/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#1A3A6B]/60" />
              </div>
              <span className="text-[#F5EDD6]/20 text-xs">kirar-timhirt.com/lessons/3</span>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Fake sidebar */}
              <div className="w-full md:w-44 shrink-0 border-b md:border-b-0 md:border-r border-[rgba(201,168,76,0.1)] bg-[#120e06] p-4 flex flex-row md:flex-col gap-2">
                {['Start Here', 'Lessons', 'Progress'].map((item, i) => (
                  <div
                    key={item}
                    className={`text-xs px-3 py-2 rounded-lg ${
                      i === 1
                        ? 'bg-[rgba(201,168,76,0.12)] text-[#C9A84C]'
                        : 'text-[#F5EDD6]/30'
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Fake content */}
              <div className="flex-1 p-6 flex flex-col gap-5">
                <div>
                  <div className="h-2 w-28 rounded bg-[rgba(201,168,76,0.2)] mb-2" />
                  <div className="h-5 w-56 rounded bg-[rgba(245,237,214,0.15)]" />
                </div>
                {/* Fake video */}
                <div className="aspect-video w-full max-w-md rounded-xl bg-[#0d0a05] border border-[rgba(201,168,76,0.15)] flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full border border-[rgba(201,168,76,0.4)] flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-[rgba(201,168,76,0.6)] ml-1" />
                  </div>
                </div>
                {/* Fake GIF card */}
                <div className="card-kirar p-4 flex gap-4 max-w-md">
                  <div className="w-24 h-16 rounded-lg bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.2)] shrink-0 flex items-center justify-center">
                    <span className="text-[#C9A84C]/40 text-xl">∿</span>
                  </div>
                  <div className="flex flex-col gap-1.5 justify-center">
                    <div className="h-2 w-20 rounded bg-[rgba(201,168,76,0.25)]" />
                    <div className="h-2 w-32 rounded bg-[rgba(245,237,214,0.1)]" />
                    <div className="h-2 w-24 rounded bg-[rgba(245,237,214,0.07)]" />
                  </div>
                </div>
                {/* Fake challenge */}
                <div className="flex items-center gap-3 max-w-md">
                  <div className="w-24 h-9 rounded-lg bg-[#C9A84C]/80 shrink-0" />
                  <div className="h-2 w-36 rounded bg-[rgba(201,168,76,0.2)]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* PRICING                                                        */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <section id="pricing" className="relative px-6 py-24 max-w-5xl mx-auto w-full">

          {/* Meskel behind divider */}
          <div aria-hidden="true" className="absolute top-16 left-1/2 -translate-x-1/2 w-72 sm:w-96 pointer-events-none select-none opacity-[0.12]">
            <Image src="/assets/Meskel.png" alt="" width={1920} height={1080} className="w-full object-contain" />
          </div>

          <div className="divider-cross mb-4">
            <span className="relative z-10 px-5 text-[#C9A84C] text-xs tracking-[0.2em] uppercase bg-[#1A1209]">
              Pricing
            </span>
          </div>
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-[#F5EDD6] mb-3 mt-6">
            Simple, honest pricing.
          </h2>
          <p className="text-center text-[#F5EDD6]/50 max-w-md mx-auto mb-14 text-base">
            First two lessons are free — no card required. Upgrade when you're ready.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">

            {/* Monthly */}
            <div className="card-kirar p-8 flex flex-col gap-5">
              <div>
                <p className="text-[#F5EDD6]/40 text-xs tracking-[0.2em] uppercase mb-3">Monthly</p>
                <p className="text-5xl font-bold text-[#F5EDD6]">
                  $19
                  <span className="text-xl font-normal text-[#F5EDD6]/40 ml-1">/mo</span>
                </p>
              </div>
              <ul className="flex flex-col gap-2.5">
                {MONTHLY_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#F5EDD6]/60">
                    <span className="text-[#C9A84C] text-xs shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup?plan=monthly"
                className="mt-auto block text-center py-3 rounded-lg border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1A1209] transition-colors text-sm font-semibold"
              >
                Get started
              </Link>
            </div>

            {/* Lifetime */}
            <div className="relative card-kirar p-8 flex flex-col gap-5 border-[rgba(201,168,76,0.5)]">
              {/* Glow */}
              <div className="absolute inset-0 rounded-[0.875rem] bg-[rgba(201,168,76,0.04)] pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[#F5EDD6]/40 text-xs tracking-[0.2em] uppercase">Lifetime</p>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/30 uppercase tracking-wider font-semibold">
                    Best value
                  </span>
                </div>
                <p className="text-5xl font-bold text-[#C9A84C]">$79</p>
                <p className="text-[#F5EDD6]/30 text-xs mt-1">one-time payment</p>
              </div>

              <ul className="flex flex-col gap-2.5">
                {LIFETIME_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#F5EDD6]/60">
                    <span className="text-[#C9A84C] text-xs shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/signup?plan=lifetime"
                className="mt-auto block text-center py-3 rounded-lg bg-[#C9A84C] text-[#1A1209] hover:bg-[#E2C97E] transition-colors text-sm font-bold shadow-lg shadow-[rgba(201,168,76,0.2)]"
              >
                Get lifetime access
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* FINAL CTA BAND                                                */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <section className="relative px-6 py-28 max-w-3xl mx-auto w-full text-center">
          <CrossOrnate
          maskId="cross-cta"
          className="animate-pulse-glow-svg text-[#C9A84C] w-24 mb-8 mx-auto select-none"
        />
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F5EDD6] mb-5 leading-tight">
            The Kirar is waiting.<br />
            <span className="text-[#C9A84C]">Start today.</span>
          </h2>
          <p className="text-[#F5EDD6]/50 text-lg mb-10 max-w-md mx-auto">
            Two free lessons. No card required. Begin your journey with the instrument of Ethiopia.
          </p>
          <Link
            href="/signup"
            className="inline-block px-10 py-4 bg-[#C9A84C] text-[#1A1209] font-bold rounded-lg hover:bg-[#E2C97E] transition-colors text-base tracking-wide shadow-xl shadow-[rgba(201,168,76,0.25)]"
          >
            Create free account →
          </Link>
        </section>

      </main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-[rgba(201,168,76,0.12)] bg-[#120e06]">
        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <p className="text-[#C9A84C] font-bold tracking-widest uppercase text-sm mb-3 flex items-center gap-2">
              <CrossSimple className="w-4 h-4 text-[#C9A84C] shrink-0" /> Kirar Timhirt
            </p>
            <p className="text-[#F5EDD6]/35 text-xs leading-relaxed max-w-xs">
              A structured, visual, and musical way to learn the traditional East African Kirar —
              deeply rooted in Ethiopian Orthodox culture.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-[#F5EDD6]/40 text-[10px] tracking-[0.2em] uppercase mb-4">Learn</p>
            <div className="flex flex-col gap-2.5">
              {['Foundations', 'Patterns', 'Real Music', 'Expression'].map((l) => (
                <Link key={l} href="/dashboard" className="text-[#F5EDD6]/50 text-sm hover:text-[#C9A84C] transition-colors">
                  {l}
                </Link>
              ))}
            </div>
          </div>

          {/* Account */}
          <div>
            <p className="text-[#F5EDD6]/40 text-[10px] tracking-[0.2em] uppercase mb-4">Account</p>
            <div className="flex flex-col gap-2.5">
              <Link href="/signup" className="text-[#F5EDD6]/50 text-sm hover:text-[#C9A84C] transition-colors">Sign up free</Link>
              <Link href="/login" className="text-[#F5EDD6]/50 text-sm hover:text-[#C9A84C] transition-colors">Sign in</Link>
              <a href="#pricing" className="text-[#F5EDD6]/50 text-sm hover:text-[#C9A84C] transition-colors">Pricing</a>
            </div>
          </div>
        </div>

        <div className="border-t border-[rgba(201,168,76,0.08)] px-6 py-4 max-w-5xl mx-auto flex items-center justify-between">
          <p className="text-[#F5EDD6]/20 text-xs">
            © {new Date().getFullYear()} Kirar Timhirt
          </p>
          <p className="text-[#F5EDD6]/20 text-xs flex items-center gap-1.5">
            Built with love for Ethiopian music
            <CrossSimple className="w-3 h-3 text-[#F5EDD6]/20 shrink-0" />
          </p>
        </div>
      </footer>

    </div>
  )
}
