"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
	BarChart3,
	Calendar,
	Zap,
	Cpu,
	LayoutDashboard,
	Layers,
	ArrowUpRight,
} from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { Particles } from "@/components/ui/particles";
import { GridPattern } from "@/components/ui/grid-pattern";
import { SpotlightBorder } from "@/components/ui/spotlight-border";
import { ImpactMetricsFrame } from "@/components/ui/impact-metrics-frame";
import { NumberTicker } from "@/components/ui/number-ticker";
import { MarketInsightCard, type MarketInsight } from "@/components/ui/market-insight-card";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { ProductRoadmap } from "@/components/ui/product-roadmap";
import { SiliconSection } from "@/components/ui/silicon-section";
import { cn } from "@/lib/utils";
import TopNavbar from "@/components/TopNavbar";

const PARTNER_LOGOS = [
	{ src: "/bpifrance-logo.png", alt: "BPI France Logo" },
	{ src: "/logo-france2030.png", alt: "France 2030 Logo" },
	{ src: "/logo-eurostack.png", alt: "EuroStack Logo" },
	{ src: "/occitanie-logo.png", alt: "Région Occitanie Logo" },
	{ src: "/cyllene-logo.png", alt: "Cyllene Logo" },
] as const;

export default function HomePage({
	featuredInsights,
}: {
	featuredInsights: MarketInsight[]
}) {
	const [heroRef, heroInView] = useInView({
		threshold: 0,
		initialInView: true,
	});
	const [videoRef] = useInView({ triggerOnce: true, threshold: 0.1 });
	const [impactRef, impactInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});
	const [securityRef, securityInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});
	const [solutionsRef, solutionsInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});
	const [founderRef, founderInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});
	const [linkedinRef, linkedinInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const fadeInUpVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
	};

	const impactStats = [
		{
			title: "More Compute per Watt",
			description:
				"Scale AI today without waiting 7 years for new power permits.",
			ticker: { kind: "suffix" as const, value: 4, suffix: "x" },
		},
		{
			title: 'Kill the "Broadcom Tax"',
			description: "Slash infrastructure OPEX by up to 75%.",
			ticker: { kind: "percent" as const, value: 75 },
		},
		{
			title: "Energy Footprint",
			description:
				"Run equivalent workloads with up to 75% less power draw and a materially lower carbon footprint.",
			ticker: { kind: "fraction" as const, numerator: 1, denominator: 4 },
		},
	];

	return (
		<div className="min-h-screen bg-[var(--background)]">
			{/* Navbar */}
			<TopNavbar isTransparent={heroInView} />

			{/* Hero section */}
			<motion.div
				className="relative overflow-hidden"
				ref={heroRef}
				initial="hidden"
				animate={heroInView ? "visible" : "hidden"}
				variants={fadeInUpVariants}
			>
				{/* Grid Texture Background using GridPattern */}
				<GridPattern
					squares={[
						[4, 4],
						[5, 1],
						[8, 2],
						[5, 3],
						[5, 5],
						[10, 10],
						[12, 15],
						[15, 10],
						[10, 15],
						[15, 10],
						[10, 15],
						[15, 10],
					]}
					className={cn(
						"[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
						"inset-x-0 inset-y-[-30%] h-[150%] skew-y-12 opacity-30"
					)}
				/>

				<Particles
					className="z-[1]"
					quantity={90}
					ease={80}
					staticity={60}
					size={1.5}
					color="#5EEAD4"
				/>

				{/* Hero Content */}
				<div className="relative z-10 px-4 pt-32 pb-4 sm:pb-6 md:pb-8 lg:pb-0">
					<div className="max-w-4xl mx-auto text-center">
						<motion.div
							className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#0f1713] px-4 py-1"
							variants={fadeInUpVariants}
						>
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="text-[#00FF88]"
							>
								<path
									d="M8 1.6C4.4712 1.6 1.6 4.4712 1.6 8C1.6 11.5288 4.4712 14.4 8 14.4C11.5288 14.4 14.4 11.5288 14.4 8C14.4 4.4712 11.5288 1.6 8 1.6ZM8 0C12.4184 0 16 3.5816 16 8C16 12.4184 12.4184 16 8 16C3.5816 16 0 12.4184 0 8C0 3.5816 3.5816 0 8 0Z"
									fill="currentColor"
								/>
								<path
									d="M7.2 4H8.8V5.6H7.2V4Z"
									fill="currentColor"
								/>
								<path
									d="M7.2 7.2H8.8V12H7.2V7.2Z"
									fill="currentColor"
								/>
							</svg>
							<span className="text-white/80 text-sm">
								<span className="font-galano">Altwy</span> Global Datacenter Management
							</span>
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
								The Next-Generation
								<br />
							</motion.span>
							<motion.span
								className="text-5xl md:text-7xl"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5, delay: 0.35 }}
							>
								Cloud Infrastructure
							</motion.span>
						</motion.h1>

						<motion.div
							className="text-lg md:text-xl text-white mb-12 max-w-3xl mx-auto space-y-5 leading-relaxed"
							variants={fadeInUpVariants}
						>
							<p>
								The world needs more compute, but there is no
								more power available.
								<br />
								Current cloud architecture is no longer
								sustainable.
							</p>
							<p>
								<span className="font-display tracking-tight">
									<span className="font-galano font-semibold">
										Altwy
									</span>
								</span>{" "}
								delivers high-performance cloud management
								across <b>ARM</b>, <b>RISC-V</b>, <b>AMD</b>,
								and <b>INTEL</b>. Seamlessly orchestrate
								heterogeneous clusters or siloed servers to
								slash energy consumption and streamline data
								center operations.
								<br />
								Backed by 100% European R&amp;D.
							</p>
						</motion.div>

						{/* Dashboard Preview Section */}
						<div className="max-w-4xl mx-auto mb-8 md:mb-10 relative">
							{/* Dispersed upward halo (outside 3D transform for better vertical spread into the header) */}
							<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[600px] -translate-y-[50%] bg-[#00FF88]/10 blur-[120px] pointer-events-none z-0 rounded-full" />
							<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[350px] -translate-y-[40%] bg-[#00FF88]/20 blur-[80px] pointer-events-none z-0 rounded-full" />

							<motion.div
								className="[perspective:1600px] relative z-10"
								variants={fadeInUpVariants}
								ref={videoRef}
								initial="hidden"
								animate="visible"
								transition={{ duration: 0.8, delay: 0.2 }}
							>
								<div className="relative rounded-xl bg-[#0E0E0E] aspect-[1206/595] [transform:rotateX(14deg)_scale(1.02)] origin-top shadow-[0_0_80px_rgba(0,0,0,0.8)]">
									{/* Spotlight-style neon border fixed at the top center */}
									<SpotlightBorder glowColor="green" className="z-20" />

									<div className="rounded-xl overflow-hidden absolute inset-0">
										<Image
											src="/dashboard.png"
											alt="Altwy dashboard"
											fill
											priority
											sizes="(max-width: 768px) 100vw, 896px"
											className="w-full h-full object-cover object-top"
										/>
										<div
											className="absolute inset-x-0 bottom-0 h-[44%] pointer-events-none"
											style={{
												background:
													"linear-gradient(to top, var(--background) 0%, color-mix(in srgb, var(--background) 70%, transparent) 45%, transparent 100%)",
											}}
										/>
										<div className="absolute inset-x-0 -bottom-6 h-16 bg-[var(--background)]/90 blur-xl pointer-events-none" />
									</div>
								</div>
							</motion.div>
						</div>

						<motion.div
							className="relative w-full pb-6 sm:pb-8 md:pb-12"
							variants={fadeInUpVariants}
						>
							<div className="mb-5 flex items-center justify-center gap-3 sm:mb-6">
								<span className="h-px w-6 bg-gradient-to-r from-transparent to-[#00FF88]/35 sm:w-10" />
								<AnimatedShinyText className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/50 sm:text-xs">
									Trusted by european leaders
								</AnimatedShinyText>
								<span className="h-px w-6 bg-gradient-to-l from-transparent to-[#00FF88]/35 sm:w-10" />
							</div>
							<Marquee
								pauseOnHover
								className="[--duration:16s] [--gap:2.5rem]"
							>
								{PARTNER_LOGOS.map((logo) => (
									<div
										key={logo.src}
										className="flex h-16 w-[180px] shrink-0 items-center justify-center sm:h-[72px] sm:w-[200px]"
									>
										<Image
											src={logo.src}
											alt={logo.alt}
											width={280}
											height={110}
											draggable={false}
											className="h-10 w-auto max-w-none object-contain select-none sm:h-12 md:h-14"
										/>
									</div>
								))}
							</Marquee>
						</motion.div>
					</div>
				</div>
			</motion.div>

			{featuredInsights.length > 0 ? (
			<motion.section
				className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-12 md:pt-20 md:pb-16"
				ref={impactRef}
				initial="hidden"
				animate={impactInView ? "visible" : "hidden"}
				variants={fadeInUpVariants}
			>
				<div className="mb-8 md:mb-12 text-center md:text-left">
					<p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[#00FF88]/80 sm:text-xs">
						Global Market Reality
					</p>
					<h2 className="text-3xl md:text-4xl text-white font-medium tracking-tight">
						The market is screaming for a solution
					</h2>
				</div>

				<div className="border-t border-white/10">
					{featuredInsights.map((insight, index) => (
						<MarketInsightCard
							key={`${insight.rank ?? index}-${insight.headline}`}
							insight={insight}
							index={index}
						/>
					))}
				</div>
			</motion.section>
			) : null}

			{/* Altwy Impact */}
			<motion.section
				className="relative z-10 bg-[#121212] px-4 py-16 sm:px-6 md:py-24"
				ref={featuredInsights.length > 0 ? undefined : impactRef}
				initial="hidden"
				animate={impactInView ? "visible" : "hidden"}
				variants={fadeInUpVariants}
			>
				<div className="mx-auto max-w-6xl">
					<div className="mb-10 text-center md:mb-16 md:text-left">
						<BlurFade delay={0.05}>
							<h3 className="text-3xl font-medium tracking-tight text-white md:text-4xl">
								Here&apos;s the Altwy impact
							</h3>
						</BlurFade>
					</div>

					<ImpactMetricsFrame className="max-w-6xl gap-y-10 px-5 py-8 sm:px-8 sm:py-10 md:gap-y-0 md:py-12">
					<div className="relative grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-y-0 md:gap-x-0">
						{impactStats.map((stat, index) => (
							<motion.div
								key={stat.title}
								className="relative flex flex-col items-center text-center md:items-start md:text-left md:px-8 lg:px-10"
								variants={fadeInUpVariants}
							>
								{index < impactStats.length - 1 && (
									<div className="hidden md:block absolute top-1/2 right-0 h-24 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#00FF88]/50 to-transparent shadow-[0_0_15px_rgba(0,255,136,0.6)]" />
								)}

								<div className="mb-4">
									<span className="text-5xl font-bold tracking-tighter text-[#00FF88] md:text-6xl">
										{stat.ticker.kind === "suffix" ? (
											<>
												<NumberTicker value={stat.ticker.value} delay={index * 0.08} />
												{stat.ticker.suffix}
											</>
										) : stat.ticker.kind === "percent" ? (
											<>
												<NumberTicker value={stat.ticker.value} delay={index * 0.08} />%
											</>
										) : (
											<>
												{stat.ticker.numerator}/
												<NumberTicker value={stat.ticker.denominator} delay={index * 0.08} />
											</>
										)}
									</span>
								</div>

								<div className="max-w-sm md:max-w-none">
									<h3 className="text-lg text-white font-medium mb-2 tracking-tight">
										{stat.title}
									</h3>
									<p className="text-sm text-white/80 leading-relaxed md:text-sm">
										{stat.description}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</ImpactMetricsFrame>
				</div>
			</motion.section>

			{/* Founder Perspective */}
			<motion.section
				className="relative z-10 px-4 py-16 md:py-24"
				ref={founderRef}
				initial="hidden"
				animate={founderInView ? "visible" : "hidden"}
				variants={fadeInUpVariants}
			>
				<div className="mx-auto max-w-6xl">
					<p className="mb-8 text-[11px] font-medium uppercase tracking-[0.22em] text-[#00FF88]/80 sm:mb-12 sm:text-xs">
						Founder Perspective
					</p>

					<div className="grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_168px] lg:grid-cols-[minmax(0,1fr)_176px] md:gap-12 lg:gap-16">
						<BlurFade delay={0.08}>
							<blockquote className="border-l border-[#00FF88]/40 pl-6 md:pl-8">
								<p className="text-2xl font-light leading-snug tracking-tight text-white md:text-3xl lg:text-[2.15rem] lg:leading-snug">
									The AI revolution cannot happen on 20-year-old
									cloud architecture. We built Altwy to extract 4x
									more compute per watt, transforming existing
									datacenters from energy-guzzling bottlenecks
									into hyper-efficient powerhouses.
								</p>
							</blockquote>
						</BlurFade>

						<div className="mx-auto flex w-full max-w-[148px] flex-col items-center gap-3 text-center md:mx-0 md:max-w-none md:items-start md:text-left">
							<div className="relative aspect-[4/5] w-full overflow-hidden rounded-md border border-white/10">
								<Image
									src="/company/christophe_lambert.jpg"
									alt="Christophe Lambert"
									fill
									sizes="176px"
									className="object-cover object-top"
								/>
							</div>
							<div>
								<p className="text-base font-medium tracking-tight text-white">
									Christophe Lambert
								</p>
								<p className="mt-0.5 text-sm text-white/50">
									Chief Executive Officer
								</p>
							</div>
						</div>
					</div>
				</div>
			</motion.section>

			<ProductRoadmap />

			{false && (
			<motion.section
				className="relative min-h-[600px] overflow-hidden"
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
						backgroundSize:
							"100% 100%, 100% 100%, 40px 40px, 40px 40px",
						mask: "radial-gradient(circle at center, black 0%, transparent 75%)",
					}}
				/>

				{/* Content */}
				<div className="relative max-w-6xl mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						{/* Left column */}
						<div className="space-y-8">
							<motion.p
								className="text-[#7BFFBE] text-lg font-medium"
								variants={fadeInUpVariants}
							>
								Green Efficiency with{" "}
								<span
									className="font-display tracking-tight"
								>
									<span className="font-galano">Altwy</span>
								</span>
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
								<p>
									<span
										className="font-display tracking-tight"
									>
										<span className="font-galano">Altwy</span>
									</span>{" "}
									transforms data centers with cutting-edge
									cloud management software that slashes
									energy consumption.
								</p>
								<p>
									By driving efficient resource use,{" "}
									<span
										className="font-display tracking-tight"
									>
										<span className="font-galano">Altwy</span>
									</span>{" "}
									empowers companies to reduce their carbon
									footprint and embrace a sustainable digital
									future.
								</p>
							</motion.p>

							<motion.div
								className="space-y-4"
								variants={fadeInUpVariants}
							>
								<button className="group relative w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-[#121212] px-5 py-4 text-left text-white transition-all duration-300 hover:border-[#00FF88]/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
									<span className="absolute inset-0 bento-bg-noise pointer-events-none" />
									<span className="absolute -top-10 -left-10 h-24 w-24 rounded-full bg-[#00FF88]/15 blur-2xl opacity-40 transition-opacity duration-300 group-hover:opacity-80" />
									<span className="relative z-10 flex items-center justify-between gap-3">
										<span className="flex items-center gap-3">
											<span className="text-white/90">ESG dashboard integrated.</span>
										</span>
									</span>
								</button>
								<button className="group relative w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-[#121212] px-5 py-4 text-left text-white transition-all duration-300 hover:border-[#00FF88]/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
									<span className="absolute inset-0 bento-bg-noise pointer-events-none" />
									<span className="absolute -top-10 -left-10 h-24 w-24 rounded-full bg-[#00FF88]/15 blur-2xl opacity-40 transition-opacity duration-300 group-hover:opacity-80" />
									<span className="relative z-10 flex items-center justify-between gap-3">
										<span className="flex items-center gap-3">
											<span className="text-white/90">Supporting migration from power hungry processors to modern ones.</span>
										</span>
									</span>
								</button>
								<button className="group relative w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-[#121212] px-5 py-4 text-left text-white transition-all duration-300 hover:border-[#00FF88]/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
									<span className="absolute inset-0 bento-bg-noise pointer-events-none" />
									<span className="absolute -top-10 -left-10 h-24 w-24 rounded-full bg-[#00FF88]/15 blur-2xl opacity-40 transition-opacity duration-300 group-hover:opacity-80" />
									<span className="relative z-10 flex items-center justify-between gap-3">
										<span className="flex items-center gap-3">
											<span className="text-white/90">Integrated AI decision maker to improve datacenter efficiency.</span>
										</span>
									</span>
								</button>
							</motion.div>
						</div>

						{/* Right column (icon) */}
						<div className="relative hidden md:block min-h-[360px] lg:min-h-[420px]">
							<div className="relative flex items-center justify-center h-full">
								<div
									className="absolute inset-0 bg-[#00FF88]/20 blur-[60px] rounded-full pointer-events-none w-full h-full animate-pulse"
									style={{ animationDuration: "4s" }}
								/>

								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 800 800"
									role="img"
									aria-label="Isometric servers connected above a tech platform"
									className="relative z-10 w-full max-w-[420px] h-auto drop-shadow-2xl sm:max-w-[460px] lg:max-w-[520px]"
									strokeWidth={2}
								>
									<defs>
										<g id="altwyGreenServerStack">
											{/* Server Pole */}
											<line x1="0" y1="100" x2="0" y2="0" stroke="#1A1A1A" strokeWidth="14" strokeLinecap="round" />
											<line x1="-3" y1="100" x2="-3" y2="0" stroke="#0A0A0A" strokeWidth="4" strokeLinecap="round" />

											{/* Server Base Shadow */}
											<polygon points="0,0 -35,-17.5 -35,-87.5 0,-70" fill="#000000" />
											{/* Server Left Face */}
											<polygon points="0,0 -35,-17.5 -35,-87.5 0,-70" fill="#121212" />
											{/* Server Right Face */}
											<polygon points="0,0 35,-17.5 35,-87.5 0,-70" fill="#1A1A1A" />
											{/* Server Top Face */}
											<polygon points="0,-70 35,-87.5 0,-105 -35,-87.5" fill="#222222" />

											{/* Server Slots (Left Face) */}
											<path
												d="M-35,-28 L0,-10.5 M-35,-42 L0,-24.5 M-35,-56 L0,-38.5 M-35,-70 L0,-52.5"
												stroke="#00FF88"
												strokeWidth="3"
												opacity="0.4"
											/>
											{/* Server Slots (Right Face) */}
											<path
												d="M35,-28 L0,-10.5 M35,-42 L0,-24.5 M35,-56 L0,-38.5 M35,-70 L0,-52.5"
												stroke="#00FF88"
												strokeWidth="3"
												opacity="0.6"
											/>

											{/* Server Top Indicator Graphic */}
											<path d="M-12,-87.5 L0,-81.5 L12,-87.5 L0,-93.5 Z" fill="#00FF88" opacity="0.15" />
											<circle cx="0" cy="-87.5" r="3" fill="#00FF88">
												<animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
											</circle>
										</g>
									</defs>

									<g>
										{/* Tech Block Left Face */}
										<polygon points="150,450 400,575 400,675 150,550" fill="#0A120E" />
										<polygon points="150,450 400,575 400,600 150,475" fill="#0C1510" />

										{/* Tech Block Right Face */}
										<polygon points="400,575 650,450 650,550 400,675" fill="#0D1813" />
										<polygon points="400,575 650,450 650,475 400,600" fill="#0F1B15" />

										{/* Tech Block Top Surface (Divided into Quads) */}
										<g id="altwyGreenGrassQuadrants">
											<polygon points="400,450 525,387.5 400,325 275,387.5" fill="#111C16" />
											<polygon points="400,450 275,387.5 150,450 275,512.5" fill="#14221A" />
											<polygon points="400,450 525,387.5 650,450 525,512.5" fill="#18281F" />
											<polygon points="400,450 525,512.5 400,575 275,512.5" fill="#1B2E24" />
										</g>

										{/* Glowing Tech Border Edge */}
										<polyline
											points="150,450 400,575 650,450"
											fill="none"
											stroke="#00FF88"
											strokeWidth="2"
											opacity="0.3"
										/>


										{/* Network Connecting Pipes (Main Layer) */}
										<g stroke="#1A1A1A" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
											<line x1="400" y1="300" x2="250" y2="375" />
											<line x1="400" y1="300" x2="550" y2="375" />
											<line x1="250" y1="375" x2="400" y2="450" />
											<line x1="550" y1="375" x2="400" y2="450" />
										</g>

										{/* Animated Data Beams on Pipes */}
										<g stroke="#00FF88" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
											<line x1="400" y1="300" x2="250" y2="375" strokeDasharray="30 200">
												<animate attributeName="stroke-dashoffset" from="230" to="0" dur="2s" repeatCount="indefinite" />
											</line>
											<line x1="400" y1="300" x2="550" y2="375" strokeDasharray="30 200">
												<animate attributeName="stroke-dashoffset" from="230" to="0" dur="2.5s" repeatCount="indefinite" />
											</line>
											<line x1="250" y1="375" x2="400" y2="450" strokeDasharray="30 200">
												<animate attributeName="stroke-dashoffset" from="230" to="0" dur="1.8s" repeatCount="indefinite" />
											</line>
											<line x1="550" y1="375" x2="400" y2="450" strokeDasharray="30 200">
												<animate attributeName="stroke-dashoffset" from="230" to="0" dur="2.2s" repeatCount="indefinite" />
											</line>
										</g>

										{/* Server Stacks (Rendered Back to Front to respect Isometric Z-Index) */}
										<use href="#altwyGreenServerStack" x={400} y={270} />
										<use href="#altwyGreenServerStack" x={250} y={345} />
										<use href="#altwyGreenServerStack" x={550} y={345} />
										<use href="#altwyGreenServerStack" x={400} y={420} />
									</g>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</motion.section>
			)}

			{/* Solutions — bento grid */}
			<motion.section
				className="relative z-10 px-4 py-16 md:py-20"
				ref={solutionsRef}
				initial="hidden"
				animate={solutionsInView ? "visible" : "hidden"}
				variants={fadeInUpVariants}
			>
				<div className="max-w-6xl w-full mx-auto flex flex-col gap-10">
					<BlurFade delay={0.04} className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
						<h2 className="text-3xl md:text-4xl text-white font-medium tracking-tight">
							How{" "}
							<span className="font-display tracking-tight text-white">
								<span className="font-galano">Altwy</span>
							</span>{" "}
							addresses daily{" "}
							<br />
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF88] to-emerald-300">
								Datacenter challenges
							</span>
						</h2>
					</BlurFade>

					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 auto-rows-auto md:auto-rows-[220px]"
						variants={fadeInUpVariants}
					>
						{/* 1. Performance Analytics */}
						<div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#121212] border border-white/[0.06] hover:border-[#00FF88]/25 transition-colors duration-500 md:col-span-2 lg:col-span-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
							<div className="absolute inset-0 bento-bg-noise pointer-events-none" />
							<div className="absolute -top-24 -left-24 w-64 h-64 bg-[#00FF88]/20 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100" />
							<div className="absolute bottom-0 left-0 right-0 h-32 opacity-30 pointer-events-none">
								<svg
									viewBox="0 0 400 100"
									className="w-full h-full"
									preserveAspectRatio="none"
									stroke="url(#bento-emerald-grad)"
									fill="url(#bento-emerald-fill)"
									strokeWidth="2"
								>
									<defs>
										<linearGradient
											id="bento-emerald-grad"
											x1="0%"
											y1="0%"
											x2="100%"
											y2="0%"
										>
											<stop offset="0%" stopColor="#00FF88" stopOpacity="0" />
											<stop offset="50%" stopColor="#00FF88" stopOpacity="1" />
											<stop offset="100%" stopColor="#00FF88" stopOpacity="0" />
										</linearGradient>
										<linearGradient
											id="bento-emerald-fill"
											x1="0%"
											y1="0%"
											x2="0%"
											y2="100%"
										>
											<stop offset="0%" stopColor="#00FF88" stopOpacity="0.2" />
											<stop offset="100%" stopColor="#0E0E0E" stopOpacity="0" />
										</linearGradient>
									</defs>
									<path d="M0 100 C 50 80, 100 90, 150 40 C 200 -10, 250 60, 300 30 C 350 0, 400 80, 400 80 L 400 100 L 0 100 Z" />
								</svg>
							</div>
							<div className="relative z-10 p-6 md:p-8 flex flex-col h-full w-full max-w-sm">
								<div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-auto text-[#00FF88] shadow-[0_0_15px_rgba(0,255,136,0.15)]">
									<BarChart3 className="w-5 h-5" strokeWidth={1.5} />
								</div>
								<div className="mt-4">
									<h3 className="text-lg text-white font-medium mb-2 tracking-tight">
										Performance Analytics
									</h3>
									<p className="text-sm text-slate-400 leading-relaxed">
										Get insights, performance metrics, and resource utilization powered by AI.
									</p>
								</div>
							</div>
						</div>

						{/* 2. Resource Scheduling */}
						<div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#121212] border border-white/[0.06] hover:border-[#00FF88]/25 transition-colors duration-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
							<div className="absolute inset-0 bento-bg-noise pointer-events-none" />
							<div className="absolute -top-20 -right-20 w-56 h-56 bg-[#00FF88]/10 rounded-full blur-[60px] pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100" />
							<div className="relative z-10 p-6 md:p-8 flex flex-col h-full w-full">
								<div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-auto text-[#00FF88]">
									<Calendar className="w-5 h-5" strokeWidth={1.5} />
								</div>
								<div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-20 pointer-events-none">
									<div className="w-1 h-6 rounded-full bg-[#00FF88]/50" />
									<div className="w-1 h-2 rounded-full bg-[#00FF88]" />
									<div className="w-1 h-8 rounded-full bg-[#00FF88]/30" />
								</div>
								<div className="mt-4">
									<h3 className="text-lg text-white font-medium mb-2 tracking-tight">
										Resource Scheduling
									</h3>
									<p className="text-sm text-slate-400 leading-relaxed">
										Optimize resource allocation with smart scheduling and automated management.
									</p>
								</div>
							</div>
						</div>

						{/* 3. Smart Automation — row span 2 */}
						<div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#121212] border border-white/[0.06] hover:border-[#00FF88]/25 transition-colors duration-500 lg:row-span-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
							<div className="absolute inset-0 bento-bg-noise pointer-events-none" />
							<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00FF88]/10 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500 opacity-40 group-hover:opacity-80" />
							<div className="relative z-10 p-6 md:p-8 flex flex-col h-full w-full">
								<div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00FF88]">
									<Zap className="w-5 h-5" strokeWidth={1.5} />
								</div>
								<div className="hidden flex-1 flex-col items-center justify-center py-6 opacity-40 pointer-events-none lg:flex">
									<div className="w-8 h-8 rounded-full border border-[#00FF88]/30 flex items-center justify-center bento-animate-pulse-slow">
										<div className="w-2 h-2 bg-[#00FF88] rounded-full" />
									</div>
									<div className="w-px h-12 bg-gradient-to-b from-[#00FF88]/30 to-transparent my-1" />
									<div className="flex gap-4">
										<div className="w-6 h-6 rounded-md border border-white/10 bg-white/5" />
										<div className="w-6 h-6 rounded-md border border-white/10 bg-white/5" />
										<div className="w-6 h-6 rounded-md border border-white/10 bg-white/5" />
									</div>
								</div>
								<div className="mt-auto pt-4">
									<h3 className="text-lg text-white font-medium mb-2 tracking-tight">
										Smart Automation
									</h3>
									<p className="text-sm text-slate-400 leading-relaxed">
										Automate resource distribution and workload management based on usage patterns.
									</p>
								</div>
							</div>
						</div>

						{/* 4. AI-Powered Responses */}
						<div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#121212] border border-white/[0.06] hover:border-[#00FF88]/25 transition-colors duration-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
							<div className="absolute inset-0 bento-bg-noise pointer-events-none" />
							<div className="absolute bottom-0 right-0 w-48 h-48 bg-[#00FF88]/10 rounded-full blur-[60px] pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100" />
							<div className="relative z-10 p-6 md:p-8 flex flex-col h-full w-full">
								<div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-auto text-[#00FF88]">
									<Cpu className="w-5 h-5" strokeWidth={1.5} />
								</div>
								<div className="mt-4">
									<h3 className="text-lg text-white font-medium mb-2 tracking-tight">
										AI-Powered Responses
									</h3>
									<p className="text-sm text-slate-400 leading-relaxed">
										Intelligent system responses and automated issue resolution.
									</p>
								</div>
							</div>
						</div>

						{/* 5. Analytics Dashboard */}
						<div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#121212] border border-white/[0.06] hover:border-[#00FF88]/25 transition-colors duration-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
							<div className="absolute inset-0 bento-bg-noise pointer-events-none" />
							<div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-[60px] pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100" />
							<div className="absolute right-6 top-6 grid grid-cols-2 gap-1.5 opacity-20 pointer-events-none">
								<div className="w-3 h-3 rounded-[3px] bg-[#00FF88]/40" />
								<div className="w-3 h-3 rounded-[3px] border border-[#00FF88]/40" />
								<div className="w-3 h-3 rounded-[3px] border border-[#00FF88]/40" />
								<div className="w-3 h-3 rounded-[3px] bg-[#00FF88]" />
							</div>
							<div className="relative z-10 p-6 md:p-8 flex flex-col h-full w-full">
								<div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-auto text-[#00FF88]">
									<LayoutDashboard className="w-5 h-5" strokeWidth={1.5} />
								</div>
								<div className="mt-4">
									<h3 className="text-lg text-white font-medium mb-2 tracking-tight">
										Analytics Dashboard
									</h3>
									<p className="text-sm text-slate-400 leading-relaxed">
										Comprehensive analytics and performance monitoring tools.
									</p>
								</div>
							</div>
						</div>

						{/* 6. Resource Optimization */}
						<div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#121212] border border-white/[0.06] hover:border-[#00FF88]/25 transition-colors duration-500 lg:col-span-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
							<div className="absolute inset-0 bento-bg-noise pointer-events-none" />
							<div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-72 h-48 bg-[#00FF88]/15 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100" />
							<div className="absolute right-8 top-1/2 -translate-y-1/2 w-32 h-20 opacity-30 pointer-events-none hidden sm:flex flex-col justify-between">
								<div className="w-full h-1 bg-gradient-to-r from-transparent via-[#00FF88]/50 to-transparent relative overflow-hidden rounded-full">
									<div className="absolute top-0 left-0 h-full w-1/3 bg-[#00FF88] shadow-[0_0_8px_rgba(0,255,136,0.6)] bento-slide-bar" />
								</div>
								<div className="w-full h-1 bg-white/10 rounded-full relative overflow-hidden">
									<div className="absolute top-0 left-0 h-full w-1/2 bg-[#00FF88]/40 bento-slide-bar-reverse" />
								</div>
								<div className="w-full h-1 bg-gradient-to-r from-transparent via-[#00FF88]/30 to-transparent rounded-full" />
							</div>
							<div className="relative z-10 p-6 md:p-8 flex flex-col h-full w-full max-w-md">
								<div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-auto text-[#00FF88]">
									<Layers className="w-5 h-5" strokeWidth={1.5} />
								</div>
								<div className="mt-4">
									<h3 className="text-lg text-white font-medium mb-2 tracking-tight">
										Resource Optimization
									</h3>
									<p className="text-sm text-slate-400 leading-relaxed">
										Optimize resource allocation and improve overall system performance seamlessly.
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</motion.section>

			<SiliconSection />

			{/* Footer / Linkedin section */}
			<motion.section
				className="relative w-full overflow-hidden bg-[var(--background)] px-4 pb-12 pt-24 text-white"
				ref={linkedinRef}
				initial="hidden"
				animate={linkedinInView ? "visible" : "hidden"}
				variants={fadeInUpVariants}
			>
				<div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[520px] -translate-x-1/2 rounded-full bg-[#00FF88]/10 blur-[100px]" />
				<div className="pointer-events-none absolute bottom-0 left-0 h-[380px] w-[560px] rounded-full bg-gradient-to-tr from-[#00FF88]/10 via-[#00FF88]/5 to-transparent blur-[120px]" />
				<div className="absolute inset-0 pointer-events-none">
					{[...Array(5)].map((_, i) => (
						<motion.div
							key={`footer-line-${i}`}
							className="absolute h-px w-full bg-gradient-to-r from-transparent via-[#00FF88]/25 to-transparent"
							style={{ top: `${18 * (i + 1)}%` }}
							animate={{ x: ["-100%", "100%"] }}
							transition={{
								duration: 8,
								repeat: Infinity,
								delay: i * 0.9,
								ease: "linear",
							}}
						/>
					))}
				</div>

				<div className="relative z-10 mx-auto max-w-7xl px-2 md:px-8">
					<div className="mb-24 flex flex-col items-center text-center md:mb-28">
						<h2 className="mb-10 max-w-3xl font-display text-4xl font-medium tracking-tight text-white md:text-6xl">
							Ready to transform your Infrastructure Economics ?
						</h2>

						<div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
							<Link
								href="/download"
								className="inline-flex h-[38px] min-w-[132px] items-center justify-center gap-1.5 border border-[#00FF88] bg-[#00FF88] px-3.5 text-sm font-medium text-black transition-colors duration-300 hover:border-[#33FFA0] hover:bg-[#33FFA0]"
							>
								<span>Discover Altwy Access</span>
							</Link>
							<Link
								href="/company/altwy"
								className="inline-flex h-[38px] min-w-[132px] items-center justify-center gap-1.5 border border-neutral-200 bg-white px-3.5 text-sm font-medium text-neutral-900 transition-colors duration-300 hover:border-[#00FF88]"
							>
								<span>Read About Our Story &amp; Team</span>
							</Link>
							<Link
								href="https://linkedin.com/company/altwy"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex h-[38px] min-w-[132px] items-center justify-center gap-1.5 border border-neutral-200 bg-white px-3.5 text-sm font-medium text-neutral-900 transition-colors duration-300 hover:border-[#00FF88]"
								onClick={() => {
									if (window.gtag) {
										window.gtag(
											"event",
											"opened_linkedin_altwy",
											{
												event_category: "engagement",
												event_label:
													"User clicked the LinkedIn CTA button",
											}
										);
									}
								}}
							>
								<span>LinkedIn</span>
								<ArrowUpRight className="h-4 w-4" />
							</Link>
						</div>
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

        @keyframes eco-spin-orbit {
          100% { transform: rotate(360deg); }
        }

        @keyframes eco-breathe {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.03); opacity: 1; }
        }

        @keyframes eco-float-center {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }

        .eco-orbit-track {
          transform-origin: 60px 60px;
          animation: eco-spin-orbit 8s linear infinite;
        }

        .eco-orbit-reverse {
          transform-origin: 60px 60px;
          animation: eco-spin-orbit 14s linear infinite reverse;
        }

        .eco-core-breathe {
          transform-origin: 60px 60px;
          animation: eco-breathe 4s ease-in-out infinite;
        }

        .eco-center-float {
          animation: eco-float-center 6s ease-in-out infinite;
        }

        .bento-bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
        }

        @keyframes bento-pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        @keyframes bento-slide-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        .bento-animate-pulse-slow {
          animation: bento-pulse-slow 4s ease-in-out infinite;
        }

        .bento-slide-bar {
          animation: bento-slide-right 3s linear infinite;
        }

        .bento-slide-bar-reverse {
          animation: bento-slide-right 4s linear infinite reverse;
        }

      `}</style>
		</div>
	);
}
