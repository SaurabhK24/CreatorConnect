"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, Search, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const CHIPS = [
  "Fitness TikTok creators",
  "Tech YouTubers 500K+",
  "Food bloggers with high engagement",
  "Fashion Instagram creators",
  "Gaming Twitch streamers",
]

export default function GptSearch() {
  const router = useRouter()
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSearch = () => {
    if (!value.trim()) return
    setLoading(true)
    router.push(`/creators?niche=${encodeURIComponent(value.trim())}`)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className={cn(
        "relative bg-[#111] rounded-2xl border transition-all duration-300",
        focused || value
          ? "border-[#FF4D00]/40 shadow-[0_0_0_3px_rgba(255,77,0,0.08)]"
          : "border-white/10 hover:border-white/20",
      )}>
        <div className="flex items-center gap-3 px-5 py-4">
          <Sparkles className={cn("w-5 h-5 flex-none transition-colors", focused || value ? "text-[#FF4D00]" : "text-white/30")} />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Find a TikTok fitness creator in LA with 100k+ followers…"
            className="flex-1 bg-transparent text-white text-sm placeholder-white/25 outline-none"
          />
          <button
            onClick={handleSearch}
            disabled={!value.trim() || loading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF4D00] hover:bg-[#FF6020] text-white text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_16px_rgba(255,77,0,0.25)] hover:shadow-[0_0_24px_rgba(255,77,0,0.45)]"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
            {loading ? "Searching…" : "Search"}
          </button>
        </div>
        <div className="px-5 pb-4 flex gap-2 flex-wrap">
          {CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => setValue(chip)}
              className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.07] text-white/40 text-xs hover:text-white/75 hover:border-[#FF4D00]/30 transition-all"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
