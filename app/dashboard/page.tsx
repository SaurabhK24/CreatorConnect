"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Flame,
  LayoutDashboard,
  Search,
  Users,
  MessageSquare,
  DollarSign,
  Settings,
  LogOut,
  Bell,
  TrendingUp,
  Eye,
  BarChart3,
  ChevronRight,
  X,
  Send,
  Star,
  Plus,
  Filter,
  ArrowUpRight,
  Zap,
  Check,
  Clock,
  Bookmark,
  ExternalLink,
  Menu,
  Loader2,
} from "lucide-react"
import { useAuth } from "@/components/auth-context"
import { cn } from "@/lib/utils"
import { searchCreators, normalizeTikTokCreator, ApiError } from "@/lib/api"
import type { Creator } from "@/lib/types"
import CreatorCard from "@/components/creator-card"

// ─── Mock data ─────────────────────────────────────────────────────────────────
const CREATORS = [
  {
    id: 1,
    name: "Sofia Rodriguez",
    username: "sofiacreates",
    platform: "TikTok",
    followers: "890K",
    engagement: "14.2%",
    engNum: 14.2,
    status: "active",
    categories: ["Comedy", "Lifestyle"],
    views: "2.1M",
    revenue: "$4,200",
    avatar: "SR",
  },
  {
    id: 2,
    name: "Jamie Chen",
    username: "jamietech",
    platform: "YouTube",
    followers: "550K",
    engagement: "6.8%",
    engNum: 6.8,
    status: "contacted",
    categories: ["Tech", "Reviews"],
    views: "890K",
    revenue: "$2,100",
    avatar: "JC",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    username: "marcusfitness",
    platform: "Instagram",
    followers: "320K",
    engagement: "5.4%",
    engNum: 5.4,
    status: "in_progress",
    categories: ["Fitness", "Health"],
    views: "560K",
    revenue: "$1,400",
    avatar: "MJ",
  },
  {
    id: 4,
    name: "Priya Patel",
    username: "priyatravels",
    platform: "Instagram",
    followers: "215K",
    engagement: "4.8%",
    engNum: 4.8,
    status: "saved",
    categories: ["Travel", "Photography"],
    views: "340K",
    revenue: "$980",
    avatar: "PP",
  },
  {
    id: 5,
    name: "David Kim",
    username: "davidgames",
    platform: "Twitch",
    followers: "180K",
    engagement: "7.2%",
    engNum: 7.2,
    status: "active",
    categories: ["Gaming", "Entertainment"],
    views: "480K",
    revenue: "$1,650",
    avatar: "DK",
  },
  {
    id: 6,
    name: "Alex Morgan",
    username: "alexmotion",
    platform: "Instagram",
    followers: "125K",
    engagement: "3.2%",
    engNum: 3.2,
    status: "saved",
    categories: ["Fashion", "Lifestyle"],
    views: "210K",
    revenue: "$620",
    avatar: "AM",
  },
]

const CAMPAIGNS = [
  {
    id: 1,
    name: "Summer Launch 2026",
    creators: 4,
    views: "4.2M",
    status: "active",
    budget: "$8,000",
    spent: "$5,200",
    startDate: "Jun 1",
    endDate: "Jul 31",
  },
  {
    id: 2,
    name: "Product Review Series",
    creators: 2,
    views: "1.8M",
    status: "active",
    budget: "$3,500",
    spent: "$2,100",
    startDate: "May 15",
    endDate: "Jun 30",
  },
  {
    id: 3,
    name: "Brand Awareness Q1",
    creators: 6,
    views: "8.9M",
    status: "completed",
    budget: "$12,000",
    spent: "$11,800",
    startDate: "Jan 1",
    endDate: "Mar 31",
  },
  {
    id: 4,
    name: "Holiday Campaign",
    creators: 0,
    views: "0",
    status: "draft",
    budget: "$5,000",
    spent: "$0",
    startDate: "Dec 1",
    endDate: "Dec 31",
  },
]

