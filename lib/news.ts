export type NewsMediaType = "image" | "video"

export type NewsItem = {
	id: number
	/** ISO date YYYY-MM-DD */
	date: string
	slug: string
	title: string
	/** Article body  */
	content: string
	author?: string
	mediaType?: NewsMediaType
	/** Image path, or YouTube / LinkedIn embed URL */
	mediaUrl?: string
	mediaAlt?: string
}

/** Lightweight card payload for the news index (no full body). */
export type NewsListItem = {
	id: number
	date: string
	slug: string
	title: string
	author?: string
	mediaType?: NewsMediaType
	mediaUrl?: string
	mediaAlt?: string
	excerpt: string
}

export type NewsInput = {
	date: string
	slug: string
	title: string
	content: string
	author?: string
	mediaType?: NewsMediaType
	mediaUrl?: string
	mediaAlt?: string
}

export const NEWS_PAGE_SIZE = 8

export function toNewsListItem(item: NewsItem, excerptLength = 180): NewsListItem {
	return {
		id: item.id,
		date: item.date,
		slug: item.slug,
		title: item.title,
		author: item.author,
		mediaType: item.mediaType,
		mediaUrl: item.mediaUrl,
		mediaAlt: item.mediaAlt,
		excerpt: getNewsExcerpt(item.content, excerptLength),
	}
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function isNewsMediaType(value: unknown): value is NewsMediaType {
	return value === "image" || value === "video"
}

export type VideoEmbedProvider = "youtube" | "linkedin" | "unknown"

/** Pull src from a pasted iframe snippet when present. */
function extractIframeSrc(raw: string): string | null {
	const match = raw.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i)
	return match?.[1]?.trim() || null
}

function youtubeEmbedFromUrl(url: URL): string | null {
	const host = url.hostname.replace(/^www\./, "")
	if (host === "youtu.be") {
		const id = url.pathname.split("/").filter(Boolean)[0]
		return id ? `https://www.youtube.com/embed/${id}` : null
	}
	if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
		if (url.pathname.startsWith("/embed/")) {
			return `https://www.youtube.com${url.pathname}${url.search}`
		}
		const id = url.searchParams.get("v")
		if (id) return `https://www.youtube.com/embed/${id}`
		const shorts = url.pathname.match(/^\/shorts\/([^/]+)/)
		if (shorts?.[1]) return `https://www.youtube.com/embed/${shorts[1]}`
	}
	return null
}

function linkedInEmbedFromUrl(url: URL): string | null {
	const host = url.hostname.replace(/^www\./, "")
	if (host !== "linkedin.com") return null
	// Official embed: /embed/feed/update/urn:li:ugcPost:… or urn:li:share:…
	if (url.pathname.startsWith("/embed/feed/update/")) {
		return url.toString()
	}
	return null
}

/**
 * Normalize a video field value (embed URL or pasted iframe HTML)
 * into a canonical YouTube or LinkedIn embed URL.
 */
export function normalizeVideoEmbedInput(raw: string): string | null {
	const trimmed = raw.trim()
	if (!trimmed) return null

	const fromIframe = extractIframeSrc(trimmed)
	const candidate = fromIframe || trimmed

	try {
		const url = new URL(candidate)
		const youtube = youtubeEmbedFromUrl(url)
		if (youtube) return youtube
		const linkedin = linkedInEmbedFromUrl(url)
		if (linkedin) return linkedin
	} catch {
		return null
	}
	return null
}

export function getVideoEmbedProvider(mediaUrl: string): VideoEmbedProvider {
	try {
		const url = new URL(mediaUrl)
		const host = url.hostname.replace(/^www\./, "")
		if (host === "youtube.com" || host === "youtube-nocookie.com" || host === "youtu.be") {
			return "youtube"
		}
		if (host === "linkedin.com" && url.pathname.startsWith("/embed/")) {
			return "linkedin"
		}
	} catch {
		return "unknown"
	}
	return "unknown"
}

export function isAllowedVideoEmbedUrl(mediaUrl: string): boolean {
	return getVideoEmbedProvider(mediaUrl) !== "unknown"
}

export function isIsoDate(value: string) {
	if (!ISO_DATE.test(value)) return false
	const time = Date.parse(`${value}T12:00:00Z`)
	return Number.isFinite(time)
}

export function slugifyTitle(title: string) {
	return title
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 80)
		.replace(/-+$/g, "")
}

export function isNewsItem(value: unknown): value is NewsItem {
	if (!value || typeof value !== "object") return false
	const item = value as Record<string, unknown>
	const hasMedia = item.mediaType !== undefined
	return (
		typeof item.id === "number" &&
		typeof item.date === "string" &&
		isIsoDate(item.date) &&
		typeof item.slug === "string" &&
		SLUG.test(item.slug) &&
		typeof item.title === "string" &&
		typeof item.content === "string" &&
		(item.author === undefined || typeof item.author === "string") &&
		(!hasMedia || isNewsMediaType(item.mediaType)) &&
		(item.mediaUrl === undefined || typeof item.mediaUrl === "string") &&
		(item.mediaAlt === undefined || typeof item.mediaAlt === "string")
	)
}

