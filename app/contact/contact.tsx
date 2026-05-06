"use client"

import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Mail, Copy, Check, ArrowUpRight } from "lucide-react"
import { useState, useEffect, FormEvent } from "react"
import Navbar from "@/components/Navbar"
import { SubpageHeroHeader } from "@/components/ui/subpage-hero-header"

const labelClass =
	"mb-2 block text-xs font-medium uppercase tracking-wide text-white/75"

const inputClass =
	"w-full rounded-none border border-white/[0.08] bg-[#161616] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-white/20 focus:bg-[#1a1a1a] focus:ring-2 focus:ring-[#00FF88]/20"

const textareaClass = `${inputClass} min-h-[140px] resize-y py-3`

export default function ContactPage() {
	const [scrollY, setScrollY] = useState(0)
	const [copied, setCopied] = useState(false)
	const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle")

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY)
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	const handleCopy = () => {
		navigator.clipboard.writeText("contact@altwy.com")
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
		if (window.gtag) {
			window.gtag("event", "email_copy_contact_page", {
				event_category: "engagement",
				event_label: "Email copied on Contact page",
			})
		}
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (window.gtag) {
			window.gtag("event", "contact_form_submit", {
				event_category: "engagement",
				event_label: "Contact form submitted",
			})
		}
		setSubmitStatus("success")
	}

	const fadeInUpVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	}

	return (
		<div className="relative min-h-screen bg-[var(--background)]">
			<SubpageHeroHeader />
			<Navbar isTransparent={scrollY <= 50} />

			<main className="relative z-10 mx-auto max-w-3xl px-4 pb-24 pt-24">
				<motion.div
					initial="hidden"
					animate="visible"
					variants={fadeInUpVariants}
					className="relative mb-10 text-center"
				>
					<motion.div
						className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#00FF88]/20 px-4 py-1"
						variants={fadeInUpVariants}
					>
						<span className="text-sm font-medium text-[#00FF88]">Get in Touch</span>
					</motion.div>
					<motion.h1
						className="relative z-10 mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl"
						variants={fadeInUpVariants}
					>
						Let&apos;s have a chat
					</motion.h1>
					<motion.p
						className="relative z-10 mx-auto max-w-lg text-base leading-relaxed text-white/65 md:text-lg"
						variants={fadeInUpVariants}
					>
						Questions about our products, partnerships, or anything else? We&apos;re here to help.
					</motion.p>

					<motion.div
						className="relative z-10 mx-auto mt-8 w-full max-w-md"
						variants={fadeInUpVariants}
					>
						<div className="flex overflow-hidden rounded-none border border-white/[0.1] bg-[#161616]">
							<div className="flex min-w-0 flex-1 items-center gap-2.5 px-4 py-3">
								<Mail className="h-4 w-4 shrink-0 text-[#00FF88]" strokeWidth={1.75} />
								<span className="select-all truncate font-mono text-sm text-white/90">
									contact@altwy.com
								</span>
							</div>
							<motion.button
								type="button"
								onClick={handleCopy}
								whileHover={{ backgroundColor: "rgba(255,255,255,0.04)" }}
								whileTap={{ scale: 0.98 }}
								className="flex shrink-0 items-center gap-2 border-l border-white/10 px-4 py-3 text-sm font-medium text-white/75 transition-colors hover:text-white"
								aria-label="Copy email address"
							>
								{copied ? (
									<>
										<Check className="h-4 w-4 text-[#00FF88]" />
										<span className="hidden sm:inline">Copied</span>
									</>
								) : (
									<>
										<Copy className="h-4 w-4" />
										<span className="hidden sm:inline">Copy</span>
									</>
								)}
							</motion.button>
						</div>
						<AnimatePresence>
							{copied && (
								<motion.p
									initial={{ opacity: 0, y: 4 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 4 }}
									className="mt-2 text-center text-xs text-white/55"
								>
									Address copied to clipboard
								</motion.p>
							)}
						</AnimatePresence>
					</motion.div>
				</motion.div>

				<motion.div variants={fadeInUpVariants} initial="hidden" animate="visible">
					<form onSubmit={handleSubmit} className="space-y-5">
						<div className="grid gap-5 sm:grid-cols-2">
							<div>
								<label htmlFor="firstName" className={labelClass}>
									First name <span className="normal-case text-red-400">*</span>
								</label>
								<input
									id="firstName"
									name="firstName"
									type="text"
									required
									autoComplete="given-name"
									className={inputClass}
									placeholder="Jane"
								/>
							</div>
							<div>
								<label htmlFor="lastName" className={labelClass}>
									Last name <span className="normal-case text-red-400">*</span>
								</label>
								<input
									id="lastName"
									name="lastName"
									type="text"
									required
									autoComplete="family-name"
									className={inputClass}
									placeholder="Doe"
								/>
							</div>
						</div>

						<div className="grid gap-5 sm:grid-cols-2">
							<div>
								<label htmlFor="email" className={labelClass}>
									Email <span className="normal-case text-red-400">*</span>
								</label>
								<input
									id="email"
									name="email"
									type="email"
									required
									autoComplete="email"
									className={inputClass}
									placeholder="you@company.com"
								/>
							</div>
							<div>
								<label htmlFor="phone" className={labelClass}>
									Phone <span className="normal-case text-red-400">*</span>
								</label>
								<input
									id="phone"
									name="phone"
									type="tel"
									required
									autoComplete="tel"
									className={inputClass}
									placeholder="Country code + number (e.g. +1 234 567 8900)"
								/>
							</div>
						</div>

						<div className="grid gap-5 sm:grid-cols-2">
							<div>
								<label htmlFor="company" className={labelClass}>
									Company <span className="normal-case text-red-400">*</span>
								</label>
								<input
									id="company"
									name="company"
									type="text"
									required
									autoComplete="organization"
									className={inputClass}
									placeholder="Your company"
								/>
							</div>
							<div>
								<label htmlFor="jobTitle" className={labelClass}>
									Job title <span className="normal-case text-red-400">*</span>
								</label>
								<input
									id="jobTitle"
									name="jobTitle"
									type="text"
									required
									autoComplete="organization-title"
									className={inputClass}
									placeholder="Your role"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="country" className={labelClass}>
								Country <span className="normal-case text-red-400">*</span>
							</label>
							<input
								id="country"
								name="country"
								type="text"
								required
								autoComplete="country-name"
								className={inputClass}
								placeholder="Country or region"
							/>
						</div>

						<div>
							<label htmlFor="message" className={labelClass}>
								Message <span className="normal-case text-red-400">*</span>
							</label>
							<textarea
								id="message"
								name="message"
								required
								rows={5}
								className={textareaClass}
								placeholder="How can we help you?"
							/>
						</div>

						<div className="space-y-4 pt-2">
							{submitStatus === "success" && (
								<p
									className="rounded-none border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/80"
									role="status"
								>
									Thank you for your message. We will get back to you shortly.
								</p>
							)}
							<button
								type="submit"
								className="group relative inline-flex w-full items-center justify-center rounded-none border border-neutral-800 bg-white px-8 py-3 text-sm font-medium text-neutral-900 transition-colors duration-300 hover:border-[#00FF88]"
							>
								<div className="absolute left-0 top-0 h-2 w-2 border-l border-t border-[#00FF88] opacity-0 transition-all duration-300 -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
								<div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-[#00FF88] opacity-0 transition-all duration-300 translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
								<span className="relative z-10 flex items-center justify-center gap-2">
									Send message
									<ArrowUpRight className="h-4 w-4" />
								</span>
							</button>
							<p className="text-xs leading-relaxed text-white/50">
								<span className="font-medium text-white/65">Privacy notice: </span>
								By submitting this form, you agree that Altwy may process your personal data to
								respond to your request and manage our commercial relationship. In accordance with
								GDPR, you have the right to access, rectify, or delete your data at any time. For
								more information, please consult our{" "}
								<Link
									href="/privacy-policy"
									className="text-[#00FF88] underline underline-offset-2 hover:text-[#00FF88]/80"
								>
									Privacy Policy
								</Link>
								.
							</p>
						</div>
					</form>
				</motion.div>
			</main>
		</div>
	)
}