const PAYMENTS = [
  { id: 1, creator: "Sofia Rodriguez", amount: "$840", date: "Jun 12, 2026", status: "paid", campaign: "Summer Launch" },
  { id: 2, creator: "Jamie Chen", amount: "$420", date: "Jun 10, 2026", status: "paid", campaign: "Product Review" },
  {
    id: 3,
    creator: "Marcus Johnson",
    amount: "$280",
    date: "Jun 8, 2026",
    status: "pending",
    campaign: "Summer Launch",
  },
  { id: 4, creator: "David Kim", amount: "$330", date: "Jun 5, 2026", status: "paid", campaign: "Summer Launch" },
  {
    id: 5,
    creator: "Priya Patel",
    amount: "$196",
    date: "Jun 3, 2026",
    status: "processing",
    campaign: "Brand Awareness",
  },
]

const STATUS_CONFIG = {
  active: { label: "Active", cls: "bg-emerald-500/12 text-emerald-400 border border-emerald-500/20" },
  contacted: { label: "Contacted", cls: "bg-blue-500/12 text-blue-400 border border-blue-500/20" },
  in_progress: { label: "In Progress", cls: "bg-amber-500/12 text-amber-400 border border-amber-500/20" },
  saved: { label: "Saved", cls: "bg-[#FF4D00]/12 text-[#FF8A00] border border-[#FF4D00]/20" },
  completed: { label: "Completed", cls: "bg-white/8 text-white/40 border border-white/10" },
  draft: { label: "Draft", cls: "bg-white/5 text-white/30 border border-white/8" },
  paid: { label: "Paid", cls: "bg-emerald-500/12 text-emerald-400 border border-emerald-500/20" },
  pending: { label: "Pending", cls: "bg-amber-500/12 text-amber-400 border border-amber-500/20" },
  processing: { label: "Processing", cls: "bg-blue-500/12 text-blue-400 border border-blue-500/20" },
}

const PLATFORM_COLORS: Record<string, string> = {
  TikTok: "#00C8FF",
  YouTube: "#FF0000",
  Instagram: "#E1306C",
  Twitter: "#1DA1F2",
  Twitch: "#9146FF",
}

const NAV = [
  { icon: LayoutDashboard, label: "Overview", key: "overview" },
  { icon: Search, label: "Find Creators", key: "search" },
  { icon: Users, label: "My Creators", key: "creators" },
  { icon: MessageSquare, label: "Campaigns", key: "campaigns" },
  { icon: DollarSign, label: "Payments", key: "payments" },
  { icon: Settings, label: "Settings", key: "settings" },
]

