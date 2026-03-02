import CreatorCard from "./creator-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const creators = [
  {
    id: 1,
    name: "Alex Morgan",
    username: "alexcreates",
    avatar: "/placeholder.svg?height=100&width=100",
    platform: "Instagram",
    followers: 125000,
    engagement: 3.2,
    categories: ["Fashion", "Lifestyle"],
    description: "Fashion and lifestyle content creator based in NYC. Sharing daily outfit inspirations and lifestyle tips.",
  },
  {
    id: 2,
    name: "Jamie Chen",
    username: "miachen",
    avatar: "/placeholder.svg?height=100&width=100",
    platform: "youtube",
    followers: 550000,
    engagement: 6.8,
    categories: ["Tech", "Reviews"],
    description: "Tech reviewer and gadget enthusiast. Bringing you the latest in consumer electronics and tech news.",
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    username: "liabenson",
    avatar: "/placeholder.svg?height=100&width=100",
    platform: "tiktok",
    followers: 890000,
    engagement: 14.2,
    categories: ["Comedy", "Lifestyle"],
    description: "Sharing quick and easy recipes for busy people. Making cooking fun and accessible for everyone!",
  },
  {
    id: 4,
    name: "Marcus Johnson",
    username: "marcusfitness",
    avatar: "/placeholder.svg?height=100&width=100",
    platform: "Instagram",
    followers: 320000,
    engagement: 5.4,
    categories: ["Fitness", "Health"],
    description: "Personal trainer sharing workout tips and nutrition advice. Helping you achieve your fitness goals!",
  },
  {
    id: 5,
    name: "Priya Patel",
    username: "priyatravels",
    avatar: "/placeholder.svg?height=100&width=100",
    platform: "Instagram",
    followers: 215000,
    engagement: 4.8,
    categories: ["Travel", "Photography"],
    description: "Travel photographer documenting beautiful destinations. Inspiring wanderlust and adventure!",
  },
  {
    id: 6,
    name: "David Kim",
    username: "davidgames",
    avatar: "/placeholder.svg?height=100&width=100",
    platform: "twitch",
    followers: 180000,
    engagement: 7.2,
    categories: ["Gaming", "Entertainment"],
    description: "Variety streamer and gaming content creator. Join me for fun gameplay and community events!",
  },
]

export default function ResultsSection() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {creators.slice(0, 3).map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="/creators" passHref>
          <Button
            variant="outline"
            className="rounded-full border-white/10 hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-400 text-muted-foreground transition-all duration-200 gap-2"
          >
            View all creators
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
