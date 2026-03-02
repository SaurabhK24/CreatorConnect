"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Search, ArrowDownUp, Filter, Flame, ArrowLeft, Loader2, AlertCircle, RefreshCw } from "lucide-react"
import Link from "next/link"
import CreatorCard from "@/components/creator-card"
import type { Creator } from "@/lib/types"
import {
  discoverByNiche,
  searchCreators,
  searchByHashtag,
  getCreatorProfile,
  normalizeTikTokCreator,
} from "@/lib/api"

const PLATFORMS = [
  { val: "all", label: "All Platforms" },
  { val: "tiktok", label: "TikTok" },
  { val: "youtube", label: "YouTube" },
]

const SORT_OPTIONS = [
  { val: "followers", label: "Followers" },
  { val: "engagement", label: "Engagement" },
]

function SkeletonCard() {
  return (
    <div className="bg-[#0D0D0D] border border-white/[0.06] rounded-2xl overflow-hidden animate-pulse">
      <div className="p-5 pb-4">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-white/[0.06]" />
          <div className="flex-1 space-y-2 pt-1">
            <div className="h-3.5 bg-white/[0.06] rounded w-3/4" />
            <div className="h-3 bg-white/[0.04] rounded w-1/2" />
          </div>
        </div>
        <div className="h-3 bg-white/[0.04] rounded w-full mb-2" />
        <div className="h-3 bg-white/[0.04] rounded w-4/5 mb-4" />
        <div className="grid grid-cols-2 gap-2">
          <div className="h-14 bg-white/[0.04] rounded-xl" />
          <div className="h-14 bg-white/[0.04] rounded-xl" />
        </div>
      </div>
      <div className="px-5 py-4 border-t border-white/[0.05] flex gap-2">
        <div className="flex-1 h-8 bg-white/[0.04] rounded-xl" />
        <div className="flex-1 h-8 bg-white/[0.04] rounded-xl" />
      </div>
    </div>
  )
}

