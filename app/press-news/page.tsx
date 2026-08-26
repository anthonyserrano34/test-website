import { Metadata } from "next"
import { toPressNewsListItem } from "@/lib/press-news"
import { readPressNews } from "@/lib/press-news-store"
import PressNewsPage from "./press-news"

export const metadata: Metadata = {
	title: "Altwy - Press News",
	description:
		"Press coverage of the energy, sovereignty, and infrastructure challenges Altwy is built to solve.",
}

export const dynamic = "force-dynamic"

export default async function Page() {
	const items = await readPressNews()
	const listItems = items.map((item) => toPressNewsListItem(item))
	return <PressNewsPage items={listItems} />
}
