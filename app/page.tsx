"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, animate, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  X,
  Minus,
  ChevronDown,
  Users,
  MessageSquare,
  BarChart3,
  DollarSign,
  Star,
  Flame,
  Play,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────
type CellValue = boolean | "partial" | string

// ─── Data ─────────────────────────────────────────────────────────────────────
const BRANDS = [
  "Notion",
  "Linear",
  "Figma",
  "Vercel",
  "Stripe",
  "Discord",
  "Duolingo",
  "Replit",
  "Brex",
  "Rippling",
  "Airtable",
  "Webflow",
  "Loom",
  "Retool",
  "Supabase",
  "Railway",
  "Fly.io",
  "Planetscale",
]

const STATS = [
  { countTo: 50, suffix: "K+", label: "Vetted Creators", prefix: "" },
  { countTo: 1, suffix: "K+", label: "Brands Active", prefix: "" },
  { countTo: 5, suffix: "B+", label: "Views Delivered", prefix: "" },
  { countTo: 10, suffix: "M+", label: "Paid to Creators", prefix: "$" },
]

const STEPS = [
  {
    number: "01",
    title: "Source Creators",
    body: "Reach 50,000+ vetted UGC creators instantly. Filter by niche, platform, engagement rate, and audience demographics. They apply to you.",
    accent: "#FF4D00",
  },
  {
    number: "02",
    title: "Brief & Manage",
    body: "Send campaign briefs, chat in real-time, schedule content, and manage every creator relationship from a single clean workspace.",
    accent: "#FF8A00",
  },
  {
    number: "03",
    title: "Track Performance",
    body: "Watch views, engagement rates, and conversions update live. Know exactly which creators are driving real results for your brand.",
    accent: "#FF4D00",
  },
  {
    number: "04",
    title: "Automate Payments",
    body: "Pay creators with one click. Handle invoices, contracts, and bonuses automatically — zero spreadsheets, zero manual follow-up.",
    accent: "#FF8A00",
  },
]

const TESTIMONIALS = [
  {
    quote: "Found three incredible creators within the first hour. Quality was way above anything we'd seen before.",
    name: "Lena Park",
    role: "Growth Lead, Notion",
    initials: "LP",
    stars: 5,
  },
  {
    quote: "The performance dashboard saved us ten hours a week. We finally know what's working without manual reporting.",
    name: "Rodrigo Santos",
    role: "Head of Marketing, Linear",
    initials: "RS",
    stars: 5,
  },
  {
    quote: "We scaled to 40 active creators in two weeks. Briefing and payment automation made it actually manageable.",
    name: "Aisha Okafor",
    role: "Founder, Astra",
    initials: "AO",
    stars: 5,
  },
  {
    quote: "Direct access and real metrics. Unlike agencies, ROI was immediately visible from day one.",
    name: "James Whitfield",
    role: "VP Growth, Replit",
    initials: "JW",
    stars: 5,
  },
  {
    quote: "Gen Z creators who actually get our product. Onboarding them was painless — the platform handled everything.",
    name: "Sophie Chen",
    role: "CMO, GPTZero",
    initials: "SC",
    stars: 5,
  },
  {
    quote: "Organic short-form at scale. Now it's our best performing channel — nothing else comes close.",
    name: "Marco Ferretti",
    role: "Founding CEO, Brex",
    initials: "MF",
    stars: 5,
  },
]

const COMPARISON: Array<{ feature: string; cc: CellValue; diy: CellValue; agency: CellValue }> = [
  {
    feature: "Creator access",
    cc: "50K+ vetted creators apply to you",
    diy: "Cold DMs, 80% ghosted",
    agency: "Small curated roster",
  },
  { feature: "Campaign management", cc: true, diy: false, agency: "partial" },
  { feature: "Real-time analytics", cc: true, diy: false, agency: "partial" },
  { feature: "Automated payments", cc: true, diy: false, agency: false },
  { feature: "Authentic creator posts", cc: true, diy: "partial", agency: false },
  { feature: "Interview automation", cc: true, diy: false, agency: false },
  { feature: "Cost", cc: "From free", diy: "Time + chaos", agency: "$5,000+/mo" },
]

