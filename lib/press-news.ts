import { isIsoDate } from "@/lib/news"

export type FeaturedRank = 1 | 2 | 3

export type PressNewsItem = {
	id: number
	/** ISO date YYYY-MM-DD */
	date: string
	title: string
	description: string
	/** Press outlet, e.g. "The Wall Street Journal" */
	source: string
	sourceLogo?: string
	/** External article URL */
	sourceUrl: string
	featuredRank?: FeaturedRank
}

export type PressNewsListItem = {
	id: number
	date: string
	title: string
	description: string
	source: string
	sourceLogo?: string
	sourceUrl: string
	featuredRank?: FeaturedRank
}

export type PressNewsInput = {
	date: string
	title: string
	description: string
	source: string
	sourceLogo?: string
	sourceUrl: string
	featuredRank?: FeaturedRank
}

export type HomepagePressInsight = {
	sources: { name: string; logo?: string }[]
	headline: string
	description: string
	cta: string
	href: string
	rank: FeaturedRank
	external: true
}

const HTTP_URL = /^https?:\/\/.+/i

export function isFeaturedRank(value: unknown): value is FeaturedRank {
	return value === 1 || value === 2 || value === 3
}

export function toPressNewsListItem(item: PressNewsItem): PressNewsListItem {
	return {
		id: item.id,
		date: item.date,
		title: item.title,
		description: item.description,
		source: item.source,
		sourceLogo: item.sourceLogo,
		sourceUrl: item.sourceUrl,
		featuredRank: item.featuredRank,
	}
}

export function toHomepagePressInsight(item: PressNewsItem): HomepagePressInsight | null {
	if (!isFeaturedRank(item.featuredRank)) return null
	return {
		sources: [{ name: item.source, logo: item.sourceLogo }],
		headline: item.title,
		description: item.description,
		cta: "Read article",
		href: item.sourceUrl,
		rank: item.featuredRank,
		external: true,
	}
}

export function isPressNewsItem(value: unknown): value is PressNewsItem {
	if (!value || typeof value !== "object") return false
	const item = value as Record<string, unknown>
	return (
		typeof item.id === "number" &&
		typeof item.date === "string" &&
		isIsoDate(item.date) &&
		typeof item.title === "string" &&
		typeof item.description === "string" &&
		typeof item.source === "string" &&
		item.source.length > 0 &&
		typeof item.sourceUrl === "string" &&
		HTTP_URL.test(item.sourceUrl) &&
		(item.sourceLogo === undefined || typeof item.sourceLogo === "string") &&
		(item.featuredRank === undefined || isFeaturedRank(item.featuredRank))
	)
}

export function sortPressNewsByDateDesc(items: PressNewsItem[]) {
	return [...items].sort((a, b) => {
		const dateCmp = b.date.localeCompare(a.date)
		if (dateCmp !== 0) return dateCmp
		return b.id - a.id
	})
}

export function getFeaturedPressNews(items: PressNewsItem[]) {
	return items
		.filter((item): item is PressNewsItem & { featuredRank: FeaturedRank } =>
			isFeaturedRank(item.featuredRank)
		)
		.sort((a, b) => a.featuredRank - b.featuredRank)
}

function optionalTrimmed(value: unknown, maxLength: number): string | undefined {
	if (typeof value !== "string") return undefined
	const trimmed = value.trim()
	if (!trimmed || trimmed.length > maxLength) return undefined
	return trimmed
}

export function parsePressNewsInput(body: unknown): PressNewsInput | null {
	if (!body || typeof body !== "object") return null
	const data = body as Record<string, unknown>

	const date = typeof data.date === "string" ? data.date.trim() : ""
	const title = typeof data.title === "string" ? data.title.trim() : ""
	const description = typeof data.description === "string" ? data.description.trim() : ""
	const source = typeof data.source === "string" ? data.source.trim() : ""
	const sourceUrl = typeof data.sourceUrl === "string" ? data.sourceUrl.trim() : ""
	const sourceLogo = optionalTrimmed(data.sourceLogo, 500)

	const featuredRankRaw = data.featuredRank
	const featuredRank =
		featuredRankRaw === "" || featuredRankRaw === null || featuredRankRaw === undefined
			? undefined
			: Number(featuredRankRaw)

	if (!date || !title || !description || !source || !sourceUrl) return null
	if (!isIsoDate(date) || !HTTP_URL.test(sourceUrl)) return null
	if (title.length > 300 || description.length > 500 || source.length > 120) return null
	if (featuredRank !== undefined && !isFeaturedRank(featuredRank)) return null

	const input: PressNewsInput = { date, title, description, source, sourceUrl }
	if (sourceLogo) input.sourceLogo = sourceLogo
	if (isFeaturedRank(featuredRank)) input.featuredRank = featuredRank

	return input
}

export function applyFeaturedRank(
	items: PressNewsItem[],
	id: number,
	rank: FeaturedRank | null
): PressNewsItem[] {
	return items.map((item) => {
		if (item.id === id) {
			if (rank) return { ...item, featuredRank: rank }
			const rest = { ...item }
			delete rest.featuredRank
			return rest
		}
		if (rank && item.featuredRank === rank) {
			const rest = { ...item }
			delete rest.featuredRank
			return rest
		}
		return item
	})
}
