"use client"

import { useOnboarding } from "./onboarding-provider"
import { cn } from "@/lib/utils"

export default function ProgressIndicator() {
  const { currentStep } = useOnboarding()

  const steps = ["welcome", "interests", "goals", "discover", "connect", "complete"]
  const currentIndex = steps.indexOf(currentStep)

  // We don't show progress on welcome and complete steps
  if (currentStep === "welcome" || currentStep === "complete") {
    return null
  }

  return (
    <div className="w-full flex justify-center mb-6">
      <div className="flex gap-2">
        {steps.slice(1, -1).map((step, index) => {
          // Add 1 because we're skipping the welcome step (index 0)
          const stepIndex = index + 1
          const isActive = stepIndex <= currentIndex
          const isCurrent = stepIndex === currentIndex

          return (
            <div
              key={step}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                isActive ? "bg-primary w-8" : "bg-muted w-6",
                isCurrent && "scale-110",
              )}
              aria-current={isCurrent ? "step" : undefined}
            />
          )
        })}
      </div>
    </div>
  )
}
