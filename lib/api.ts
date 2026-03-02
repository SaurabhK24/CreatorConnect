// lib/api.ts
import type {
  ApiResponse,
  DiscoverByNicheData,
  SearchData,
  HashtagData,
  CreatorProfileData,
  ApiYouTubeResult,
  Creator,
  ApiTikTokCreator,
} from './types'

export const API_BASE = 'http://localhost:8000'

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  })
  if (!res.ok) {
    let msg = `API error ${res.status}`
    try { const body = await res.json(); msg = body.detail ?? msg } catch {}
    throw new ApiError(res.status, msg)
  }
  return res.json()
}

// ─── Normalizers ──────────────────────────────────────────────────────────────

/** Maps a raw TikTok API creator → the shape CreatorCard expects */
export function normalizeTikTokCreator(c: ApiTikTokCreator): Creator {
  return {
    id: c.uniqueId ?? c.id,
    name: c.nickname || c.uniqueId,
    username: c.uniqueId,
    avatar: c.avatarUrl ?? '',
    platform: 'TikTok',
    followers: c.stats?.followers ?? 0,
    engagement: c.engagementMetrics?.engagementRate
      ? Math.round(c.engagementMetrics.engagementRate * 100) / 100
      : 0,
    categories: [],
    description: c.signature ?? '',
    verified: c.verified,
    tiktokId: c.uniqueId,
    bioLink: c.bioLink,
  }
}

/** Maps a raw YouTube result → Creator shape (for mixed-platform display) */
export function normalizeYouTubeCreator(c: ApiYouTubeResult, index: number): Creator {
  return {
    id: `yt-${index}`,
    name: c.channelName,
    username: c.channelName,
    avatar: '',
    platform: 'YouTube',
    followers: c.subscriberCount ?? 0,
    engagement: 0,
    categories: [],
    description: c.title ?? '',
  }
}

// ─── API calls ────────────────────────────────────────────────────────────────

/** POST /api/ai/discover-by-niche — full pipeline: GPT hashtags → Apify scrape */
export async function discoverByNiche(params: {
  niche: string
  industry?: string
  targetAudience?: string
  contentType?: string
  hashtagCount?: number
  maxCreators?: number
  minFollowers?: number
}): Promise<DiscoverByNicheData> {
  const res = await apiFetch<DiscoverByNicheData>('/api/ai/discover-by-niche', {
    method: 'POST',
    body: JSON.stringify(params),
  })
  return res.data
}

/** GET /api/creators/search — keyword search with DB cache */
export async function searchCreators(params: {
  query: string
  resultsPerPage?: number
  sortBy?: string
  sortOrder?: string
  page?: number
}): Promise<SearchData> {
  const qs = new URLSearchParams({
    query: params.query,
    resultsPerPage: String(params.resultsPerPage ?? 20),
    sortBy: params.sortBy ?? 'followers',
    sortOrder: params.sortOrder ?? 'desc',
    page: String(params.page ?? 1),
  })
  const res = await apiFetch<SearchData>(`/api/creators/search?${qs}`)
  return res.data
}

/** GET /api/creators/hashtag/:tag — hashtag scrape with DB cache */
export async function searchByHashtag(hashtag: string, resultsPerPage = 30): Promise<HashtagData> {
  // Strip leading # for path segment
  const tag = hashtag.replace(/^#/, '')
  const res = await apiFetch<HashtagData>(
    `/api/creators/hashtag/${encodeURIComponent(tag)}?resultsPerPage=${resultsPerPage}`,
  )
  return res.data
}

/** GET /api/creators/:id/profile — creator profile + recent videos with DB cache */
export async function getCreatorProfile(username: string): Promise<CreatorProfileData> {
  const res = await apiFetch<CreatorProfileData>(
    `/api/creators/${encodeURIComponent(username)}/profile`,
  )
  return res.data
}

/** GET /api/youtube/search/:query — YouTube creator/channel search */
export async function searchYouTube(query: string, maxResults = 20) {
  const res = await apiFetch<{ items: ApiYouTubeResult[] }>(
    `/api/youtube/search/${encodeURIComponent(query)}?maxResults=${maxResults}`,
  )
  return res.data
}

export { ApiError }
