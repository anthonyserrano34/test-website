import { Fragment, type ReactNode } from "react"

function formatInline(text: string, keyPrefix = "i"): ReactNode {
	const parts = text.split(
		/(\*\*.*?\*\*|__.*?__|\+\+.*?\+\+|~~.*?~~|==.*?==|\^\^.*?\^\^|\[.*?\]\(.*?\)|\*.*?\*)/g
	)

	return parts.map((part, index) => {
		const key = `${keyPrefix}-${index}`

		if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
			return <strong key={key}>{formatInline(part.slice(2, -2), key)}</strong>
		}
		if (part.startsWith("__") && part.endsWith("__") && part.length >= 4) {
			return (
				<span key={key} className="text-[1.05em] font-medium">
					{formatInline(part.slice(2, -2), key)}
				</span>
			)
		}
		if (part.startsWith("++") && part.endsWith("++") && part.length >= 4) {
			return <span key={key} className="underline underline-offset-2">{formatInline(part.slice(2, -2), key)}</span>
		}
		if (part.startsWith("~~") && part.endsWith("~~") && part.length >= 4) {
			return <span key={key} className="line-through opacity-75">{formatInline(part.slice(2, -2), key)}</span>
		}
		if (part.startsWith("==") && part.endsWith("==") && part.length >= 4) {
			return (
				<span key={key} className="font-medium text-[#00FF88]">
					{formatInline(part.slice(2, -2), key)}
				</span>
			)
		}
		if (part.startsWith("^^") && part.endsWith("^^") && part.length >= 4) {
			return <span key={key} className="text-[0.9em] text-white/75">{formatInline(part.slice(2, -2), key)}</span>
		}

		const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/)
		if (linkMatch) {
			const [, label, href] = linkMatch
			const safeHref = href.startsWith("http://") || href.startsWith("https://") ? href : `https://${href}`
			return (
				<a
					key={key}
					href={safeHref}
					target="_blank"
					rel="noopener noreferrer"
					className="text-[#00FF88] underline transition-colors duration-200 hover:text-[#00FF88]/80"
				>
					{formatInline(label, key)}
				</a>
			)
		}

		if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
			return <em key={key}>{formatInline(part.slice(1, -1), key)}</em>
		}

		const urlParts = part.split(/(https?:\/\/[^\s]+)/g)
		return urlParts.map((urlPart, urlIndex) => {
			if (/^https?:\/\/[^\s]+$/.test(urlPart)) {
				return (
					<a
						key={`${key}-u-${urlIndex}`}
						href={urlPart}
						target="_blank"
						rel="noopener noreferrer"
						className="text-[#00FF88] underline transition-colors duration-200 hover:text-[#00FF88]/80"
					>
						{urlPart}
					</a>
				)
			}

			const textParts = urlPart.split(/(Altwy)/gi)
			return textParts.map((textPart, textIndex) => {
				if (textPart.toLowerCase() === "altwy") {
					return (
						<span key={`${key}-a-${urlIndex}-${textIndex}`} className="font-galano">
							{textPart}
						</span>
					)
				}
				return (
					<Fragment key={`${key}-t-${urlIndex}-${textIndex}`}>{textPart}</Fragment>
				)
			})
		})
	})
}

export function formatNewsText(text: string): ReactNode {
	const lines = text.split("\n")

	return lines.map((line, lineIndex) => {
		const key = `l-${lineIndex}`
		const trailing = lineIndex < lines.length - 1 ? "\n" : null

		if (line.startsWith("## ")) {
			return (
				<Fragment key={key}>
					<span className="block text-[1.15em] font-semibold text-white">
						{formatInline(line.slice(3), key)}
					</span>
					{trailing}
				</Fragment>
			)
		}

		if (line.startsWith("> ")) {
			return (
				<Fragment key={key}>
					<span className="block border-l-2 border-[#00FF88]/50 pl-3 text-white/80 italic">
						{formatInline(line.slice(2), key)}
					</span>
					{trailing}
				</Fragment>
			)
		}

		if (line.startsWith("- ")) {
			return (
				<Fragment key={key}>
					<span className="flex gap-2">
						<span className="select-none text-[#00FF88]" aria-hidden>
							•
						</span>
						<span>{formatInline(line.slice(2), key)}</span>
					</span>
					{trailing}
				</Fragment>
			)
		}

		return (
			<Fragment key={key}>
				{formatInline(line, key)}
				{trailing}
			</Fragment>
		)
	})
}
