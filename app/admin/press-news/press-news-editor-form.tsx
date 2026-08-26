"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowUpRight } from "lucide-react"
import { NewsDateLabel, PressSourceBadge } from "@/components/news/news-meta"
import type { FeaturedRank, PressNewsItem } from "@/lib/press-news"

const labelClass = "mb-2 block text-xs font-medium uppercase tracking-wide text-white/75"
const inputClass =
	"w-full border border-white/[0.08] bg-[#161616] px-4 py-3 text-sm text-white outline-none focus:border-white/20 focus:ring-2 focus:ring-[#00FF88]/20"

type PressNewsEditorFormProps = {
	mode: "create" | "edit"
	initial?: PressNewsItem
}

export default function PressNewsEditorForm({ mode, initial }: PressNewsEditorFormProps) {
	const router = useRouter()
	const [date, setDate] = useState(initial?.date ?? new Date().toISOString().slice(0, 10))
	const [title, setTitle] = useState(initial?.title ?? "")
	const [description, setDescription] = useState(initial?.description ?? "")
	const [source, setSource] = useState(initial?.source ?? "")
	const [sourceLogo, setSourceLogo] = useState(initial?.sourceLogo ?? "")
	const [sourceUrl, setSourceUrl] = useState(initial?.sourceUrl ?? "")
	const [featuredRank, setFeaturedRank] = useState<FeaturedRank | 0>(initial?.featuredRank ?? 0)
	const [error, setError] = useState<string | null>(null)
	const [saving, setSaving] = useState(false)
	const [uploadingLogo, setUploadingLogo] = useState(false)

	const uploadLogo = async (file: File) => {
		setUploadingLogo(true)
		setError(null)
		try {
			const formData = new FormData()
			formData.set("file", file)
			const response = await fetch("/api/admin/upload", { method: "POST", body: formData })
			const data = (await response.json().catch(() => null)) as
				| { url?: string; error?: string }
				| null
			if (!response.ok || !data?.url) {
				setError(data?.error || "Upload failed.")
				return
			}
			setSourceLogo(data.url)
		} catch {
			setError("Upload failed.")
		} finally {
			setUploadingLogo(false)
		}
	}

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()
		setSaving(true)
		setError(null)

		const payload = {
			date: date.trim(),
			title: title.trim(),
			description: description.trim(),
			source: source.trim(),
			sourceLogo: sourceLogo.trim() || undefined,
			sourceUrl: sourceUrl.trim(),
			featuredRank: featuredRank || undefined,
		}

		try {
			const response = await fetch(
				mode === "create" ? "/api/admin/press-news" : `/api/admin/press-news/${initial!.id}`,
				{
					method: mode === "create" ? "POST" : "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload),
				}
			)
			const data = (await response.json().catch(() => null)) as
				| { item?: PressNewsItem; error?: string }
				| null
			if (!response.ok) {
				setError(data?.error || "Unable to save.")
				return
			}
			router.push("/admin/press-news")
			router.refresh()
		} catch {
			setError("Unable to save.")
		} finally {
			setSaving(false)
		}
	}

	return (
		<div className="space-y-6">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div>
					<h1 className="text-2xl font-bold text-white">
						{mode === "create" ? "Add press article" : "Edit press article"}
					</h1>
					<p className="mt-1 text-sm text-white/55">
						Write a title and a description, and the card opens the original article.
					</p>
				</div>
				<Link
					href="/admin/press-news"
					className="text-sm text-white/60 underline underline-offset-2 hover:text-white"
				>
					Cancel
				</Link>
			</div>

			<div className="grid gap-8 lg:grid-cols-2">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="date" className={labelClass}>
							Date
						</label>
						<input
							id="date"
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							required
							className={`${inputClass} [color-scheme:dark]`}
						/>
					</div>

					<div>
						<label htmlFor="title" className={labelClass}>
							Title
						</label>
						<input
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
							maxLength={300}
							className={inputClass}
						/>
					</div>

					<div>
						<label htmlFor="description" className={labelClass}>
							Description
						</label>
						<textarea
							id="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
							maxLength={500}
							rows={4}
							placeholder="Short summary shown on Press News and the homepage"
							className={`${inputClass} min-h-[110px] resize-y`}
						/>
					</div>

					<div className="grid gap-4 sm:grid-cols-2">
						<div>
							<label htmlFor="source" className={labelClass}>
								Press source
							</label>
							<input
								id="source"
								value={source}
								onChange={(e) => setSource(e.target.value)}
								placeholder="The Wall Street Journal"
								required
								maxLength={120}
								className={inputClass}
							/>
						</div>
						<div>
							<label htmlFor="sourceUrl" className={labelClass}>
								Article URL
							</label>
							<input
								id="sourceUrl"
								type="url"
								value={sourceUrl}
								onChange={(e) => setSourceUrl(e.target.value)}
								placeholder="https://"
								required
								className={inputClass}
							/>
						</div>
					</div>

					<div>
						<label htmlFor="sourceLogo" className={labelClass}>
							Source logo
						</label>
						<div className="flex flex-col gap-2 sm:flex-row">
							<input
								id="sourceLogo"
								value={sourceLogo}
								onChange={(e) => setSourceLogo(e.target.value)}
								placeholder="/press/wsj.svg"
								className={inputClass}
							/>
							<label className="inline-flex shrink-0 cursor-pointer items-center justify-center border border-white/15 px-4 py-3 text-sm text-white/80 hover:border-white/30">
								{uploadingLogo ? "Uploading…" : "Upload"}
								<input
									type="file"
									accept="image/jpeg,image/png,image/webp,image/gif"
									className="hidden"
									disabled={uploadingLogo}
									onChange={(e) => {
										const file = e.target.files?.[0]
										if (file) void uploadLogo(file)
										e.target.value = ""
									}}
								/>
							</label>
						</div>
					</div>

					<div>
						<p className={labelClass}>Homepage favorite</p>
						<div className="flex flex-wrap gap-2">
							<button
								type="button"
								onClick={() => setFeaturedRank(0)}
								className={`border px-3 py-2 text-sm transition-colors ${
									featuredRank === 0
										? "border-[#00FF88] bg-[#00FF88] text-black"
										: "border-white/15 text-white/70 hover:border-white/30 hover:text-white"
								}`}
							>
								None
							</button>
							{([1, 2, 3] as FeaturedRank[]).map((rank) => (
								<button
									key={rank}
									type="button"
									onClick={() => setFeaturedRank(rank)}
									className={`h-10 w-10 border text-sm font-medium transition-colors ${
										featuredRank === rank
											? "border-[#00FF88] bg-[#00FF88] text-black"
											: "border-white/15 text-white/70 hover:border-[#00FF88]/50 hover:text-[#00FF88]"
									}`}
								>
									{rank}
								</button>
							))}
						</div>
						<p className="mt-2 text-xs text-white/45">
							Slots 1, 2 and 3 appear on the homepage. Assigning a slot already in use will
							take it from the other article.
						</p>
					</div>

					{error ? (
						<p
							className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
							role="alert"
						>
							{error}
						</p>
					) : null}

					<button
						type="submit"
						disabled={saving || uploadingLogo}
						className="inline-flex w-full items-center justify-center border border-neutral-800 bg-white px-8 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-[#00FF88] disabled:opacity-70 sm:w-auto"
					>
						{saving ? "Saving…" : mode === "create" ? "Publish" : "Save changes"}
					</button>
				</form>

				<div className="space-y-3">
					<p className="text-xs font-medium uppercase tracking-wide text-white/55">Live preview</p>
					<article className="border border-white/[0.07] bg-[#080808] p-5 sm:p-6">
						<div className="space-y-4">
							{date ? (
								<NewsDateLabel date={date} className="block text-sm" />
							) : (
								<span className="text-sm text-white/40">Date</span>
							)}
							<h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
								{title || "Untitled"}
							</h3>
							{source ? <PressSourceBadge source={source} logo={sourceLogo || undefined} /> : null}
							<p className="text-sm leading-relaxed text-white/[0.72]">
								{description || "Add a description to preview…"}
							</p>
							<span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#00FF88]">
								Read article
								<ArrowUpRight className="h-4 w-4" />
							</span>
						</div>
					</article>
				</div>
			</div>
		</div>
	)
}
