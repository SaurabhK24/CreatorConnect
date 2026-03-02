import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Instagram, Youtube, Twitch, Twitter, MessageSquare, BookmarkPlus, Flame } from "lucide-react"
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

export default function CreatorCard({ creator }: { creator: Creator }) {
  const formatFollowers = (count: number) => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + "M"
    if (count >= 1000) return (count / 1000).toFixed(0) + "K"
    return count.toString()
  }

  const getPlatformIcon = (platform: string) => {
    const cls = "h-3.5 w-3.5"
    switch (platform.toLowerCase()) {
      case "instagram": return <Instagram className={cls} />
      case "youtube": return <Youtube className={cls} />
      case "tiktok": return <TikTokIcon className={cls} />
      case "twitter": return <Twitter className={cls} />
      case "twitch": return <Twitch className={cls} />
      default: return null
    }
  }

  const getPlatformBadgeColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram": return "bg-pink-50 text-pink-600 border-pink-100"
      case "youtube": return "bg-red-50 text-red-600 border-red-100"
      case "tiktok": return "bg-cyan-50 text-cyan-600 border-cyan-100"
      case "twitter": return "bg-blue-50 text-blue-600 border-blue-100"
      case "twitch": return "bg-purple-50 text-purple-600 border-purple-100"
      default: return "bg-gray-50 text-gray-600 border-gray-100"
    }
  }

  const engagementColor =
    creator.engagement > 7 ? "text-emerald-600" :
    creator.engagement > 5 ? "text-primary" :
    creator.engagement > 3 ? "text-amber-600" :
    "text-muted-foreground"

  return (
    <div className="group bg-white border border-border rounded-2xl overflow-hidden card-hover flex flex-col">
      {/* Header */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <Image
                src={creator.avatar || "/placeholder.svg"}
                alt={creator.name}
                width={48}
                height={48}
                className="rounded-full object-cover border-2 border-border"
              />
              {creator.engagement > 7 && (
                <span className="absolute -top-1 -right-1 bg-primary rounded-full p-0.5">
                  <Flame className="h-2.5 w-2.5 text-white" />
                </span>
              )}
            </div>
            <div>
              <h3 className="font-display font-semibold text-base leading-tight">{creator.name}</h3>
              <p className="text-sm text-muted-foreground">@{creator.username}</p>
            </div>
          </div>
          <span className={cn("inline-flex items-center gap-1 text-xs font-medium border rounded-full px-2.5 py-1", getPlatformBadgeColor(creator.platform))}>
            {getPlatformIcon(creator.platform)}
            {creator.platform}
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">{creator.description}</p>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {creator.categories.map((cat) => (
            <span key={cat} className="text-xs bg-muted text-muted-foreground rounded-full px-2.5 py-1">
              {cat}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/50 rounded-xl p-3 text-center">
            <p className="font-display font-bold text-lg">{formatFollowers(creator.followers)}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Followers</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-3 text-center">
            <p className={cn("font-display font-bold text-lg", engagementColor)}>{creator.engagement}%</p>
            <p className="text-xs text-muted-foreground mt-0.5">Engagement</p>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-auto px-5 py-4 border-t border-border/60 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-1.5 rounded-xl hover:bg-primary/5 hover:text-primary hover:border-primary/20 text-sm font-medium"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Contact
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-1.5 rounded-xl hover:bg-primary/5 hover:text-primary hover:border-primary/20 text-sm font-medium"
        >
          <BookmarkPlus className="h-3.5 w-3.5" />
          Save
        </Button>
      </div>
    </div>
  )
}
