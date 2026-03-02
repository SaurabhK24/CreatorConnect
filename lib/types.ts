// lib/types.ts

/** Shape CreatorCard accepts */
export interface Creator {
  id: string | number
  name: string
  username: string
  avatar: string
  platform: string
  followers: number
  engagement: number
  categories: string[]
  description: string
  verified?: boolean
  tiktokId?: string
  bioLink?: string
}

/** Raw TikTok creator from API (discover-by-niche, discover-creators) */
export interface ApiTikTokCreator {
  id: string
  uniqueId: string
  nickname: string
  avatarUrl: string
  signature: string
  verified: boolean
  bioLink?: string
  stats: {
    followers: number
    following: number
    hearts: number
    videos: number
  }
  engagementMetrics?: {
    engagementRate?: number
    averageLikes?: number
    averageComments?: number
    averageShares?: number
    averageViews?: number
  }
  recentVideos?: ApiVideo[]
  discoveredVia?: string[]
}

export interface ApiVideo {
  id: string
  url?: string
  desc?: string
  playCount?: number
  diggCount?: number
  commentCount?: number
  shareCount?: number
  createTime?: number
}

/** Raw YouTube result from /api/youtube/search */
export interface ApiYouTubeResult {
  title: string
  url: string
  channelName: string
  channelUrl?: string
  viewCount?: number
  likeCount?: number
  subscriberCount?: number
  duration?: string
  publishedDate?: string
}

/** Apify run metadata included in every response */
export interface ApiMeta {
  source?: 'apify' | 'db'
  runId?: string
  datasetId?: string
  count?: number
  queries?: string[]
}

/** Standard API envelope */
export interface ApiResponse<T> {
  success: boolean
  data: T
  meta: ApiMeta
}

/** POST /api/ai/discover-by-niche response data */
export interface DiscoverByNicheData {
  creators: ApiTikTokCreator[]
  generatedHashtags: Array<{
    hashtag: string
    category: string
    estimatedReach: string
    description: string
  }>
  searchCriteria: Record<string, unknown>
}

/** GET /api/creators/search response data */
export interface SearchData {
  items: ApiTikTokCreator[]
  run?: Record<string, unknown>
}

/** GET /api/creators/hashtag/:tag response data */
export interface HashtagData {
  items: ApiTikTokCreator[]
  hashtag: string
  run?: Record<string, unknown>
}

/** GET /api/creators/:id/profile response data */
export interface CreatorProfileData {
  profile: ApiTikTokCreator
  recentVideos: ApiVideo[]
  engagementMetrics: ApiTikTokCreator['engagementMetrics']
  meta: ApiMeta
}
