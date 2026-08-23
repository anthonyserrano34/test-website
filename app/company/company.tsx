"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight } from "lucide-react";

import TopNavbar from "@/components/TopNavbar";
import { SubpageHeroHeader } from "@/components/ui/subpage-hero-header";
import { cn } from "@/lib/utils";

const ceos = [
	{
		name: "Christophe LAMBERT",
		title: "Chief Executive Officer",
		bio: "Through several leadership roles, I was able to develop strong skills in strategic thought processes as well as building and running different size organizations. My knowledge scope in the IT industry is strong as I worked for technology leaders like HPE and was able to positively influence the success of startups like NetApp, SimpliVity and Cohesity. Besides that I was part of the root of the Internet in France and created a few startups back then.",
		image: "/company/christophe_lambert.jpg",
		linkedin: "https://www.linkedin.com/in/christophelambert/",
	},
	{
		name: "Michaël EL BAKI",
		title: "Founder & Chief Technology Officer",
		bio: "Initially head of the Dublin R&D center of a French software publisher (Sophis, investment banking,  €300m exit), then founder of one of the first studios (BitRabbit, Ireland) to develop cross-platform games and tools for smartphones (2004), before founding the industry's first \"Games as a Service\" backend (Clan of the Cloud, France) in 2011, renamed XtraLife in 2016. 30 years experience in building and managing local and remote teams, IT systems architecture, APIs design and software design and development.",
		image: "/company/michael_el_baki.jpg",
		linkedin: "https://www.linkedin.com/in/michaelelbaki/",
	},
	{
		name: "Peter MAHLMEISTER",
		title: "Chief Strategy Officer",
		bio: "As a sales trainee, Peter immersed himself in the complex sales landscape of enterprise computing, mastering both direct and indirect sales strategies and understanding the intricate technology ecosystems emerging during the late 1980s. Throughout his career, Peter became known for his strategic thinking and ability to close landmark deals that helped establish NetApp's market leadership in enterprise data management. His strategic approach coupled with his teams were instrumental in driving sales during a period when NetApp, Tintri, SimpliVity and Cohesity were expanding their presence in the Cloud.",
		image: "/company/peter_mahlmeister.jpg",
		linkedin: "https://www.linkedin.com/in/petermahlmeister/",
	},
] as const;

const fadeInUpVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function LinkedInLink({
	href,
	name,
}: {
	href: string;
	name: string;
}) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="inline-flex h-[38px] items-center justify-center gap-1.5 border border-neutral-200 bg-white px-3.5 text-sm font-medium text-neutral-900 transition-colors duration-300 hover:border-[#00FF88]"
			onClick={() => {
				if (window.gtag) {
					window.gtag("event", "opened_ceo_linkedin", { name });
				}
			}}
		>
			<span>LinkedIn</span>
			<ArrowUpRight className="h-4 w-4" />
		</a>
	);
}

function Portrait({
	src,
	alt,
	priority = false,
	sizes,
}: {
	src: string;
	alt: string;
	priority?: boolean;
	sizes: string;
}) {
	return (
		<div className="relative aspect-[4/5] overflow-hidden border border-[#3f3f3f] bg-[#121212]">
			<Image
				src={src}
				alt={alt}
				fill
				priority={priority}
				sizes={sizes}
				className="object-cover object-top grayscale"
			/>
		</div>
	);
}

export default function CompanyPage() {
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
	const [lead, ...rest] = ceos;

	return (
		<div className="relative min-h-screen bg-[var(--background)] pb-24">
			<SubpageHeroHeader />
			<TopNavbar trackScroll />

			<main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-24 sm:px-6">
				<motion.div
					initial="hidden"
					animate="visible"
					variants={fadeInUpVariants}
					className="relative mb-16 text-center md:mb-24"
				>
					<motion.div
						className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#00FF88]/20 px-4 py-1"
						variants={fadeInUpVariants}
					>
						<span className="text-sm font-medium text-[#00FF88]">
							Our Team
						</span>
					</motion.div>
					<motion.h1
						className="relative z-10 mb-4 text-4xl font-bold text-white md:text-5xl"
						variants={fadeInUpVariants}
					>
						Our Executive Team
					</motion.h1>
					<motion.p
						className="relative z-10 mx-auto max-w-2xl text-lg text-white/70"
						variants={fadeInUpVariants}
					>
						The visionaries behind{" "}
						<span className="font-display tracking-tight">Altwy</span>,
						driving innovation in datacenter management.
					</motion.p>
				</motion.div>

				<motion.div
					ref={ref}
					initial="hidden"
					animate={inView ? "visible" : "hidden"}
					variants={{
						hidden: { opacity: 0 },
						visible: {
							opacity: 1,
							transition: { staggerChildren: 0.14 },
						},
					}}
				>
					<motion.article
						variants={fadeInUpVariants}
						className="grid items-center gap-10 border-t border-white/10 pt-12 md:grid-cols-[minmax(240px,340px)_minmax(0,1fr)] md:gap-14 md:pt-16 lg:grid-cols-[minmax(280px,400px)_minmax(0,1fr)] lg:gap-20"
					>
						<figure className="mx-auto w-full max-w-[280px] md:mx-0 md:max-w-none">
							<Portrait
								src={lead.image}
								alt={lead.name}
								priority
								sizes="(max-width: 768px) 280px, 400px"
							/>
						</figure>
						<div>
							<p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#00FF88]/80">
								{lead.title}
							</p>
							<h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-white md:text-5xl">
								{lead.name}
							</h2>
							<p className="mt-6 max-w-xl select-text text-[15px] leading-7 text-white/60">
								{lead.bio}
							</p>
							<div className="mt-8">
								<LinkedInLink href={lead.linkedin} name={lead.name} />
							</div>
						</div>
					</motion.article>

					<div className="mt-16 grid border-t border-white/10 md:mt-20 md:grid-cols-2">
						{rest.map((ceo, index) => (
							<motion.article
								key={ceo.name}
								variants={fadeInUpVariants}
								className={cn(
									"pt-12 md:pt-16",
									index === 0
										? "md:border-r md:border-white/10 md:pr-10 lg:pr-16"
										: "md:pl-10 lg:pl-16",
								)}
							>
								<figure className="mx-auto w-full max-w-[240px] md:mx-0 md:max-w-[280px]">
									<Portrait
										src={ceo.image}
										alt={ceo.name}
										sizes="280px"
									/>
								</figure>
								<p className="mt-8 text-[11px] font-medium uppercase tracking-[0.22em] text-[#00FF88]/80">
									{ceo.title}
								</p>
								<h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-white md:text-3xl">
									{ceo.name}
								</h2>
								<p className="mt-5 select-text text-sm leading-7 text-white/55">
									{ceo.bio}
								</p>
								<div className="mt-8">
									<LinkedInLink href={ceo.linkedin} name={ceo.name} />
								</div>
							</motion.article>
						))}
					</div>
				</motion.div>
			</main>
		</div>
	);
}
