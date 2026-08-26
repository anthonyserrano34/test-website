import { Metadata } from "next"
import { readPressNews } from "@/lib/press-news-store"
import PressNewsListClient from "./press-news-list-client"

export const metadata: Metadata = {
	title: "Altwy Admin — Press News",
	robots: { index: false, follow: false },
}

export const dynamic = "force-dynamic"

export default async function AdminPressNewsPage() {
	const items = await readPressNews()
	return <PressNewsListClient items={items} />
}
