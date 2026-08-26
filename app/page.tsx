import HomePage from "./home-page"
import {
	getFeaturedPressNews,
	toHomepagePressInsight,
	type HomepagePressInsight,
} from "@/lib/press-news"
import { readPressNews } from "@/lib/press-news-store"

export const dynamic = "force-dynamic"

export default async function Page() {
	const items = await readPressNews()
	const featuredInsights = getFeaturedPressNews(items)
		.map(toHomepagePressInsight)
		.filter((insight): insight is HomepagePressInsight => Boolean(insight))

	return <HomePage featuredInsights={featuredInsights} />
}