// ─── Sub-components ────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] ?? {
    label: status,
    cls: "bg-white/5 text-white/40",
  }
  return <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cfg.cls}`}>{cfg.label}</span>
}

function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  color = "#FF4D00",
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  delta?: string
  color?: string
}) {
  return (
    <div className="bg-[#0D0D0D] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <span className="text-white/40 text-xs font-medium">{label}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
      </div>
      <p className="font-display font-extrabold text-2xl text-white mb-1">{value}</p>
      {delta && <p className="text-xs" style={{ color }}>{delta} this week</p>}
    </div>
  )
}

// ─── Overview Section ──────────────────────────────────────────────────────────
function OverviewSection({ onNav }: { onNav: (k: string) => void }) {
  const stats = [
    { icon: Users, label: "Active Creators", value: "48", delta: "+12%", color: "#FF4D00" },
    { icon: Eye, label: "Total Views", value: "2.4M", delta: "+28%", color: "#FF8A00" },
    { icon: BarChart3, label: "Avg. Engagement", value: "6.8%", delta: "+3.1%", color: "#FF4D00" },
    { icon: DollarSign, label: "Revenue Driven", value: "$48K", delta: "+41%", color: "#FF8A00" },
  ]

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Find New Creators", desc: "Browse 50K+ vetted creators", icon: Search, key: "search", color: "#FF4D00" },
          { label: "Create Campaign", desc: "Launch a new campaign brief", icon: Zap, key: "campaigns", color: "#FF8A00" },
          { label: "View Payments", desc: "Manage creator payouts", icon: DollarSign, key: "payments", color: "#FF4D00" },
        ].map(({ label, desc, icon: Icon, key, color }) => (
          <button
            key={key}
            onClick={() => onNav(key)}
            className="bg-[#0D0D0D] border border-white/[0.06] rounded-2xl p-5 text-left hover:border-[#FF4D00]/30 hover:bg-[#FF4D00]/[0.03] transition-all group"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${color}15` }}
            >
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <p className="text-white font-semibold text-sm mb-0.5">{label}</p>
            <p className="text-white/35 text-xs">{desc}</p>
            <ArrowUpRight
              className="w-4 h-4 text-white/20 group-hover:text-[#FF4D00] transition-colors mt-2"
              style={{ color: undefined }}
            />
          </button>
        ))}
      </div>

      {/* Recent creators */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-white">Recent Creators</h3>
          <button onClick={() => onNav("creators")} className="text-xs text-[#FF4D00] hover:text-[#FF6020] transition-colors flex items-center gap-1">
            View all <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="space-y-2">
          {CREATORS.slice(0, 4).map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className="flex items-center gap-4 bg-[#0D0D0D] border border-white/[0.06] rounded-xl px-4 py-3 hover:border-white/10 transition-colors"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-none"
                style={{
                  background: `${PLATFORM_COLORS[c.platform] ?? "#FF4D00"}20`,
                  color: PLATFORM_COLORS[c.platform] ?? "#FF4D00",
                }}
              >
                {c.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{c.name}</p>
                <p className="text-white/30 text-xs">@{c.username} · {c.platform}</p>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-white/60 text-xs">{c.followers}</p>
                <p className="text-[#FF8A00] text-xs">{c.engagement}</p>
              </div>
              <StatusBadge status={c.status} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Find Creators Section ─────────────────────────────────────────────────────
function FindCreatorsSection() {
  const [findQuery, setFindQuery] = useState("")
  const [findResults, setFindResults] = useState<Creator[]>([])
  const [findLoading, setFindLoading] = useState(false)
  const [findError, setFindError] = useState<string | null>(null)

  const chips = ["Fitness TikTok creators", "Tech YouTubers 500K+", "Fashion Instagram", "Gaming Twitch streamers", "Food & Lifestyle"]

  const handleFindSearch = async () => {
    setFindLoading(true)
    setFindError(null)
    try {
      const data = await searchCreators({ query: findQuery || "lifestyle", resultsPerPage: 20 })
      setFindResults((data.items ?? []).map(normalizeTikTokCreator))
    } catch (err) {
      if (err instanceof ApiError) {
        setFindError(err.message)
      } else {
        setFindError("Something went wrong. Please try again.")
      }
    } finally {
      setFindLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="bg-[#0D0D0D] border border-white/[0.07] rounded-2xl p-5">
        <div className="relative mb-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search creators by name, niche, username…"
              value={findQuery}
              onChange={(e) => setFindQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFindSearch()}
              className="w-full pl-11 pr-4 py-3 bg-[#111] border border-white/10 rounded-xl text-white text-sm placeholder-white/25 outline-none focus:border-[#FF4D00]/40 transition-all"
            />
          </div>
          <button
            onClick={handleFindSearch}
            disabled={findLoading}
            className="px-4 py-3 rounded-xl bg-[#FF4D00] hover:bg-[#FF6020] disabled:opacity-60 text-white text-sm font-semibold transition-all flex items-center gap-2"
          >
            {findLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            {findLoading ? "Searching…" : "Search"}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => (
            <button
              key={c}
              onClick={() => setFindQuery(c)}
              className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.07] text-white/45 text-xs hover:text-white/80 hover:border-[#FF4D00]/30 transition-all"
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {findError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
          {findError}
        </div>
      )}

      {/* Results */}
      {findLoading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-white/[0.03] border border-white/[0.05] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : findResults.length > 0 ? (
        <div className="space-y-2">
          <p className="text-white/30 text-xs">{findResults.length} creators found</p>
          {findResults.map((creator) => (
            <CreatorCard key={String(creator.id)} creator={creator} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-white/25 text-sm">
          Search for creators to see results here.
        </div>
      )}
    </div>
  )
}

// ─── My Creators Section ───────────────────────────────────────────────────────
function MyCreatorsSection() {
  const [filter, setFilter] = useState<"all" | "active" | "contacted" | "saved" | "in_progress">("all")
  const [contactCreator, setContactCreator] = useState<(typeof CREATORS)[0] | null>(null)
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  const filtered = useMemo(
    () => CREATORS.filter((c) => filter === "all" || c.status === filter),
    [filter],
  )

  const filters: Array<{ key: typeof filter; label: string }> = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "contacted", label: "Contacted" },
    { key: "in_progress", label: "In Progress" },
    { key: "saved", label: "Saved" },
  ]

  const handleContact = (c: (typeof CREATORS)[0]) => {
    setContactCreator(c)
    setMessage(`Hi ${c.name.split(" ")[0]}, I came across your content and would love to explore a collaboration opportunity with you. Would you be open to a quick call?`)
    setSent(false)
  }

  return (
    <>
      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === key
                ? "bg-[#FF4D00] text-white shadow-[0_0_16px_rgba(255,77,0,0.3)]"
                : "bg-white/[0.05] border border-white/[0.07] text-white/40 hover:text-white/70"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center gap-4 bg-[#0D0D0D] border border-white/[0.06] rounded-2xl px-5 py-4 hover:border-white/10 transition-all"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-none"
              style={{
                background: `${PLATFORM_COLORS[c.platform] ?? "#FF4D00"}18`,
                color: PLATFORM_COLORS[c.platform] ?? "#FF4D00",
              }}
            >
              {c.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium">{c.name}</p>
              <p className="text-white/30 text-xs">
                @{c.username} · {c.platform}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-6 text-center">
              <div>
                <p className="text-white/70 text-sm font-display font-semibold">{c.followers}</p>
                <p className="text-white/25 text-[10px]">Followers</p>
              </div>
              <div>
                <p
                  className="text-sm font-display font-semibold"
                  style={{ color: c.engNum >= 7 ? "#FF4D00" : c.engNum >= 5 ? "#FF8A00" : "rgba(255,255,255,0.7)" }}
                >
                  {c.engagement}
                </p>
                <p className="text-white/25 text-[10px]">Engagement</p>
              </div>
              <div>
                <p className="text-white/70 text-sm font-display font-semibold">{c.views}</p>
                <p className="text-white/25 text-[10px]">Views</p>
              </div>
            </div>
            <StatusBadge status={c.status} />
            <button
              onClick={() => handleContact(c)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.07] text-white/55 hover:text-white/80 text-xs font-medium transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Message
            </button>
          </motion.div>
        ))}
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {contactCreator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setContactCreator(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0D0D0D] border border-white/[0.08] rounded-2xl w-full max-w-lg shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Contact {contactCreator.name}</h3>
                  <p className="text-white/35 text-xs mt-0.5">
                    @{contactCreator.username} · {contactCreator.platform}
                  </p>
                </div>
                <button onClick={() => setContactCreator(null)} className="text-white/30 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {sent ? (
                <div className="p-10 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 text-emerald-400" />
                  </div>
                  <p className="text-white font-semibold mb-1">Message sent!</p>
                  <p className="text-white/35 text-sm">
                    {contactCreator.name} will receive your message shortly.
                  </p>
                  <button
                    onClick={() => setContactCreator(null)}
                    className="mt-6 px-5 py-2 rounded-xl bg-white/[0.06] text-white/60 text-sm hover:bg-white/[0.1] transition-all"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  <div>
                    <label className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2 block">
                      Subject
                    </label>
                    <input
                      type="text"
                      defaultValue="Brand collaboration opportunity"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#111] border border-white/10 text-white text-sm outline-none focus:border-[#FF4D00]/40 transition-all placeholder-white/25"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2 block">
                      Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white text-sm outline-none focus:border-[#FF4D00]/40 transition-all resize-none placeholder-white/25"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setContactCreator(null)}
                      className="flex-1 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.07] text-white/60 font-medium text-sm transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setSent(true)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FF4D00] hover:bg-[#FF6020] text-white font-semibold text-sm transition-all"
                    >
                      <Send className="w-4 h-4" />
                      Send message
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Campaigns Section ─────────────────────────────────────────────────────────
function CampaignsSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div />
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF4D00] hover:bg-[#FF6020] text-white text-sm font-semibold transition-all shadow-[0_0_20px_rgba(255,77,0,0.25)]">
          <Plus className="w-4 h-4" />
          New Campaign
        </button>
      </div>
      {CAMPAIGNS.map((camp, i) => (
        <motion.div
          key={camp.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          className="bg-[#0D0D0D] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold">{camp.name}</h3>
              <p className="text-white/35 text-xs mt-0.5">
                {camp.startDate} → {camp.endDate} · {camp.creators} creator{camp.creators !== 1 ? "s" : ""}
              </p>
            </div>
            <StatusBadge status={camp.status} />
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              { label: "Views", val: camp.views },
              { label: "Budget", val: camp.budget },
              { label: "Spent", val: camp.spent },
            ].map(({ label, val }) => (
              <div key={label}>
                <p className="text-white/25 text-[10px] uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-white font-display font-semibold text-sm">{val}</p>
              </div>
            ))}
          </div>
          {camp.status === "active" && camp.budget !== camp.spent && (
            <div>
              <div className="flex justify-between text-[10px] text-white/30 mb-1.5">
                <span>Budget used</span>
                <span>
                  {Math.round((parseInt(camp.spent.replace(/\D/g, "")) / parseInt(camp.budget.replace(/\D/g, ""))) * 100)}%
                </span>
              </div>
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#FF4D00] to-[#FF8A00]"
                  style={{
                    width: `${Math.round((parseInt(camp.spent.replace(/\D/g, "")) / parseInt(camp.budget.replace(/\D/g, ""))) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

// ─── Payments Section ──────────────────────────────────────────────────────────
function PaymentsSection() {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Paid", val: "$10,330", color: "#FF4D00" },
          { label: "Pending", val: "$476", color: "#FF8A00" },
          { label: "This Month", val: "$2,066", color: "#FF4D00" },
        ].map(({ label, val, color }) => (
          <div key={label} className="bg-[#0D0D0D] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-white/35 text-xs mb-2">{label}</p>
            <p className="font-display font-extrabold text-2xl" style={{ color }}>
              {val}
            </p>
          </div>
        ))}
      </div>

      {/* Transaction list */}
      <div className="bg-[#0D0D0D] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-5 px-5 py-3 border-b border-white/[0.05]">
          {["Creator", "Campaign", "Amount", "Date", "Status"].map((h) => (
            <p key={h} className="text-white/25 text-[10px] font-semibold uppercase tracking-wider">
              {h}
            </p>
          ))}
        </div>
        {PAYMENTS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-5 items-center px-5 py-3.5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
          >
            <p className="text-white text-sm font-medium">{p.creator}</p>
            <p className="text-white/40 text-xs">{p.campaign}</p>
            <p className="text-white font-display font-semibold text-sm">{p.amount}</p>
            <p className="text-white/35 text-xs">{p.date}</p>
            <StatusBadge status={p.status} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Settings Section ──────────────────────────────────────────────────────────
function SettingsSection({ user }: { user: { name: string; email: string; company?: string; plan?: string } }) {
  const [name, setName] = useState(user.name)
  const [company, setCompany] = useState(user.company ?? "")
  const [saved, setSaved] = useState(false)

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl bg-[#111] border border-white/10 text-white text-sm outline-none focus:border-[#FF4D00]/40 transition-all placeholder-white/25"

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-xl space-y-8">
      {/* Profile */}
      <div className="bg-[#0D0D0D] border border-white/[0.06] rounded-2xl p-6">
        <h3 className="font-display font-bold text-white mb-1">Profile</h3>
        <p className="text-white/35 text-sm mb-6">Update your account information.</p>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-white/45 text-xs uppercase tracking-wider font-medium block mb-2">Full Name</label>
            <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="text-white/45 text-xs uppercase tracking-wider font-medium block mb-2">Email</label>
            <input className={inputClass} value={user.email} readOnly />
          </div>
          <div>
            <label className="text-white/45 text-xs uppercase tracking-wider font-medium block mb-2">Company</label>
            <input
              className={inputClass}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Your company name"
            />
          </div>
          <button
            type="submit"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              saved
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                : "bg-[#FF4D00] hover:bg-[#FF6020] text-white"
            }`}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                Saved!
              </>
            ) : (
              "Save changes"
            )}
          </button>
        </form>
      </div>

      {/* Plan */}
      <div className="bg-[#0D0D0D] border border-white/[0.06] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-bold text-white mb-1">Current Plan</h3>
            <p className="text-white/35 text-sm">You are on the Free plan.</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white/50 text-xs font-semibold uppercase tracking-wider">
            Free
          </span>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF4D00] to-[#FF8A00] text-white text-sm font-semibold transition-all hover:opacity-90 shadow-[0_0_20px_rgba(255,77,0,0.3)]">
          <Zap className="w-4 h-4" />
          Upgrade to Pro
        </button>
      </div>

      {/* Danger */}
      <div className="bg-[#0D0D0D] border border-red-500/20 rounded-2xl p-6">
        <h3 className="font-display font-bold text-white mb-1">Danger Zone</h3>
        <p className="text-white/35 text-sm mb-4">Permanently delete your account and all data.</p>
        <button className="px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/15 transition-all">
          Delete account
        </button>
      </div>
    </div>
  )
}

// ─── Page Titles ───────────────────────────────────────────────────────────────
const PAGE_META: Record<string, { title: string; desc: string }> = {
  overview: { title: "Overview", desc: "Your campaign performance at a glance" },
  search: { title: "Find Creators", desc: "Browse 50,000+ vetted UGC creators" },
  creators: { title: "My Creators", desc: "Manage your creator pipeline" },
  campaigns: { title: "Campaigns", desc: "Create and manage your campaigns" },
  payments: { title: "Payments", desc: "Creator payouts and transaction history" },
  settings: { title: "Settings", desc: "Manage your account and preferences" },
}

// ─── Dashboard Page ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [activeNav, setActiveNav] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/40">
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading…
        </div>
      </div>
    )
  }

  if (!user) return null

  const meta = PAGE_META[activeNav] ?? { title: activeNav, desc: "" }
  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const handleNav = (key: string) => {
    setActiveNav(key)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white flex">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 bg-[#0A0A0A] border-r border-white/[0.05] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center px-5 border-b border-white/[0.05]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#FF4D00] to-[#FF8A00] flex items-center justify-center">
              <Flame className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-sm">CreatorConnect</span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV.map(({ icon: Icon, label, key }) => (
            <button
              key={key}
              onClick={() => handleNav(key)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left",
                activeNav === key
                  ? "bg-[#FF4D00]/10 text-[#FF4D00] border border-[#FF4D00]/15"
                  : "text-white/40 hover:text-white/80 hover:bg-white/[0.04]",
              )}
            >
              <Icon className="w-4 h-4 flex-none" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/[0.05]">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#FF4D00]/15 flex items-center justify-center text-xs font-bold text-[#FF4D00] flex-none">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white text-xs font-semibold truncate">{user.name}</p>
              <p className="text-white/30 text-[10px] truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white/35 hover:text-white/70 hover:bg-white/[0.04] text-xs transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen flex flex-col lg:ml-60">
        {/* Top header */}
        <header className="sticky top-0 z-20 h-16 bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.05] flex items-center px-6 gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-white/40 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-bold text-white text-lg truncate">{meta.title}</h1>
            <p className="text-white/35 text-xs hidden sm:block">{meta.desc}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.07] flex items-center justify-center transition-all">
              <Bell className="w-4 h-4 text-white/40" />
            </button>
            <button
              onClick={() => handleNav("search")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF4D00] hover:bg-[#FF6020] text-white text-xs font-semibold transition-all shadow-[0_0_16px_rgba(255,77,0,0.25)]"
            >
              <Search className="w-3.5 h-3.5" />
              Find Creators
            </button>
          </div>
        </header>

        {/* Page body */}
        <div className="flex-1 p-6 md:p-8 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNav}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {activeNav === "overview" && <OverviewSection onNav={handleNav} />}
              {activeNav === "search" && <FindCreatorsSection />}
              {activeNav === "creators" && <MyCreatorsSection />}
              {activeNav === "campaigns" && <CampaignsSection />}
              {activeNav === "payments" && <PaymentsSection />}
              {activeNav === "settings" && <SettingsSection user={user} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
