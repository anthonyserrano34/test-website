import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import TopNavbar from "@/components/TopNavbar"
import { SubpageHeroHeader } from "@/components/ui/subpage-hero-header"
import { formatNewsText } from "@/components/news/format-news-text"
import { NewsMedia } from "@/components/news/NewsArticlePreview"
import { NewsAuthorBadge, NewsDateLabel } from "@/components/news/news-meta"
import { getNewsExcerpt } from "@/lib/news"
import { getNewsBySlug } from "@/lib/news-store"

export const dynamic = "force-dynamic"

type PageProps = { params: Promise<{ slug: string }> }

function absoluteUrl(path: string) {
	const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://altwy.com"
	if (path.startsWith("http://") || path.startsWith("https://")) return path
	return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params
	const item = await getNewsBySlug(slug)
	if (!item) return { title: "Altwy - News" }

	const description = getNewsExcerpt(item.content, 160) || item.title
	const images =
		item.mediaType === "image" && item.mediaUrl
			? [{ url: absoluteUrl(item.mediaUrl), alt: item.mediaAlt || item.title }]
			: undefined

	return {
		title: `${item.title} | Altwy News`,
		description,
		openGraph: {
			title: item.title,
			description,
			type: "article",
			publishedTime: item.date,
			authors: item.author ? [item.author] : undefined,
			url: absoluteUrl(`/news/${item.slug}`),
			images,
			siteName: "Altwy",
		},
		twitter: {
			card: images ? "summary_large_image" : "summary",
			title: item.title,
			description,
			images: images?.map((image) => image.url),
		},
	}
}

export default async function NewsArticlePage({ params }: PageProps) {
	const { slug } = await params
	const item = await getNewsBySlug(slug)
	if (!item) notFound()

	return (
		<div className="relative min-h-screen bg-[var(--background)] pb-24">
			<SubpageHeroHeader heightClassName="h-[min(50vh,420px)]" />
			<TopNavbar trackScroll />

			<main className="relative z-10 mx-auto max-w-3xl px-4 pb-24 pt-28">
				<Link
					href="/news"
					className="text-sm text-white/55 transition-colors hover:text-[#00FF88]"
				>
					← Back to News
				</Link>

				<article className="mt-8 space-y-5 border border-white/[0.07] bg-[#080808] p-5 sm:p-8">
					<header className="space-y-4">
						<NewsDateLabel date={item.date} className="block text-sm" />
						<h1 className="font-display text-2xl font-bold tracking-tight text-white md:text-4xl">
							{item.title}
						</h1>
						{item.author ? <NewsAuthorBadge author={item.author} size="md" /> : null}
					</header>

					<NewsMedia
						mediaType={item.mediaType}
						mediaUrl={item.mediaUrl}
						mediaAlt={item.mediaAlt}
						title={item.title}
						variant="article"
						priority
					/>

					{item.content ? (
						<div className="whitespace-pre-wrap text-sm leading-relaxed text-white/[0.9] md:text-[0.9375rem] md:leading-7">
							{formatNewsText(item.content)}
						</div>
					) : null}
				</article>

				<div className="mt-14 border-t border-white/[0.08] pt-8">
					<a
						href="https://linkedin.com/company/altwy"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 text-sm font-medium text-[#00FF88] underline-offset-2 hover:underline"
					>
						Follow Altwy on LinkedIn
					</a>
				</div>
			</main>
		</div>
	)
}
