"use client"

import { useState } from "react"
import { Search, Hash, AtSign, Filter, SlidersHorizontal, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import FeatureTooltip from "./onboarding/feature-tooltip"

export default function SearchSection() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [followerRange, setFollowerRange] = useState([0])
  const [searchFocus, setSearchFocus] = useState(false)
  const [activeTab, setActiveTab] = useState("discover")

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

  return (
    <section className="glass-effect rounded-2xl p-4 sm:p-6 mb-8 shadow-lg animate-in w-full max-w-3xl mx-auto">
      {/* Main Navigation Tabs */}
      <FeatureTooltip
        id="tabs-navigation"
        title="Navigation Tabs"
        description="Switch between discovering new creators, viewing saved creators, and managing your contacts."
        position="bottom"
      >
        <Tabs defaultValue="discover" value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
          <div className="flex justify-center w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 h-12 p-1 bg-muted/80 backdrop-blur-sm rounded-full">
              <TabsTrigger
                value="discover"
                className="rounded-full text-sm data-[state=active]:bg-background dark:data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-200"
              >
                Discover
              </TabsTrigger>
              <TabsTrigger
                value="saved"
                className="rounded-full text-sm data-[state=active]:bg-background dark:data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-200"
              >
                Saved
              </TabsTrigger>
              <TabsTrigger
                value="contacted"
                className="rounded-full text-sm data-[state=active]:bg-background dark:data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-200"
              >
                Contacted
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </FeatureTooltip>

      {/* Search Type Tabs */}
      <Tabs defaultValue="hashtag" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="w-full sm:w-auto flex justify-center">
            <TabsList className="bg-muted/80 p-1 rounded-full">
              <TabsTrigger
                value="hashtag"
                className="rounded-full transition-all duration-200 data-[state=active]:bg-background dark:data-[state=active]:bg-card"
              >
                <Hash className="h-4 w-4 mr-2" />
                Hashtag
              </TabsTrigger>
              <TabsTrigger
                value="username"
                className="rounded-full transition-all duration-200 data-[state=active]:bg-background dark:data-[state=active]:bg-card"
              >
                <AtSign className="h-4 w-4 mr-2" />
                Username
              </TabsTrigger>
            </TabsList>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Search Tips
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-card border border-border rounded-xl">
                <p className="max-w-xs">
                  Use specific hashtags or usernames for better results. Combine with filters for precision.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <TabsContent value="hashtag" className="mt-0 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Hash
                  className={cn(
                    "h-5 w-5 transition-colors duration-200",
                    searchFocus ? "text-primary" : "text-muted-foreground",
                  )}
                />
              </div>
              <Input
                placeholder="Search by hashtag (e.g., fashion, fitness, tech)"
                className={cn(
                  "pl-10 border-input rounded-full h-12 transition-all duration-200",
                  searchFocus ? "ring-2 ring-primary/20 border-primary/50" : "",
                )}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
              />
              {searchFocus && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Flame className="h-4 w-4 text-primary animate-pulse-slow" />
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px] h-12 rounded-full border-input">
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

              <Button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 transition-colors duration-200 h-12 rounded-full w-full sm:w-auto">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="username" className="mt-0 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <AtSign
                  className={cn(
                    "h-5 w-5 transition-colors duration-200",
                    searchFocus ? "text-primary" : "text-muted-foreground",
                  )}
                />
              </div>
              <Input
                placeholder="Search by username (e.g., creator123)"
                className={cn(
                  "pl-10 border-input rounded-full h-12 transition-all duration-200",
                  searchFocus ? "ring-2 ring-primary/20 border-primary/50" : "",
                )}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
              />
              {searchFocus && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Flame className="h-4 w-4 text-primary animate-pulse-slow" />
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px] h-12 rounded-full border-input">
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

              <Button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 transition-colors duration-200 h-12 rounded-full w-full sm:w-auto">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen} className="mt-6 pt-4 border-t border-border/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-muted-foreground p-0 hover:bg-transparent hover:text-primary transition-colors duration-200"
            >
              <Filter className="h-4 w-4 mr-1" />
              {isFiltersOpen ? "Hide Advanced Filters" : "Show Advanced Filters"}
            </Button>
          </CollapsibleTrigger>
          <p className="text-sm text-muted-foreground">Found 128 creators</p>
        </div>

        <CollapsibleContent className="mt-4 space-y-6 animate-in">
          <div>
            <h3 className="text-sm font-medium mb-3 text-foreground/80">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategories.includes(category) ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-colors duration-200 rounded-full",
                    selectedCategories.includes(category)
                      ? "bg-primary/10 hover:bg-primary/20 text-primary border-primary/20"
                      : "hover:bg-muted",
                  )}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3 text-foreground/80">Follower Count (min)</h3>
            <div className="px-2">
              <Slider
                defaultValue={[0]}
                max={1000000}
                step={10000}
                onValueChange={setFollowerRange}
                className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:bg-primary"
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>0</span>
                <span>{followerRange[0].toLocaleString()} followers</span>
                <span>1M+</span>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </section>
  )
}
