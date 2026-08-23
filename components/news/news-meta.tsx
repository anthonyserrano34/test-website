"use client"

import Image from "next/image"
import { authorInitials, formatNewsDate, formatRelativeNewsDate } from "@/lib/news"

const AUTHOR_AVATARS: Record<string, string> = {
	"christophe lambert": "/company/christophe_lambert.jpg",
	"peter mahlmeister": "/company/peter_mahlmeister.jpg",
}

function authorAvatarSrc(author: string) {
	return AUTHOR_AVATARS[author.trim().toLowerCase()]
}

export function NewsDateLabel({
	date,
	className = "",
}: {
	date: string
	className?: string
}) {
	const absolute = formatNewsDate(date)
	const relative = formatRelativeNewsDate(date)
	return (
		<time dateTime={date} className={className} title={absolute}>
			<span className="text-[#00FF88]">{absolute}</span>
			<span className="mx-2 text-white/25">·</span>
			<span className="text-white/55">{relative}</span>
		</time>
	)
}

export function NewsAuthorBadge({
	author,
	size = "sm",
}: {
	author: string
	size?: "sm" | "md"
}) {
	const dim = size === "md" ? "h-10 w-10 text-sm" : "h-8 w-8 text-xs"
	const avatar = authorAvatarSrc(author)

	return (
		<div className="flex items-center gap-2.5">
			{avatar ? (
				<span className={`relative ${dim} overflow-hidden rounded-full border border-white/15`}>
					<Image
						src={avatar}
						alt={author}
						fill
						className="object-cover"
						sizes={size === "md" ? "40px" : "32px"}
					/>
				</span>
			) : (
				<span
					className={`inline-flex ${dim} items-center justify-center rounded-full border border-[#00FF88]/25 bg-[#00FF88]/10 font-medium text-[#00FF88]`}
					aria-hidden
				>
					{authorInitials(author)}
				</span>
			)}
			<span className={size === "md" ? "text-sm text-white/80" : "text-sm text-white/65"}>
				{author}
			</span>
		</div>
	)
}
