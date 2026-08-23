"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type RefObject } from "react";
import { useInView } from "react-intersection-observer";

import { BlurFade } from "@/components/ui/blur-fade";
import { PixelCorner } from "@/components/ui/pixel-bleed";
import { cn } from "@/lib/utils";

const SECTION_BG = "#1C3A32";

const STEPS = [
	{
		number: "01",
		name: "Altwy Access",
		status: "Available Now",
		kicker: "Single-Server & Mini-Datacenter Virtualization",
		description:
			"Deploy Altwy on a single node or test-drive our software-defined stack with near-zero overhead across ARM, RISC-V, and x86.",
	},
	{
		number: "02",
		name: "Altwy One",
		status: "Coming Soon",
		kicker: "Workstation & Dev Environment",
		description:
			"Empowers sysadmins, developers, and DevOps teams to test applications locally and validate silicon compatibility right on their workstations.",
	},
	{
		number: "03",
		name: "The Horizon",
		status: "Coming Soon",
		kicker: "Complete orchestration engine",
		description:
			"Engineered to run multi-node datacenters, automate workload placement, and optimize energy efficiency at scale.",
	},
] as const;

function StepTitle({ name }: { name: string }) {
	if (name.startsWith("Altwy")) {
		return (
			<>
				<span className="font-galano">Altwy</span>
				{name.slice("Altwy".length)}
			</>
		);
	}
	return name;
}

function RoadmapMark({
	markRef,
	tone = "green",
	active,
	delay = 0,
}: {
	markRef: RefObject<HTMLSpanElement>;
	tone?: "green" | "white";
	active: boolean;
	delay?: number;
}) {
	return (
		<motion.span
			ref={markRef}
			aria-hidden
			className={cn(
				"relative z-10 block h-2.5 w-2.5 shrink-0",
				tone === "green" ? "bg-[#00FF88]" : "bg-white",
			)}
			initial={{ scale: 0, opacity: 0 }}
			animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
			transition={{ delay, type: "spring", stiffness: 420, damping: 22 }}
		/>
	);
}

function manhattanPath(points: Array<{ x: number; y: number }>): string {
	if (points.length < 2) return "";

	const [first, ...rest] = points;
	let d = `M ${first.x} ${first.y}`;

	for (const point of rest) {
		d += ` H ${point.x} V ${point.y}`;
	}

	return d;
}

