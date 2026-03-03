"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Flame, ArrowLeft, Mail, Lock, User, ArrowRight, Eye, EyeOff, Building2 } from "lucide-react"
import { useAuth } from "@/components/auth-context"

function LoginContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { login, signup, error, clearError, isLoading } = useAuth()

  const defaultTab = searchParams.get("tab") === "signup" ? "signup" : "login"
  const [tab, setTab] = useState<"login" | "signup">(defaultTab as "login" | "signup")
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({ name: "", email: "", password: "", company: "" })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    clearError()
    setForm((p) => ({ ...p, [k]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (tab === "login") {
        await login(form.email, form.password)
      } else {
        await signup(form.name, form.email, form.password, form.company || undefined)
      }
      router.push("/dashboard")
    } catch {
      // error is set in context
    } finally {
      setSubmitting(false)
    }
  }

  const switchTab = (t: "login" | "signup") => {
    clearError()
    setTab(t)
    setForm({ name: "", email: "", password: "", company: "" })
  }

  const inputClass =
    "w-full pl-10 pr-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white text-sm placeholder-white/25 outline-none focus:border-[#FF4D00]/50 focus:ring-1 focus:ring-[#FF4D00]/20 transition-all"

  return (
    <div className="min-h-screen flex bg-[#080808] text-white">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 xl:p-16 relative overflow-hidden border-r border-white/[0.05]">
        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#FF4D00]/10 blur-[100px]" />
          <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full bg-[#FF8A00]/8 blur-[80px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#FF4D00]/5 blur-3xl" />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#FF4D00]/[0.03]" />
        </div>

        {/* Logo */}
        <div className="relative">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF4D00] to-[#FF8A00] flex items-center justify-center shadow-[0_0_24px_rgba(255,77,0,0.45)]">
              <Flame className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">CreatorConnect</span>
          </Link>
        </div>

        {/* Middle content — switches based on tab */}
        <AnimatePresence mode="wait">
          {tab === "login" ? (
            <motion.div
              key="login-panel"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative space-y-8"
            >
              <div>
                <p className="text-[#FF4D00] text-xs font-semibold tracking-[0.18em] uppercase mb-5">Your dashboard is ready</p>
                <h2 className="font-display font-extrabold text-3xl xl:text-4xl leading-tight text-white mb-3">
                  Good to have
                  <br />
                  <span className="text-white/40">you back.</span>
                </h2>
                <p className="text-white/35 text-sm leading-relaxed max-w-xs">
                  Your campaigns, creators, and analytics are right where you left them.
                </p>
              </div>

              {/* Mini dashboard card */}
              <div className="rounded-2xl bg-[#0D0D0D] border border-white/[0.07] overflow-hidden shadow-2xl">
                <div className="h-8 bg-[#111] border-b border-white/[0.05] flex items-center px-3.5 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                    <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2 h-2 rounded-full bg-[#28CA41]" />
                  </div>
                  <div className="flex-1 mx-2">
                    <div className="h-3.5 bg-[#1A1A1A] rounded max-w-[160px] mx-auto flex items-center justify-center">
                      <span className="text-white/15 text-[8px]">app.creatorconnect.io/dashboard</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Active Creators", val: "48", delta: "+12%", c: "#FF4D00" },
                      { label: "Total Views", val: "2.4M", delta: "+28%", c: "#FF8A00" },
                      { label: "Revenue", val: "$48K", delta: "+41%", c: "#FF4D00" },
                    ].map((s) => (
                      <div key={s.label} className="bg-[#111] rounded-lg p-2.5 border border-white/[0.04]">
                        <p className="text-white/30 text-[9px] mb-1 leading-none">{s.label}</p>
                        <p className="text-white font-display font-bold text-base leading-none">{s.val}</p>
                        <p className="text-[9px] mt-1" style={{ color: s.c }}>{s.delta}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { name: "Alex Chen", platform: "TikTok", eng: "8.4%", status: "Active", sc: "#FF4D00" },
                      { name: "Sofia Rodriguez", platform: "Instagram", eng: "6.2%", status: "In Progress", sc: "rgba(255,255,255,0.3)" },
                      { name: "Marcus Johnson", platform: "YouTube", eng: "4.8%", status: "Complete", sc: "#22C55E" },
                    ].map((c, i) => (
                      <div key={i} className="flex items-center gap-2 bg-[#111] rounded-lg px-3 py-2 border border-white/[0.03]">
                        <div className="w-5 h-5 rounded-full bg-[#FF4D00]/15 flex items-center justify-center text-[8px] text-[#FF4D00] font-bold flex-none">
                          {c.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-[10px] font-medium truncate">{c.name}</p>
                          <p className="text-white/25 text-[8px]">{c.platform}</p>
                        </div>
                        <p className="text-[#FF8A00] text-[9px] mr-1">{c.eng}</p>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full border" style={{ color: c.sc, borderColor: `${c.sc}30` }}>
                          {c.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="border-l-2 border-[#FF4D00]/30 pl-4">
                <blockquote className="text-white/70 text-sm leading-relaxed italic mb-3">
                  &ldquo;The performance dashboard saved us ten hours a week. We finally know what&apos;s working.&rdquo;
                </blockquote>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#FF4D00]/20 flex items-center justify-center font-display font-bold text-xs text-[#FF4D00]">
                    RS
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-white">Rodrigo Santos</p>
                    <p className="text-white/35 text-[11px]">Head of Marketing, Linear</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="signup-panel"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative space-y-8"
            >
              <div>
                <p className="text-[#FF4D00] text-xs font-semibold tracking-[0.18em] uppercase mb-5">Join 1,000+ brands</p>
                <h2 className="font-display font-extrabold text-3xl xl:text-4xl leading-tight text-white mb-3">
                  Your creators
                  <br />
                  <span className="text-white/40">are waiting.</span>
                </h2>
                <p className="text-white/35 text-sm leading-relaxed max-w-xs">
                  Source, brief, track, and pay UGC creators from one platform. First campaign live in under an hour.
                </p>
              </div>

              {/* Feature list */}
              <div className="space-y-3">
                {[
                  { icon: "🎯", title: "50K+ vetted creators", body: "Filter by niche, platform, engagement rate, and audience — they apply to you." },
                  { icon: "📊", title: "Live performance analytics", body: "Watch views, engagement, and conversions update in real time." },
                  { icon: "💸", title: "Automated payments", body: "One-click payouts. Invoices and contracts handled automatically." },
                  { icon: "💬", title: "Built-in creator CRM", body: "Chat, brief, and manage every creator relationship in one place." },
                ].map(({ icon, title, body }) => (
                  <div key={title} className="flex gap-3.5 items-start">
                    <div className="w-8 h-8 rounded-lg bg-[#FF4D00]/10 border border-[#FF4D00]/15 flex items-center justify-center text-base flex-none mt-0.5">
                      {icon}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold leading-tight mb-0.5">{title}</p>
                      <p className="text-white/35 text-xs leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="border-l-2 border-[#FF4D00]/30 pl-4">
                <blockquote className="text-white/70 text-sm leading-relaxed italic mb-3">
                  &ldquo;We found our ideal creator in under 10 minutes. Absolutely unreal.&rdquo;
                </blockquote>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#FF4D00]/20 flex items-center justify-center font-display font-bold text-xs text-[#FF4D00]">
                    JL
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-white">Jamie Lee</p>
                    <p className="text-white/35 text-[11px]">Head of Marketing, Bloom Co.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom — stats row */}
        <div className="relative">
          <div className="flex items-center gap-6 mb-5">
            {[
              { val: "50K+", label: "Creators" },
              { val: "1K+", label: "Brands" },
              { val: "$10M+", label: "Paid Out" },
            ].map(({ val, label }, i) => (
              <div key={label} className={`flex items-center gap-2 ${i > 0 ? "pl-6 border-l border-white/[0.08]" : ""}`}>
                <p className="font-display font-extrabold text-base text-white">{val}</p>
                <p className="text-white/30 text-xs">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-white/15 text-xs">© 2026 CreatorConnect</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 lg:w-1/2 flex flex-col justify-center items-center px-8 py-12 relative bg-[#060606]">
        <div className="absolute top-6 left-6 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF4D00] to-[#FF8A00] flex items-center justify-center">
              <Flame className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold">CreatorConnect</span>
          </Link>
        </div>

        <div className="w-full max-w-[380px]">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/35 hover:text-white/70 mb-10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          {/* Tab toggle */}
          <div className="flex bg-white/[0.04] border border-white/[0.07] rounded-xl p-1 mb-8">
            {(["login", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all capitalize ${
                  tab === t
                    ? "bg-[#FF4D00] text-white shadow-[0_0_14px_rgba(255,77,0,0.35)]"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {t === "login" ? "Log in" : "Sign up"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-8">
                <h1 className="font-display text-2xl font-bold mb-1.5 text-white">
                  {tab === "login" ? "Welcome back" : "Create your account"}
                </h1>
                <p className="text-white/40 text-sm">
                  {tab === "login"
                    ? "Log in to your CreatorConnect account"
                    : "Start finding your perfect creators today"}
                </p>
              </div>

              <form className="space-y-3.5" onSubmit={handleSubmit}>
                {tab === "signup" && (
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                    <input
                      type="text"
                      placeholder="Full name"
                      className={inputClass}
                      value={form.name}
                      onChange={set("name")}
                      required
                    />
                  </div>
                )}
                {tab === "signup" && (
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                    <input
                      type="text"
                      placeholder="Company name (optional)"
                      className={inputClass}
                      value={form.company}
                      onChange={set("company")}
                    />
                  </div>
                )}
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <input
                    type="email"
                    placeholder="Email address"
                    className={inputClass}
                    value={form.email}
                    onChange={set("email")}
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={`${inputClass} pr-10`}
                    value={form.password}
                    onChange={set("password")}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {tab === "login" && (
                  <div className="flex justify-end">
                    <button type="button" className="text-sm text-[#FF4D00]/80 hover:text-[#FF4D00] transition-colors">
                      Forgot password?
                    </button>
                  </div>
                )}

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={submitting || isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FF4D00] hover:bg-[#FF6020] text-white font-semibold text-sm transition-all shadow-[0_0_30px_rgba(255,77,0,0.3)] hover:shadow-[0_0_45px_rgba(255,77,0,0.5)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      {tab === "login" ? "Logging in…" : "Creating account…"}
                    </span>
                  ) : (
                    <>
                      {tab === "login" ? "Log in" : "Create account"}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/8" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#080808] px-3 text-xs text-white/25">or continue with</span>
                </div>
              </div>

              {/* Google */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-white/70 font-medium text-sm transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>

              <p className="text-center text-sm text-white/30 mt-6">
                {tab === "login" ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => switchTab(tab === "login" ? "signup" : "login")}
                  className="text-[#FF4D00] hover:text-[#FF6020] font-medium transition-colors"
                >
                  {tab === "login" ? "Sign up free" : "Log in"}
                </button>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  )
}
