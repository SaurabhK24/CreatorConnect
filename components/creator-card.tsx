import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Instagram, Youtube, Twitch, Twitter, MessageSquare, BookmarkPlus, Flame } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import TikTokIcon from "./tiktok-icon"

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

interface CreatorCardProps {
  creator: Creator
}

export default function CreatorCard({ creator }: CreatorCardProps) {
  const formatFollowers = (count: number) => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + "M"
    if (count >= 1000) return (count / 1000).toFixed(1) + "K"
    return count.toString()
  }

  const getPlatformIcon = (platform: string) => {
    const iconProps = { className: "h-3.5 w-3.5" }
    switch (platform.toLowerCase()) {
      case "instagram": return <Instagram {...iconProps} />
      case "youtube": return <Youtube {...iconProps} />
      case "tiktok": return <TikTokIcon {...iconProps} />
      case "twitter": return <Twitter {...iconProps} />
      case "twitch": return <Twitch {...iconProps} />
      default: return null
    }
  }

  const getPlatformGradient = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram": return "from-pink-500 to-purple-500"
      case "youtube": return "from-red-500 to-red-600"
      case "tiktok": return "from-cyan-400 to-blue-500"
      case "twitter": return "from-blue-400 to-blue-500"
      case "twitch": return "from-purple-500 to-purple-700"
      default: return "from-zinc-500 to-zinc-600"
    }
  }

  const getEngagementRating = (rate: number) => {
    if (rate > 7) return { text: "Excellent", color: "text-emerald-400" }
    if (rate > 5) return { text: "Good", color: "text-orange-400" }
    if (rate > 3) return { text: "Average", color: "text-amber-500" }
    return { text: "Low", color: "text-muted-foreground" }
  }

  const engagementRating = getEngagementRating(creator.engagement)
  const isHot = creator.engagement > 7

  return (
    <Card className={cn(
      "overflow-hidden rounded-2xl animate-in h-full flex flex-col",
      "bg-card border border-white/[0.07]",
      "transition-all duration-300 cursor-pointer",
      "hover:border-orange-500/30 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.2),0_8px_32px_rgba(249,115,22,0.06)]",
      "hover:-translate-y-0.5",
    )}>
      <CardContent className="p-0 flex-grow">
        <div className="p-5 sm:p-6">
          {/* Creator header */}
          <div className="flex items-start gap-4 mb-4">
            {/* Avatar with platform ring */}
            <div className="relative flex-shrink-0">
              <div className={cn(
                "absolute -inset-0.5 rounded-full bg-gradient-to-br opacity-70",
                getPlatformGradient(creator.platform),
              )} />
              <Image
                src={creator.avatar || "/placeholder.svg"}
                alt={creator.name}
                width={52}
                height={52}
                className="rounded-full border-2 border-background object-cover relative z-10 w-[52px] h-[52px]"
              />
              <div className="absolute -bottom-0.5 -right-0.5 bg-card rounded-full p-1 border border-white/10 shadow z-20">
                {getPlatformIcon(creator.platform)}
              </div>
            </div>

            {/* Name + handle */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-base leading-snug truncate">
                  {creator.name}
                </h3>
                {isHot && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 text-[10px] font-semibold uppercase tracking-wide flex-shrink-0">
                    <Flame className="h-2.5 w-2.5" />
                    Hot
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-0.5">
                <span className="truncate">@{creator.username}</span>
                <span className="text-white/20">·</span>
                <span className="flex-shrink-0 capitalize">{creator.platform}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
            {creator.description}
          </p>

          {/* Category badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {creator.categories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="bg-white/[0.05] hover:bg-white/[0.08] text-muted-foreground border border-white/[0.07] rounded-full text-xs px-2.5 py-0.5 transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 text-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06] hover:border-orange-500/20 transition-colors duration-200">
                    <p className="text-lg font-semibold text-foreground">
                      {formatFollowers(creator.followers)}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Followers</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-card border border-white/10 rounded-xl text-sm">
                  Total follower count
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06] hover:border-orange-500/20 transition-colors duration-200">
                    <p className={`text-lg font-semibold ${engagementRating.color}`}>
                      {creator.engagement}%
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{engagementRating.text} Eng.</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-card border border-white/10 rounded-xl text-sm">
                  Average engagement rate on recent posts
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>

      {/* Card footer actions */}
      <CardFooter className="flex justify-between p-4 border-t border-white/[0.06] bg-white/[0.02]">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 text-muted-foreground hover:text-orange-400 hover:bg-orange-500/10 transition-all duration-200 rounded-lg text-xs sm:text-sm h-9 px-3"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Contact</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 text-muted-foreground hover:text-orange-400 hover:bg-orange-500/10 transition-all duration-200 rounded-lg text-xs sm:text-sm h-9 px-3"
        >
          <BookmarkPlus className="h-3.5 w-3.5" />
          <span>Save</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
