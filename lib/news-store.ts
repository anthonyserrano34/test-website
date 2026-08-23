import { promises as fs } from "fs"
import path from "path"
import {
	isNewsItem,
	slugifyTitle,
	sortNewsByDateDesc,
	type NewsInput,
	type NewsItem,
} from "@/lib/news"

const NEWS_PATH = path.join(process.cwd(), "data", "news.json")

async function ensureNewsFile() {
	try {
		await fs.access(NEWS_PATH)
	} catch {
		await fs.mkdir(path.dirname(NEWS_PATH), { recursive: true })
		await fs.writeFile(NEWS_PATH, "[]\n", "utf8")
	}
}

export async function readNews(): Promise<NewsItem[]> {
	await ensureNewsFile()
	const raw = await fs.readFile(NEWS_PATH, "utf8")
	const parsed: unknown = JSON.parse(raw)
	if (!Array.isArray(parsed)) return []
	const items = parsed.filter(isNewsItem)
	return sortNewsByDateDesc(items)
}

async function writeNewsAtomic(items: NewsItem[]) {
	await ensureNewsFile()
	const sorted = sortNewsByDateDesc(items)
	const tempPath = `${NEWS_PATH}.${process.pid}.${Date.now()}.tmp`
	const payload = `${JSON.stringify(sorted, null, "\t")}\n`
	await fs.writeFile(tempPath, payload, "utf8")
	try {
		await fs.rename(tempPath, NEWS_PATH)
	} catch {
		await fs.copyFile(tempPath, NEWS_PATH)
		await fs.unlink(tempPath)
	}
}

export async function getNewsById(id: number): Promise<NewsItem | null> {
	const items = await readNews()
	return items.find((item) => item.id === id) ?? null
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
	const items = await readNews()
	return items.find((item) => item.slug === slug) ?? null
}

function uniqueSlug(base: string, items: NewsItem[], excludeId?: number) {
	const root = slugifyTitle(base) || "news"
	let candidate = root
	let index = 2
	while (items.some((item) => item.slug === candidate && item.id !== excludeId)) {
		candidate = `${root}-${index}`
		index += 1
	}
	return candidate
}

export async function createNews(input: NewsInput): Promise<NewsItem> {
	const items = await readNews()
	const nextId = items.reduce((max, item) => Math.max(max, item.id), 0) + 1
	const slug = uniqueSlug(input.slug || input.title, items)
	const item: NewsItem = { ...input, id: nextId, slug }
	await writeNewsAtomic([item, ...items])
	return item
}

export async function updateNews(id: number, input: NewsInput): Promise<NewsItem | null> {
	const items = await readNews()
	const index = items.findIndex((item) => item.id === id)
	if (index < 0) return null
	const slug = uniqueSlug(input.slug || input.title, items, id)
	const updated: NewsItem = { ...input, id, slug }
	const next = [...items]
	next[index] = updated
	await writeNewsAtomic(next)
	return updated
}

export async function deleteNews(id: number): Promise<boolean> {
	const items = await readNews()
	const next = items.filter((item) => item.id !== id)
	if (next.length === items.length) return false
	await writeNewsAtomic(next)
	return true
}
