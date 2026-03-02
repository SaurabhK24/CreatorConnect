import SearchSection from "@/components/search-section"
import ResultsSection from "@/components/results-section"
import { Flame, ArrowRight, Users, Layers, Building2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import OnboardingModal from "@/components/onboarding/onboarding-modal"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/[0.07] backdrop-blur-md sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="font-bold text-xl text-gradient">CreatorConnect</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-white/10 hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400 transition-all duration-200 hidden sm:flex"
              asChild
            >
              <a href="#search">
                Get Started
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        {/* Hero section */}
        <div className="relative flex flex-col items-center pt-16 pb-12 sm:pt-24 sm:pb-16">
          {/* Background dot grid */}
          <div className="absolute inset-0 dot-grid -z-10" />
          {/* Ambient glow orb */}
          <div className="glow-orb top-0 left-1/2 -translate-x-1/2 -z-10" />

          {/* Eyebrow label */}
          <div className="flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-400 text-xs font-medium tracking-wide uppercase animate-in" style={{ animationDelay: '0ms' }}>
            <Flame className="h-3.5 w-3.5" />
            Creator Discovery Platform
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center leading-[1.1] mb-6 animate-in max-w-4xl" style={{ animationDelay: '100ms' }}>
            Find the{" "}
            <span className="text-gradient">perfect creators</span>
            <br />
            for your brand
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto text-center mb-10 animate-in leading-relaxed" style={{ animationDelay: '200ms' }}>
            Connect with influential content creators who align with your brand values and reach your target audience.
          </p>

          {/* Search */}
          <div id="search" className="w-full flex justify-center mb-10 animate-in" style={{ animationDelay: '280ms' }}>
            <SearchSection />
          </div>

          {/* Social proof chips */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 animate-in" style={{ animationDelay: '360ms' }}>
            {[
              { icon: Users, label: "2,400+ Creators" },
              { icon: Layers, label: "12 Platforms" },
              { icon: Building2, label: "500+ Brands" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Icon className="h-4 w-4 text-orange-500/70" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] mb-12" />

        {/* Top Creators */}
        <div className="pb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-semibold tracking-widest text-orange-500/80 uppercase mb-1">Trending</p>
              <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                Top Creators
              </h2>
            </div>
          </div>

          <ResultsSection />
        </div>
      </main>

      <footer className="border-t border-white/[0.06] py-8 bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CreatorConnect. All rights reserved.</p>
        </div>
      </footer>

      <OnboardingModal />
    </div>
  )
}
