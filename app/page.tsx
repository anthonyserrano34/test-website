"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { BarChart3, Calendar, Gift, MessageSquare, LineChart, Share2, Linkedin, Menu, Leaf, Play } from 'lucide-react'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })
const galanoGrotesque = localFont({ src: './fonts/0_GalanoGrotesqueDEMO-Bold.otf' })

export default function HomePage() {
	const [menuOpen, setMenuOpen] = useState(false)
	const [isNavbarTransparent, setIsNavbarTransparent] = useState(true)

	const [heroRef, heroInView] = useInView({
		threshold: 0,
		initialInView: true,
	})
	const [videoRef] = useInView({ triggerOnce: true, threshold: 0.1 })
	const [partnersRef, partnersInView] = useInView({ triggerOnce: true, threshold: 0.1 })
	const [featureRef, featureInView] = useInView({ triggerOnce: true, threshold: 0.1 })
	const [securityRef, securityInView] = useInView({ triggerOnce: true, threshold: 0.1 })
	const [solutionsRef, solutionsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
	const [linkedinRef, linkedinInView] = useInView({ triggerOnce: true, threshold: 0.1 })

	const [isVideoLoaded, setIsVideoLoaded] = useState(false)

	useEffect(() => {
		setIsNavbarTransparent(heroInView)
	}, [heroInView])

	const fadeInUpVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
	}

	const loadVideo = () => {
		setIsVideoLoaded(true)
		if (window.gtag) {
			window.gtag('event', 'played_video_homepage', {
				event_category: 'engagement',
				event_label: 'User played the video on the homepage',
			});
		}
	}

	const logos = [
		{ src: "/bpifrance-logo-blanc.png", alt: "BPI France Logo" },
		{ src: "/logo-france2030-white.png", alt: "France 2030 Logo" },
		{ src: "/slush_logo_white.png", alt: "SLUSH Logo" },
	]

	return (
		<div className={`min-h-screen bg-[#164C4C] ${inter.className}`}>
			{/* Navbar */}
			<nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isNavbarTransparent && !menuOpen ? '' : 'bg-[#164C4C]/95 backdrop-blur-md'}`}>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center">
							<Link href="/" className="flex-shrink-0">
								<Image
									src="/logo.png"
									alt="Altwy Logo"
									width={40}
									height={40}
									className="w-10 h-10"
								/>
							</Link>
						</div>
						<div className="hidden md:block">
							<div className="ml-10 flex items-baseline space-x-4">
								<Link href="/" className="text-white hover:bg-[#57e4c5]/10 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
								<Link href="/company" className="text-white hover:bg-[#57e4c5]/10 px-3 py-2 rounded-md text-sm font-medium">Company</Link>
								<Link href="news" className="text-white hover:bg-[#57e4c5]/10 px-3 py-2 rounded-md text-sm font-medium">News</Link>
								<Link href="/contact" className="text-white hover:bg-[#57e4c5]/10 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
							</div>
						</div>
						<div className="md:hidden">
							<button
								onClick={() => setMenuOpen(!menuOpen)}
								className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-[#57e4c5]/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							>
								<Menu className="h-6 w-6" />
							</button>
						</div>
					</div>
				</div>
				{menuOpen && (
					<div className="md:hidden bg-[#164C4C]/95 backdrop-blur-md">
						<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
							<Link href="/" className="text-white hover:bg-[#57e4c5]/10 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
							<Link href="/company" className="text-white hover:bg-[#57e4c5]/10 block px-3 py-2 rounded-md text-base font-medium">Company</Link>
							<Link href="/news" className="text-white hover:bg-[#57e4c5]/10 block px-3 py-2 rounded-md text-base font-medium">News</Link>
							<Link href="/contact" className="text-white hover:bg-[#57e4c5]/10 block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
						</div>
					</div>
				)}
			</nav>

			{/* Hero section */}
			<motion.div
				className="relative overflow-hidden"
				ref={heroRef}
				initial="hidden"
				animate={heroInView ? "visible" : "hidden"}
				variants={fadeInUpVariants}
			>
				{/* Glowing effect */}
				<motion.div
					className="absolute inset-0 overflow-hidden"
				>
					<div
						className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1800px] h-[800px]"
						style={{
							background: `
              radial-gradient(circle at center, 
                rgba(64,224,208,0.6) 0%, 
                rgba(64,224,208,0.4) 20%, 
                rgba(64,224,208,0.3) 40%,
                rgba(22,76,76,0) 70%),
              radial-gradient(circle at center, 
                rgba(64,224,208,0.5) 0%, 
                rgba(64,224,208,0.3) 30%, 
                rgba(22,76,76,0) 70%)
                `,
							filter: 'blur(60px)',
							animation: 'pulse 4s infinite',
						}}
					/>
				</motion.div>

				{/* Particle effect */}
				<div className="absolute inset-0 overflow-hidden">
					{[...Array(150)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute rounded-full bg-teal-300 opacity-20"
							style={{
								width: Math.random() * 2 + 1 + 'px',
								height: Math.random() * 2 + 1 + 'px',
								top: Math.random() * 100 + '%',
								left: Math.random() * 100 + '%',
							}}
							animate={{
								y: [0, -30, 0],
								opacity: [0.2, 0.5, 0.2],
								scale: [1, 1.2, 1],
							}}
							transition={{
								duration: Math.random() * 2 + 3,
								repeat: Infinity,
								delay: Math.random() * 2,
							}}
						/>
					))}
				</div>

				{/* Hero Content */}
				<div className="relative z-10 px-4 pt-32">
					<div className="max-w-4xl mx-auto text-center">
						<motion.div
							className="inline-flex items-center gap-2 bg-[#164C4C] rounded-full px-4 py-1 mb-8"
							variants={fadeInUpVariants}
						>
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#57e4c5]">
								<path d="M8 1.6C4.4712 1.6 1.6 4.4712 1.6 8C1.6 11.5288 4.4712 14.4 8 14.4C11.5288 14.4 14.4 11.5288 14.4 8C14.4 4.4712 11.5288 1.6 8 1.6ZM8 0C12.4184 0 16 3.5816 16 8C16 12.4184 12.4184 16 8 16C3.5816 16 0 12.4184 0 8C0 3.5816 3.5816 0 8 0Z" fill="currentColor" />
								<path d="M7.2 4H8.8V5.6H7.2V4Z" fill="currentColor" />
								<path d="M7.2 7.2H8.8V12H7.2V7.2Z" fill="currentColor" />
							</svg>
							<span className="text-white/80 text-sm">Altwy Global Datacenter Management</span>
						</motion.div>

						<motion.h1
							className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
							variants={fadeInUpVariants}
						>
							<motion.span
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5, delay: 0.2 }}
							>
								The Future of<br></br>
							</motion.span>{" "}
							<motion.span
								className="text-5xl md:text-7xl"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5, delay: 0.7 }}
							>
								Datacenter Efficiency
							</motion.span>
						</motion.h1>

						<motion.p
							className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto"
							variants={fadeInUpVariants}
						>
							<p><span className={`${galanoGrotesque.className} tracking-tighter`}>Altwy</span> develops innovative cloud management software on <b>ARM</b>, <b>RISC-V</b> and <b>INTEL</b>, to optimize data center operations and reduce energy consumption.</p>
							<p>By providing tools that improve resource allocation and monitor usage, we help data centers run more sustainably.</p>
							<p>Our solutions are tailored for companies looking to cut datacenter costs and minimizing environmental impact.</p>
						</motion.p>

						{/* Video Section */}
						<div className="max-w-4xl mx-auto mb-12">
							<motion.div
								className="rounded-xl overflow-hidden bg-black aspect-video relative"
								variants={fadeInUpVariants}
								ref={videoRef}
								initial="hidden"
								animate="visible"
								transition={{ duration: 0.8, delay: 0.2 }}
							>
								{!isVideoLoaded ? (
									<div
										className="w-full h-full flex items-center justify-center cursor-pointer"
										onClick={loadVideo}
									>
										<Image
											src="https://img.youtube.com/vi/u0YKClDnWOc/maxresdefault.jpg"
											alt="Video thumbnail"
											layout="fill"
											objectFit="cover"
										/>
										<div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
											<Play className="w-16 h-16 text-white" />
										</div>
									</div>
								) : (
									<iframe
										width="100%"
										height="100%"
										src="https://www.youtube.com/embed/u0YKClDnWOc?autoplay=1&controls=1&rel=0&modestbranding=1"
										title="Altwy Video (the future of hypervisors)"
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
										className="w-full h-full"
									/>
								)}
							</motion.div>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Green Efficiency Section */}
			<motion.section
				className="relative min-h-[600px] overflow-hidden bg-[#164C4C]"
				ref={securityRef}
				initial="hidden"
				animate={securityInView ? "visible" : "hidden"}
				variants={fadeInUpVariants}
			>
				{/* Grid */}
				<div
					className="absolute inset-0"
					style={{
						background: `
              linear-gradient(to right, 
                rgba(0,0,0,0) 0%,
                rgba(64,224,208,0.1) 25%,
                rgba(64,224,208,0.1) 75%,
                rgba(0,0,0,0) 100%
              ),
              linear-gradient(to bottom, 
                rgba(0,0,0,0) 0%,
                rgba(64,224,208,0.1) 25%,
                rgba(64,224,208,0.1) 75%,
                rgba(0,0,0,0) 100%
              ),
              linear-gradient(to right, rgba(64,224,208,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(64,224,208,0.1) 1px, transparent 1px)
            `,
						backgroundSize: '100% 100%, 100% 100%, 40px 40px, 40px 40px',
						mask: 'radial-gradient(circle at center, black 0%, transparent 75%)',
					}}
				/>

				{/* Content */}
				<div className="relative max-w-6xl mx-auto px-4 py-20">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						{/* Left column */}
						<div className="space-y-8">
							<motion.p
								className="text-[#57e4c5] text-lg font-medium"
								variants={fadeInUpVariants}
							>
								Green Efficiency with <span className={`${galanoGrotesque.className} tracking-tighter`}>Altwy</span>
							</motion.p>

							<motion.h2
								className="text-4xl md:text-5xl font-bold text-white"
								variants={fadeInUpVariants}
							>
								Powering a Greener Future
							</motion.h2>
							<motion.p
								className="text-white/70 text-lg"
								variants={fadeInUpVariants}
							>
								<p><span className={`${galanoGrotesque.className} tracking-tighter`}>Altwy</span> transforms data centers with cutting-edge cloud management software that slashes energy consumption.</p>
								<p>By driving efficient resource use, <span className={`${galanoGrotesque.className} tracking-tighter`}>Altwy</span> empowers companies to reduce their carbon footprint and embrace a sustainable digital future.</p>
							</motion.p>

							<motion.div
								className="space-y-4"
								variants={fadeInUpVariants}
							>
								<button className="w-full px-6 py-3 bg-[#1a3b3b] hover:bg-[#1f4545] text-white rounded-lg transition-colors text-left border border-[#57e4c5]/30">
									ESG dashboard integrated.
								</button>
								<button className="w-full px-6 py-3 bg-[#1a3b3b] hover:bg-[#1f4545] text-white rounded-lg transition-colors text-left border border-[#57e4c5]/40">
									Supporting migration from power hungry processors to modern ones.
								</button>
								<button className="w-full px-6 py-3 bg-[#1a3b3b] hover:bg-[#1f4545] text-white rounded-lg transition-colors text-left border border-[#57e4c5]/50">
									Integrated AI decision maker to improve datacenter efficiency.
								</button>
							</motion.div>
						</div>

						{/* Right column (icon) */}
						<div className="relative hidden md:block h-[400px]">
							{/* Glow effect */}
							<div
								className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]"
								style={{
									background: 'radial-gradient(circle, rgba(64,224,208,0.2) 0%, rgba(64,224,208,0.1) 40%, transparent 70%)',
									filter: 'blur(40px)',
								}}
							/>

							<motion.div
								className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
								animate={{
									scale: [1, 1.1, 1],
									rotate: [0, 5, -5, 0],
								}}
								transition={{
									duration: 2,
									repeat: Infinity,
									ease: "easeInOut"
								}}
							>
								<div className="bg-[#1a3b3b] p-6 rounded-2xl shadow-lg border border-[#57e4c5]/20">
									<Leaf className="w-12 h-12 text-[#57e4c5]" />
								</div>
							</motion.div>

							{/* Dots */}
							{[...Array(20)].map((_, i) => (
								<motion.div
									key={i}
									className="absolute w-1.5 h-1.5 bg-[#57e4c5]/30 rounded-full"
									style={{
										top: `${Math.random() * 100}%`,
										left: `${Math.random() * 100}%`,
									}}
									animate={{
										opacity: [0.3, 1, 0.3],
										scale: [1, 1.2, 1],
									}}
									transition={{
										duration: 3,
										repeat: Infinity,
										delay: i * 0.5,
									}}
								/>
							))}
						</div>
					</div>
				</div>
			</motion.section>

			{/* Solutions section (6 cards) */}
			<motion.section
				className="relative z-10 px-4 py-16 bg-[#164C4C]"
				ref={solutionsRef}
				initial="hidden"
				animate={solutionsInView ? "visible" : "hidden"}
				variants={fadeInUpVariants}
			>
				<div className="max-w-6xl mx-auto">
					<motion.h2
						className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
						variants={fadeInUpVariants}
					>
						Here is how <span className={`${galanoGrotesque.className} tracking-tighter`}>Altwy</span> addresses daily Datacenter challenges
					</motion.h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
						{/* "Performance analytics card */}
						<motion.div
							className="bg-gradient-to-br from-[#1a3b3b] to-[#164C4C] rounded-xl p-6 border border-[#57e4c5]/20 hover:shadow-lg hover:shadow-[#57e4c5]/10 transition-all duration-300"
							variants={fadeInUpVariants}
						>
							<div className="flex items-center gap-3 mb-4">
								<div className="p-2 bg-[#57e4c5]/20 rounded-lg">
									<BarChart3 className="w-6 h-6 text-[#57e4c5]" />
								</div>
								<h3 className="text-xl font-semibold text-white">Performance Analytics</h3>
							</div>
							<p className="text-white/70 mb-4">Get insights, performance metrics, and resource utilization powered by AI.</p>
							<div className="bg-[#164C4C]/50 rounded-lg p-4 backdrop-blur-sm h-32 relative">
								<svg className="w-full h-full" viewBox="0 0 100 50">
									<motion.path
										d="M 0,25 Q 25,25 25,15 T 50,5 T 75,20 T 100,15"
										fill="none"
										stroke="#57e4c5"
										strokeWidth="2"
										initial={{ pathLength: 0 }}
										animate={{ pathLength: 1 }}
										transition={{ duration: 2, repeat: Infinity }}
									/>
								</svg>
							</div>
						</motion.div>

						{/* Resource scheduling card */}
						<motion.div
							className="bg-gradient-to-br from-[#1a3b3b] to-[#164C4C] rounded-xl p-6 border border-[#57e4c5]/20 hover:shadow-lg hover:shadow-[#57e4c5]/10 transition-all duration-300"
							variants={fadeInUpVariants}
						>
							<div className="flex items-center gap-3 mb-4">
								<div className="p-2 bg-[#57e4c5]/20 rounded-lg">
									<Calendar className="w-6 h-6 text-[#57e4c5]" />
								</div>
								<h3 className="text-xl font-semibold text-white">Resource Scheduling</h3>
							</div>
							<p className="text-white/70 mb-4">Optimize resource allocation with smart scheduling and automated management.</p>
							<div className="bg-[#164C4C]/50 rounded-lg p-4 backdrop-blur-sm">
								<div className="grid grid-cols-3 gap-2">
									{[...Array(6)].map((_, i) => (
										<motion.div
											key={i}
											className="h-8 bg-[#57e4c5]/20 rounded origin-bottom"
											animate={{
												scaleY: [0, 1, 0],
											}}
											transition={{
												duration: 2,
												delay: i * 0.2,
												repeat: Infinity,
											}}
										/>
									))}
								</div>
							</div>
						</motion.div>

						{/* Smart automation card */}
						<motion.div
							className="bg-gradient-to-br from-[#1a3b3b] to-[#164C4C] rounded-xl p-6 border border-[#57e4c5]/20 hover:shadow-lg hover:shadow-[#57e4c5]/10 transition-all duration-300"
							variants={fadeInUpVariants}
						>
							<div className="flex items-center gap-3 mb-4">
								<div className="p-2 bg-[#57e4c5]/20 rounded-lg">
									<Gift className="w-6 h-6 text-[#57e4c5]" />
								</div>
								<h3 className="text-xl font-semibold text-white">Smart Automation</h3>
							</div>
							<p className="text-white/70 mb-4">Automate resource distribution and workload management based on usage patterns.</p>
							<div className="bg-[#164C4C]/50 rounded-lg p-4 backdrop-blur-sm">
								<div className="flex justify-center gap-4">
									{[...Array(3)].map((_, i) => (
										<motion.div
											key={i}
											className="w-8 h-8 rounded-full bg-[#57e4c5]/20"
											animate={{
												scale: [1, 1.2, 1],
												opacity: [0.2, 0.5, 0.2],
											}}
											transition={{
												duration: 2,
												delay: i * 0.3,
												repeat: Infinity,
											}}
										/>
									))}
								</div>
							</div>
						</motion.div>

						{/* AI response card */}
						<motion.div
							className="bg-gradient-to-br from-[#1a3b3b] to-[#164C4C] rounded-xl p-6 border border-[#57e4c5]/20 hover:shadow-lg hover:shadow-[#57e4c5]/10 transition-all duration-300"
							variants={fadeInUpVariants}
						>
							<div className="flex items-center gap-3 mb-4">
								<div className="p-2 bg-[#57e4c5]/20 rounded-lg">
									<MessageSquare className="w-6 h-6 text-[#57e4c5]" />
								</div>
								<h3 className="text-xl font-semibold text-white">AI-Powered Responses</h3>
							</div>
							<p className="text-white/70 mb-4">Intelligent system responses and automated issue resolution.</p>
							<div className="bg-[#164C4C]/50 rounded-lg p-4 backdrop-blur-sm">
								{[...Array(3)].map((_, i) => (
									<motion.div
										key={i}
										className="h-2 bg-[#57e4c5]/20 rounded mb-2 last:mb-0"
										initial={{ width: "20%" }}
										animate={{
											width: ["20%", "80%", "20%"],
										}}
										transition={{
											duration: 3,
											delay: i * 0.5,
											repeat: Infinity,
										}}
									/>
								))}
							</div>
						</motion.div>

						{/* Analytics dashboard card */}
						<motion.div
							className="bg-gradient-to-br from-[#1a3b3b] to-[#164C4C] rounded-xl p-6 border border-[#57e4c5]/20 hover:shadow-lg hover:shadow-[#57e4c5]/10 transition-all duration-300"
							variants={fadeInUpVariants}
						>
							<div className="flex items-center gap-3 mb-4">
								<div className="p-2 bg-[#57e4c5]/20 rounded-lg">
									<LineChart className="w-6 h-6 text-[#57e4c5]" />
								</div>
								<h3 className="text-xl font-semibold text-white">Analytics Dashboard</h3>
							</div>
							<p className="text-white/70 mb-4">Comprehensive analytics and performance monitoring tools.</p>
							<div className="bg-[#164C4C]/50 rounded-lg p-4 backdrop-blur-sm">
								<div className="grid grid-cols-2 gap-2">
									{[...Array(4)].map((_, i) => (
										<motion.div
											key={i}
											className="h-12 bg-[#57e4c5]/20 rounded"
											animate={{
												opacity: [0.2, 0.4, 0.2],
											}}
											transition={{
												duration: 2,
												delay: i * 0.3,
												repeat: Infinity,
											}}
										/>
									))}
								</div>
							</div>
						</motion.div>

						{/* Resource optimization card */}
						<motion.div
							className="bg-gradient-to-br from-[#1a3b3b] to-[#164C4C] rounded-xl p-6 border border-[#57e4c5]/20 hover:shadow-lg hover:shadow-[#57e4c5]/10 transition-all duration-300"
							variants={fadeInUpVariants}
						>
							<div className="flex items-center gap-3 mb-4">
								<div className="p-2 bg-[#57e4c5]/20 rounded-lg">
									<Share2 className="w-6 h-6 text-[#57e4c5]" />
								</div>
								<h3 className="text-xl font-semibold text-white">Resource Optimization</h3>
							</div>
							<p className="text-white/70 mb-4">Optimize resource allocation and improve system performance.</p>
							<div className="bg-[#164C4C]/50 rounded-lg p-4 backdrop-blur-sm">
								<div className="flex justify-between items-center">
									<div className="flex gap-2">
										{[...Array(4)].map((_, i) => (
											<motion.div
												key={i}
												className="w-3 h-3 rounded-full bg-[#57e4c5]/20"
												animate={{
													scale: [1, 1.5, 1],
													opacity: [0.2, 0.5, 0.2],
												}}
												transition={{
													duration: 2,
													delay: i * 0.2,
													repeat: Infinity,
												}}
											/>
										))}
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* Efficient virtualization section */}
			<motion.section
				className="relative z-10 px-4 py-16 bg-[#164C4C]"
				ref={featureRef}
				initial="hidden"
				animate={featureInView ? "visible" : "hidden"}
				variants={fadeInUpVariants}
			>
				<div className="max-w-6xl mx-auto">
					<div className="grid md:grid-cols-2 gap-8 items-center">
						<motion.div
							className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden"
							variants={fadeInUpVariants}
						>
							<Image
								src="https://cdn.pixabay.com/photo/2016/03/29/16/49/electricity-1288717_1280.jpg"
								alt="ARM Processor"
								width={600}
								height={400}
								className="w-full h-auto"
							/>
						</motion.div>
						<motion.div className="space-y-4" variants={fadeInUpVariants}>
							<motion.div className="text-[#57e4c5]" variants={fadeInUpVariants}>Efficient Virtualization</motion.div>
							<motion.h2 className="text-3xl font-bold text-white" variants={fadeInUpVariants}>
								Optimized for ARM and RISC-V Architecture
							</motion.h2>
							<motion.h3 className="text-xl text-white/80" variants={fadeInUpVariants}>
								Leveraging Advanced Processor Features
							</motion.h3>
							<motion.p className="text-white/60" variants={fadeInUpVariants}>
								<span className={`${galanoGrotesque.className} tracking-tighter`}>Altwy</span> utilizes ARM and RISC-V specific features to provide near-native performance for guest operating systems while significantly reducing heat generation and energy consumption.
							</motion.p>
							<motion.div variants={fadeInUpVariants}>
							</motion.div>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* Partners section (logo carousel) */}
			<motion.section
				className="relative z-10 px-4 py-16 text-center bg-[#164C4C]"
				ref={partnersRef}
				initial="hidden"
				animate={partnersInView ? "visible" : "hidden"}
				variants={fadeInUpVariants}
			>
				<div className="max-w-6xl mx-auto overflow-hidden">
					<motion.div
						className="flex"
						variants={fadeInUpVariants}
					>
						<motion.div
							className="flex space-x-8 animate-carousel"
							style={{
								animationDuration: '20s',
								animationTimingFunction: 'linear',
								animationIterationCount: 'infinite',
							}}
						>
							{[...logos, ...logos, ...logos, ...logos, ...logos, ...logos].map((logo, index) => (
								<div key={index} className="flex-shrink-0">
									<Image
										src={logo.src}
										alt={logo.alt}
										width={200}
										height={67}
										className="h-12 w-auto object-contain"
									/>
								</div>
							))}
						</motion.div>
					</motion.div>
				</div>
			</motion.section>

			{/* Linkedin section */}
			<motion.section
				className="relative z-10 px-4 py-24 bg-[#164C4C] overflow-hidden"
				ref={linkedinRef}
				initial="hidden"
				animate={linkedinInView ? "visible" : "hidden"}
				variants={fadeInUpVariants}
			>
				{/* Animated background */}
				<div className="absolute inset-0">
					{/* Gradient overlay */}
					<div className="absolute inset-0" style={{
						background: `
        radial-gradient(circle at 20% 20%, #164C4C 0%, transparent 50%),
        radial-gradient(circle at 100% 150%, #57e4c5 0%, transparent 40%)
      `
					}} />

					{/* Animated lines */}
					{[...Array(5)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute h-px bg-gradient-to-r from-transparent via-[#57e4c5]/25 to-transparent w-full"
							style={{ top: `${20 * (i + 1)}%` }}
							animate={{
								x: ['-100%', '100%'],
							}}
							transition={{
								duration: 8,
								repeat: Infinity,
								delay: i * 1,
								ease: "linear",
							}}
						/>
					))}

					{/* Floating particles */}
					{[...Array(20)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute rounded-full bg-[#57e4c5]"
							style={{
								width: Math.random() * 2 + 2 + 'px',
								height: Math.random() * 2 + 2 + 'px',
								top: Math.random() * 100 + '%',
								left: Math.random() * 100 + '%',
							}}
							animate={{
								y: [0, -30, 0],
								opacity: [0.2, 0.5, 0.2],
							}}
							transition={{
								duration: Math.random() * 2 + 3,
								repeat: Infinity,
								delay: Math.random() * 2,
							}}
						/>
					))}
				</div>

				<div className="max-w-6xl mx-auto relative">
					<div className="flex flex-col items-center gap-8">
						<motion.div
							className="bg-[#1a3b3b] p-6 rounded-2xl shadow-lg border border-[#57e4c5]/20 w-24 h-24 flex items-center justify-center relative"
							animate={{
								scale: [1, 1.1, 1],
								rotate: [0, 5, -5, 0],
							}}
							transition={{
								duration: 4,
								repeat: Infinity,
								ease: "easeInOut"
							}}
						>
							{/* Glow effect */}
							<div className="absolute inset-0 bg-[#57e4c5]/20 rounded-2xl blur-xl" />
							<Linkedin className="w-12 h-12 text-[#57e4c5] relative z-10" />
						</motion.div>

						<motion.h2
							className="text-4xl md:text-5xl font-bold text-white text-center"
							variants={fadeInUpVariants}
						>
							Stay Connected with <span className={`${galanoGrotesque.className} tracking-tighter`}>Altwy</span>
						</motion.h2>

						<motion.p
							className="text-xl text-white/70 max-w-2xl text-center"
							variants={fadeInUpVariants}
						>
							Follow us on LinkedIn to stay updated with the latest <span className={`${galanoGrotesque.className} tracking-tighter`}>Altwy</span> news, features, and innovations.
						</motion.p>

						<motion.div variants={fadeInUpVariants}>
							<Link
								href="https://linkedin.com/company/altwy"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 px-8 py-3 bg-[#57e4c5] hover:bg-[#62ecce] text-white rounded-full transition-colors text-lg font-medium relative group"
								onClick={() => {
									if (window.gtag) {
										window.gtag('event', 'opened_linkedin_altwy', {
											event_category: 'engagement',
											event_label: 'User clicked the LinkedIn button',
										});
									}
								}}
							>
								<span className="absolute inset-0 rounded-full bg-[#57e4c5]/20 blur-lg group-hover:bg-[#57e4c5]/30 transition-colors" />
								<Linkedin className="w-5 h-5 relative z-10" />
								<span className="relative z-10">Follow on LinkedIn</span>
							</Link>
						</motion.div>
					</div>
				</div>
			</motion.section>

			<style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0); }
          25% { transform: translate(10px, -10px); }
          50% { transform: translate(-5px, -20px); }
          75% { transform: translate(-10px, -5px); }
          100% { transform: translate(0, 0); }
        }

        @keyframes glow {
          0% { opacity: 0.2; }
          100% { opacity: 0.8; }
        }

        @keyframes pulse {
          0% { transform: opacity: 1; }
          50% { transform:  opacity: 0.8; }
          100% { transform: opacity: 1; }
        }

        @keyframes carousel {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-carousel {
          animation: carousel 60s linear infinite;
        }
      `}</style>
		</div>
	)
}