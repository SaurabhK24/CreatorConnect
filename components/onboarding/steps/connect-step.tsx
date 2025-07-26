"use client"

import { Button } from "@/components/ui/button"
import { useOnboarding } from "../onboarding-provider"
import { motion } from "framer-motion"
import { MessageSquare, BookmarkPlus, Users, ArrowRight, Star } from "lucide-react"
import Image from "next/image"
import ProgressIndicator from "../progress-indicator"
import CreatorCard from "@/components/creator-card"

export default function ConnectStep() {
  const { nextStep, prevStep } = useOnboarding()

  const dummyCreator = {
    id: 1,
    name: "Alex Creato",
    username: "alexcreato",
    avatar: "/placeholder-user.jpg",
    platform: "instagram",
    followers: 125000,
    engagement: 4.5,
    categories: ["Fashion", "Lifestyle", "Travel"],
    description: "Creating beautiful content from around the world. Let's work together!",
  }

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
          Connect with Creators
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="text-muted-foreground text-lg max-w-lg mx-auto"
        >
          Once you find the perfect match, you can view detailed profiles and manage your collaborations.
        </motion.p>
      </div>

      <div className="flex-grow flex items-center justify-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          <CreatorCard creator={dummyCreator} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
      >
        <div className="flex flex-col items-center">
          <div className="mb-3 bg-primary/10 rounded-full p-3">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-base mb-1">Direct Messaging</h3>
          <p className="text-sm text-muted-foreground">Reach out to creators to discuss opportunities.</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="mb-3 bg-primary/10 rounded-full p-3">
            <BookmarkPlus className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-base mb-1">Save Favorites</h3>
          <p className="text-sm text-muted-foreground">Bookmark creators to revisit or share with your team.</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="mb-3 bg-primary/10 rounded-full p-3">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-base mb-1">Manage Campaigns</h3>
          <p className="text-sm text-muted-foreground">Track collaborations and manage relationships.</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, ease: "easeOut" }}
        className="flex items-center justify-between mt-10 pt-6 border-t border-border"
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
