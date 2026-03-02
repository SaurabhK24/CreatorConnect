"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Loader2, AlertCircle, TrendingUp, Eye, Heart, MessageSquare, Share2 } from "lucide-react"
import { getCreatorProfile } from "@/lib/api"
import type { CreatorProfileData } from "@/lib/types"

interface Props {
  username: string | null
  onClose: () => void
}

function formatNumber(n: number | undefined): string {
  if (n == null) return "—"
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M"
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K"
  return n.toString()
}

export default function CreatorProfileModal({ username, onClose }: Props) {
  const [data, setData] = useState<CreatorProfileData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!username) return
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    setData(null)

    getCreatorProfile(username, controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) setData(result)
      })
      .catch((e) => {
        if (!controller.signal.aborted) setError(e.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [username])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  if (!username) return null

  // profile.user has the identity fields; profile.stats has follower counts
  const user = data?.profile?.user
  const profileStats = data?.profile?.stats
  const videos = data?.recentVideos ?? []
  const metrics = data?.engagementMetrics

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

        <motion.div
          className="relative z-10 w-full max-w-lg bg-[#0D0D0D] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 340, damping: 28 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] flex-none">
            <h2 className="font-display font-bold text-white text-lg truncate pr-4">
              {loading ? "Loading profile…" : user ? `@${user.uniqueId}` : "Creator Profile"}
            </h2>
            <button onClick={onClose} className="text-white/30 hover:text-white/70 transition-colors flex-none">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex-1 p-6 space-y-6">
            {loading && (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <Loader2 className="w-8 h-8 text-[#FF4D00] animate-spin" />
                <p className="text-white/40 text-sm">Fetching profile from TikTok…</p>
              </div>
            )}

            {error && !loading && (
              <div className="flex flex-col items-center py-12 gap-3 text-center">
                <AlertCircle className="w-8 h-8 text-red-400" />
                <p className="text-white/60 text-sm">{error}</p>
              </div>
            )}

            {user && !loading && (
              <>
                {/* Profile header */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#FF4D00]/15 flex items-center justify-center text-[#FF4D00] font-bold text-xl flex-none overflow-hidden relative">
                    {(user.nickname || user.uniqueId)[0]?.toUpperCase()}
                    {user.avatarUrl && (
                      <img
                        src={user.avatarUrl}
                        alt={user.nickname ?? user.uniqueId}
                        className="absolute inset-0 w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => { e.currentTarget.style.display = "none" }}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <p className="font-display font-bold text-white text-lg leading-tight truncate">{user.nickname || user.uniqueId}</p>
                      {user.verified && (
                        <span className="text-[10px] bg-blue-500/15 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded-full flex-none">Verified</span>
                      )}
                    </div>
                    <p className="text-white/40 text-sm">@{user.uniqueId}</p>
                    {user.signature && <p className="text-white/55 text-xs mt-2 leading-relaxed line-clamp-3">{user.signature}</p>}
                    {user.bioLink && (
                      <a href={user.bioLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#FF4D00] text-xs mt-1.5 hover:underline">
                        <ExternalLink className="w-3 h-3" />
                        {user.bioLink}
                      </a>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Followers", val: formatNumber(profileStats?.followers) },
                    { label: "Following", val: formatNumber(profileStats?.following) },
                    { label: "Total Likes", val: formatNumber(profileStats?.hearts) },
                  ].map(({ label, val }) => (
                    <div key={label} className="bg-[#111] rounded-xl p-3 text-center border border-white/[0.04]">
                      <p className="font-display font-bold text-white text-base">{val}</p>
                      <p className="text-white/30 text-[10px] mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Engagement metrics */}
                {metrics && (
                  <div>
                    <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-3">Engagement</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { icon: TrendingUp, label: "Eng. Rate", val: metrics.engagementRate != null ? `${(metrics.engagementRate * 100).toFixed(2)}%` : "—" },
                        { icon: Eye, label: "Avg Views", val: formatNumber(metrics.avgViews) },
                        { icon: Heart, label: "Avg Likes", val: formatNumber(metrics.avgLikes) },
                        { icon: MessageSquare, label: "Avg Comments", val: formatNumber(metrics.avgComments) },
                      ].map(({ icon: Icon, label, val }) => (
                        <div key={label} className="flex items-center gap-3 bg-[#111] rounded-xl px-3 py-2.5 border border-white/[0.04]">
                          <Icon className="w-4 h-4 text-[#FF4D00] flex-none" />
                          <div>
                            <p className="text-white/30 text-[10px]">{label}</p>
                            <p className="text-white font-semibold text-sm">{val}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent videos */}
                {videos.length > 0 && (
                  <div>
                    <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-3">Recent Videos</p>
                    <div className="space-y-2">
                      {videos.slice(0, 5).map((video, i) => (
                        <div key={video.id ?? i} className="flex items-start gap-3 bg-[#111] rounded-xl px-3 py-2.5 border border-white/[0.04]">
                          {video.video?.cover && (
                            <img src={video.video.cover} alt="" className="w-10 h-10 rounded-lg object-cover flex-none" referrerPolicy="no-referrer" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-white/70 text-xs leading-relaxed line-clamp-2">{video.desc || "No description"}</p>
                            <div className="flex items-center gap-3 mt-1.5 text-[10px] text-white/30">
                              <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{formatNumber(video.stats?.plays)}</span>
                              <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{formatNumber(video.stats?.likes)}</span>
                              <span className="flex items-center gap-1"><Share2 className="w-3 h-3" />{formatNumber(video.stats?.shares)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          {user && !loading && (
            <div className="px-6 py-4 border-t border-white/[0.06] flex gap-3 flex-none">
              <button className="flex-1 py-2.5 rounded-xl bg-[#FF4D00] hover:bg-[#FF6020] text-white text-sm font-semibold transition-all shadow-[0_0_20px_rgba(255,77,0,0.25)]">
                Contact Creator
              </button>
              <button className="flex-1 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-white/70 text-sm font-semibold transition-all">
                Save to Pipeline
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
