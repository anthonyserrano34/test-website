/* eslint-disable react/no-unescaped-entities */
"use client"

import Link from "next/link"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, Mail, Copy, Check } from 'lucide-react'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function ContactPage() {
	const [scrollY, setScrollY] = useState(0)
	const [menuOpen, setMenuOpen] = useState(false)
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY)
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	const handleCopy = () => {
		navigator.clipboard.writeText('contact@altwy.com')
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
		if (window.gtag) {
			window.gtag('event', 'email_copy_contact_page', {
				event_category: 'engagement',
				event_label: 'Email copied on Contact page',
			});
		}
	}

	const fadeInUpVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
	}

	return (
		<div className={`min-h-screen bg-gradient-to-br from-[#164C4C] to-[#1a3b3b] ${inter.className}`}>
			{/* Navbar */}
			<nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-[#164C4C]/90 backdrop-blur-md' : ''}`}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center">
							<Link href="/" className="flex-shrink-0">
								<Image
									src="/logo.png"
									alt="Logo"
									width={40}
									height={40}
									className="w-10 h-10"
								/>
							</Link>
						</div>
						<div className="hidden md:flex items-center space-x-4">
							<Link href="/" className="text-white hover:bg-[#57e4c5]/10 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
							<Link href="/company" className="text-white hover:bg-[#57e4c5]/10 px-3 py-2 rounded-md text-sm font-medium">Company</Link>
							<Link href="/news" className="text-white hover:bg-[#57e4c5]/10 px-3 py-2 rounded-md text-sm font-medium">News</Link>
							<Link href="/contact" className="text-white hover:bg-[#57e4c5]/10 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
						</div>
						<div className="md:hidden">
							<button
								onClick={() => setMenuOpen(!menuOpen)}
								className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#57e4c5]/10"
							>
								<Menu className="h-6 w-6" />
							</button>
						</div>
					</div>
				</div>
				{menuOpen && (
					<div className="md:hidden bg-[#164C4C]/95 backdrop-blur-md">
						<div className="px-2 pt-2 pb-3 space-y-1">
							<Link href="/" className="text-white hover:bg-[#57e4c5]/10 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
							<Link href="/company" className="text-white hover:bg-[#57e4c5]/10 block px-3 py-2 rounded-md text-base font-medium">Company</Link>
							<Link href="/news" className="text-white hover:bg-[#57e4c5]/10 block px-3 py-2 rounded-md text-base font-medium">News</Link>
							<Link href="/contact" className="text-white hover:bg-[#57e4c5]/10 block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
						</div>
					</div>
				)}
			</nav>

			{/* Main Content */}
			<main className="pt-24 px-4 max-w-4xl mx-auto relative pb-24 min-h-[150vh]">
				<motion.div
					initial="hidden"
					animate="visible"
					variants={fadeInUpVariants}
					className="text-center mb-12 relative"
				>
					<motion.div
						className="inline-flex items-center gap-2 bg-[#57e4c5]/20 rounded-full px-4 py-1 mb-4"
						variants={fadeInUpVariants}
					>
						<span className="text-[#57e4c5] text-sm font-medium">Get in Touch</span>
					</motion.div>
					<motion.h1
						className={`text-4xl md:text-5xl font-bold text-white mb-4 relative z-10`}
						variants={fadeInUpVariants}
					>
						Contact Us
					</motion.h1>
					<motion.p
						className="text-white/70 text-lg max-w-2xl mx-auto relative z-10"
						variants={fadeInUpVariants}
					>
						Reach out to us for any inquiries.
					</motion.p>
					{/* Light Halo Effect */}
					<div className="absolute inset-0 bg-[#57e4c5] opacity-20 filter blur-3xl rounded-full"></div>
				</motion.div>

				<motion.div
					variants={fadeInUpVariants}
					className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-[#57e4c5]/20 shadow-lg hover:shadow-[#57e4c5]/10 relative overflow-visible group"
				>
					<div className="flex flex-col items-center justify-center space-y-6">
						<motion.div
							className="w-20 h-20 bg-[#57e4c5]/20 rounded-full flex items-center justify-center cursor-pointer"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={handleCopy}
						>
							<Mail className="w-10 h-10 text-[#57e4c5]" />
						</motion.div>
						<h2 className={`text-2xl font-bold text-white`}>Email</h2>
						<p className="text-white/70 text-center">
							For any questions or inquiries, please email us at:
						</p>
						<div className="relative">
							<motion.button
								className="bg-[#57e4c5]/10 hover:bg-[#57e4c5]/20 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2"
								onClick={handleCopy}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<span className="text-xl">contact@altwy.com</span>
								{copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
							</motion.button>
							<AnimatePresence>
								{copied && (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 10 }}
										className="absolute left-1/2 transform -translate-x-1/2 mt-4 px-4 py-2 bg-[#57e4c5] text-[#164C4C] rounded-md text-sm font-medium whitespace-nowrap"
									>
										Copied to clipboard!
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>
				</motion.div>
			</main>
		</div>
	)
}