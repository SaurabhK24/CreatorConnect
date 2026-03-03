import { Instagram, Youtube, Twitch, Twitter, MessageSquare, BookmarkPlus, Flame } from "lucide-react"
import { cn } from "@/lib/utils"
import TikTokIcon from "./tiktok-icon"
import type { Creator } from "@/lib/types"

const PLATFORM_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  instagram: { bg: "bg-pink-500/12", text: "text-pink-400", border: "border-pink-500/20" },
  youtube: { bg: "bg-red-500/12", text: "text-red-400", border: "border-red-500/20" },
  tiktok: { bg: "bg-cyan-500/12", text: "text-cyan-400", border: "border-cyan-500/20" },
  twitter: { bg: "bg-blue-500/12", text: "text-blue-400", border: "border-blue-500/20" },
  twitch: { bg: "bg-purple-500/12", text: "text-purple-400", border: "border-purple-500/20" },
}

function getPlatformIcon(platform: string) {
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

function formatFollowers(count: number | string): string {
  if (typeof count === 'string') return count
  if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + 'M'
  if (count >= 1_000) return (count / 1_000).toFixed(0) + 'K'
  return count.toString()
}

export default function CreatorCard({ creator, onViewProfile }: { creator: Creator; onViewProfile?: (username: string) => void }) {
  const platformKey = creator.platform.toLowerCase()
  const platformCls = PLATFORM_COLORS[platformKey] ?? { bg: "bg-white/8", text: "text-white/50", border: "border-white/10" }

  const engColor =
    creator.engagement > 7
      ? "text-[#FF4D00]"
      : creator.engagement > 5
        ? "text-[#FF8A00]"
        : creator.engagement > 3
          ? "text-amber-400"
          : "text-white/50"

  const initials = (creator.name ?? "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "?"

  return (
    <div className="group bg-[#0D0D0D] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 hover:border-white/12 transition-all duration-300">
      {/* Header */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-none">
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border border-white/10 overflow-hidden relative", platformCls.bg, platformCls.text)}>
                {initials}
                {creator.avatar && creator.avatar !== '/placeholder.svg' && (
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                )}
              </div>
              {creator.engagement > 7 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF4D00] rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(255,77,0,0.6)]">
                  <Flame className="w-2.5 h-2.5 text-white" />
                </span>
              )}
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-semibold text-sm text-white leading-tight truncate">
                {creator.name}
              </h3>
              <p className="text-white/35 text-xs">@{creator.username}</p>
            </div>
          </div>

          <span
            className={cn(
              "inline-flex items-center gap-1.5 text-xs font-medium border rounded-full px-2.5 py-1 flex-none",
              platformCls.bg,
              platformCls.text,
              platformCls.border,
            )}
          >
            {getPlatformIcon(creator.platform)}
            {creator.platform}
          </span>
        </div>

        <p className="text-white/40 text-xs leading-relaxed line-clamp-2 mb-4">{creator.description}</p>

        {/* Category tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {creator.categories.map((cat) => (
            <span
              key={cat}
              className="text-[11px] bg-white/[0.05] border border-white/[0.07] text-white/40 rounded-full px-2.5 py-0.5"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#111] rounded-xl p-3 text-center border border-white/[0.04]">
            <p className="font-display font-bold text-base text-white">{formatFollowers(creator.followers)}</p>
            <p className="text-white/25 text-[10px] mt-0.5">Followers</p>
          </div>
          <div className="bg-[#111] rounded-xl p-3 text-center border border-white/[0.04]">
            <p className={cn("font-display font-bold text-base", engColor)}>{creator.engagement}%</p>
            <p className="text-white/25 text-[10px] mt-0.5">Engagement</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto px-5 py-4 border-t border-white/[0.05] flex gap-2">
        {onViewProfile && (
          <button
            onClick={() => onViewProfile(creator.username)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#FF4D00]/10 hover:bg-[#FF4D00]/20 border border-[#FF4D00]/20 text-[#FF4D00] text-xs font-medium transition-all"
          >
            View Profile
          </button>
        )}
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.07] text-white/50 hover:text-white/80 text-xs font-medium transition-all">
          <MessageSquare className="h-3.5 w-3.5" />
          Contact
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.07] text-white/50 hover:text-white/80 text-xs font-medium transition-all">
          <BookmarkPlus className="h-3.5 w-3.5" />
          Save
        </button>
      </div>
    </div>
  )
}