const FAQS = [
  {
    q: "How do I get started with CreatorConnect?",
    a: "Create a free account, post your first campaign brief, and instantly reach thousands of vetted UGC creators. Your first campaign can go live in under an hour.",
  },
  {
    q: "What types of creators are on the platform?",
    a: "We specialize in UGC (user-generated content) creators who make authentic content for TikTok, Instagram, YouTube Shorts, and more. All creators are vetted before joining.",
  },
  {
    q: "How does pricing work?",
    a: "We offer a free trial to get you started. Paid plans scale with usage — no hidden fees, no agency markups. You only pay for what you use.",
  },
  {
    q: "How are creator payments handled?",
    a: "Payments are fully automated. Set your rates upfront, creators get paid upon content approval. Invoices, contracts, and tax forms are all handled automatically.",
  },
  {
    q: "Can I track campaign performance in real time?",
    a: "Yes. Our live dashboard shows views, engagement, link clicks, and estimated conversions per creator — no waiting for weekly or monthly reports.",
  },
  {
    q: "How quickly can I find and hire creators?",
    a: "Most brands receive creator applications within hours of posting a brief. With our filtering tools, you can review and hire creators same-day.",
  },
]

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useCountUp(to: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    const ctrl = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    })
    return () => ctrl.stop()
  }, [trigger, to, duration])
  return count
}

// ─── SVG Illustrations ────────────────────────────────────────────────────────
function SourceSVG({ inView }: { inView: boolean }) {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm">
      {[
        { x: 14, delay: 0.1, color: "#FF4D00" },
        { x: 108, delay: 0.3, color: "#FF8A00" },
        { x: 202, delay: 0.5, color: "#FF4D00" },
      ].map(({ x, delay, color }, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay }}
        >
          <rect x={x} y="20" width="66" height="95" rx="8" fill="#111" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          <circle cx={x + 33} cy="52" r="18" fill={`${color}18`} />
          <circle cx={x + 33} cy="52" r="12" fill={`${color}30`} />
          <circle cx={x + 33} cy="44" r="6" fill={`${color}70`} />
          <rect x={x + 12} y="76" width="42" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
          <rect x={x + 18} y="85" width="30" height="3" rx="1.5" fill="rgba(255,255,255,0.08)" />
          <rect x={x + 10} y="96" width="46" height="10" rx="5" fill={color} opacity="0.2" />
        </motion.g>
      ))}
      <motion.circle
        cx="141"
        cy="68"
        r="54"
        stroke="#FF4D00"
        strokeWidth="1.5"
        fill="rgba(255,77,0,0.03)"
        strokeDasharray="7 4"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "141px 68px" }}
      />
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
      >
        <circle cx="188" cy="108" r="20" stroke="#FF4D00" strokeWidth="2" fill="none" />
        <line x1="202" y1="122" x2="214" y2="134" stroke="#FF4D00" strokeWidth="3" strokeLinecap="round" />
      </motion.g>
      {[
        { x: 22, text: "4.2M ▲" },
        { x: 116, text: "8.7M ▲" },
        { x: 210, text: "2.1M ▲" },
      ].map(({ x, text }, i) => (
        <motion.text
          key={i}
          x={x}
          y={138}
          fill="#FF8A00"
          fontSize="8"
          fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 + i * 0.1 }}
        >
          {text}
        </motion.text>
      ))}
    </svg>
  )
}

