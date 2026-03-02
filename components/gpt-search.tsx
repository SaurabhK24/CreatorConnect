"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function GptSearch() {
  const [searchFocus, setSearchFocus] = useState(false)
  const [value, setValue] = useState("")

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={cn(
          "relative bg-white rounded-2xl border transition-all duration-300",
          searchFocus
            ? "border-primary/40 orange-glow"
            : "border-border shadow-sm hover:border-border/80 hover:shadow-md"
        )}
      >
        <div className="flex items-center gap-3 px-5 py-4">
          <Sparkles
            className={cn(
              "h-5 w-5 flex-shrink-0 transition-colors duration-300",
              searchFocus || value ? "text-primary" : "text-muted-foreground"
            )}
          />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Find a TikTok fitness creator in LA with 100k+ followers..."
            className="flex-1 bg-transparent border-0 outline-none text-base text-foreground placeholder:text-muted-foreground/60"
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
          />
          <Button
            className="flex-shrink-0 bg-primary hover:bg-primary/90 text-white rounded-xl h-10 px-5 font-medium gap-1.5"
          >
            Search
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="px-5 pb-3 flex gap-2 flex-wrap">
          {["Fitness on TikTok", "Tech YouTubers", "Food bloggers 50k+"].map((chip) => (
            <button
              key={chip}
              onClick={() => setValue(chip)}
              className="text-xs text-muted-foreground bg-muted hover:bg-accent hover:text-primary rounded-full px-3 py-1 transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
