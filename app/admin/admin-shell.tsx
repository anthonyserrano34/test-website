"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ReactNode, useState } from "react"

const TABS = [
	{ href: "/admin/news", label: "Altwy News", match: "/admin/news" },
	{ href: "/admin/press-news", label: "Press News", match: "/admin/press-news" },
] as const

export default function AdminShell({
	children,
	username,
}: {
	children: ReactNode
	username: string
}) {
	const router = useRouter()
	const pathname = usePathname()
	const [loggingOut, setLoggingOut] = useState(false)

	const logout = async () => {
		setLoggingOut(true)
		try {
			await fetch("/api/admin/logout", { method: "POST" })
			router.replace("/admin/login")
			router.refresh()
		} finally {
			setLoggingOut(false)
		}
	}

	const pressActive = pathname.startsWith("/admin/press-news")
	const viewHref = pressActive ? "/press-news" : "/news"

	return (
		<div className="min-h-screen bg-[var(--background)] text-white">
			<header className="border-b border-white/[0.08] bg-[#0a0a0a]">
				<div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
					<div className="flex items-center gap-6">
						<Link href="/admin/news" className="flex-shrink-0">
							<Image
								src="/logo.png"
								alt="Altwy"
								width={110}
								height={32}
								className="h-8 w-auto"
								priority
							/>
						</Link>
						<nav className="flex gap-4 text-sm text-white/70">
							<Link href={viewHref} className="hover:text-white" target="_blank">
								View site
							</Link>
						</nav>
					</div>
					<div className="flex items-center gap-3 text-sm text-white/60">
						<span>{username}</span>
						<button
							type="button"
							onClick={logout}
							disabled={loggingOut}
							className="border border-white/15 px-3 py-1.5 text-white/80 transition-colors hover:border-white/30 hover:text-white disabled:opacity-60"
						>
							{loggingOut ? "…" : "Log out"}
						</button>
					</div>
				</div>
				<div className="mx-auto max-w-6xl px-4">
					<nav className="flex gap-1" aria-label="News type">
						{TABS.map((tab) => {
							const active = pathname.startsWith(tab.match)
							return (
								<Link
									key={tab.href}
									href={tab.href}
									className={`-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
										active
											? "border-[#00FF88] text-white"
											: "border-transparent text-white/55 hover:text-white"
									}`}
								>
									{tab.label}
								</Link>
							)
						})}
					</nav>
				</div>
			</header>
			<main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
		</div>
	)
}