export function sortNewsByDateDesc(items: NewsItem[]) {
	return [...items].sort((a, b) => {
		const dateCmp = b.date.localeCompare(a.date)
		if (dateCmp !== 0) return dateCmp
		return b.id - a.id
	})
}

/** @deprecated use sortNewsByDateDesc */
export function sortNewsByIdDesc(items: NewsItem[]) {
	return sortNewsByDateDesc(items)
}

export function getNewsExcerpt(content: string, maxLength = 160) {
	const plain = content
		.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
		.replace(/\*\*/g, "")
		.replace(/__/g, "")
		.replace(/\+\+/g, "")
		.replace(/~~/g, "")
		.replace(/==/g, "")
		.replace(/\^\^/g, "")
		.replace(/\*/g, "")
		.replace(/^#{1,3}\s+/gm, "")
		.replace(/^>\s+/gm, "")
		.replace(/^-\s+/gm, "")
		.replace(/\s+/g, " ")
		.trim()
	if (plain.length <= maxLength) return plain
	return `${plain.slice(0, maxLength).trimEnd()}…`
}

export function formatNewsDate(isoDate: string, locale = "en-GB") {
	const time = Date.parse(`${isoDate}T12:00:00Z`)
	if (!Number.isFinite(time)) return isoDate
	return new Intl.DateTimeFormat(locale, {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date(time))
}

export function formatRelativeNewsDate(isoDate: string, now = new Date()) {
	const time = Date.parse(`${isoDate}T12:00:00Z`)
	if (!Number.isFinite(time)) return isoDate

	const dayMs = 24 * 60 * 60 * 1000
	const startOfToday = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
	const startOfTarget = Date.UTC(
		new Date(time).getUTCFullYear(),
		new Date(time).getUTCMonth(),
		new Date(time).getUTCDate()
	)
	const diffDays = Math.round((startOfToday - startOfTarget) / dayMs)

	if (diffDays === 0) return "Today"
	if (diffDays === 1) return "Yesterday"
	if (diffDays > 1 && diffDays < 30) return `${diffDays} days ago`
	if (diffDays >= 30 && diffDays < 365) {
		const months = Math.floor(diffDays / 30)
		return months === 1 ? "1 month ago" : `${months} months ago`
	}
	if (diffDays < 0) return formatNewsDate(isoDate)
	const years = Math.floor(diffDays / 365)
	return years === 1 ? "1 year ago" : `${years} years ago`
}

export function authorInitials(author: string) {
	const parts = author.trim().split(/\s+/).filter(Boolean)
	if (parts.length === 0) return "?"
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
	return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export function parseNewsInput(body: unknown): NewsInput | null {
	if (!body || typeof body !== "object") return null
	const data = body as Record<string, unknown>

	const date = typeof data.date === "string" ? data.date.trim() : ""
	const title = typeof data.title === "string" ? data.title.trim() : ""
	const content = typeof data.content === "string" ? data.content.trim() : ""
	const slugRaw = typeof data.slug === "string" ? data.slug.trim() : ""
	const slug = slugRaw ? slugifyTitle(slugRaw) : slugifyTitle(title)
	const author =
		typeof data.author === "string" && data.author.trim() ? data.author.trim() : undefined
	const mediaTypeRaw = data.mediaType
	const mediaType =
		mediaTypeRaw === "" || mediaTypeRaw === null || mediaTypeRaw === undefined
			? undefined
			: mediaTypeRaw
	const mediaUrlRaw =
		typeof data.mediaUrl === "string" && data.mediaUrl.trim()
			? data.mediaUrl.trim()
			: undefined
	const mediaAlt =
		typeof data.mediaAlt === "string" && data.mediaAlt.trim()
			? data.mediaAlt.trim()
			: undefined

	if (!date || !title || !slug || !isIsoDate(date) || !SLUG.test(slug)) return null
	if (title.length > 300 || content.length > 100_000) return null
	if (author && author.length > 120) return null

	if (mediaType !== undefined) {
		if (!isNewsMediaType(mediaType) || !mediaUrlRaw) return null
	}

	let mediaUrl = mediaUrlRaw
	if (mediaType === "video" && mediaUrlRaw) {
		const normalized = normalizeVideoEmbedInput(mediaUrlRaw)
		if (!normalized || !isAllowedVideoEmbedUrl(normalized)) return null
		mediaUrl = normalized
	}

	const input: NewsInput = { date, slug, title, content }
	if (author) input.author = author
	if (isNewsMediaType(mediaType) && mediaUrl) {
		input.mediaType = mediaType
		input.mediaUrl = mediaUrl
		if (mediaType === "image" && mediaAlt) input.mediaAlt = mediaAlt
	}

	return input
}
