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
          "relative glass-effect rounded-full shadow-lg transition-all duration-300",
          searchFocus ? "shadow-primary/20" : "",
        )}
      >
        <div className="absolute top-0 left-0 flex items-center h-full pl-6">
          <Sparkles
            className={cn("h-6 w-6 transition-colors duration-300", searchFocus ? "text-primary" : "text-muted-foreground")}
          />
        </div>
        <Input
          placeholder="e.g., 'Find me a Tiktok fitness influencer in LA with over 100k followers'"
          className="w-full h-16 bg-transparent border-0 rounded-full pl-16 pr-24 text-base focus:ring-0"
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setSearchFocus(false)}
        />
        <div className="absolute top-0 right-0 flex items-center h-full pr-3">
          <Button className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90">
            <Search className="h-6 w-6 text-primary-foreground" />
          </Button>
        </div>
      </motion.div>
    </div>
  )
} 