"use client"

import { Button } from "@/components/ui/button"
import { useOnboarding } from "../onboarding-provider"
import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight, Sparkles, Target, Star } from "lucide-react"
import confetti from "canvas-confetti"
import { useEffect } from "react"
import { Badge } from "@/components/ui/badge"

export default function CompleteStep() {
  const { completeOnboarding, interests, goals } = useOnboarding()

  useEffect(() => {
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) return clearInterval(interval)

      const particleCount = 50 * (timeLeft / duration)
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
    }, 250)
  }, [])

  return (
    <div className="p-8 md:p-12 flex flex-col items-center text-center max-h-[90vh] overflow-y-auto">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 120 }}
        className="relative mb-6 w-28 h-28 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-30 animate-pulse-slow" />
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center shadow-2xl shadow-green-500/20">
          <CheckCircle2 className="h-12 w-12 text-white" />
        </div>
        <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-300" />
        <Sparkles className="absolute -bottom-4 left-0 h-6 w-6 text-green-300" />
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="text-4xl font-bold mb-4 tracking-tight"
      >
        You're all set!
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="text-muted-foreground mb-10 max-w-md text-lg"
      >
        Your preferences are saved. We've personalized your experience to help you find the perfect creators.
      </motion.p>

      {(interests.length > 0 || goals.length > 0) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="mb-10 w-full max-w-lg mx-auto bg-muted/50 rounded-2xl p-6 text-left shadow-sm border border-border/50"
        >
          {interests.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-3 flex items-center text-muted-foreground">
                <Target className="h-4 w-4 mr-2" />
                Your Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {goals.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center text-muted-foreground">
                <Star className="h-4 w-4 mr-2" />
                Your Goals
              </h3>
              <div className="flex flex-wrap gap-2">
                {goals.map((goal) => (
                  <Badge key={goal} variant="secondary">
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        className="w-full"
      >
        <Button
          onClick={completeOnboarding}
          size="lg"
          className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 font-semibold w-full max-w-xs text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105"
        >
          Start Exploring <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  )
}
