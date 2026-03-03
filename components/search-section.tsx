"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Sparkles, SlidersHorizontal } from "lucide-react"
import GptSearch from "./gpt-search"
import AdvancedSearch from "./advanced-search"

export default function SearchSection() {
  const [isGptSearch, setIsGptSearch] = useState(true)

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative w-full">
        <AnimatePresence mode="wait">
          {isGptSearch ? (
            <motion.div
              key="gpt"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25 }}
            >
              <GptSearch />
            </motion.div>
          ) : (
            <motion.div
              key="advanced"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25 }}
            >
              <AdvancedSearch />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsGptSearch((v) => !v)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/40 hover:text-white/70 text-sm transition-all"
        >
          {isGptSearch ? (
            <>
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Granular search
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              AI search
            </>
          )}
        </button>
      </div>
    </div>
  )
}