export default function CreatorsPage() {
  const searchParams = useSearchParams()
  const [sort, setSort] = useState("followers")
  const [platformFilter, setPlatformFilter] = useState("all")
  const [localSearch, setLocalSearch] = useState("")

  const [creators, setCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const niche = searchParams.get("niche")
  const query = searchParams.get("q")
  const searchType = searchParams.get("type") ?? "keyword"
  const minFollowers = Number(searchParams.get("minFollowers") ?? 0)

  const isSlowSearch = Boolean(niche)

  const fetchCreators = useCallback(async () => {
    setLoading(true)
    setError(null)
    setCreators([])

    try {
      let normalized: Creator[] = []

      if (niche) {
        const data = await discoverByNiche({
          niche,
          maxCreators: 50,
          minFollowers: minFollowers || 1000,
        })
        normalized = (data.creators ?? []).map(normalizeTikTokCreator)
      } else if (query && searchType === "hashtag") {
        const data = await searchByHashtag(query, 30)
        normalized = (data.items ?? []).map(normalizeTikTokCreator)
      } else if (query && searchType === "username") {
        const data = await getCreatorProfile(query.replace(/^@/, ""))
        normalized = data.profile ? [normalizeTikTokCreator(data.profile)] : []
      } else {
        const data = await searchCreators({ query: query ?? "lifestyle", resultsPerPage: 30 })
        normalized = (data.items ?? []).map(normalizeTikTokCreator)
      }

      if (minFollowers > 0) {
        normalized = normalized.filter((c) => c.followers >= minFollowers)
      }

      setCreators(normalized)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Is the backend running?")
    } finally {
      setLoading(false)
    }
  }, [niche, query, searchType, minFollowers])

  useEffect(() => {
    fetchCreators()
  }, [fetchCreators])

  const filteredCreators = useMemo(() => {
    return creators
      .filter(
        (c) =>
          (platformFilter === "all" || c.platform.toLowerCase() === platformFilter) &&
          (c.name.toLowerCase().includes(localSearch.toLowerCase()) ||
            c.username.toLowerCase().includes(localSearch.toLowerCase())),
      )
      .sort((a, b) =>
        sort === "followers" ? b.followers - a.followers : b.engagement - a.engagement,
      )
  }, [creators, sort, platformFilter, localSearch])

  const pageTitle = niche
    ? `Creators for "${niche}"`
    : query
    ? `Results for "${query}"`
    : "Top Creators"

  const pageSubtitle = loading
    ? isSlowSearch
      ? "AI is generating hashtags and discovering creators…"
      : "Searching for creators…"
    : `${filteredCreators.length} creator${filteredCreators.length !== 1 ? "s" : ""} found`

  return (
    <div className="min-h-screen bg-[#080808] text-white">
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
            <Link href="/login" className="text-sm font-semibold px-4 py-2 rounded-lg bg-[#FF4D00] hover:bg-[#FF6020] text-white transition-all shadow-[0_0_20px_rgba(255,77,0,0.25)]">
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-[#FF4D00] text-sm font-semibold tracking-[0.15em] uppercase mb-3">
            {niche ? "AI Discovery" : "Browse"}
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight mb-4">
            {pageTitle}
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto">{pageSubtitle}</p>
        </motion.div>

        {loading && isSlowSearch && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-8 px-4 py-3 rounded-xl bg-[#FF4D00]/8 border border-[#FF4D00]/15 max-w-md mx-auto"
          >
            <Loader2 className="w-4 h-4 text-[#FF4D00] animate-spin flex-none" />
            <p className="text-sm text-white/60">Scraping TikTok via AI — this takes 10–30 seconds…</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10 bg-[#0D0D0D] border border-white/[0.06] rounded-2xl p-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              placeholder="Filter results by name or username…"
              className="w-full pl-10 pr-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-white text-sm placeholder-white/25 outline-none focus:border-[#FF4D00]/40 transition-all"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-white/30">
              <Filter className="h-4 w-4 flex-none" />
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="bg-[#111] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-[#FF4D00]/40 transition-all cursor-pointer"
              >
                {PLATFORMS.map(({ val, label }) => (
                  <option key={val} value={val} className="bg-[#111]">{label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 text-white/30">
              <ArrowDownUp className="h-4 w-4 flex-none" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-[#111] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-[#FF4D00]/40 transition-all cursor-pointer"
              >
                {SORT_OPTIONS.map(({ val, label }) => (
                  <option key={val} value={val} className="bg-[#111]">{label}</option>
                ))}
              </select>
            </div>
            <button
              onClick={fetchCreators}
              disabled={loading}
              title="Refresh"
              className="p-2.5 rounded-xl bg-[#111] border border-white/10 text-white/40 hover:text-white/80 transition-all disabled:opacity-40"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </motion.div>

        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 py-16 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-white/60 font-medium mb-1">Discovery failed</p>
              <p className="text-white/30 text-sm max-w-sm">{error}</p>
            </div>
            <button
              onClick={fetchCreators}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white/70 text-sm font-medium hover:bg-white/[0.1] transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Try again
            </button>
          </motion.div>
        )}

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!loading && !error && (
          <>
            {filteredCreators.length > 0 && (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {filteredCreators.map((creator, i) => (
                  <motion.div
                    key={creator.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                  >
                    <CreatorCard creator={creator} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {filteredCreators.length === 0 && creators.length > 0 && (
              <div className="text-center py-20">
                <p className="text-white/25 text-lg">No creators match your filters.</p>
                <button
                  onClick={() => { setLocalSearch(""); setPlatformFilter("all") }}
                  className="mt-4 text-[#FF4D00] text-sm hover:text-[#FF6020] transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}

            {filteredCreators.length === 0 && creators.length === 0 && (
              <div className="text-center py-20">
                <p className="text-white/25 text-lg">No creators found.</p>
                <Link href="/" className="mt-4 inline-block text-[#FF4D00] text-sm hover:text-[#FF6020] transition-colors">
                  Try a different search
                </Link>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
