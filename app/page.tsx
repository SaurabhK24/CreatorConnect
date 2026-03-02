import SearchSection from "@/components/search-section"
import ResultsSection from "@/components/results-section"
import { Flame, ArrowRight, Users, Zap, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <Flame className="h-5 w-5 text-primary" />
            <span>CreatorConnect</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/how-it-works" className="hover:text-foreground transition-colors">How It Works</Link>
            <Link href="/creators" className="hover:text-foreground transition-colors">Browse Creators</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="font-medium">Log in</Button>
            </Link>
            <Link href="/login?tab=signup">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-medium rounded-full px-5">
                Sign up free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero-gradient pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-8 animate-in">
            <Zap className="h-3.5 w-3.5" />
            AI-powered creator discovery
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-6 animate-in animate-in-delay-1">
            Find the <span className="text-gradient">perfect creators</span>{" "}
            for your brand
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-in animate-in-delay-2">
            Connect with influential content creators who align with your brand values
            and can help you reach your target audience — instantly.
          </p>
          <div className="animate-in animate-in-delay-3">
            <SearchSection />
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-border/60 bg-white py-8 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-3 divide-x divide-border/60">
          {[
            { icon: Users, value: "10K+", label: "Verified Creators" },
            { icon: TrendingUp, value: "50+", label: "Niche Categories" },
            { icon: Flame, value: "500+", label: "Brands Connected" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 px-6 py-2">
              <Icon className="h-5 w-5 text-primary mb-1" />
              <p className="font-display text-2xl font-bold">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CREATORS GRID */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-display text-2xl font-bold">Top Creators</h2>
            <p className="text-muted-foreground text-sm mt-1">Trending this week across all platforms</p>
          </div>
          <Link href="/creators">
            <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary/80 font-medium">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <ResultsSection />
      </section>

      {/* CTA BANNER */}
      <section className="mx-6 mb-16 rounded-3xl fire-gradient p-12 text-center text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 50%, white 0%, transparent 50%)'}} />
        <div className="relative">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Ready to find your perfect creator?</h2>
          <p className="text-white/80 mb-8 text-lg">Join 500+ brands already using CreatorConnect</p>
          <Link href="/login?tab=signup">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold rounded-full px-8">
              Get started free <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-display font-semibold text-foreground">
            <Flame className="h-4 w-4 text-primary" />
            CreatorConnect
          </div>
          <p>© 2026 CreatorConnect. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/how-it-works" className="hover:text-foreground transition-colors">How It Works</Link>
            <Link href="/creators" className="hover:text-foreground transition-colors">Browse</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
