"use client"

import { Button } from "@/components/ui/button"
import { useOnboarding } from "../onboarding-provider"
import { Flame, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function WelcomeStep() {
  const { nextStep, skipOnboarding } = useOnboarding()

  return (
    <div className="p-8 md:p-12 flex flex-col items-center text-center max-h-[90vh] overflow-y-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 150 }}
        className="relative mb-6 w-28 h-28 flex items-center justify-center"
      >
        <div className="absolute inset-0 fire-gradient rounded-full blur-lg opacity-60 animate-pulse-slow" />
        <div className="relative w-24 h-24 rounded-full fire-gradient flex items-center justify-center shadow-2xl shadow-primary/20">
          <Flame className="h-12 w-12 text-white" />
        </div>
        <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-amber-300" />
        <Sparkles className="absolute -bottom-4 left-0 h-6 w-6 text-orange-400" />
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="text-4xl font-bold mb-4 tracking-tight"
      >
        Welcome to <span className="text-gradient">CreatorConnect</span>
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="text-muted-foreground mb-12 max-w-md text-lg"
      >
        Let's personalize your experience to find the perfect content creators for your brand. This will only take a
        minute!
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        className="flex flex-col sm:flex-row gap-4 w-full max-w-xs"
      >
        <Button
          onClick={nextStep}
          size="lg"
          className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105"
        >
          Get Started
        </Button>
        <Button
          onClick={skipOnboarding}
          size="lg"
          variant="ghost"
          className="rounded-full text-muted-foreground hover:bg-muted font-medium text-base transition-colors"
        >
          Skip for Now
        </Button>
      </motion.div>
    </div>
  )
}
