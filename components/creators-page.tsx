"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, ArrowDownUp, Filter, Flame, ArrowLeft } from "lucide-react"
import Link from "next/link"
import CreatorCard from "@/components/creator-card"
import type { Creator } from "@/lib/types"

const PLATFORMS = [
  { val: "all", label: "All Platforms" },
  { val: "instagram", label: "Instagram" },
  { val: "tiktok", label: "TikTok" },
  { val: "youtube", label: "YouTube" },
  { val: "twitter", label: "Twitter" },
  { val: "twitch", label: "Twitch" },
]

const SORT_OPTIONS = [
  { val: "followers", label: "Followers" },
  { val: "engagement", label: "Engagement" },
]

export default function CreatorsPage() {
  const [sort, setSort] = useState("followers")
  const [platformFilter, setPlatformFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Data will come from the API (Task 5); using empty array as placeholder
  const creators: Creator[] = []

  const filteredCreators = useMemo(() => {
    return creators
      .filter(
        (c: Creator) =>
          (platformFilter === "all" || c.platform.toLowerCase() === platformFilter) &&
          (c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.username.toLowerCase().includes(searchQuery.toLowerCase())),
      )
      .sort((a: Creator, b: Creator) =>
        sort === "followers" ? b.followers - a.followers : b.engagement - a.engagement,
      )
  }, [sort, platformFilter, searchQuery])

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF4D00] to-[#FF8A00] flex items-center justify-center shadow-[0_0_16px_rgba(255,77,0,0.4)]">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">CreatorConnect</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/80 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Home
            </Link>
            <Link
              href="/login"
              className="text-sm font-semibold px-4 py-2 rounded-lg bg-[#FF4D00] hover:bg-[#FF6020] text-white transition-all shadow-[0_0_20px_rgba(255,77,0,0.25)]"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-14">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-[#FF4D00] text-sm font-semibold tracking-[0.15em] uppercase mb-3">Browse All</p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight mb-4">
            Top Creators
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Discover and connect with the most influential UGC creators across every platform.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10 bg-[#0D0D0D] border border-white/[0.06] rounded-2xl p-4"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              placeholder="Search by name or username…"
              className="w-full pl-10 pr-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-white text-sm placeholder-white/25 outline-none focus:border-[#FF4D00]/40 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Platform filter */}
            <div className="flex items-center gap-2 text-white/30">
              <Filter className="h-4 w-4 flex-none" />
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="bg-[#111] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-[#FF4D00]/40 transition-all cursor-pointer"
              >
                {PLATFORMS.map(({ val, label }) => (
                  <option key={val} value={val} className="bg-[#111]">
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 text-white/30">
              <ArrowDownUp className="h-4 w-4 flex-none" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-[#111] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-[#FF4D00]/40 transition-all cursor-pointer"
              >
                {SORT_OPTIONS.map(({ val, label }) => (
                  <option key={val} value={val} className="bg-[#111]">
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results count */}
        <p className="text-white/25 text-sm mb-6">
          Showing {filteredCreators.length} creator{filteredCreators.length !== 1 ? "s" : ""}
        </p>

        {/* Creator grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredCreators.map((creator: Creator, i: number) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <CreatorCard creator={creator} />
            </motion.div>
          ))}
        </motion.div>

        {filteredCreators.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/25 text-lg">No creators match your search.</p>
            <button
              onClick={() => { setSearchQuery(""); setPlatformFilter("all") }}
              className="mt-4 text-[#FF4D00] text-sm hover:text-[#FF6020] transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
