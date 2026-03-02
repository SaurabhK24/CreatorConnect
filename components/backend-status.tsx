"use client"

import { useEffect, useState } from "react"
import { checkHealth } from "@/lib/api"

type Status = "checking" | "online" | "offline"

export default function BackendStatus() {
  const [status, setStatus] = useState<Status>("checking")

  useEffect(() => {
    checkHealth().then((ok) => setStatus(ok ? "online" : "offline"))
  }, [])

  if (status === "checking") return null

  if (status === "offline") {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/25 backdrop-blur-sm shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-none" />
        <span className="text-red-400 text-xs font-medium">Backend offline</span>
        <span className="text-white/25 text-xs">— start Docker first</span>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-500/8 border border-green-500/20 backdrop-blur-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-none" />
      <span className="text-green-400 text-xs font-medium">API connected</span>
    </div>
  )
}
