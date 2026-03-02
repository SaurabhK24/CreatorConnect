"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Flame, LayoutDashboard, BookmarkCheck, MessageSquare,
  Settings, Search, ChevronRight, X, Send, Users, TrendingUp, Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const savedCreators = [
  { id: 1, name: "Sofia Rodriguez", username: "liabenson", platform: "TikTok", followers: "890K", engagement: "14.2%", status: "saved", categories: ["Comedy", "Lifestyle"] },
  { id: 2, name: "Jamie Chen", username: "miachen", platform: "YouTube", followers: "550K", engagement: "6.8%", status: "contacted", categories: ["Tech", "Reviews"] },
  { id: 3, name: "Marcus Johnson", username: "marcusfitness", platform: "Instagram", followers: "320K", engagement: "5.4%", status: "in_progress", categories: ["Fitness", "Health"] },
  { id: 4, name: "Priya Patel", username: "priyatravels", platform: "Instagram", followers: "215K", engagement: "4.8%", status: "saved", categories: ["Travel", "Photography"] },
  { id: 5, name: "David Kim", username: "davidgames", platform: "Twitch", followers: "180K", engagement: "7.2%", status: "contacted", categories: ["Gaming", "Entertainment"] },
]

const statusConfig = {
  saved: { label: "Saved", className: "bg-orange-50 text-primary border-orange-100" },
  contacted: { label: "Contacted", className: "bg-blue-50 text-blue-600 border-blue-100" },
  in_progress: { label: "In Progress", className: "bg-emerald-50 text-emerald-600 border-emerald-100" },
}

const navItems = [
  { icon: LayoutDashboard, label: "Overview", key: "overview" },
  { icon: BookmarkCheck, label: "Saved Creators", key: "saved" },
  { icon: MessageSquare, label: "Contacted", key: "contacted" },
  { icon: Settings, label: "Settings", key: "settings" },
]

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("saved")
  const [contactCreator, setContactCreator] = useState<typeof savedCreators[0] | null>(null)
  const [message, setMessage] = useState("")
  const [filter, setFilter] = useState<"all" | "saved" | "contacted" | "in_progress">("all")

  const filtered = savedCreators.filter(c => filter === "all" || c.status === filter)

  const stats = [
    { icon: Users, label: "Saved Creators", value: savedCreators.length.toString() },
    { icon: MessageSquare, label: "Contacted", value: savedCreators.filter(c => c.status === "contacted").length.toString() },
    { icon: TrendingUp, label: "In Progress", value: savedCreators.filter(c => c.status === "in_progress").length.toString() },
    { icon: Zap, label: "Avg. Engagement", value: "7.7%" },
  ]

  return (
    <div className="min-h-screen bg-background flex">
      {/* SIDEBAR */}
      <aside className="w-60 border-r border-border/60 bg-white flex flex-col fixed inset-y-0 left-0 z-40">
        <div className="h-16 flex items-center px-5 border-b border-border/60">
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-lg">
            <Flame className="h-4 w-4 text-primary" />
            CreatorConnect
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ icon: Icon, label, key }) => (
            <button
              key={key}
              onClick={() => setActiveNav(key)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left",
                activeNav === key
                  ? "bg-primary/8 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-border/60">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-display font-bold text-primary">U</div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">Your Account</p>
              <p className="text-xs text-muted-foreground truncate">user@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="ml-60 flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold">Saved Creators</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage your creator pipeline</p>
          </div>
          <Link href="/">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-full px-5 gap-1.5">
              <Search className="h-4 w-4" />
              Find more creators
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white border border-border rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              <p className="font-display text-2xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {(["all", "saved", "contacted", "in_progress"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all capitalize",
                filter === f
                  ? "bg-primary text-white"
                  : "bg-white border border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {f === "in_progress" ? "In Progress" : f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Creator rows */}
        <div className="space-y-3">
          {filtered.map((creator) => {
            const status = statusConfig[creator.status as keyof typeof statusConfig]
            return (
              <div key={creator.id} className="bg-white border border-border rounded-2xl p-4 flex items-center gap-4 hover:border-primary/20 transition-colors">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-display font-bold text-sm text-muted-foreground flex-shrink-0">
                  {creator.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{creator.name}</p>
                    <span className={cn("text-xs border rounded-full px-2 py-0.5", status.className)}>{status.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">@{creator.username} · {creator.platform}</p>
                </div>
                <div className="hidden sm:flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="font-display font-semibold">{creator.followers}</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display font-semibold text-primary">{creator.engagement}</p>
                    <p className="text-xs text-muted-foreground">Engagement</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-xl text-xs h-8 gap-1 hover:bg-primary/5 hover:text-primary hover:border-primary/20"
                    onClick={() => {
                      setContactCreator(creator)
                      setMessage(`Hi ${creator.name.split(" ")[0]}, I'd love to explore a collaboration with you...`)
                    }}
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    Contact
                  </Button>
                  <Button size="sm" variant="ghost" className="rounded-xl text-xs h-8 text-muted-foreground hover:text-foreground">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* CONTACT MODAL */}
      {contactCreator && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-border/60">
              <div>
                <h3 className="font-display font-bold text-lg">Contact {contactCreator.name}</h3>
                <p className="text-sm text-muted-foreground">@{contactCreator.username} · {contactCreator.platform}</p>
              </div>
              <button onClick={() => setContactCreator(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <input
                  type="text"
                  defaultValue="Brand collaboration opportunity"
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm outline-none focus:border-primary/40 transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm outline-none focus:border-primary/40 transition-all resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 rounded-xl"
                  onClick={() => setContactCreator(null)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl gap-2"
                  onClick={() => setContactCreator(null)}
                >
                  <Send className="h-4 w-4" />
                  Send message
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
