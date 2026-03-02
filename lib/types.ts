// lib/types.ts

/** Shape CreatorCard accepts */
export interface Creator {
  id: string | number
  name: string
  username: string
  avatar: string
  platform: string
  followers: number
  /** Already multiplied by 100 — store as percentage (3.4, not 0.034) */
  engagement: number
  categories: string[]
  description: string
  verified?: boolean
  tiktokId?: string
  bioLink?: string
  /** Hashtags that surfaced this creator (from discover endpoints) */
  discoveredVia?: string[]
}

// ─── AI endpoint types (discover-by-niche, discover-creators) ─────────────────
// These come back with a clean shaped object (uniqueId, nickname, stats.followers…)

export interface ApiTikTokCreator {
  id?: string
  uniqueId?: string
  nickname?: string
  avatarUrl?: string
  signature?: string
  verified?: boolean
  bioLink?: string
  stats?: {
    followers: number
    following: number
    hearts: number
    videos: number
  }
  engagementMetrics?: {
    engagementRate?: number
    avgLikes?: number
    avgComments?: number
    avgShares?: number
    avgViews?: number
  }
  recentVideos?: ApiAiVideo[]
  discoveredVia?: string[]
}

/** Video shape inside AI endpoint results (stats are nested under .stats) */
export interface ApiAiVideo {
  id?: string
  desc?: string
  createTime?: number
  stats?: {
    diggCount?: number
    commentCount?: number
    shareCount?: number
    playCount?: number
  }
  hashtags?: Array<{ name: string }>
  video?: { cover?: string }
  url?: string
}

// ─── Raw TikTok item (search + hashtag endpoints) ─────────────────────────────
// /api/creators/search and /api/creators/hashtag/{tag} return raw Apify objects
// with creator info nested under authorMeta

export interface ApiRawTikTokItem {
  id?: string
  desc?: string
  createTime?: number
  authorMeta?: {
    id?: string
    name?: string       // TikTok handle (@username)
    nickName?: string   // display name
    fans?: number       // follower count
    avatar?: string
    verified?: boolean
    signature?: string
    bioLink?: string
  }
  stats?: {
    likes?: number
    comments?: number
    shares?: number
    plays?: number
  }
  hashtags?: Array<{ name: string }>
  video?: { cover?: string }
  music?: { title?: string; authorName?: string }
}

// ─── Profile endpoint ─────────────────────────────────────────────────────────
// /api/creators/{id}/profile has profile.user + profile.stats nested

export interface ApiCreatorProfile {
  user: {
    id?: string
    uniqueId: string
    nickname?: string
    avatarUrl?: string
    signature?: string
    verified?: boolean
    bioLink?: string
  }
  stats?: {
    followers: number
    following: number
    hearts: number
    videos: number
  }
}

// ─── YouTube ──────────────────────────────────────────────────────────────────

export interface ApiYouTubeResult {
  title: string
  url: string
  channelName: string
  channelUrl?: string
  viewCount?: number
  likeCount?: number
  /** API returns numberOfSubscribers (not subscriberCount) */
  numberOfSubscribers?: number
  duration?: string
  /** ISO date string e.g. "2024-11-01" */
  date?: string
  description?: string
  thumbnailUrl?: string
}

// ─── Shared shapes ────────────────────────────────────────────────────────────

export interface ApiMeta {
  source?: 'apify' | 'db'
  runId?: string
  datasetId?: string
  count?: number
  queries?: string[]
  query?: string
  username?: string
  hashtag?: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  meta: ApiMeta
}

// ─── Endpoint response data shapes ────────────────────────────────────────────

export interface DiscoverByNicheData {
  niche?: string
  industry?: string
  targetAudience?: string
  contentType?: string
  creators: ApiTikTokCreator[]
  generatedHashtags: string[] | Array<{ hashtag: string; category: string; estimatedReach: string; description: string }>
  searchCriteria: Record<string, unknown>
  meta?: ApiMeta
}

export interface GenerateHashtagsData {
  niche: string
  industry?: string
  targetAudience?: string
  contentType?: string
  hashtags: Array<{
    hashtag: string
    category: 'trending' | 'niche' | 'broad'
    estimatedReach: 'high' | 'medium' | 'low'
    description: string
  }>
}

/** /api/creators/search — items are raw TikTok objects with authorMeta */
export interface SearchData {
  items: ApiRawTikTokItem[]
  run?: { id?: string; datasetId?: string }
}

/** /api/creators/hashtag/:tag — items are raw TikTok video objects */
export interface HashtagData {
  items: ApiRawTikTokItem[]
  hashtag: string
  run?: { id?: string; datasetId?: string }
}

/** /api/creators/:id/profile */
export interface CreatorProfileData {
  creatorId?: string
  profile: ApiCreatorProfile
  recentVideos: ApiRawTikTokItem[]
  engagementMetrics?: {
    engagementRate?: number
    avgLikes?: number
    avgComments?: number
    avgShares?: number
    avgViews?: number
  }
  meta?: ApiMeta
}
