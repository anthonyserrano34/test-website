"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Linkedin } from "lucide-react"

type FooterLink = { href: string; label: string; external?: boolean }

const COMPANY_LINKS: FooterLink[] = [
	{ href: "/company/altwy", label: "Altwy" },
	{ href: "/company/our-team", label: "Our Team" },
]

const RESOURCES_LINKS: FooterLink[] = [
	{ href: "/news", label: "Altwy News" },
	{ href: "/press-news", label: "Press News" },
	{ href: "/contact", label: "Contact" },
]

const LEGAL_LINKS: FooterLink[] = [{ href: "/privacy-policy", label: "Privacy Policy" }]

function FooterLinkList({ links }: { links: FooterLink[] }) {
	return (
		<ul className="mt-4 space-y-2.5">
			{links.map((link) => (
				<li key={link.href}>
					{link.external ? (
						<a
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-white/60 transition-colors hover:text-white"
						>
							{link.label}
						</a>
					) : (
						<Link
							href={link.href}
							className="text-sm text-white/60 transition-colors hover:text-white"
						>
							{link.label}
						</Link>
					)}
				</li>
			))}
		</ul>
	)
}

export function SiteFooter() {
	const pathname = usePathname()

	if (pathname.startsWith("/admin")) {
		return null
	}

	return (
		<footer className="relative z-10 border-t border-white/[0.07] bg-[#0A0A0A]">
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
				<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
					<div>
						<Link href="/" className="inline-block">
							<Image
								src="/logo.png"
								alt="Altwy"
								width={110}
								height={32}
								className="h-8 w-auto"
							/>
						</Link>
						<p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
							Next-generation cloud infrastructure software. Built in Europe for a
							power-constrained world.
						</p>
					</div>

					<div>
						<p className="text-xs font-medium uppercase tracking-[0.16em] text-white/35">
							Company
						</p>
						<FooterLinkList links={COMPANY_LINKS} />
					</div>

					<div>
						<p className="text-xs font-medium uppercase tracking-[0.16em] text-white/35">
							Resources
						</p>
						<FooterLinkList links={RESOURCES_LINKS} />
					</div>

					<div>
						<p className="text-xs font-medium uppercase tracking-[0.16em] text-white/35">
							Legal
						</p>
						<FooterLinkList links={LEGAL_LINKS} />
					</div>
				</div>

				<div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center">
					<p className="text-xs text-white/35">
						© {new Date().getFullYear()} Altwy. All rights reserved.
					</p>
					<a
						href="https://linkedin.com/company/altwy"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 text-xs text-white/45 transition-colors hover:text-white"
						aria-label="Altwy on LinkedIn"
					>
						<Linkedin className="h-4 w-4" />
						Follow on LinkedIn
					</a>
				</div>
			</div>
		</footer>
	)
}
