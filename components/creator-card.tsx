import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Instagram, Youtube, TwitchIcon, Twitter, MessageSquare, BookmarkPlus, ExternalLink, Flame } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

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
    const iconProps = { className: "h-4 w-4" }
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram {...iconProps} />
      case "youtube":
        return <Youtube {...iconProps} />
      case "tiktok":
        return <ExternalLink {...iconProps} />
      case "twitter":
        return <Twitter {...iconProps} />
      case "twitch":
        return <TwitchIcon {...iconProps} />
      default:
        return null
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return "from-pink-500 to-purple-500"
      case "youtube":
        return "from-red-500 to-red-600"
      case "tiktok":
        return "from-cyan-500 to-blue-500"
      case "twitter":
        return "from-blue-400 to-blue-500"
      case "twitch":
        return "from-purple-500 to-purple-700"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getEngagementRating = (rate: number) => {
    if (rate > 7) return { text: "Excellent", color: "text-green-600 dark:text-green-500" }
    if (rate > 5) return { text: "Good", color: "text-primary dark:text-primary" }
    if (rate > 3) return { text: "Average", color: "text-amber-600 dark:text-amber-500" }
    return { text: "Low", color: "text-muted-foreground" }
  }

  const engagementRating = getEngagementRating(creator.engagement)

  return (
    <Card className="overflow-hidden card-hover border-border/50 bg-card/80 backdrop-blur-sm rounded-2xl animate-in h-full flex flex-col">
      <CardContent className="p-0 flex-grow">
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="relative cursor-pointer transition-transform duration-200 transform hover:scale-105 flex-shrink-0">
                  <div
                    className={cn(
                      "absolute inset-0 rounded-full bg-gradient-to-br opacity-0 hover:opacity-100 transition-opacity duration-300",
                      getPlatformColor(creator.platform),
                    )}
                  ></div>
                  <Image
                    src={creator.avatar || "/placeholder.svg"}
                    alt={creator.name}
                    width={50}
                    height={50}
                    className="rounded-full border border-border object-cover relative z-10 sm:w-[60px] sm:h-[60px] w-[50px] h-[50px]"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-card rounded-full p-1 border border-border shadow-sm z-20">
                    {getPlatformIcon(creator.platform)}
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-card border border-border shadow-xl rounded-xl p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Image
                      src={creator.avatar || "/placeholder.svg"}
                      alt={creator.name}
                      width={48}
                      height={48}
                      className="rounded-full border border-border object-cover"
                    />
                    <div>
                      <h4 className="text-base font-semibold">{creator.name}</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        @{creator.username}
                        <span className="inline-flex items-center justify-center bg-muted rounded-full p-0.5">
                          {getPlatformIcon(creator.platform)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80">{creator.description}</p>
                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="font-medium">{formatFollowers(creator.followers)}</span>
                      <span className="text-muted-foreground"> followers</span>
                    </div>
                    <div>
                      <span className={`font-medium ${engagementRating.color}`}>{creator.engagement}%</span>
                      <span className="text-muted-foreground"> engagement</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {creator.categories.map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs rounded-full">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <div className="min-w-0">
              <h3 className="font-semibold text-base sm:text-lg group-hover:text-primary transition-colors duration-200 truncate">
                {creator.name}
                {creator.engagement > 7 && (
                  <span className="ml-2 inline-flex">
                    <Flame className="h-4 w-4 text-primary" />
                  </span>
                )}
              </h3>
              <div className="flex items-center gap-1 text-muted-foreground text-sm truncate">
                <span className="truncate">@{creator.username}</span>
                <span className="text-border flex-shrink-0">•</span>
                <span className="flex items-center gap-1 flex-shrink-0">{creator.platform}</span>
              </div>
            </div>
          </div>

          <p className="text-foreground/80 mb-4 line-clamp-2 text-sm sm:text-base">{creator.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {creator.categories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground hover:text-secondary-foreground/80 transition-colors duration-200 rounded-full text-xs"
              >
                {category}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-muted/50 rounded-xl p-2 sm:p-3 border border-border hover:border-primary/20 transition-all duration-200">
                    <p className="text-base sm:text-lg font-semibold group-hover:text-primary transition-colors duration-200">
                      {formatFollowers(creator.followers)}
                    </p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-card border border-border rounded-xl">
                  <p>Total follower count across platforms</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-muted/50 rounded-xl p-2 sm:p-3 border border-border hover:border-primary/20 transition-all duration-200">
                    <p className={`text-base sm:text-lg font-semibold ${engagementRating.color}`}>
                      {creator.engagement}%
                    </p>
                    <p className="text-xs text-muted-foreground">{engagementRating.text} Engagement</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-card border border-border rounded-xl">
                  <p>Average engagement rate on recent posts</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-3 sm:p-4 border-t border-border/50 bg-muted/30 backdrop-blur-sm">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 border-border hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all duration-200 rounded-full text-xs sm:text-sm"
        >
          <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Contact</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 border-border hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all duration-200 rounded-full text-xs sm:text-sm"
        >
          <BookmarkPlus className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Save</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
