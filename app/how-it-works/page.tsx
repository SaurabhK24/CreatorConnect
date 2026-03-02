import Link from "next/link"
import { Flame, Search, Users, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Describe who you need",
    description:
      "Tell our AI what you're looking for — niche, platform, location, follower range. Plain English works. We handle the rest.",
    points: ["Natural language search", "Platform filtering", "Audience demographics"],
  },
  {
    number: "02",
    icon: Users,
    title: "Browse matched creators",
    description:
      "Instantly see curated creator profiles ranked by fit. View engagement rates, audience breakdowns, and past collaborations.",
    points: ["AI-ranked matches", "Real engagement data", "Full creator profiles"],
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Connect & grow together",
    description:
      "Reach out directly, save creators to your board, and track collaboration status — all inside CreatorConnect.",
    points: ["Direct outreach tools", "Saved creator boards", "Campaign tracking"],
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <Flame className="h-5 w-5 text-primary" />
            CreatorConnect
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/login?tab=signup">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-full px-5">
                Sign up free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero-gradient pt-20 pb-16 px-6 text-center">
        <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight mb-5 animate-in">
          How it <span className="text-gradient">works</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto animate-in animate-in-delay-1">
          From idea to influencer in three simple steps. No agency fees. No spreadsheets.
        </p>
      </section>

      {/* STEPS */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="space-y-16">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-12 items-center`}
            >
              {/* Visual */}
              <div className="flex-1 flex justify-center">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-50 rounded-3xl" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-7xl font-bold text-primary/10">{step.number}</span>
                    <step.icon className="h-12 w-12 text-primary mt-2" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <span className="text-sm font-medium text-primary uppercase tracking-widest mb-3 block">Step {step.number}</span>
                <h2 className="font-display text-3xl font-bold mb-4">{step.title}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">{step.description}</p>
                <ul className="space-y-2">
                  {step.points.map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-6 mb-20 rounded-3xl fire-gradient p-12 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 30% 50%, white 0%, transparent 50%)'}} />
        <div className="relative">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-white/80 mb-8 text-lg">It takes 2 minutes to find your first creator match.</p>
          <Link href="/">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold rounded-full px-8">
              Find creators now <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