function TrackSVG({ inView }: { inView: boolean }) {
  const bars = [55, 78, 42, 94, 68, 85]
  const points: [number, number][] = [
    [42, 79],
    [80, 50],
    [118, 92],
    [156, 34],
    [194, 66],
    [232, 43],
  ]
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm">
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1="28"
          y1={140 - i * 30}
          x2="260"
          y2={140 - i * 30}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
      ))}
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={28 + i * 38}
          y={140 - h * 1.1}
          width="26"
          height={h * 1.1}
          rx="4"
          fill={i % 2 === 0 ? "#FF4D00" : "#FF8A00"}
          opacity="0.7"
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.09, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformOrigin: `${28 + i * 38 + 13}px 140px` }}
        />
      ))}
      <motion.polyline
        points={points.map((p) => p.join(",")).join(" ")}
        stroke="#FF4D00"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
      />
      {points.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="5"
          fill="#FF4D00"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.9 + i * 0.08, type: "spring", stiffness: 400, damping: 20 }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
      <motion.g
        initial={{ opacity: 0, y: -8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.6 }}
      >
        <rect x="130" y="16" width="64" height="24" rx="5" fill="#FF4D00" opacity="0.9" />
        <text x="162" y="32" fill="white" fontSize="8.5" textAnchor="middle" fontWeight="700">
          +32% ↑
        </text>
      </motion.g>
    </svg>
  )
}

function PaymentsSVG({ inView }: { inView: boolean }) {
  const flowPaths = ["M140 108 Q76 122 36 148", "M140 108 L140 150", "M140 108 Q204 122 244 148"]
  const avatars = [
    { cx: 36, cy: 158 },
    { cx: 140, cy: 164 },
    { cx: 244, cy: 158 },
  ]
  return (
    <svg viewBox="0 0 280 185" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm">
      <motion.g
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
        style={{ transformOrigin: "140px 75px" }}
      >
        <rect x="86" y="35" width="108" height="70" rx="12" fill="#1A1A1A" stroke="rgba(255,138,0,0.35)" strokeWidth="1.5" />
        <rect x="86" y="56" width="108" height="1.5" fill="rgba(255,255,255,0.05)" />
        <rect x="100" y="64" width="40" height="8" rx="3" fill="rgba(255,138,0,0.2)" />
        <rect x="100" y="78" width="60" height="6" rx="2" fill="rgba(255,255,255,0.07)" />
        <rect x="148" y="64" width="32" height="6" rx="2" fill="rgba(255,255,255,0.04)" />
        <text x="140" y="50" fill="rgba(255,255,255,0.3)" fontSize="7.5" textAnchor="middle" fontFamily="system-ui">
          CreatorConnect Pay
        </text>
      </motion.g>
      {flowPaths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="#FF8A00"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="150"
          strokeDashoffset="150"
          animate={inView ? { strokeDashoffset: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 + i * 0.1, ease: "easeOut" }}
        />
      ))}
      {avatars.map(({ cx, cy }, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.1 + i * 0.15, type: "spring", stiffness: 300, damping: 18 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          <circle cx={cx} cy={cy} r="18" fill="#111" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          <circle cx={cx} cy={cy} r="9" fill="rgba(255,77,0,0.2)" />
          <circle cx={cx + 12} cy={cy - 12} r="7" fill="#22C55E" />
          <motion.path
            d={`M${cx + 9} ${cy - 12} l2 2.5 l5 -5`}
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ delay: 1.3 + i * 0.15, duration: 0.3 }}
          />
        </motion.g>
      ))}
    </svg>
  )
}

