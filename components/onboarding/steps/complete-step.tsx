"use client"

import { Button } from "@/components/ui/button"
import { useOnboarding } from "../onboarding-provider"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import confetti from "canvas-confetti"
import { useEffect } from "react"

export default function CompleteStep() {
  const { completeOnboarding, interests, goals } = useOnboarding()

  useEffect(() => {
    // Trigger confetti effect when this step is shown
    const duration = 2000
    const end = Date.now() + duration

    const colors = ["#ff5e3a", "#ff9500", "#ffcc00"]

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }, [])

  return (
    <div className="p-8 md:p-10 flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8 w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center"
      >
        <CheckCircle2 className="h-12 w-12 text-primary" />
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl font-bold mb-3"
      >
        You're all set!
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-muted-foreground mb-8 max-w-md text-base"
      >
        Your preferences have been saved. We've personalized your experience based on your interests and goals.
      </motion.p>

      {(interests.length > 0 || goals.length > 0) && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-10 w-full max-w-md mx-auto bg-muted/50 rounded-xl p-6 text-left shadow-sm"
        >
          {interests.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Your Interests:</h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span key={interest} className="text-xs bg-background rounded-full px-3 py-1.5 border border-border">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {goals.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Your Goals:</h3>
              <div className="flex flex-wrap gap-2">
                {goals.map((goal) => (
                  <span key={goal} className="text-xs bg-background rounded-full px-3 py-1.5 border border-border">
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full"
      >
        <Button
          onClick={completeOnboarding}
          className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 py-6 h-auto w-full max-w-xs text-base font-medium"
        >
          Start Exploring
        </Button>
      </motion.div>
    </div>
  )
}
