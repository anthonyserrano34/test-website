"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Linkedin, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import Navbar from "@/components/Navbar"
import { BentoCardShell } from "@/components/ui/bento-card-shell"
import { SubpageHeroHeader } from "@/components/ui/subpage-hero-header"

const ceos = [
	{
		name: "Michaël EL BAKI",
		title: "Founder & Chief Technology Officer",
		bio: "Initially head of the Dublin R&D center of a French software publisher (Sophis, investment banking,  €300m exit), then founder of one of the first studios (BitRabbit, Ireland) to develop cross-platform games and tools for smartphones (2004), before founding the industry's first \"Games as a Service\" backend (Clan of the Cloud, France) in 2011, renamed XtraLife in 2016. 30 years experience in building and managing local and remote teams, IT systems architecture, APIs design and software design and development.",
		experience: ["Entrepreneurship", "Project management", "SaaS", "Gaming", "Risk management software"],
		image: "/company/michael_el_baki.jpg",
		linkedin: "https://www.linkedin.com/in/michaelelbaki/",
	},
	{
		name: "Christophe LAMBERT",
		title: "Chief Executive Officer",
		bio: "Through several leadership roles, I was able to develop strong skills in strategic thought processes as well as building and running different size organizations. My knowledge scope in the IT industry is strong as I worked for technology leaders like HPE and was able to positively influence the success of startups like NetApp, SimpliVity and Cohesity. Besides that I was part of the root of the Internet in France and created a few startups back then.",
		experience: ["Leadership", "Strategic advisor", "Cloud computing", "IT market", "Team building"],
		image: "/company/christophe_lambert.jpg",
		linkedin: "https://www.linkedin.com/in/christophelambert/",
	},
	{
		name: "Peter MAHLMEISTER",
		title: "Chief Strategy Officer",
		bio: `As a sales trainee, Peter immersed himself in the complex sales landscape of enterprise computing, mastering both direct and indirect sales strategies and understanding the intricate technology ecosystems emerging during the late 1980s. Throughout his career, Peter became known for his strategic thinking and ability to close landmark deals that helped establish NetApp's market leadership in enterprise data management. His strategic approach coupled with his teams were instrumental in driving sales during a period when NetApp, Tintri, SimpliVity and Cohesity were expanding their presence in the Cloud.`,
		experience: ["Leadership", "Sales Ecosystem Networker", "Team builder/worker", "Strategist", "IT/Cloud landscape"],
		image: "/company/peter_mahlmeister.jpg",
		linkedin: "https://www.linkedin.com/in/petermahlmeister/",
	}
]

export default function CompanyPage() {
	const [scrollY, setScrollY] = useState(0)
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY)
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	const fadeInUpVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
	}

	const staggerContainer = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1
			}
		}
	}

	return (
		<div className="relative min-h-screen bg-[var(--background)] pb-24">
			<SubpageHeroHeader />
			{/* Navbar */}
			<Navbar isTransparent={scrollY <= 50} />

			{/* Main Content */}
			<main className="relative z-10 pt-24 px-4 max-w-4xl mx-auto pb-24">
				{/* Header */}
				<motion.div
					initial="hidden"
					animate="visible"
					variants={fadeInUpVariants}
					className="text-center mb-12 relative"
				>
					<motion.div
						className="inline-flex items-center gap-2 bg-[#00FF88]/20 rounded-full px-4 py-1 mb-4"
						variants={fadeInUpVariants}
					>
						<span className="text-[#00FF88] text-sm font-medium">Our Team</span>
					</motion.div>
					<motion.h1
						className={`text-4xl md:text-5xl font-bold text-white mb-4 relative z-10`}
						variants={fadeInUpVariants}
					>
						Our Executive Team
					</motion.h1>
					<motion.p
						className="text-white/70 text-lg max-w-2xl mx-auto relative z-10"
						variants={fadeInUpVariants}
					>
						The visionaries behind <span className="font-display tracking-tight">Altwy</span>, driving innovation in datacenter management.
					</motion.p>
				</motion.div>

				{/* CEO Profiles */}
				<motion.div
					ref={ref}
					initial="hidden"
					animate={inView ? "visible" : "hidden"}
					variants={staggerContainer}
					className="space-y-12 relative"
				>
					{ceos.map((ceo, ceoIndex) => {
						const glows = ["top-left", "top-right", "bottom-right"] as const
						const glow = glows[ceoIndex % glows.length]
						return (
						<motion.div key={ceo.name} variants={fadeInUpVariants} className="relative">
							<BentoCardShell glow={glow} contentClassName="p-6 md:p-8">
							<div className="grid md:grid-cols-3 gap-8 items-start">
								<div className="md:col-span-1">
									<motion.div
										className="relative overflow-hidden rounded-xl border border-white/[0.06]"
										whileHover={{ scale: 1.02 }}
										transition={{ duration: 0.3 }}
									>
										<Image
											src={ceo.image}
											alt={ceo.name}
											width={300}
											height={400}
											className="w-full h-auto object-cover"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
										<div className="absolute bottom-4 left-4 right-4 text-white">
											<h3 className="text-xl font-medium tracking-tight">{ceo.name}</h3>
											<p className="text-sm text-slate-300">{ceo.title}</p>
										</div>
									</motion.div>
								</div>
								<div className="md:col-span-2 flex h-full flex-col space-y-4">
									<div className="flex-grow rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
										<h4 className="mb-2 text-lg font-medium tracking-tight text-[#00FF88]">Biography</h4>
										<p className="select-text text-sm leading-relaxed text-slate-400">{ceo.bio}</p>
									</div>
									<div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
										<h4 className="mb-2 text-lg font-medium tracking-tight text-[#00FF88]">Experience</h4>
										<ul className="grid grid-cols-2 select-text gap-2 text-sm text-slate-400">
											{ceo.experience.map((item, index) => (
												<li key={index} className="flex items-center gap-2">
													<CheckCircle className="h-4 w-4 shrink-0 text-[#00FF88]" />
													<span>{item}</span>
												</li>
											))}
										</ul>
									</div>
									<div className="mt-2 flex justify-center">
										<motion.a
											href={ceo.linkedin}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition-colors hover:border-[#00FF88]/25"
											whileHover={{ scale: 1.03 }}
											whileTap={{ scale: 0.98 }}
											onClick={() => {
												if (window.gtag) {
													window.gtag('event', 'opened_ceo_linkedin', {
														name: ceo.name
													});
												}
											}}
										>
											<Linkedin className="h-4 w-4 text-[#00FF88]" />
											LinkedIn
										</motion.a>
									</div>
								</div>
							</div>
							</BentoCardShell>
						</motion.div>
						)
					})}
				</motion.div>
			</main>
		</div>
	)
}