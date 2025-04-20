"use client"

import { Button } from "@/components/ui/button"
import { useOnboarding } from "../onboarding-provider"
import { motion } from "framer-motion"
import { Search, Hash, AtSign } from "lucide-react"
import Image from "next/image"
import ProgressIndicator from "../progress-indicator"

export default function DiscoverStep() {
  const { nextStep, prevStep } = useOnboarding()

  return (
    <div className="p-8 md:p-10">
      <ProgressIndicator />

      <div className="mb-8">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold mb-3"
        >
          Discover Creators
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-muted-foreground text-base"
        >
          Find the perfect creators using our powerful search tools.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative rounded-xl overflow-hidden mb-8 border border-border shadow-md"
      >
        <Image
          src="/placeholder.svg?height=300&width=500"
          width={500}
          height={300}
          alt="Search demonstration"
          className="w-full h-auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <div className="text-white space-y-2">
            <h3 className="font-medium text-lg">Search by hashtag or username</h3>
            <div className="flex gap-3">
              <div className="flex items-center text-sm bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <Hash className="h-3 w-3 mr-1" />
                <span>fashion</span>
              </div>
              <div className="flex items-center text-sm bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <AtSign className="h-3 w-3 mr-1" />
                <span>creators</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4 mb-10"
      >
        <div className="flex items-start gap-3">
          <div className="mt-1 bg-primary/10 rounded-full p-2.5">
            <Search className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-base">Advanced Search</h3>
            <p className="text-sm text-muted-foreground">
              Filter by platform, follower count, engagement rate, and more to find exactly what you need.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-between"
      >
        <Button variant="ghost" onClick={prevStep} className="rounded-full text-base">
          Back
        </Button>
        <Button
          onClick={nextStep}
          className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 text-base font-medium"
        >
          Continue
        </Button>
      </motion.div>
    </div>
  )
}
