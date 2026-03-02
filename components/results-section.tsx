"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import CreatorCard from "./creator-card"
import { searchCreators, normalizeTikTokCreator } from "@/lib/api"
import type { Creator } from "@/lib/types"

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

export default function ResultsSection() {
  const [creators, setCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    searchCreators({ query: "lifestyle", resultsPerPage: 3 })
      .then((data) => setCreators((data.items ?? []).slice(0, 3).map(normalizeTikTokCreator)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    )
  }

  if (creators.length === 0) return null

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {creators.map((creator) => (
          <CreatorCard key={`${creator.platform}-${creator.id}`} creator={creator} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/creators"
          className="inline-flex items-center gap-1.5 text-sm text-[#FF4D00] hover:text-[#FF6020] font-medium transition-colors"
        >
          View all creators <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
