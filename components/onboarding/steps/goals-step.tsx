"use client"

import { Button } from "@/components/ui/button"
import { useOnboarding } from "../onboarding-provider"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Check } from "lucide-react"
import ProgressIndicator from "../progress-indicator"

const goalOptions = [
  {
    id: "brand-awareness",
    title: "Brand Awareness",
    description: "Increase visibility and recognition for your brand",
  },
  {
    id: "product-launch",
    title: "Product Launch",
    description: "Promote a new product or service to the market",
  },
  {
    id: "content-creation",
    title: "Content Creation",
    description: "Get high-quality content created for your brand",
  },
  {
    id: "sales-conversion",
    title: "Sales & Conversion",
    description: "Drive direct sales and conversions",
  },
  {
    id: "community-building",
    title: "Community Building",
    description: "Build an engaged community around your brand",
  },
  {
    id: "industry-authority",
    title: "Industry Authority",
    description: "Establish your brand as an authority in your industry",
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

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
          What are your goals?
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-muted-foreground text-base"
        >
          Select what you're looking to achieve with creator collaborations.
        </motion.p>
      </div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-primary mb-4">
        Select at least one goal to continue
      </motion.p>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
      >
        {goalOptions.map((goal) => (
          <motion.div key={goal.id} variants={item}>
            <div
              className={cn(
                "border rounded-xl p-4 cursor-pointer transition-all duration-200",
                selectedGoals.includes(goal.id)
                  ? "border-primary bg-primary/5 hover:bg-primary/10"
                  : "border-border hover:border-primary/20 hover:bg-muted/50",
              )}
              onClick={() => toggleGoal(goal.id)}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "mt-0.5 w-5 h-5 rounded-full flex items-center justify-center border transition-colors",
                    selectedGoals.includes(goal.id)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground",
                  )}
                >
                  {selectedGoals.includes(goal.id) && <Check className="h-3 w-3" />}
                </div>
                <div>
                  <h3 className="font-medium text-base">{goal.title}</h3>
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-between"
      >
        <Button variant="ghost" onClick={prevStep} className="rounded-full text-base">
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 text-base font-medium"
          disabled={selectedGoals.length === 0}
        >
          Continue
        </Button>
      </motion.div>
    </div>
  )
}