export function ProductRoadmap() {
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
	const trackRef = useRef<HTMLDivElement>(null);
	const mark0 = useRef<HTMLSpanElement>(null);
	const mark1 = useRef<HTMLSpanElement>(null);
	const mark2 = useRef<HTMLSpanElement>(null);
	const markRefs = [mark0, mark1, mark2] as const;
	const [path, setPath] = useState("");

	const { scrollYProgress } = useScroll({
		target: trackRef,
		offset: ["start 0.85", "end 0.45"],
	});
	const pathProgress = useSpring(scrollYProgress, {
		stiffness: 70,
		damping: 28,
		restDelta: 0.001,
	});

	useEffect(() => {
		const track = trackRef.current;
		if (!track) return;
		const marks = [mark0, mark1, mark2];

		const update = () => {
			const bounds = track.getBoundingClientRect();
			const points = marks
				.map((markRef) => {
					const el = markRef.current;
					if (!el) return null;
					const rect = el.getBoundingClientRect();
					return {
						x: Number((rect.left + rect.width / 2 - bounds.left).toFixed(1)),
						y: Number((rect.top + rect.height / 2 - bounds.top).toFixed(1)),
					};
				})
				.filter((point): point is { x: number; y: number } => point !== null);

			if (points.length === STEPS.length) {
				setPath(manhattanPath(points));
			}
		};

		update();
		const frame = window.setTimeout(update, 400);
		const later = window.setTimeout(update, 900);
		const observer = new ResizeObserver(update);
		observer.observe(track);
		window.addEventListener("resize", update);
		return () => {
			window.clearTimeout(frame);
			window.clearTimeout(later);
			observer.disconnect();
			window.removeEventListener("resize", update);
		};
	}, [inView]);

	return (
		<section ref={ref} className="relative z-10">
			<div className="relative bg-[#1C3A32] px-4 pb-12 pt-16 sm:px-6 sm:pt-20 md:pb-20 md:pt-24">
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 z-0"
					style={{
						backgroundImage: `
							radial-gradient(ellipse at 50% 0%, rgba(0, 255, 136, 0.035), transparent 50%),
							linear-gradient(to right, rgba(255, 255, 255, 0.018) 1px, transparent 1px),
							linear-gradient(to bottom, rgba(255, 255, 255, 0.018) 1px, transparent 1px)
						`,
						backgroundSize: "100% 100%, 64px 64px, 64px 64px",
						maskImage:
							"radial-gradient(ellipse at center, black 18%, transparent 72%)",
						WebkitMaskImage:
							"radial-gradient(ellipse at center, black 18%, transparent 72%)",
					}}
				/>
				<PixelCorner
					sectionColor={SECTION_BG}
					placement="top-left"
				/>
				<PixelCorner
					sectionColor={SECTION_BG}
					placement="bottom-right"
				/>

				<div className="relative z-10 mx-auto max-w-5xl">
					<BlurFade delay={0.04} className="mx-auto mb-12 max-w-2xl text-center md:mb-20">
						<h2 className="font-display text-[2rem] font-medium leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
							Product Roadmap
						</h2>
						<p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/65 sm:text-base md:mt-5">
							A progressive path from single-server virtualization
							to complete, energy-efficient orchestration at
							datacenter scale.
						</p>
					</BlurFade>

					<div ref={trackRef} className="relative">
						<svg
							aria-hidden
							className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
						>
							{path ? (
								<>
									<path
										d={path}
										fill="none"
										stroke="white"
										strokeOpacity="0.1"
										strokeWidth="1"
										strokeLinejoin="miter"
										strokeLinecap="square"
									/>
									<motion.path
										d={path}
										fill="none"
										stroke="white"
										strokeOpacity="0.45"
										strokeWidth="1"
										strokeLinejoin="miter"
										strokeLinecap="square"
										style={{ pathLength: pathProgress }}
									/>
								</>
							) : null}
						</svg>

						<div className="flex flex-col gap-10 sm:gap-12 lg:gap-8">
							{STEPS.map((step, index) => {
								const isLeft = index % 2 === 0;

								return (
									<div
										key={step.number}
										className={cn(
											"relative flex items-start sm:items-center",
											isLeft
												? "lg:w-[48%] lg:self-start"
												: "lg:w-[48%] lg:self-end",
										)}
									>
										<div
											className={cn(
												"flex w-full items-start gap-4 sm:items-center sm:gap-5",
												isLeft
													? "pl-8 lg:pl-0 lg:pr-8 lg:text-right"
													: "pl-8 lg:pl-8",
												isLeft && "lg:flex-row-reverse",
											)}
										>
											<span className="relative z-10 mt-2 shrink-0 sm:mt-0">
												<RoadmapMark
													markRef={markRefs[index]}
													tone={
														step.status === "Available Now"
															? "green"
															: "white"
													}
													active={inView}
													delay={0.12 + index * 0.2}
												/>
											</span>
											<BlurFade
												delay={0.08 + index * 0.18}
												yOffset={14}
												blur="12px"
												className="min-w-0 flex-1"
											>
												<p className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
													{step.number}
												</p>
												<h3 className="mt-1.5 text-lg font-semibold tracking-tight text-[#00FF88] sm:mt-2 sm:text-xl md:text-2xl">
													<StepTitle name={step.name} />
												</h3>
												{step.status === "Available Now" ? (
													<span className="mt-3 inline-flex items-center bg-[#00FF88] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0E0E0E] sm:mt-3.5 sm:px-3.5 sm:text-xs">
														{step.status}
													</span>
												) : (
													<p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/45 sm:text-[11px]">
														{step.status}
													</p>
												)}
												<p className="mt-2.5 text-sm font-medium text-white/85 sm:mt-3">
													{step.kicker}
												</p>
												<p className="mt-1.5 text-sm leading-relaxed text-white/55">
													{step.description}
												</p>
											</BlurFade>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
