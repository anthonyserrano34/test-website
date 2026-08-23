import { Metadata } from "next"
import { toNewsListItem } from "@/lib/news"
import { readNews } from "@/lib/news-store"
import NewsPage from "./news"

export const metadata: Metadata = {
	title: "Altwy - News",
}

export const dynamic = "force-dynamic"

export default async function Page() {
	const items = await readNews()
	const listItems = items.map((item) => toNewsListItem(item))
	return <NewsPage items={listItems} />
}