function ManageSVG({ inView }: { inView: boolean }) {
  const cols = [
    { label: "APPLIED", bg: "rgba(255,255,255,0.03)", accent: "rgba(148,163,184,0.25)", items: 3 },
    { label: "ACTIVE", bg: "rgba(255,77,0,0.04)", accent: "rgba(255,77,0,0.25)", items: 2 },
    { label: "DONE", bg: "rgba(34,197,94,0.04)", accent: "rgba(34,197,94,0.25)", items: 2 },
  ]
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm">
      {cols.map(({ label, bg, accent, items }, col) => {
        const x = 10 + col * 90
        return (
          <g key={col}>
            <rect
              x={x}
              y="12"
              width="82"
              height="158"
              rx="7"
              fill={bg}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
            <text
              x={x + 41}
              y="30"
              fill="rgba(255,255,255,0.3)"
              fontSize="7"
              textAnchor="middle"
              fontWeight="600"
              letterSpacing="0.8"
            >
              {label}
            </text>
            {Array.from({ length: items }).map((_, row) => (
              <motion.g
                key={row}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + col * 0.12 + row * 0.1 }}
              >
                <rect
                  x={x + 7}
                  y={40 + row * 42}
                  width="68"
                  height="32"
                  rx="5"
                  fill="#111"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
                <circle cx={x + 19} cy={40 + row * 42 + 16} r="9" fill={accent} />
                <rect x={x + 32} y={40 + row * 42 + 10} width="36" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
                <rect
                  x={x + 32}
                  y={40 + row * 42 + 18}
                  width="26"
                  height="3"
                  rx="1.5"
                  fill="rgba(255,255,255,0.05)"
                />
              </motion.g>
            ))}
          </g>
        )
      })}
    </svg>
  )
}

