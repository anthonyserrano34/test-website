import { Metadata } from "next"
import { readNews } from "@/lib/news-store"
import NewsListClient from "./news-list-client"

export const metadata: Metadata = {
	title: "Altwy Admin — News",
	robots: { index: false, follow: false },
}

export const dynamic = "force-dynamic"

export default async function AdminNewsPage() {
	const items = await readNews()
	return <NewsListClient items={items} />
}
