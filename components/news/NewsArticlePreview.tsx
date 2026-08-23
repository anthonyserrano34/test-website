"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { formatNewsText } from "@/components/news/format-news-text"
import { NewsAuthorBadge, NewsDateLabel } from "@/components/news/news-meta"
import { getVideoEmbedProvider, type NewsItem } from "@/lib/news"

type NewsArticlePreviewProps = {
	item: Pick<
		NewsItem,
		"title" | "date" | "content" | "author" | "mediaType" | "mediaUrl" | "mediaAlt"
	>
	expanded?: boolean
	className?: string
}

export type NewsMediaVariant = "list" | "article" | "preview"

const MEDIA_MAX: Record<NewsMediaVariant, { maxH: number; sizes: string }> = {
	list: { maxH: 280, sizes: "(max-width: 768px) 92vw, 420px" },
	article: { maxH: 420, sizes: "(max-width: 768px) 92vw, 720px" },
	preview: { maxH: 320, sizes: "(max-width: 768px) 92vw, 480px" },
}

function isLocalPublicPath(src: string) {
	return src.startsWith("/") && !src.startsWith("//")
}

function LazyVideoFrame({
	src,
	title,
	isLinkedIn,
	priority,
}: {
	src: string
	title: string
	isLinkedIn: boolean
	priority?: boolean
}) {
	const [ref, inView] = useInView({
		triggerOnce: true,
		rootMargin: "240px 0px",
		skip: priority,
	})
	const [shouldLoad, setShouldLoad] = useState(Boolean(priority))

	useEffect(() => {
		if (priority || inView) setShouldLoad(true)
	}, [priority, inView])

	return (
		<div
			ref={ref}
			className={`relative w-full overflow-hidden border border-white/[0.08] bg-[#0c0c0c] ${
				isLinkedIn ? "aspect-[504/399] max-h-[360px]" : "aspect-video max-h-[360px]"
			}`}
		>
			{shouldLoad ? (
				<iframe
					src={src}
					title={title}
					allow={
						isLinkedIn
							? "encrypted-media; clipboard-write; fullscreen"
							: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
					}
					allowFullScreen
					loading="lazy"
					referrerPolicy="strict-origin-when-cross-origin"
					className="absolute inset-0 h-full w-full border-0"
				/>
			) : (
				<div className="absolute inset-0 flex items-center justify-center text-xs text-white/35">
					Video
				</div>
			)}
		</div>
	)
}

export function NewsMedia({
	mediaType,
	mediaUrl,
	mediaAlt,
	title,
	variant = "article",
	priority = false,
}: {
	mediaType?: NewsItem["mediaType"]
	mediaUrl?: string
	mediaAlt?: string
	title: string
	variant?: NewsMediaVariant
	priority?: boolean
}) {
	if (!mediaType || !mediaUrl) return null

	if (mediaType === "image") {
		const { maxH, sizes } = MEDIA_MAX[variant]
		const alt = mediaAlt || title || "News image"

		return (
			<div
				className="relative w-full overflow-hidden border border-white/[0.08] bg-[#0c0c0c]"
				style={{ height: maxH }}
			>
				{isLocalPublicPath(mediaUrl) ? (
					<Image
						src={mediaUrl}
						alt={alt}
						fill
						sizes={sizes}
						priority={priority}
						loading={priority ? "eager" : "lazy"}
						className="object-cover object-center"
					/>
				) : (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={mediaUrl}
						alt={alt}
						loading={priority ? "eager" : "lazy"}
						decoding="async"
						className="absolute inset-0 h-full w-full object-cover object-center"
					/>
				)}
			</div>
		)
	}

	const provider = getVideoEmbedProvider(mediaUrl)
	const isLinkedIn = provider === "linkedin"

	return (
		<LazyVideoFrame
			src={mediaUrl}
			title={title || (isLinkedIn ? "LinkedIn post" : "Video")}
			isLinkedIn={isLinkedIn}
			priority={priority}
		/>
	)
}

export default function NewsArticlePreview({
	item,
	expanded = true,
	className = "",
}: NewsArticlePreviewProps) {
	return (
		<article
			className={`relative border border-white/[0.07] bg-[#080808] p-5 sm:p-6 ${className}`}
		>
			<div className="space-y-4">
				{item.date ? (
					<NewsDateLabel date={item.date} className="block text-sm" />
				) : (
					<span className="text-sm text-white/40">Date</span>
				)}
				<h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
					{item.title || "Untitled"}
				</h3>
				{item.author ? <NewsAuthorBadge author={item.author} /> : null}
				<NewsMedia
					mediaType={item.mediaType}
					mediaUrl={item.mediaUrl}
					mediaAlt={item.mediaAlt}
					title={item.title}
					variant="preview"
				/>
				<div className={expanded ? "" : "max-h-20 overflow-hidden"}>
					{item.content ? (
						<div className="whitespace-pre-wrap text-sm leading-relaxed text-white/[0.72]">
							{formatNewsText(item.content)}
						</div>
					) : (
						<span className="text-sm text-white/40">Start writing to preview…</span>
					)}
				</div>
			</div>
		</article>
	)
}
