"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type OnboardingStep = "welcome" | "interests" | "goals" | "discover" | "connect" | "complete"

interface OnboardingContextType {
  isOnboarding: boolean
  currentStep: OnboardingStep
  isFirstVisit: boolean
  startOnboarding: () => void
  skipOnboarding: () => void
  nextStep: () => void
  prevStep: () => void
  completeOnboarding: () => void
  setInterests: (interests: string[]) => void
  setGoals: (goals: string[]) => void
  interests: string[]
  goals: string[]
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

const steps: OnboardingStep[] = ["welcome", "interests", "goals", "discover", "connect", "complete"]

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [isOnboarding, setIsOnboarding] = useState(false)
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome")
  const [isFirstVisit, setIsFirstVisit] = useState(true)
  const [interests, setInterests] = useState<string[]>([])
  const [goals, setGoals] = useState<string[]>([])

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem("hasVisitedBefore")
    if (!hasVisited) {
      setIsFirstVisit(true)
      setIsOnboarding(true)
      localStorage.setItem("hasVisitedBefore", "true")
    } else {
      setIsFirstVisit(false)
    }
  }, [])

  const startOnboarding = () => {
    setIsOnboarding(true)
    setCurrentStep("welcome")
  }

  const skipOnboarding = () => {
    setIsOnboarding(false)
    // Save that onboarding was completed
    localStorage.setItem("onboardingCompleted", "true")
  }

  const nextStep = () => {
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    } else {
      completeOnboarding()
    }
  }

  const prevStep = () => {
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  const completeOnboarding = () => {
    setIsOnboarding(false)
    // Save that onboarding was completed
    localStorage.setItem("onboardingCompleted", "true")
    // Save user preferences
    if (interests.length > 0) {
      localStorage.setItem("userInterests", JSON.stringify(interests))
    }
    if (goals.length > 0) {
      localStorage.setItem("userGoals", JSON.stringify(goals))
    }
  }

  return (
    <OnboardingContext.Provider
      value={{
        isOnboarding,
        currentStep,
        isFirstVisit,
        startOnboarding,
        skipOnboarding,
        nextStep,
        prevStep,
        completeOnboarding,
        setInterests,
        setGoals,
        interests,
        goals,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export const useOnboarding = () => {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}