const SVG_MAP = [SourceSVG, TrackSVG, PaymentsSVG, ManageSVG]

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#080808]/90 backdrop-blur-xl border-b border-white/5" : ""
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF4D00] to-[#FF8A00] flex items-center justify-center shadow-[0_0_18px_rgba(255,77,0,0.45)]">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">CreatorConnect</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "How It Works", href: "#how-it-works" },
            { label: "Browse Creators", href: "/creators" },
            { label: "Pricing", href: "#" },
          ].map(({ label, href }) => (
            <Link key={label} href={href} className="text-sm text-white/45 hover:text-white/90 transition-colors duration-200">
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden sm:block text-sm text-white/50 hover:text-white transition-colors">
            Log in
          </Link>
          <Link
            href="/login?tab=signup"
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-[#FF4D00] hover:bg-[#FF6020] text-white transition-all shadow-[0_0_22px_rgba(255,77,0,0.3)] hover:shadow-[0_0_34px_rgba(255,77,0,0.55)]"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </motion.header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="animate-orb1 absolute -top-40 -left-60 w-[700px] h-[700px] rounded-full bg-[#FF4D00]/7 blur-3xl" />
        <div className="animate-orb2 absolute -bottom-20 -right-40 w-[600px] h-[600px] rounded-full bg-[#FF8A00]/5 blur-3xl" />
        <div className="animate-orb3 absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-[#FF4D00]/4 blur-3xl" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-8 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse" />
          AI-powered creator matching is here
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.93] tracking-tight text-white mb-6"
        >
          Recruit UGC creators,
          <br />
          <span className="text-gradient">launch campaigns,</span>
          <br />
          track every result.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg sm:text-xl text-white/45 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Source, brief, pay, and measure creator campaigns without the chaos.
          <br className="hidden sm:block" />
          One platform. Every step.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14"
        >
          <Link
            href="/login?tab=signup"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FF4D00] hover:bg-[#FF6020] text-white font-semibold text-sm transition-all shadow-[0_0_38px_rgba(255,77,0,0.38)] hover:shadow-[0_0_58px_rgba(255,77,0,0.6)]"
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="#how-it-works"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white/75 font-semibold text-sm transition-all backdrop-blur-sm"
          >
            <Play className="w-4 h-4" />
            See How It Works
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-white/25 mb-16"
        >
          Trusted by 1,000+ brands — from early-stage startups to global companies
        </motion.p>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 70, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0D0D0D] shadow-[0_60px_180px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.04)]">
            {/* Window chrome */}
            <div className="h-9 bg-[#111] border-b border-white/[0.05] flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
              </div>
              <div className="flex-1 mx-3">
                <div className="h-5 bg-[#1A1A1A] rounded max-w-sm mx-auto flex items-center justify-center">
                  <span className="text-white/20 text-[10px]">app.creatorconnect.io/dashboard</span>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="p-5">
              <div className="grid grid-cols-4 gap-3 mb-4">
                {[
                  { label: "Active Creators", val: "48", delta: "+12%", c: "#FF4D00" },
                  { label: "Total Views", val: "2.4M", delta: "+28%", c: "#FF8A00" },
                  { label: "Avg Engagement", val: "6.8%", delta: "+3.1%", c: "#FF4D00" },
                  { label: "Revenue Driven", val: "$48K", delta: "+41%", c: "#FF8A00" },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.08 }}
                    className="bg-[#111] rounded-xl p-3.5 border border-white/[0.04]"
                  >
                    <p className="text-white/35 text-[10px] mb-1">{s.label}</p>
                    <p className="text-white font-display font-bold text-xl">{s.val}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: s.c }}>
                      {s.delta} this week
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Creator rows */}
              <div className="space-y-2">
                {[
                  { name: "Alex Chen", platform: "TikTok", followers: "1.2M", eng: "8.4%", status: "Active", sc: "#FF4D00" },
                  {
                    name: "Sofia Rodriguez",
                    platform: "Instagram",
                    followers: "890K",
                    eng: "6.2%",
                    status: "In Progress",
                    sc: "rgba(255,255,255,0.3)",
                  },
                  {
                    name: "Marcus Johnson",
                    platform: "YouTube",
                    followers: "2.1M",
                    eng: "4.8%",
                    status: "Complete",
                    sc: "#22C55E",
                  },
                ].map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.25 + i * 0.07 }}
                    className="flex items-center gap-3 bg-[#111] rounded-lg px-4 py-2.5 border border-white/[0.04]"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#FF4D00]/15 flex items-center justify-center text-[10px] text-[#FF4D00] font-bold flex-none">
                      {c.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium truncate">{c.name}</p>
                      <p className="text-white/25 text-[10px]">{c.platform}</p>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-white/50 text-[10px]">{c.followers}</p>
                      <p className="text-[#FF8A00] text-[10px]">{c.eng}</p>
                    </div>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full border"
                      style={{ color: c.sc, borderColor: `${c.sc}25` }}
                    >
                      {c.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-2/3 h-16 bg-[#FF4D00]/8 blur-3xl pointer-events-none" />
        </motion.div>
      </div>
    </section>
  )
}

// ─── Trusted By Marquee ───────────────────────────────────────────────────────
function TrustedBySection() {
  const doubled = [...BRANDS, ...BRANDS]
  return (
    <section className="py-20 border-y border-white/[0.05] overflow-hidden">
      <p className="text-center text-[11px] text-white/25 tracking-[0.2em] uppercase mb-10">
        Trusted By Top Brands Worldwide
      </p>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none" />
        <div className="flex animate-marquee">
          {doubled.map((brand, i) => (
            <div
              key={i}
              className="flex-none mx-10 text-white/20 hover:text-white/55 transition-colors text-sm font-semibold tracking-wide select-none whitespace-nowrap"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function StatCard({
  countTo,
  suffix,
  label,
  prefix,
  inView,
}: {
  countTo: number
  suffix: string
  label: string
  prefix: string
  inView: boolean
}) {
  const count = useCountUp(countTo, 2.2, inView)
  return (
    <div className="text-center">
      <div className="font-display font-extrabold text-5xl sm:text-6xl text-white mb-2 tabular-nums">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="text-white/35 text-sm font-medium">{label}</div>
    </div>
  )
}

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <section ref={ref} className="py-28 max-w-7xl mx-auto px-6">
      <motion.p
        className="text-center text-[11px] text-white/25 tracking-[0.2em] uppercase mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        The Numbers That Power CreatorConnect
      </motion.p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <StatCard {...s} inView={inView} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorksStep({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const isEven = index % 2 === 0
  const SvgComp = SVG_MAP[index]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-2xl border border-white/[0.06] bg-[#0D0D0D] overflow-hidden flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } items-stretch`}
    >
      {/* Text side */}
      <div className="flex-1 p-10 md:p-14">
        <div className="text-[#FF4D00]/18 font-display font-black text-[80px] leading-none mb-6 select-none">
          {step.number}
        </div>
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">{step.title}</h3>
        <p className="text-white/45 text-base leading-relaxed max-w-sm">{step.body}</p>
      </div>

      {/* SVG side */}
      <div
        className={`flex-1 flex items-center justify-center p-10 md:p-14 min-h-[260px] ${
          isEven ? "border-t md:border-t-0 md:border-l" : "border-t md:border-t-0 md:border-r"
        } border-white/[0.05]`}
        style={{
          background: `radial-gradient(ellipse at center, ${step.accent}07 0%, transparent 70%)`,
        }}
      >
        <SvgComp inView={inView} />
      </div>
    </motion.div>
  )
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-28 max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <motion.p
          className="text-sm text-[#FF4D00] font-semibold tracking-[0.15em] uppercase mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.p>
        <motion.h2
          className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white leading-[1.05] tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          One platform.
          <br />
          Every step.
        </motion.h2>
      </div>
      <div className="space-y-5">
        {STEPS.map((step, i) => (
          <HowItWorksStep key={i} step={step} index={i} />
        ))}
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section className="py-28 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <motion.p
          className="text-sm text-[#FF4D00] font-semibold tracking-[0.15em] uppercase mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          What Brands Say
        </motion.p>
        <motion.h2
          className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Brands love CreatorConnect.
        </motion.h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="bg-[#0D0D0D] border border-white/[0.06] rounded-2xl p-7 flex flex-col gap-4 hover:-translate-y-1 hover:border-white/10 transition-all duration-300 cursor-default"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: t.stars }).map((_, s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-[#FF8A00] text-[#FF8A00]" />
              ))}
            </div>
            <p className="text-white/65 text-sm leading-relaxed flex-1">"{t.quote}"</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FF4D00]/15 flex items-center justify-center text-xs font-bold text-[#FF4D00] flex-none">
                {t.initials}
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{t.name}</p>
                <p className="text-white/30 text-xs">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── Comparison ───────────────────────────────────────────────────────────────
function CellDisplay({ val, highlight = false }: { val: CellValue; highlight?: boolean }) {
  if (val === true)
    return (
      <div className="flex justify-center">
        <div className="w-6 h-6 rounded-full bg-[#FF4D00]/12 flex items-center justify-center">
          <Check className="w-3.5 h-3.5 text-[#FF4D00]" />
        </div>
      </div>
    )
  if (val === false)
    return (
      <div className="flex justify-center">
        <div className="w-6 h-6 rounded-full bg-white/4 flex items-center justify-center">
          <X className="w-3.5 h-3.5 text-white/20" />
        </div>
      </div>
    )
  if (val === "partial")
    return (
      <div className="flex justify-center">
        <div className="w-6 h-6 rounded-full bg-white/4 flex items-center justify-center">
          <Minus className="w-3.5 h-3.5 text-white/25" />
        </div>
      </div>
    )
  return (
    <span className={`text-sm text-center block leading-snug ${highlight ? "text-white font-medium" : "text-white/40"}`}>
      {val}
    </span>
  )
}

function ComparisonSection() {
  return (
    <section className="py-28 max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <motion.p
          className="text-sm text-[#FF4D00] font-semibold tracking-[0.15em] uppercase mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          The Smarter Choice
        </motion.p>
        <motion.h2
          className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Why CreatorConnect wins.
        </motion.h2>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-white/[0.07] overflow-hidden"
      >
        {/* Header */}
        <div className="grid grid-cols-4 bg-[#0F0F0F] border-b border-white/[0.05]">
          <div className="p-5 text-white/25 text-xs font-medium uppercase tracking-wider">Feature</div>
          <div className="p-5 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF4D00]/10 border border-[#FF4D00]/20">
              <Flame className="w-3.5 h-3.5 text-[#FF4D00]" />
              <span className="text-[#FF4D00] font-semibold text-xs">CreatorConnect</span>
            </div>
          </div>
          <div className="p-5 text-center text-white/35 text-xs font-medium uppercase tracking-wider">DIY</div>
          <div className="p-5 text-center text-white/35 text-xs font-medium uppercase tracking-wider">Agency</div>
        </div>

        {/* Rows */}
        {COMPARISON.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-4 border-b border-white/[0.04] last:border-0 ${
              i % 2 === 0 ? "bg-[#0A0A0A]" : "bg-[#0C0C0C]"
            }`}
          >
            <div className="p-5 text-white/55 text-sm font-medium flex items-center">{row.feature}</div>
            <div className="p-5 flex items-center justify-center">
              <CellDisplay val={row.cc} highlight />
            </div>
            <div className="p-5 flex items-center justify-center">
              <CellDisplay val={row.diy} />
            </div>
            <div className="p-5 flex items-center justify-center">
              <CellDisplay val={row.agency} />
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="py-28 max-w-2xl mx-auto px-6">
      <div className="text-center mb-16">
        <motion.h2
          className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Have questions?
          <br />
          <span className="text-white/25">We have answers.</span>
        </motion.h2>
      </div>
      <div className="space-y-2">
        {FAQS.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="border border-white/[0.06] rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left bg-[#0D0D0D] hover:bg-[#111] transition-colors"
            >
              <span className="text-white/85 font-medium pr-4 text-sm">{faq.q}</span>
              <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-4 h-4 text-white/30 flex-none" />
              </motion.span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 bg-[#0A0A0A] text-white/40 text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-10 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative rounded-3xl overflow-hidden bg-[#0D0D0D] border border-white/[0.07] py-24 px-8 text-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF4D00]/[0.04] via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-px bg-gradient-to-r from-transparent via-[#FF4D00]/40 to-transparent" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF4D00]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <motion.h2
            className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Launch your first creator
            <br />
            <span className="text-gradient">campaign today.</span>
          </motion.h2>
          <motion.p
            className="text-white/35 text-lg mb-10 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join 1,000+ brands growing with CreatorConnect.
            <br />
            Start free, scale when you&apos;re ready.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/login?tab=signup"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#FF4D00] hover:bg-[#FF6020] text-white font-semibold transition-all shadow-[0_0_48px_rgba(255,77,0,0.42)] hover:shadow-[0_0_68px_rgba(255,77,0,0.65)]"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-white/70 font-semibold transition-all"
            >
              Book a Demo
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/[0.05] mt-10 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#FF4D00] to-[#FF8A00] flex items-center justify-center">
              <Flame className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold">CreatorConnect</span>
          </Link>
          <p className="text-white/25 text-sm leading-relaxed max-w-xs">
            The operating system for creator marketing. Source, brief, track, and pay — all in one place.
          </p>
        </div>
        {[
          { label: "Product", links: ["How It Works", "Pricing", "Browse Creators", "Dashboard"] },
          { label: "Company", links: ["About", "Blog", "Careers", "Press"] },
          { label: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
        ].map(({ label, links }) => (
          <div key={label}>
            <h4 className="text-white/40 text-[11px] font-semibold uppercase tracking-[0.15em] mb-4">{label}</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-white/25 hover:text-white/60 text-sm transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-white/20 text-xs">© 2026 CreatorConnect. All rights reserved.</p>
        <div className="flex gap-5">
          {["Twitter/X", "LinkedIn", "Instagram", "TikTok"].map((s) => (
            <Link key={s} href="#" className="text-white/20 hover:text-white/50 text-xs transition-colors">
              {s}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F7F6F3] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <TrustedBySection />
      <StatsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <ComparisonSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  )
}
