"use client"

import { Button } from "@/components/ui/button"
import { useOnboarding } from "../onboarding-provider"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useState } from "react"
import ProgressIndicator from "../progress-indicator"

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
        staggerChildren: 0.05,
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
          What are you interested in?
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-muted-foreground text-base"
        >
          Select categories that align with your brand to help us find relevant creators.
        </motion.p>
      </div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-primary mb-4">
        Select at least one category to continue
      </motion.p>

      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-wrap gap-2 mb-10">
        {categories.map((category) => (
          <motion.div key={category} variants={item}>
            <Badge
              variant={selectedInterests.includes(category) ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all duration-200 rounded-full text-sm py-2 px-4",
                selectedInterests.includes(category)
                  ? "bg-primary/10 hover:bg-primary/20 text-primary border-primary/20"
                  : "hover:bg-muted",
              )}
              onClick={() => toggleInterest(category)}
            >
              {category}
            </Badge>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-between"
      >
        <Button variant="ghost" onClick={prevStep} className="rounded-full text-base">
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 text-base font-medium"
          disabled={selectedInterests.length === 0}
        >
          Continue
        </Button>
      </motion.div>
    </div>
  )
}
