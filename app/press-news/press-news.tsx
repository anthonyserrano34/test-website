/* eslint-disable react/no-unescaped-entities */
"use client"

import { motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { useInView } from "react-intersection-observer"
import { ArrowUpRight } from "lucide-react"
import TopNavbar from "@/components/TopNavbar"
import { SubpageHeroHeader } from "@/components/ui/subpage-hero-header"
import { NewsDateLabel, PressSourceBadge } from "@/components/news/news-meta"
import { formatNewsDate, NEWS_PAGE_SIZE } from "@/lib/news"
import type { PressNewsListItem } from "@/lib/press-news"

function monthKey(isoDate: string) {
	return isoDate.slice(0, 7)
}

function shortRailMonth(isoDate: string) {
	const time = Date.parse(`${isoDate}T12:00:00Z`)
	if (!Number.isFinite(time)) return isoDate
	return new Intl.DateTimeFormat("en-GB", {
		month: "short",
		year: "numeric",
	}).format(new Date(time))
}

export default function PressNewsPage({ items }: { items: PressNewsListItem[] }) {
	const [listRef, listInView] = useInView({ triggerOnce: true, threshold: 0.05 })
	const [visibleCount, setVisibleCount] = useState(
		Math.min(NEWS_PAGE_SIZE, items.length)
	)
	const [activeMonth, setActiveMonth] = useState<string | null>(
		items[0] ? monthKey(items[0].date) : null
	)
	const [pendingScrollId, setPendingScrollId] = useState<number | null>(null)

	const visibleItems = useMemo(
		() => items.slice(0, visibleCount),
		[items, visibleCount]
	)
	const hasMore = visibleCount < items.length

	const railDates = useMemo(() => {
		const seen = new Set<string>()
		const entries: { id: number; date: string; month: string; label: string; index: number }[] =
			[]
		items.forEach((item, index) => {
			const month = monthKey(item.date)
			if (seen.has(month)) return
			seen.add(month)
			entries.push({
				id: item.id,
				date: item.date,
				month,
				label: shortRailMonth(item.date),
				index,
			})
		})
		return entries
	}, [items])

	useEffect(() => {
		const nodes = visibleItems
			.map((item) => document.getElementById(`press-${item.id}`))
			.filter((node): node is HTMLElement => Boolean(node))

		if (nodes.length === 0) return

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
				const top = visible[0]
				if (!top?.target.id) return
				const id = Number(top.target.id.replace("press-", ""))
				const item = items.find((n) => n.id === id)
				if (item) setActiveMonth(monthKey(item.date))
			},
			{ rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.35, 0.6] }
		)

		nodes.forEach((node) => observer.observe(node))
		return () => observer.disconnect()
	}, [items, visibleItems])

	useEffect(() => {
		if (pendingScrollId == null) return
		const node = document.getElementById(`press-${pendingScrollId}`)
		if (!node) return
		node.scrollIntoView({ behavior: "smooth", block: "start" })
		setPendingScrollId(null)
	}, [pendingScrollId, visibleCount])

	const scrollToNews = (id: number, month: string, index: number) => {
		setActiveMonth(month)
		setVisibleCount((count) => Math.min(items.length, Math.max(count, index + 1)))
		setPendingScrollId(id)
	}

	const loadMore = () => {
		setVisibleCount((count) => Math.min(items.length, count + NEWS_PAGE_SIZE))
	}

	const fadeInUp = {
		hidden: { opacity: 0, y: 14 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
	}

	return (
		<div className="relative min-h-screen bg-[var(--background)] pb-24">
			<SubpageHeroHeader />
			<TopNavbar trackScroll />

			<main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-24">
				<motion.header
					initial="hidden"
					animate="visible"
					variants={fadeInUp}
					className="relative mb-12 text-center"
				>
					<div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#00FF88]/20 px-4 py-1">
						<span className="text-sm font-medium text-[#00FF88]">From the press</span>
					</div>
					<h1 className="relative z-10 mb-4 text-4xl font-bold text-white md:text-5xl">
						Press News
					</h1>
					<p className="relative z-10 mx-auto max-w-2xl text-lg text-white/[0.74]">
						How the press covers the energy, sovereignty, and infrastructure problem Altwy is built to solve.
					</p>
				</motion.header>

				<div className="relative lg:grid lg:grid-cols-[6.5rem_minmax(0,1fr)] lg:gap-8">
					<aside className="relative hidden lg:block">
						<nav
							aria-label="Jump to date"
							className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
						>
							<div className="relative pl-3">
								<div
									className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-white/10 via-white/20 to-white/10"
									aria-hidden
								/>
								<ul className="space-y-0.5">
									{railDates.map((entry) => {
										const isActive = entry.month === activeMonth
										return (
											<li key={entry.month}>
												<button
													type="button"
													onClick={() =>
														scrollToNews(entry.id, entry.month, entry.index)
													}
													className={`group relative flex w-full items-center gap-2 py-1.5 text-left text-[11px] transition-colors ${
														isActive
															? "text-[#00FF88]"
															: "text-white/45 hover:text-white/80"
													}`}
													title={formatNewsDate(entry.date)}
												>
													<span
														className={`absolute left-[-7px] h-1.5 w-1.5 rounded-full transition-colors ${
															isActive
																? "bg-[#00FF88] shadow-[0_0_0_3px_rgba(0,255,136,0.15)]"
																: "bg-white/25 group-hover:bg-white/50"
														}`}
														aria-hidden
													/>
													<span className="pl-2 tracking-wide">{entry.label}</span>
												</button>
											</li>
										)
									})}
								</ul>
							</div>
						</nav>
					</aside>

					<motion.div
						ref={listRef}
						initial="hidden"
						animate={listInView ? "visible" : "hidden"}
						variants={{
							hidden: { opacity: 0 },
							visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
						}}
						className="border border-white/[0.07] bg-[#080808] px-4 sm:px-6 md:px-8"
					>
						{items.length === 0 ? (
							<p className="py-16 text-center text-white/50">
								Press coverage will appear here soon.
							</p>
						) : (
							<div className="divide-y divide-white/[0.08]">
								{visibleItems.map((item) => (
									<motion.article
										key={item.id}
										id={`press-${item.id}`}
										variants={fadeInUp}
										className="group scroll-mt-28 py-10 md:py-12"
									>
										<a
											href={item.sourceUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="block outline-none"
										>
											<div className="space-y-4">
												<NewsDateLabel date={item.date} className="block text-sm" />
												<h2 className="font-display text-2xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-[#00FF88] md:text-[1.75rem]">
													{item.title}
												</h2>
												<PressSourceBadge source={item.source} logo={item.sourceLogo} />
												{item.description ? (
													<p className="max-w-xl text-sm leading-relaxed text-white/[0.9]">
														{item.description}
													</p>
												) : null}
												<span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#00FF88]">
												Read article
													<ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
												</span>
											</div>
										</a>
									</motion.article>
								))}
							</div>
						)}

						{hasMore ? (
							<div className="border-t border-white/[0.08] py-8 text-center">
								<button
									type="button"
									onClick={loadMore}
									className="inline-flex items-center border border-white/15 px-5 py-2.5 text-sm font-medium text-white/85 transition-colors hover:border-[#00FF88]/50 hover:text-[#00FF88]"
								>
									Load more articles
									<span className="ml-2 text-white/40">
										({items.length - visibleCount} left)
									</span>
								</button>
							</div>
						) : null}
					</motion.div>
				</div>
			</main>
		</div>
	)
}
