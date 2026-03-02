"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import CreatorCard from "./creator-card"
import { searchCreators, normalizeTikTokCreator } from "@/lib/api"
import type { Creator } from "@/lib/types"

export default function ResultsSection() {
  const [creators, setCreators] = useState<Creator[]>([])

  useEffect(() => {
    searchCreators({ query: "lifestyle", resultsPerPage: 3 })
      .then((data) => setCreators((data.items ?? []).slice(0, 3).map(normalizeTikTokCreator)))
      .catch(() => {})
  }, [])

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
