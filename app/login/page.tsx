"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Flame, ArrowLeft, Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function LoginContent() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") === "signup" ? "signup" : "login"
  const [tab, setTab] = useState<"login" | "signup">(defaultTab as "login" | "signup")
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 fire-gradient flex-col justify-between p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 20% 80%, white 0%, transparent 50%), radial-gradient(circle at 80% 20%, white 0%, transparent 50%)'}} />
        <div className="relative">
          <Link href="/" className="inline-flex items-center gap-2 font-display font-bold text-xl text-white">
            <Flame className="h-5 w-5" />
            CreatorConnect
          </Link>
        </div>
        <div className="relative">
          <blockquote className="text-2xl font-display font-semibold leading-snug mb-6">
            &ldquo;We found our ideal influencer in under 10 minutes. Unreal.&rdquo;
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center font-display font-bold text-sm">JL</div>
            <div>
              <p className="font-medium text-sm">Jamie Lee</p>
              <p className="text-white/70 text-sm">Head of Marketing, Bloom Co.</p>
            </div>
          </div>
        </div>
        <div className="relative flex gap-6 text-sm text-white/70">
          <span>10K+ Creators</span>
          <span>·</span>
          <span>500+ Brands</span>
          <span>·</span>
          <span>50+ Categories</span>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-background">
        <div className="w-full max-w-sm">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-10 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          {/* Tab toggle */}
          <div className="flex bg-muted rounded-xl p-1 mb-8">
            {(["login", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-lg transition-all capitalize",
                  tab === t
                    ? "bg-white text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t === "login" ? "Log in" : "Sign up"}
              </button>
            ))}
          </div>

          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold mb-1">
              {tab === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {tab === "login"
                ? "Log in to your CreatorConnect account"
                : "Start finding your perfect creators today"}
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {tab === "signup" && (
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-white text-sm outline-none focus:border-primary/40 transition-all"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-white text-sm outline-none focus:border-primary/40 transition-all"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-border bg-white text-sm outline-none focus:border-primary/40 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {tab === "login" && (
              <div className="flex justify-end">
                <button type="button" className="text-sm text-primary hover:text-primary/80 transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-3 h-auto font-medium gap-2"
            >
              {tab === "login" ? "Log in" : "Create account"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs text-muted-foreground bg-background px-2">
              or continue with
            </div>
          </div>

          <Button variant="outline" className="w-full rounded-xl h-11 font-medium border-border gap-2">
            <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {tab === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setTab(tab === "login" ? "signup" : "login")}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {tab === "login" ? "Sign up free" : "Log in"}
            </button>
          </p>
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
