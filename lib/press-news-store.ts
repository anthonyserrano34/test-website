import { promises as fs } from "fs"
import path from "path"
import {
	applyFeaturedRank,
	isPressNewsItem,
	sortPressNewsByDateDesc,
	type FeaturedRank,
	type PressNewsInput,
	type PressNewsItem,
} from "@/lib/press-news"

const PRESS_NEWS_PATH = path.join(process.cwd(), "data", "press-news.json")

async function ensurePressNewsFile() {
	try {
		await fs.access(PRESS_NEWS_PATH)
	} catch {
		await fs.mkdir(path.dirname(PRESS_NEWS_PATH), { recursive: true })
		await fs.writeFile(PRESS_NEWS_PATH, "[]\n", "utf8")
	}
}

export async function readPressNews(): Promise<PressNewsItem[]> {
	await ensurePressNewsFile()
	const raw = await fs.readFile(PRESS_NEWS_PATH, "utf8")
	const parsed: unknown = JSON.parse(raw)
	if (!Array.isArray(parsed)) return []
	const items = parsed.filter(isPressNewsItem)
	return sortPressNewsByDateDesc(items)
}

async function writePressNewsAtomic(items: PressNewsItem[]) {
	await ensurePressNewsFile()
	const sorted = sortPressNewsByDateDesc(items)
	const tempPath = `${PRESS_NEWS_PATH}.${process.pid}.${Date.now()}.tmp`
	const payload = `${JSON.stringify(sorted, null, "\t")}\n`
	await fs.writeFile(tempPath, payload, "utf8")
	try {
		await fs.rename(tempPath, PRESS_NEWS_PATH)
	} catch {
		await fs.copyFile(tempPath, PRESS_NEWS_PATH)
		await fs.unlink(tempPath)
	}
}

export async function getPressNewsById(id: number): Promise<PressNewsItem | null> {
	const items = await readPressNews()
	return items.find((item) => item.id === id) ?? null
}

function withUniqueFeaturedRank(items: PressNewsItem[], item: PressNewsItem) {
	if (!item.featuredRank) return [item, ...items.filter((entry) => entry.id !== item.id)]
	return applyFeaturedRank(
		[item, ...items.filter((entry) => entry.id !== item.id)],
		item.id,
		item.featuredRank
	)
}

export async function createPressNews(input: PressNewsInput): Promise<PressNewsItem> {
	const items = await readPressNews()
	const nextId = items.reduce((max, item) => Math.max(max, item.id), 0) + 1
	const item: PressNewsItem = { ...input, id: nextId }
	await writePressNewsAtomic(withUniqueFeaturedRank(items, item))
	return item
}

export async function updatePressNews(
	id: number,
	input: PressNewsInput
): Promise<PressNewsItem | null> {
	const items = await readPressNews()
	const index = items.findIndex((item) => item.id === id)
	if (index < 0) return null
	const updated: PressNewsItem = { ...input, id }
	const next = withUniqueFeaturedRank(items, updated)
	await writePressNewsAtomic(next)
	return updated
}

export async function setPressNewsFeaturedRank(
	id: number,
	rank: FeaturedRank | null
): Promise<PressNewsItem | null> {
	const items = await readPressNews()
	if (!items.some((item) => item.id === id)) return null
	const next = applyFeaturedRank(items, id, rank)
	await writePressNewsAtomic(next)
	return next.find((item) => item.id === id) ?? null
}

export async function deletePressNews(id: number): Promise<boolean> {
	const items = await readPressNews()
	const next = items.filter((item) => item.id !== id)
	if (next.length === items.length) return false
	await writePressNewsAtomic(next)
	return true
}
