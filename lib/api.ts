// lib/api.ts
import type {
  ApiResponse,
  DiscoverByNicheData,
  GenerateHashtagsData,
  SearchData,
  HashtagData,
  CreatorProfileData,
  ApiYouTubeResult,
  ApiTikTokCreator,
  ApiRawTikTokItem,
  Creator,
} from './types'

export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  })
  if (!res.ok) {
    let msg = `API error ${res.status}`
    try { const body = await res.json(); msg = body.detail ?? msg } catch { /* body not JSON */ }
    throw new ApiError(res.status, msg)
  }
  return res.json()
}

// ─── Normalizers ──────────────────────────────────────────────────────────────

/**
 * Maps a shaped AI-endpoint creator (discover-by-niche, discover-creators)
 * to the Creator shape CreatorCard expects.
 * Input has: uniqueId, nickname, avatarUrl, stats.followers, engagementMetrics.engagementRate
 */
export function normalizeTikTokCreator(c: ApiTikTokCreator): Creator {
  // engagementRate is a decimal (0.034) — multiply by 100 to get percentage (3.4)
  const engagement = parseFloat(((c.engagementMetrics?.engagementRate ?? 0) * 100).toFixed(2))

  return {
    id: c.uniqueId ?? c.id ?? 'unknown',
    name: c.nickname || c.uniqueId || 'Unknown Creator',
    username: c.uniqueId ?? c.id ?? 'unknown',
    avatar: c.avatarUrl ?? '',
    platform: 'TikTok',
    followers: c.stats?.followers ?? 0,
    engagement,
    categories: [],
    description: c.signature ?? '',
    verified: c.verified,
    tiktokId: c.uniqueId,
    bioLink: c.bioLink,
    discoveredVia: c.discoveredVia,
  }
}

/**
 * Maps a raw TikTok item from /api/creators/search or /api/creators/hashtag/{tag}
 * Input has: authorMeta.name/nickName/fans/avatar, stats.likes/plays
 */
export function normalizeRawTikTokItem(item: ApiRawTikTokItem): Creator {
  const a = item.authorMeta ?? {}
  return {
    id: a.id ?? a.name ?? 'unknown',
    name: a.nickName || a.name || 'Unknown Creator',
    username: a.name ?? 'unknown',
    avatar: a.avatar ?? '',
    platform: 'TikTok',
    followers: a.fans ?? 0,
    // Raw items don't have engagementRate — derive from stats if available
    engagement: 0,
    categories: [],
    description: a.signature ?? item.desc ?? '',
    verified: a.verified,
    tiktokId: a.name,
    bioLink: a.bioLink,
  }
}

/**
 * De-duplicates raw TikTok items by authorMeta.id (same creator, multiple videos)
 * Returns one Creator per unique author, keeping the most-followed version.
 */
export function dedupeRawItems(items: ApiRawTikTokItem[]): Creator[] {
  const seen = new Map<string, Creator>()
  for (const item of items) {
    const key = item.authorMeta?.id ?? item.authorMeta?.name ?? Math.random().toString()
    const creator = normalizeRawTikTokItem(item)
    const existing = seen.get(key)
    if (!existing || creator.followers > existing.followers) {
      seen.set(key, creator)
    }
  }
  return Array.from(seen.values())
}

/** Maps a YouTube result → Creator shape */
export function normalizeYouTubeCreator(c: ApiYouTubeResult, _index: number): Creator {
  return {
    id: c.channelUrl ?? `yt-${encodeURIComponent(c.channelName)}`,
    name: c.channelName,
    username: c.channelName,
    avatar: c.thumbnailUrl ?? '',
    platform: 'YouTube',
    followers: c.numberOfSubscribers ?? 0,
    engagement: 0,
    categories: [],
    description: c.title ?? '',
  }
}

// ─── Health check ─────────────────────────────────────────────────────────────

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/ping`, { signal: AbortSignal.timeout(3000) })
    return res.ok
  } catch {
    return false
  }
}

// ─── AI endpoints ─────────────────────────────────────────────────────────────

/** POST /api/ai/generate-hashtags — GPT-4o hashtag suggestions for a niche */
export async function generateHashtags(params: {
  niche: string
  industry?: string
  targetAudience?: string
  contentType?: string
  count?: number
}): Promise<GenerateHashtagsData> {
  const res = await apiFetch<GenerateHashtagsData>('/api/ai/generate-hashtags', {
    method: 'POST',
    body: JSON.stringify(params),
  })
  return res.data
}

/** POST /api/ai/discover-by-niche — GPT hashtags → Apify scrape in one call */
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

/** POST /api/ai/discover-creators — scrape TikTok from a list of hashtags */
export async function discoverCreators(params: {
  hashtags: string[]
  maxCreators?: number
  minFollowers?: number
}): Promise<{ creators: ApiTikTokCreator[] }> {
  const res = await apiFetch<{ creators: ApiTikTokCreator[] }>('/api/ai/discover-creators', {
    method: 'POST',
    body: JSON.stringify(params),
  })
  return res.data
}

// ─── Cached TikTok endpoints ──────────────────────────────────────────────────

/** GET /api/creators/search — keyword search (DB cached) */
export async function searchCreators(params: {
  query: string
  resultsPerPage?: number
  searchSection?: string
  maxProfilesPerQuery?: number
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
  if (params.searchSection) qs.set('searchSection', params.searchSection)
  if (params.maxProfilesPerQuery) qs.set('maxProfilesPerQuery', String(params.maxProfilesPerQuery))
  const res = await apiFetch<SearchData>(`/api/creators/search?${qs}`)
  return res.data
}

/** GET /api/creators/hashtag/:tag — hashtag videos (DB cached). Strip # from tag. */
export async function searchByHashtag(hashtag: string, resultsPerPage = 30): Promise<HashtagData> {
  const tag = hashtag.replace(/^#/, '')
  const res = await apiFetch<HashtagData>(
    `/api/creators/hashtag/${encodeURIComponent(tag)}?resultsPerPage=${resultsPerPage}`,
  )
  return res.data
}

/** GET /api/creators/:id/profile — full profile + recent videos (DB cached) */
export async function getCreatorProfile(username: string, signal?: AbortSignal): Promise<CreatorProfileData> {
  const res = await apiFetch<CreatorProfileData>(
    `/api/creators/${encodeURIComponent(username)}/profile`,
    signal ? { signal } : undefined,
  )
  return res.data
}

// ─── YouTube endpoints ────────────────────────────────────────────────────────

/** GET /api/youtube/search/:query */
export async function searchYouTube(query: string, maxResults = 20): Promise<ApiYouTubeResult[]> {
  const res = await apiFetch<ApiYouTubeResult[]>(
    `/api/youtube/search/${encodeURIComponent(query)}?maxResults=${maxResults}`,
  )
  return res.data
}

// ─── Re-fetch by datasetId ────────────────────────────────────────────────────

/** Re-fetch any previous TikTok Apify run without re-running the scraper */
export async function refetchTikTokDataset(datasetId: string): Promise<ApiRawTikTokItem[]> {
  const res = await apiFetch<ApiRawTikTokItem[]>(`/api/apify/dataset/${datasetId}`)
  return res.data
}

/** Re-fetch any previous YouTube actor run without re-running the scraper */
export async function refetchYouTubeDataset(datasetId: string): Promise<ApiYouTubeResult[]> {
  const res = await apiFetch<ApiYouTubeResult[]>(`/api/youtube/dataset/${datasetId}`)
  return res.data
}
