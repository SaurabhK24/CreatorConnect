import CreatorCard from "./creator-card"

// Mock data for creators
const creators = [
  {
    id: 1,
    name: "Alex Morgan",
    username: "alexcreates",
    avatar: "/placeholder.svg?height=100&width=100",
    platform: "Instagram",
    followers: 125000,
    engagement: 3.2,
    categories: ["Fashion", "Lifestyle"],
    description:
      "Fashion and lifestyle content creator based in NYC. Sharing daily outfit inspirations and lifestyle tips.",
  },
  {
    id: 2,
    name: "Jamie Chen",
    username: "jamietech",
    avatar: "/placeholder.svg?height=100&width=100",
    platform: "YouTube",
    followers: 450000,
    engagement: 4.7,
    categories: ["Tech", "Reviews"],
    description: "Tech reviewer and gadget enthusiast. Bringing you the latest in consumer electronics and tech news.",
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    username: "sofiaeats",
    avatar: "/placeholder.svg?height=100&width=100",
    platform: "TikTok",
    followers: 890000,
    engagement: 8.1,
    categories: ["Food", "Cooking"],
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
    platform: "Twitch",
    followers: 180000,
    engagement: 7.2,
    categories: ["Gaming", "Entertainment"],
    description: "Variety streamer and gaming content creator. Join me for fun gameplay and community events!",
  },
]

export default function ResultsSection() {
  return (
    <section className="pb-8 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {creators.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </section>
  )
}
