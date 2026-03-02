"use client"

import { useState } from "react"
import { Search, Hash, AtSign, Filter, SlidersHorizontal, Flame, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function AdvancedSearch() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [followerRange, setFollowerRange] = useState([0])
  const [searchFocus, setSearchFocus] = useState(false)
  const [activeTab, setActiveTab] = useState("discover")
  const [searchType, setSearchType] = useState("hashtag")

  const categories = [
    "Fashion",
    "Beauty",
    "Fitness",
    "Food",
    "Travel",
    "Tech",
    "Gaming",
    "Lifestyle",
    "Business",
    "Education",
  ]

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const SearchIcon = searchType === "hashtag" ? Hash : AtSign

  return (
    <section className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.07] rounded-2xl p-4 sm:p-6 shadow-xl animate-in w-full max-w-4xl mx-auto">
      <Tabs defaultValue="discover" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center w-full mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 h-12 p-1 bg-white/[0.05] backdrop-blur-sm rounded-full border border-white/[0.07]">
            <TabsTrigger
              value="discover"
              className="rounded-full text-sm data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200 text-muted-foreground"
            >
              Discover
            </TabsTrigger>
            <TabsTrigger
              value="saved"
              className="rounded-full text-sm data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200 text-muted-foreground"
            >
              Saved
            </TabsTrigger>
            <TabsTrigger
              value="contacted"
              className="rounded-full text-sm data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200 text-muted-foreground"
            >
              Contacted
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full">
            <div className="absolute top-0 left-0 flex items-center h-full pl-4 pr-2">
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger className="h-auto bg-transparent border-0 shadow-none focus:ring-0 focus:ring-offset-0 p-0">
                  <SelectValue>
                    <SearchIcon
                      className={cn(
                        "h-5 w-5 transition-colors duration-200",
                        searchFocus ? "text-orange-400" : "text-muted-foreground",
                      )}
                    />
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="hashtag">
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4" /> Hashtag
                    </div>
                  </SelectItem>
                  <SelectItem value="username">
                    <div className="flex items-center gap-2">
                      <AtSign className="h-4 w-4" /> Username
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              placeholder={searchType === "hashtag" ? "e.g., #fashion, #gaming" : "e.g., @creatorname"}
              className={cn(
                "pl-16 pr-4 border-input rounded-full h-14 text-base transition-all duration-200",
                searchFocus ? "ring-2 ring-orange-500/25 border-orange-500/40" : "",
              )}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
            />
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[150px] h-14 rounded-full border-input text-base">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border rounded-xl">
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
              </SelectContent>
            </Select>
            <Button className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-500/90 transition-colors duration-200 h-14 rounded-full w-full sm:w-auto px-8 text-base">
              <Search className="h-5 w-5" />
              Search
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center gap-2 text-muted-foreground p-0 hover:bg-transparent hover:text-orange-400 transition-colors duration-200"
          >
            <Filter className="h-4 w-4" />
            <span>{isFiltersOpen ? "Hide" : "Show"} Advanced Filters</span>
            {selectedCategories.length > 0 && (
              <span className="bg-orange-500/15 text-orange-400 rounded-full px-2 py-0.5 text-xs font-medium">
                {selectedCategories.length}
              </span>
            )}
          </Button>
          <p className="text-sm text-muted-foreground">Found 128 creators</p>
        </div>

        <AnimatePresence>
          {isFiltersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-2 pb-6 space-y-8">
                <div>
                  <h3 className="text-base font-medium mb-4 text-foreground/80">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        variant={selectedCategories.includes(category) ? "default" : "outline"}
                        className={cn(
                          "cursor-pointer transition-all duration-200 rounded-full py-2 px-4 text-sm",
                          selectedCategories.includes(category)
                            ? "bg-orange-500/15 hover:bg-orange-500/20 text-orange-400 border-orange-500/25"
                            : "border-white/[0.07] bg-white/[0.03] text-muted-foreground hover:bg-white/[0.06] hover:text-foreground",
                        )}
                        onClick={() => toggleCategory(category)}
                      >
                        {category}
                        <AnimatePresence>
                          {selectedCategories.includes(category) && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="ml-2 bg-orange-500 rounded-full h-4 w-4 flex items-center justify-center"
                            >
                              <X className="h-3 w-3 text-primary-foreground" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-4 text-foreground/80">Follower Count (min)</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0]}
                      max={1000000}
                      step={10000}
                      onValueChange={setFollowerRange}
                      className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:bg-orange-500"
                    />
                    <div className="flex justify-between mt-3 text-sm text-muted-foreground">
                      <span>0</span>
                      <span className="font-medium text-orange-400">{followerRange[0].toLocaleString()} followers</span>
                      <span>1M+</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
