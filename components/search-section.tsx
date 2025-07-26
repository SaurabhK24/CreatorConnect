"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, SlidersHorizontal } from "lucide-react"
import GptSearch from "./gpt-search"
import AdvancedSearch from "./advanced-search"

export default function SearchSection() {
  const [isGptSearch, setIsGptSearch] = useState(true)

  return (
    <div className="w-full max-w-4xl">
      <div className="relative w-full">
        <AnimatePresence mode="wait">
          {isGptSearch ? (
            <motion.div
              key="gpt"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <GptSearch />
            </motion.div>
          ) : (
            <motion.div
              key="advanced"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <AdvancedSearch />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-4">
        <Button variant="ghost" onClick={() => setIsGptSearch(!isGptSearch)} className="rounded-full">
          {isGptSearch ? (
            <>
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Switch to Granular Search
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Switch to CreatorSearch
            </>
          )}
        </Button>
      </div>
    </div>
  )
} 