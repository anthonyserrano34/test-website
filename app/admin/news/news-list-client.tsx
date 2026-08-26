"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import type { NewsItem } from "@/lib/news"

export default function NewsListClient({ items }: { items: NewsItem[] }) {
	const router = useRouter()
	const [deletingId, setDeletingId] = useState<number | null>(null)
	const [error, setError] = useState<string | null>(null)

	const handleDelete = async (item: NewsItem) => {
		const confirmed = window.confirm(`Delete “${item.title}”? This cannot be undone.`)
		if (!confirmed) return
		setDeletingId(item.id)
		setError(null)
		try {
			const response = await fetch(`/api/admin/news/${item.id}`, { method: "DELETE" })
			const data = (await response.json().catch(() => null)) as { error?: string } | null
			if (!response.ok) {
				setError(data?.error || "Unable to delete.")
				return
			}
			router.refresh()
		} catch {
			setError("Unable to delete.")
		} finally {
			setDeletingId(null)
		}
	}

	return (
		<div className="space-y-6">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div>
					<h1 className="text-2xl font-bold text-white">Altwy News</h1>
					<p className="mt-1 text-sm text-white/55">{items.length} published articles</p>
				</div>
				<Link
					href="/admin/news/new"
					className="inline-flex items-center border border-neutral-800 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:border-[#00FF88]"
				>
					Add news
				</Link>
			</div>

			{error ? (
				<p className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>
			) : null}

			<div className="overflow-hidden border border-white/[0.08]">
				<table className="w-full text-left text-sm">
					<thead className="bg-white/[0.03] text-xs uppercase tracking-wide text-white/50">
						<tr>
							<th className="px-4 py-3 font-medium">Date</th>
							<th className="px-4 py-3 font-medium">Title</th>
							<th className="px-4 py-3 font-medium">Author</th>
							<th className="px-4 py-3 font-medium">Media</th>
							<th className="px-4 py-3 font-medium text-right">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-white/[0.06]">
						{items.length === 0 ? (
							<tr>
								<td colSpan={5} className="px-4 py-8 text-center text-white/45">
									No news yet. Create the first one.
								</td>
							</tr>
						) : (
							items.map((item) => (
								<tr key={item.id} className="hover:bg-white/[0.02]">
									<td className="whitespace-nowrap px-4 py-3 text-white/55">{item.date}</td>
									<td className="px-4 py-3 text-white">{item.title}</td>
									<td className="px-4 py-3 text-white/55">{item.author ?? "—"}</td>
									<td className="px-4 py-3 capitalize text-white/55">
										{item.mediaType ?? "—"}
									</td>
									<td className="px-4 py-3 text-right">
										<div className="flex justify-end gap-2">
											<Link
												href={`/admin/news/${item.id}`}
												className="border border-white/15 px-3 py-1.5 text-white/80 hover:border-white/30 hover:text-white"
											>
												Edit
											</Link>
											<button
												type="button"
												onClick={() => handleDelete(item)}
												disabled={deletingId === item.id}
												className="border border-red-500/30 px-3 py-1.5 text-red-200 hover:border-red-400/50 disabled:opacity-60"
											>
												{deletingId === item.id ? "…" : "Delete"}
											</button>
										</div>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}
