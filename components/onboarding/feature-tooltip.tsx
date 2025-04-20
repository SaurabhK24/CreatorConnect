"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FeatureTooltipProps {
  id: string
  title: string
  description: string
  position?: "top" | "bottom" | "left" | "right"
  children: React.ReactNode
}

export default function FeatureTooltip({ id, title, description, position = "bottom", children }: FeatureTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if this tooltip has been dismissed before
    const dismissed = localStorage.getItem(`tooltip-${id}-dismissed`)
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    // Show tooltip after a delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [id])

  const dismissTooltip = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem(`tooltip-${id}-dismissed`, "true")
  }

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full mb-3"
      case "bottom":
        return "top-full mt-3"
      case "left":
        return "right-full mr-3"
      case "right":
        return "left-full ml-3"
      default:
        return "top-full mt-3"
    }
  }

  const getArrowClass = () => {
    switch (position) {
      case "top":
        return "bottom-[-6px] left-1/2 -translate-x-1/2 border-t-card border-l-transparent border-r-transparent border-b-transparent"
      case "bottom":
        return "top-[-6px] left-1/2 -translate-x-1/2 border-b-card border-l-transparent border-r-transparent border-t-transparent"
      case "left":
        return "right-[-6px] top-1/2 -translate-y-1/2 border-l-card border-t-transparent border-b-transparent border-r-transparent"
      case "right":
        return "left-[-6px] top-1/2 -translate-y-1/2 border-r-card border-t-transparent border-b-transparent border-l-transparent"
      default:
        return "top-[-6px] left-1/2 -translate-x-1/2 border-b-card border-l-transparent border-r-transparent border-t-transparent"
    }
  }

  return (
    <div className="relative inline-block">
      {children}

      <AnimatePresence>
        {isVisible && !isDismissed && (
          <motion.div
            initial={{
              opacity: 0,
              y: position === "top" ? -10 : position === "bottom" ? 10 : 0,
              x: position === "left" ? -10 : position === "right" ? 10 : 0,
            }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{
              opacity: 0,
              y: position === "top" ? -10 : position === "bottom" ? 10 : 0,
              x: position === "left" ? -10 : position === "right" ? 10 : 0,
            }}
            className={`absolute z-50 w-72 ${getPositionClasses()}`}
          >
            <div className="relative">
              <div className="absolute w-3 h-3 border-[6px] rotate-45 z-[-1] ${getArrowClass()}"></div>
              <div className="bg-card border border-border rounded-xl p-4 shadow-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-base">{title}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 rounded-full -mr-1 -mt-1"
                    onClick={dismissTooltip}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
