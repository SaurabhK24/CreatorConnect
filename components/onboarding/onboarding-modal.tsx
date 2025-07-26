"use client"

import { useOnboarding } from "./onboarding-provider"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import WelcomeStep from "./steps/welcome-step"
import InterestsStep from "./steps/interests-step"
import GoalsStep from "./steps/goals-step"
import DiscoverStep from "./steps/discover-step"
import ConnectStep from "./steps/connect-step"
import CompleteStep from "./steps/complete-step"
import { AnimatePresence, motion } from "framer-motion"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export default function OnboardingModal() {
  const { isOnboarding, currentStep } = useOnboarding()

  if (!isOnboarding) return null

  const renderStep = () => {
    switch (currentStep) {
      case "welcome":
        return <WelcomeStep />
      case "interests":
        return <InterestsStep />
      case "goals":
        return <GoalsStep />
      case "discover":
        return <DiscoverStep />
      case "connect":
        return <ConnectStep />
      case "complete":
        return <CompleteStep />
      default:
        return <WelcomeStep />
    }
  }

  return (
    <Dialog open={isOnboarding} modal>
      <DialogContent className="sm:max-w-[650px] p-0 rounded-3xl border-border/50 bg-card/95 backdrop-blur-xl overflow-hidden">
        <DialogTitle asChild>
          <VisuallyHidden>Onboarding</VisuallyHidden>
        </DialogTitle>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col h-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
