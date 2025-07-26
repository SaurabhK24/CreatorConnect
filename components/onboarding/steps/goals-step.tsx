"use client"

import { Button } from "@/components/ui/button"
import { useOnboarding } from "../onboarding-provider"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Check, Target, Zap, Megaphone, Star, Users, Award } from "lucide-react"
import ProgressIndicator from "../progress-indicator"

const goalOptions = [
  {
    id: "brand-awareness",
    title: "Brand Awareness",
    description: "Increase visibility and recognition",
    icon: <Target className="h-5 w-5" />,
  },
  {
    id: "product-launch",
    title: "Product Launch",
    description: "Promote a new product or service",
    icon: <Megaphone className="h-5 w-5" />,
  },
  {
    id: "content-creation",
    title: "Content Creation",
    description: "Source high-quality, unique content",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    id: "sales-conversion",
    title: "Sales & Conversion",
    description: "Drive direct sales and conversions",
    icon: <Star className="h-5 w-5" />,
  },
  {
    id: "community-building",
    title: "Community Building",
    description: "Grow an engaged, loyal following",
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: "industry-authority",
    title: "Industry Authority",
    description: "Become a leader in your niche",
    icon: <Award className="h-5 w-5" />,
  },
]

export default function GoalsStep() {
  const { nextStep, prevStep, goals, setGoals } = useOnboarding()
  const [selectedGoals, setSelectedGoals] = useState<string[]>(goals)

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) => (prev.includes(goalId) ? prev.filter((i) => i !== goalId) : [...prev, goalId]))
  }

  const handleNext = () => {
    setGoals(selectedGoals)
    nextStep()
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 20 } },
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
          What are your campaign goals?
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="text-muted-foreground text-lg max-w-md mx-auto"
        >
          Select what you hope to achieve with creator collaborations.
        </motion.p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
      >
        {goalOptions.map((goal) => (
          <motion.div key={goal.id} variants={item}>
            <button
              onClick={() => toggleGoal(goal.id)}
              className={cn(
                "w-full h-full text-left rounded-2xl border p-5 transition-all duration-200 relative overflow-hidden group outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                selectedGoals.includes(goal.id)
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/30 hover:bg-muted/50",
              )}
            >
              <div
                className={cn(
                  "absolute -top-3 -right-3 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center transition-all duration-300 transform scale-0 group-hover:scale-100",
                  selectedGoals.includes(goal.id) ? "scale-100" : "",
                )}
              >
                <Check className="h-6 w-6" />
              </div>
              <div className="flex flex-col h-full">
                <div className="mb-3 text-primary">{goal.icon}</div>
                <h3 className="font-semibold text-base mb-1">{goal.title}</h3>
                <p className="text-sm text-muted-foreground flex-grow">{goal.description}</p>
              </div>
            </button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, ease: "easeOut" }}
        className="flex items-center justify-between pt-6 border-t border-border"
      >
        <Button variant="ghost" onClick={prevStep} className="rounded-full text-base font-medium">
          Back
        </Button>
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">{selectedGoals.length} selected</p>
          <Button
            onClick={handleNext}
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105"
            disabled={selectedGoals.length === 0}
          >
            Continue
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
