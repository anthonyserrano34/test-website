"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie } from 'lucide-react'
import { getLocalStorage, setLocalStorage } from "@/lib/storage-helper"

export default function CookieBanner() {
	const [cookieConsent, setCookieConsent] = useState<boolean | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const storedCookieConsent = getLocalStorage("cookie_consent", null)
		setCookieConsent(storedCookieConsent)
		setIsLoading(false)
	}, [])

	useEffect(() => {
		if (cookieConsent !== null) {
			setLocalStorage("cookie_consent", cookieConsent)

			const newValue = cookieConsent ? "granted" : "denied"
			if (typeof window !== "undefined" && window.gtag) {
				window.gtag("consent", "update", {
					analytics_storage: newValue,
				})
			}
		}
	}, [cookieConsent])

	if (isLoading || cookieConsent !== null) {
		return null
	}

	return (
		<AnimatePresence>
			{cookieConsent === null && (
				<motion.div
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 100, opacity: 0 }}
					transition={{ type: "spring", stiffness: 100, damping: 20 }}
					className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
				>
					<div className="mx-auto max-w-7xl">
						<div className="relative overflow-hidden rounded-xl border border-[#00FF88]/20 bg-[#0a0a0a] p-6 shadow-lg shadow-[#00FF88]/10 backdrop-blur-sm">
							<div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8">
								<div className="absolute inset-0 opacity-25"
									style={{
										background: "radial-gradient(circle, rgba(0,255,136,0.22) 0%, rgba(0,255,136,0) 70%)",
									}}
								/>
							</div>

							<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between relative z-10">
								<div className="flex items-start gap-4">
									<div className="rounded-lg bg-[#141414] p-2">
										<Cookie className="h-6 w-6 text-[#00FF88]" />
									</div>
									<div className="flex-1">
										<h3 className="mb-1 text-lg font-semibold text-white">We use cookies!</h3>
										<p className="text-sm/relaxed text-white/70">
											<span className="font-galano">Altwy</span> use cookies to enhance your browsing experience and analyze our traffic.
											Your data will be handled in accordance with our <a href="/privacy-policy" className="underline text-[#00FF88] hover:text-[#33ffa3]">privacy policy</a>.
										</p>
									</div>
								</div>
								<div className="flex flex-col gap-2 sm:flex-row md:ml-8">
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setCookieConsent(false)}
										className="rounded-lg border border-white/15 bg-transparent px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10"
									>
										Decline
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setCookieConsent(true)}
										className="rounded-lg bg-[#00FF88] px-4 py-2 text-sm font-medium text-[#0a0a0a] transition-colors hover:bg-[#33ffa3]"
									>
										Accept
									</motion.button>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}