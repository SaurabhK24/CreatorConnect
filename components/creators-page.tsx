"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, ArrowDownUp, Filter } from "lucide-react"
import CreatorCard from "@/components/creator-card"
import { creators } from "@/components/results-section" // Using placeholder data

interface Creator {
  id: number
  name: string
  username: string
  avatar: string
  platform: string
  followers: number
  engagement: number
  categories: string[]
  description: string
}

export default function CreatorsPage() {
  const [sort, setSort] = useState("followers")
  const [platformFilter, setPlatformFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCreators = useMemo(() => {
    let filtered = creators
      .filter(
        (creator: Creator) => platformFilter === "all" || creator.platform.toLowerCase() === platformFilter,
      )
      .filter(
        (creator: Creator) =>
          creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          creator.username.toLowerCase().includes(searchQuery.toLowerCase()),
      )

    if (sort === "followers") {
      filtered = filtered.sort((a: Creator, b: Creator) => b.followers - a.followers)
    } else if (sort === "engagement") {
      filtered = filtered.sort((a: Creator, b: Creator) => b.engagement - a.engagement)
    }

    return filtered
  }, [sort, platformFilter, searchQuery])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/50 to-background dark:from-background dark:to-background">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-primary/5 via-orange-500/5 to-amber-500/5 -z-10 dark:from-primary/10 dark:via-orange-500/5 dark:to-amber-500/5"></div>

      <main className="container mx-auto px-4 py-8 sm:py-12">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Top Creators</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover and connect with the most influential content creators.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 bg-card/80 backdrop-blur-sm rounded-2xl shadow-lg"
        >
          <div className="relative w-full sm:w-auto sm:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name or username..."
              className="w-full pl-12 h-12 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="h-5 w-5" />
              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-full sm:w-[150px] h-12 rounded-full">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="twitch">Twitch</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ArrowDownUp className="h-5 w-5" />
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-full sm:w-[150px] h-12 rounded-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="followers">Followers</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredCreators.map((creator: Creator, i: number) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <CreatorCard creator={creator} />
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  )
} 