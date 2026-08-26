"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useRef, useState } from "react"
import NewsArticlePreview from "@/components/news/NewsArticlePreview"
import {
	normalizeVideoEmbedInput,
	slugifyTitle,
	type NewsItem,
	type NewsMediaType,
} from "@/lib/news"

const labelClass = "mb-2 block text-xs font-medium uppercase tracking-wide text-white/75"
const inputClass =
	"w-full border border-white/[0.08] bg-[#161616] px-4 py-3 text-sm text-white outline-none focus:border-white/20 focus:ring-2 focus:ring-[#00FF88]/20"
const toolbarBtnClass =
	"border border-white/15 px-2.5 py-1 text-xs font-medium text-white/80 transition-colors hover:border-[#00FF88]/50 hover:text-[#00FF88]"

type MediaChoice = "none" | NewsMediaType

type NewsEditorFormProps = {
	mode: "create" | "edit"
	initial?: NewsItem
}

function wrapSelection(
	value: string,
	start: number,
	end: number,
	before: string,
	after: string
) {
	const selected = value.slice(start, end) || "text"
	const next = value.slice(0, start) + before + selected + after + value.slice(end)
	const cursorStart = start + before.length
	const cursorEnd = cursorStart + selected.length
	return { next, cursorStart, cursorEnd }
}

