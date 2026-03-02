"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export default function GptSearch() {
  const [searchFocus, setSearchFocus] = useState(false)

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        layout
        className={cn(
          "relative rounded-full transition-all duration-300",
          "bg-white/[0.04] border backdrop-blur-xl",
          searchFocus
            ? "border-orange-500/40 shadow-[0_0_0_4px_rgba(249,115,22,0.12)]"
            : "border-white/[0.08] shadow-lg",
        )}
      >
        {/* Left icon */}
        <div className="absolute top-0 left-0 flex items-center h-full pl-5">
          <Sparkles
            className={cn(
              "h-5 w-5 transition-all duration-300",
              searchFocus ? "text-orange-400 scale-110" : "text-muted-foreground",
            )}
          />
        </div>

        {/* Input */}
        <Input
          placeholder="e.g., 'Find me a TikTok fitness influencer in LA with 100k+ followers'"
          className="w-full h-16 bg-transparent border-0 rounded-full pl-14 pr-20 text-base focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground/60"
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setSearchFocus(false)}
        />

        {/* Search button */}
        <div className="absolute top-0 right-0 flex items-center h-full pr-2.5">
          <Button
            className={cn(
              "h-11 w-11 rounded-full transition-all duration-200",
              "bg-orange-500 hover:bg-orange-500/90 text-white",
              searchFocus && "shadow-[0_0_16px_rgba(249,115,22,0.4)]",
            )}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
