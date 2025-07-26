"use client"

import { Button } from "@/components/ui/button"
import { useOnboarding } from "../onboarding-provider"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useState } from "react"
import ProgressIndicator from "../progress-indicator"
import { Check } from "lucide-react"

const categories = [
  "Fashion",
  "Beauty",
  "Fitness",
  "Food",
  "Travel",
  "Tech",
  "Gaming",
  "Lifestyle",
  "Business",
  "Education",
  "Music",
  "Art",
  "Photography",
  "DIY",
  "Parenting",
  "Finance",
  "Health",
  "Sports",
]

export default function InterestsStep() {
  const { nextStep, prevStep, interests, setInterests } = useOnboarding()
  const [selectedInterests, setSelectedInterests] = useState<string[]>(interests)

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  const handleNext = () => {
    setInterests(selectedInterests)
    nextStep()
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        type: "spring" as const, 
        stiffness: 300, 
        damping: 20 
      } 
    },
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
          What are your interests?
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="text-muted-foreground text-lg max-w-md mx-auto"
        >
          Select categories that align with your brand to find relevant creators.
        </motion.p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-grow flex flex-wrap gap-3 justify-center content-center mb-8"
      >
        {categories.map((category) => (
          <motion.div key={category} variants={item}>
            <button
              onClick={() => toggleInterest(category)}
              className={cn(
                "group relative rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                selectedInterests.includes(category)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background hover:bg-muted border-border",
              )}
            >
              <span
                className={cn(
                  "absolute left-2.5 top-1/2 -translate-y-1/2 transition-all duration-200",
                  selectedInterests.includes(category)
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-50 -translate-x-2",
                )}
              >
                <Check className="h-4 w-4" />
              </span>
              <span
                className={cn(
                  "transition-all duration-200",
                  selectedInterests.includes(category) ? "pl-5" : "pl-0",
                )}
              >
                {category}
              </span>
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
          <p className="text-sm text-muted-foreground">{selectedInterests.length} selected</p>
          <Button
            onClick={handleNext}
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105"
            disabled={selectedInterests.length === 0}
          >
            Continue
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
