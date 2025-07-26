"use client"

import { Button } from "@/components/ui/button"
import { useOnboarding } from "../onboarding-provider"
import { motion } from "framer-motion"
import { Search, Hash, AtSign, ArrowRight, Filter } from "lucide-react"
import Image from "next/image"
import ProgressIndicator from "../progress-indicator"

export default function DiscoverStep() {
  const { nextStep, prevStep } = useOnboarding()

  return (
    <div className="p-8 md:p-10 flex flex-col max-h-[90vh] overflow-y-auto">
      <ProgressIndicator />

      <div className="text-center mb-8">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-3xl font-bold mb-3 tracking-tight"
        >
          How to Discover Creators
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="text-muted-foreground text-lg max-w-lg mx-auto"
        >
          Our powerful search tools help you find the perfect creators for your brand in just a few clicks.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="relative rounded-2xl overflow-hidden mb-8 border border-border/50 shadow-lg bg-card"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
            <Search className="h-4 w-4" />
            <span>Search by Hashtag or Username</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-grow relative">
              <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="#fashion, #tech, #fitness"
                className="w-full bg-background border border-border rounded-full h-12 pl-12 pr-4"
                disabled
              />
            </div>
            <div className="flex-grow relative">
              <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="@creatorname"
                className="w-full bg-background border border-border rounded-full h-12 pl-12 pr-4"
                disabled
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="space-y-4 mb-10 text-center"
      >
        <div className="inline-flex items-center justify-center gap-2 text-primary bg-primary/10 rounded-full px-4 py-2 mb-2">
          <Filter className="h-4 w-4" />
          <span className="font-medium text-sm">Advanced Filtering</span>
        </div>
        <p className="text-muted-foreground max-w-md mx-auto">
          Refine your search by platform, follower count, engagement rate, and more to find exactly what you need.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, ease: "easeOut" }}
        className="flex items-center justify-between mt-auto pt-6 border-t border-border"
      >
        <Button variant="ghost" onClick={prevStep} className="rounded-full text-base font-medium">
          Back
        </Button>
        <Button
          onClick={nextStep}
          className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105"
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  )
}
