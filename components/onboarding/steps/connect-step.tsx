"use client"

import { Button } from "@/components/ui/button"
import { useOnboarding } from "../onboarding-provider"
import { motion } from "framer-motion"
import { MessageSquare, BookmarkPlus, Users } from "lucide-react"
import Image from "next/image"
import ProgressIndicator from "../progress-indicator"

export default function ConnectStep() {
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
          Connect with Creators
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-muted-foreground text-base"
        >
          Reach out and collaborate with creators that match your brand.
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
          alt="Creator profile demonstration"
          className="w-full h-auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <div className="text-white space-y-2">
            <h3 className="font-medium text-lg">Creator profiles</h3>
            <p className="text-sm text-white/80">
              View detailed profiles with engagement metrics, content examples, and contact options.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-5 mb-10"
      >
        <div className="flex items-start gap-3">
          <div className="mt-1 bg-primary/10 rounded-full p-2.5">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-base">Direct Messaging</h3>
            <p className="text-sm text-muted-foreground">
              Reach out to creators directly through our platform to discuss collaboration opportunities.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-1 bg-primary/10 rounded-full p-2.5">
            <BookmarkPlus className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-base">Save Favorites</h3>
            <p className="text-sm text-muted-foreground">
              Bookmark creators you're interested in to revisit later or share with your team.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-1 bg-primary/10 rounded-full p-2.5">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-base">Manage Collaborations</h3>
            <p className="text-sm text-muted-foreground">
              Track ongoing collaborations and manage your relationships with creators.
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
