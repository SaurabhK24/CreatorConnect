"use client"

import { Button } from "@/components/ui/button"
import { useOnboarding } from "../onboarding-provider"
import { Flame } from "lucide-react"
import { motion } from "framer-motion"

export default function WelcomeStep() {
  const { nextStep, skipOnboarding } = useOnboarding()

  return (
    <div className="p-8 md:p-10 flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8 w-24 h-24 rounded-full fire-gradient flex items-center justify-center shadow-lg"
      >
        <Flame className="h-12 w-12 text-white" />
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl font-bold mb-3"
      >
        Welcome to <span className="text-gradient">CreatorConnect</span>
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-muted-foreground mb-10 max-w-md text-base"
      >
        Let's set up your experience to help you find the perfect content creators for your brand. This will only take a
        minute!
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-md mx-auto"
      >
        <Button
          onClick={nextStep}
          className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 py-6 h-auto text-base font-medium"
        >
          Get Started
        </Button>
        <Button
          onClick={skipOnboarding}
          variant="outline"
          className="rounded-full border-border hover:bg-muted px-8 py-6 h-auto text-base"
        >
          Skip for Now
        </Button>
      </motion.div>
    </div>
  )
}
