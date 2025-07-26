import SearchSection from "@/components/search-section"
import ResultsSection from "@/components/results-section"
import { MoveUpRight, Flame } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import OnboardingModal from "@/components/onboarding/onboarding-modal"
import FeatureTooltip from "@/components/onboarding/feature-tooltip"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/50 to-background dark:from-background dark:to-background">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-primary/5 via-orange-500/5 to-amber-500/5 -z-10 dark:from-primary/10 dark:via-orange-500/5 dark:to-amber-500/5"></div>

      <header className="border-b border-border/40 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" />
            <span className="font-bold text-xl text-gradient">CreatorConnect</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        <div className="w-full max-w-3xl text-center mb-8 sm:mb-12 animate-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Find the <span className="text-gradient">perfect creators</span> for your brand
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with influential content creators who align with your brand values and can help you reach your
            target audience.
          </p>
        </div>

        <div className="w-full flex flex-col items-center space-y-8 sm:space-y-12">
          <div className="w-full flex justify-center">
            <SearchSection />
          </div>

          <div className="w-full max-w-6xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
                <Flame className="h-5 w-5 text-primary" />
                Top Creators
              </h2>
            </div>

            <ResultsSection />
          </div>
        </div>
      </main>

      <footer className="border-t border-border/40 py-6 sm:py-8 mt-12 bg-background/50 dark:bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 CreatorConnect. All rights reserved.</p>
        </div>
      </footer>

      <OnboardingModal />
    </div>
  )
}
