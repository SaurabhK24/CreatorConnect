"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Hash, AtSign, Filter, X, Loader2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const CATEGORIES = [
  "Fashion", "Beauty", "Fitness", "Food", "Travel",
  "Tech", "Gaming", "Lifestyle", "Business", "Education",
]

const PLATFORMS = [
  { val: "all", label: "All Platforms" },
  { val: "instagram", label: "Instagram" },
  { val: "tiktok", label: "TikTok" },
  { val: "youtube", label: "YouTube" },
  { val: "twitter", label: "Twitter" },
  { val: "twitch", label: "Twitch" },
]

export default function AdvancedSearch() {
  const router = useRouter()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [followerRange, setFollowerRange] = useState([0])
  const [searchFocused, setSearchFocused] = useState(false)
  const [activeTab, setActiveTab] = useState("discover")
  const [searchType, setSearchType] = useState("hashtag")
  const [platform, setPlatform] = useState("all")
  const [searchValue, setSearchValue] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSearch = () => {
    if (!searchValue.trim()) return
    setLoading(true)
    const params = new URLSearchParams({ q: searchValue.trim(), type: searchType, platform })
    if (followerRange[0] > 0) params.set('minFollowers', String(followerRange[0]))
    if (selectedCategories.length > 0) params.set('categories', selectedCategories.join(','))
    router.push(`/creators?${params.toString()}`)
  }

  const toggleCategory = (c: string) =>
    setSelectedCategories((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))

  const SearchIcon = searchType === "hashtag" ? Hash : AtSign

  const inputClass = cn(
    "flex-1 min-w-0 bg-transparent text-white text-sm placeholder-white/25 outline-none",
  )

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#111] border border-white/10 rounded-2xl p-5 space-y-5">
      {/* Tabs */}
      <div className="flex gap-1 bg-white/[0.04] border border-white/[0.07] rounded-xl p-1">
        {["discover", "saved", "contacted"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all",
              activeTab === tab
                ? "bg-[#FF4D00] text-white shadow-[0_0_12px_rgba(255,77,0,0.3)]"
                : "text-white/35 hover:text-white/65",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div
        className={cn(
          "flex items-center gap-3 bg-[#0D0D0D] border rounded-xl px-4 py-3 transition-all",
          searchFocused ? "border-[#FF4D00]/40 shadow-[0_0_0_3px_rgba(255,77,0,0.08)]" : "border-white/10",
        )}
      >
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="bg-transparent text-white/40 text-sm outline-none cursor-pointer border-0"
        >
          <option value="hashtag" className="bg-[#111] text-white">
            # Hashtag
          </option>
          <option value="username" className="bg-[#111] text-white">
            @ Username
          </option>
        </select>
        <div className="w-px h-5 bg-white/10" />
        <SearchIcon className={cn("w-4 h-4 flex-none", searchFocused ? "text-[#FF4D00]" : "text-white/30")} />
        <input
          placeholder={searchType === "hashtag" ? "e.g. #fashion, #gaming" : "e.g. @creatorname"}
          className={inputClass}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="hidden sm:block bg-transparent text-white/40 text-xs outline-none cursor-pointer border-0"
        >
          {PLATFORMS.map(({ val, label }) => (
            <option key={val} value={val} className="bg-[#111] text-white">
              {label}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          disabled={!searchValue.trim() || loading}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FF4D00] hover:bg-[#FF6020] text-white text-xs font-semibold transition-all flex-none disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
          {loading ? "Searching…" : "Search"}
        </button>
      </div>

      {/* Filter toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setFiltersOpen((o) => !o)}
          className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors"
        >
          <Filter className="w-4 h-4" />
          {filtersOpen ? "Hide" : "Show"} filters
          {selectedCategories.length > 0 && (
            <span className="bg-[#FF4D00]/15 text-[#FF4D00] rounded-full px-2 py-0.5 text-xs font-semibold">
              {selectedCategories.length}
            </span>
          )}
        </button>
        <p className="text-white/25 text-xs">
          {searchValue.trim() ? "Press Search to find creators" : "Enter a search to begin"}
        </p>
      </div>

      {/* Advanced filters */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-2 space-y-6 border-t border-white/[0.06]">
              <div>
                <h3 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => {
                    const active = selectedCategories.includes(cat)
                    return (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                          active
                            ? "bg-[#FF4D00]/12 text-[#FF8A00] border-[#FF4D00]/25"
                            : "bg-white/[0.04] text-white/40 border-white/[0.07] hover:text-white/70",
                        )}
                      >
                        {cat}
                        {active && <X className="w-3 h-3" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-white/40 text-xs font-semibold uppercase tracking-wider">Min. Followers</h3>
                  <span className="text-[#FF4D00] text-xs font-semibold">
                    {followerRange[0].toLocaleString()}+
                  </span>
                </div>
                <div className="px-1">
                  <Slider
                    defaultValue={[0]}
                    max={1000000}
                    step={10000}
                    onValueChange={setFollowerRange}
                    className="[&_[role=slider]]:bg-[#FF4D00] [&_[role=slider]]:border-[#FF4D00] [&_.bg-primary]:bg-[#FF4D00]"
                  />
                  <div className="flex justify-between mt-2 text-white/20 text-[10px]">
                    <span>0</span>
                    <span>1M+</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