export default function NewsEditorForm({ mode, initial }: NewsEditorFormProps) {
	const router = useRouter()
	const contentRef = useRef<HTMLTextAreaElement>(null)
	const [date, setDate] = useState(initial?.date ?? new Date().toISOString().slice(0, 10))
	const [title, setTitle] = useState(initial?.title ?? "")
	const [slug, setSlug] = useState(initial?.slug ?? "")
	const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug))
	const [author, setAuthor] = useState(initial?.author ?? "Christophe Lambert")
	const [content, setContent] = useState(initial?.content ?? "")
	const [mediaChoice, setMediaChoice] = useState<MediaChoice>(initial?.mediaType ?? "none")
	const [mediaUrl, setMediaUrl] = useState(initial?.mediaUrl ?? "")
	const [mediaAlt, setMediaAlt] = useState(initial?.mediaAlt ?? "")
	const [error, setError] = useState<string | null>(null)
	const [saving, setSaving] = useState(false)
	const [uploading, setUploading] = useState(false)

	useEffect(() => {
		if (!slugTouched) setSlug(slugifyTitle(title))
	}, [title, slugTouched])

	const previewItem: Pick<
		NewsItem,
		"title" | "date" | "content" | "author" | "mediaType" | "mediaUrl" | "mediaAlt"
	> = {
		date,
		title,
		content,
		author: author || undefined,
		mediaType: mediaChoice === "none" ? undefined : mediaChoice,
		mediaUrl:
			mediaChoice === "none"
				? undefined
				: mediaChoice === "video"
					? normalizeVideoEmbedInput(mediaUrl) || undefined
					: mediaUrl || undefined,
		mediaAlt: mediaChoice === "image" ? mediaAlt || undefined : undefined,
	}

	const applyMarkup = (before: string, after: string) => {
		const el = contentRef.current
		if (!el) return
		const start = el.selectionStart
		const end = el.selectionEnd
		const { next, cursorStart, cursorEnd } = wrapSelection(content, start, end, before, after)
		setContent(next)
		requestAnimationFrame(() => {
			el.focus()
			el.setSelectionRange(cursorStart, cursorEnd)
		})
	}

	const applyLinePrefix = (prefix: string) => {
		const el = contentRef.current
		if (!el) return
		const start = el.selectionStart
		const end = el.selectionEnd
		const lineStart = content.lastIndexOf("\n", start - 1) + 1
		const lineEndIndex = content.indexOf("\n", end)
		const lineEnd = lineEndIndex === -1 ? content.length : lineEndIndex
		const block = content.slice(lineStart, lineEnd)
		const nextBlock = block
			.split("\n")
			.map((line) => (line.startsWith(prefix) ? line : `${prefix}${line || "text"}`))
			.join("\n")
		const next = content.slice(0, lineStart) + nextBlock + content.slice(lineEnd)
		setContent(next)
		requestAnimationFrame(() => {
			el.focus()
			el.setSelectionRange(lineStart, lineStart + nextBlock.length)
		})
	}

	const applyLink = () => {
		const el = contentRef.current
		if (!el) return
		const url = window.prompt("Link URL", "https://")
		if (!url?.trim()) return
		const start = el.selectionStart
		const end = el.selectionEnd
		const { next, cursorStart, cursorEnd } = wrapSelection(
			content,
			start,
			end,
			"[",
			`](${url.trim()})`
		)
		setContent(next)
		requestAnimationFrame(() => {
			el.focus()
			el.setSelectionRange(cursorStart, cursorEnd)
		})
	}

	const uploadImage = async (file: File) => {
		setUploading(true)
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
			setMediaUrl(data.url)
			setMediaChoice("image")
		} catch {
			setError("Upload failed.")
		} finally {
			setUploading(false)
		}
	}

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()
		setSaving(true)
		setError(null)

		if (mediaChoice !== "none" && !mediaUrl.trim()) {
			setError(mediaChoice === "image" ? "Please add an image." : "Please add a video URL.")
			setSaving(false)
			return
		}

		let resolvedMediaUrl = mediaUrl.trim()
		if (mediaChoice === "video") {
			const normalized = normalizeVideoEmbedInput(resolvedMediaUrl)
			if (!normalized) {
				setError(
					"Invalid video embed. Use a YouTube URL/embed or a LinkedIn embed URL / iframe."
				)
				setSaving(false)
				return
			}
			resolvedMediaUrl = normalized
			setMediaUrl(normalized)
		}

		const payload = {
			date: date.trim(),
			slug: slug.trim() || slugifyTitle(title),
			title: title.trim(),
			author: author.trim() || undefined,
			content: content.trim(),
			mediaType: mediaChoice === "none" ? undefined : mediaChoice,
			mediaUrl: mediaChoice === "none" ? undefined : resolvedMediaUrl,
			mediaAlt: mediaChoice === "image" ? mediaAlt.trim() || undefined : undefined,
		}

		try {
			const response = await fetch(
				mode === "create" ? "/api/admin/news" : `/api/admin/news/${initial!.id}`,
				{
					method: mode === "create" ? "POST" : "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload),
				}
			)
			const data = (await response.json().catch(() => null)) as
				| { item?: NewsItem; error?: string }
				| null
			if (!response.ok) {
				setError(data?.error || "Unable to save.")
				return
			}
			router.push("/admin/news")
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
						{mode === "create" ? "Add Altwy news" : "Edit Altwy news"}
					</h1>
					<p className="mt-1 text-sm text-white/55">
						Write the article, then optionally attach an image or video.
					</p>
				</div>
				<Link
					href="/admin/news"
					className="text-sm text-white/60 underline underline-offset-2 hover:text-white"
				>
					Cancel
				</Link>
			</div>

			<div className="grid gap-8 lg:grid-cols-2">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid gap-4 sm:grid-cols-2">
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
							<label htmlFor="media" className={labelClass}>
								Media
							</label>
							<select
								id="media"
								value={mediaChoice}
								onChange={(e) => {
									const value = e.target.value as MediaChoice
									setMediaChoice(value)
									if (value === "none") {
										setMediaUrl("")
										setMediaAlt("")
									}
								}}
								className={`${inputClass} [color-scheme:dark]`}
							>
								<option value="none">None</option>
								<option value="image">Image</option>
								<option value="video">Video</option>
							</select>
						</div>
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

					<div className="grid gap-4 sm:grid-cols-2">
						<div>
							<label htmlFor="slug" className={labelClass}>
								Slug (URL)
							</label>
							<input
								id="slug"
								value={slug}
								onChange={(e) => {
									setSlugTouched(true)
									setSlug(slugifyTitle(e.target.value))
								}}
								required
								className={inputClass}
							/>
							<p className="mt-1 text-xs text-white/40">/news/{slug || "…"}</p>
						</div>
						<div>
							<label htmlFor="author" className={labelClass}>
								Author
							</label>
							<input
								id="author"
								value={author}
								onChange={(e) => setAuthor(e.target.value)}
								placeholder="Christophe Lambert"
								className={inputClass}
							/>
						</div>
					</div>

					{mediaChoice === "image" ? (
						<>
							<div>
								<label htmlFor="mediaUrl" className={labelClass}>
									Image
								</label>
								<div className="flex flex-col gap-2 sm:flex-row">
									<input
										id="mediaUrl"
										value={mediaUrl}
										onChange={(e) => setMediaUrl(e.target.value)}
										placeholder="/news/photo.jpg"
										className={inputClass}
									/>
									<label className="inline-flex shrink-0 cursor-pointer items-center justify-center border border-white/15 px-4 py-3 text-sm text-white/80 hover:border-white/30">
										{uploading ? "Uploading…" : "Upload"}
										<input
											type="file"
											accept="image/jpeg,image/png,image/webp,image/gif"
											className="hidden"
											disabled={uploading}
											onChange={(e) => {
												const file = e.target.files?.[0]
												if (file) void uploadImage(file)
												e.target.value = ""
											}}
										/>
									</label>
								</div>
							</div>
							<div>
								<label htmlFor="mediaAlt" className={labelClass}>
									Image alt text (optional)
								</label>
								<input
									id="mediaAlt"
									value={mediaAlt}
									onChange={(e) => setMediaAlt(e.target.value)}
									className={inputClass}
								/>
							</div>
						</>
					) : null}

					{mediaChoice === "video" ? (
						<div>
							<label htmlFor="videoUrl" className={labelClass}>
								YouTube or LinkedIn embed
							</label>
							<textarea
								id="videoUrl"
								value={mediaUrl}
								onChange={(e) => setMediaUrl(e.target.value)}
								onBlur={() => {
									const normalized = normalizeVideoEmbedInput(mediaUrl)
									if (normalized) setMediaUrl(normalized)
								}}
								required={mediaChoice === "video"}
								rows={3}
								placeholder={
									"YouTube URL / embed, or LinkedIn iframe / embed URL\n" +
									'e.g. <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:…" …>'
								}
								className={`${inputClass} min-h-[88px] resize-y font-mono text-xs`}
							/>
							<p className="mt-2 text-xs text-white/45">
								Paste a YouTube link, a LinkedIn embed URL, or the full{" "}
								<code className="text-white/60">&lt;iframe&gt;</code> snippet —
								the src is extracted automatically.
							</p>
						</div>
					) : null}

					<div>
						<div className="mb-2 flex flex-wrap items-center justify-between gap-2">
							<label htmlFor="content" className={`${labelClass} mb-0`}>
								Content
							</label>
							<div className="flex flex-wrap gap-1.5">
								<button
									type="button"
									className={toolbarBtnClass}
									onClick={() => applyMarkup("**", "**")}
									title="Bold **text**"
								>
									Bold
								</button>
								<button
									type="button"
									className={`${toolbarBtnClass} italic`}
									onClick={() => applyMarkup("*", "*")}
									title="Italic *text*"
								>
									Italic
								</button>
								<button
									type="button"
									className={`${toolbarBtnClass} underline`}
									onClick={() => applyMarkup("++", "++")}
									title="Underline ++text++"
								>
									Underline
								</button>
								<button
									type="button"
									className={`${toolbarBtnClass} line-through`}
									onClick={() => applyMarkup("~~", "~~")}
									title="Strikethrough ~~text~~"
								>
									Strike
								</button>
								<button
									type="button"
									className={toolbarBtnClass}
									onClick={() => applyMarkup("__", "__")}
									title="Large text __text__"
								>
									Large
								</button>
								<button
									type="button"
									className={toolbarBtnClass}
									onClick={() => applyMarkup("^^", "^^")}
									title="Small text ^^text^^"
								>
									Small
								</button>
								<button
									type="button"
									className={`${toolbarBtnClass} text-[#00FF88]`}
									onClick={() => applyMarkup("==", "==")}
									title="Accent ==text=="
								>
									Accent
								</button>
								<button
									type="button"
									className={toolbarBtnClass}
									onClick={applyLink}
									title="Link [text](url)"
								>
									Link
								</button>
								<button
									type="button"
									className={toolbarBtnClass}
									onClick={() => applyLinePrefix("## ")}
									title="Heading ## text"
								>
									Heading
								</button>
								<button
									type="button"
									className={toolbarBtnClass}
									onClick={() => applyLinePrefix("> ")}
									title="Quote > text"
								>
									Quote
								</button>
								<button
									type="button"
									className={toolbarBtnClass}
									onClick={() => applyLinePrefix("- ")}
									title="Bullet - text"
								>
									List
								</button>
							</div>
						</div>
						<textarea
							id="content"
							ref={contentRef}
							value={content}
							onChange={(e) => setContent(e.target.value)}
							rows={14}
							placeholder="Write the article…"
							className={`${inputClass} min-h-[180px] resize-y`}
						/>
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
						disabled={saving || uploading}
						className="inline-flex w-full items-center justify-center border border-neutral-800 bg-white px-8 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-[#00FF88] disabled:opacity-70 sm:w-auto"
					>
						{saving ? "Saving…" : mode === "create" ? "Publish" : "Save changes"}
					</button>
				</form>

				<div className="space-y-3">
					<p className="text-xs font-medium uppercase tracking-wide text-white/55">Live preview</p>
					<NewsArticlePreview item={previewItem} expanded />
				</div>
			</div>
		</div>
	)
}
