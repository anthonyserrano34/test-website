import { Metadata } from "next";
import Image from "next/image";

import TopNavbar from "@/components/TopNavbar";
import { BlurFade } from "@/components/ui/blur-fade";
import { CorePillars } from "@/components/ui/core-pillars";
import { DatacenterScene } from "@/components/ui/datacenter-scene";
import { SubpageHeroHeader } from "@/components/ui/subpage-hero-header";

const PERSPECTIVES = [
	{
		quote:
			"The AI revolution cannot happen on 20-year-old cloud architecture. We built Altwy to extract 4x more compute per watt, transforming existing datacenters from energy-guzzling bottlenecks into hyper-efficient powerhouses.",
		name: "Christophe Lambert",
		title: "CEO, Altwy",
		image: "/company/christophe_lambert.jpg",
	},
	{
		quote:
			"Before, IT was the answer to every problem. Today, it’s seen as the source of many. Let's flip the script once more so that computing becomes the solution again, not the problem.",
		name: "Michaël El-Baki",
		title: "Co-founder & CTO, Altwy",
		image: "/company/michael_el_baki.jpg",
	},
] as const;

const CULTURE = [
	{
		title: "People-First & 100% Remote",
		body: (
			<>
				As a{" "}
				<em className="text-neutral-900">100% remote-first organization</em>,
				we place absolute trust in our talent across France, Germany,
				and Europe. We offer complete geographical flexibility,
				eliminating unnecessary daily commutes to drastically reduce
				our collective carbon footprint while fostering true work-life
				balance and psychological wellbeing.
			</>
		),
	},
	{
		title: "Responsible Corporate Growth",
		body: (
			<>
				We prove every day that a hyper-growth tech company can operate
				with deep respect for natural resources. By minimizing our
				physical office infrastructure, optimizing our internal digital
				operations, and building energy-frugal software, we align our
				internal corporate culture with our core product promise:{" "}
				<em className="text-neutral-900">
					delivering maximum value with a minimal environmental
					footprint.
				</em>
			</>
		),
	},
] as const;

export const metadata: Metadata = {
	title: "Altwy - About us",
	description:
		"Discover Altwy's mission to build sovereign, energy-efficient cloud infrastructure through 100% European software innovation.",
};

export default function Page() {
	return (
		<div className="relative min-h-screen bg-[var(--background)]">
			<SubpageHeroHeader />
			<TopNavbar trackScroll />

			<main className="relative z-10 pt-24">
				<div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-24">
					<header className="text-center">
						<BlurFade>
							<div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#00FF88]/20 px-4 py-1">
								<span className="text-sm font-medium text-[#00FF88]">
									About us
								</span>
							</div>
						</BlurFade>
						<BlurFade delay={0.06}>
							<h1 className="relative z-10 mb-4 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
								About Altwy
							</h1>
						</BlurFade>
						<BlurFade delay={0.12}>
							<p className="relative z-10 mx-auto max-w-3xl text-base leading-7 text-white/80">
								Headquartered in Occitanie (France) with
								cross-border operations in Germany, Altwy
								delivers 100% European software innovation to
								decouple compute growth from energy grid
								constraints.
							</p>
						</BlurFade>
					</header>
				</div>

				<div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-24">
				<section className="border-t border-white/10 pt-12 md:pt-16">
					<BlurFade>
						<h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
							Our mission
						</h2>
						<p className="mt-3 max-w-2xl text-base leading-7 text-[#00FF88]/80">
							Solving the Global Datacenter Grid &amp; Resource
							Crisis
						</p>
					</BlurFade>

					<div className="mt-8 grid items-center gap-8 lg:mt-10 lg:grid-cols-2 lg:gap-12">
						<BlurFade delay={0.08} className="flex items-center justify-center lg:min-h-full">
							<DatacenterScene />
						</BlurFade>

						<BlurFade delay={0.14} className="space-y-6 text-base leading-7 text-white/80">
							<p>
								The exponential surge in AI, cloud workloads,
								and digital services is pushing physical
								infrastructure to its limits worldwide. In
								local communities across the globe, citizens
								are increasingly protesting against new
								mega-datacenter builds over legitimate fears of{" "}
								<span className="text-[#00FF88]">
									grid overload
								</span>
								, excessive electricity draw, and local water
								depletion. At the same time, enterprise
								infrastructure teams are facing skyrocketing
								legacy licensing costs and unpredictable
								pricing models.
							</p>
							<p>
								At{" "}
								<span className="font-galano font-semibold text-white">
									Altwy
								</span>
								, we believe the answer is not to build{" "}
								<em className="text-white">more</em> physical
								datacenters, but to build{" "}
								<span className="text-[#00FF88]">
									virtuous
								</span>{" "}
								ones by maximizing existing capacity.
							</p>
						</BlurFade>
					</div>

					<BlurFade delay={0.08}>
					<p className="mt-8 text-base leading-7 text-white/80 md:mt-10">
						Through smart hardware modernizations—a{" "}
						<em className="text-[#00FF88]">
							&quot;tech refresh&quot;
						</em>{" "}
						combining energy-efficient silicon (
						<span className="font-medium text-[#00FF88]">
							ARM
						</span>
						,{" "}
						<span className="font-medium text-[#00FF88]">
							RISC-V
						</span>
						, alongside{" "}
						<span className="font-medium text-white">x86</span>)
						with Altwy&apos;s lightweight, software-defined
						stack—we enable organizations to multiply their compute
						density. By extracting up to{" "}
						<strong className="font-medium text-[#00FF88]">
							4x more performance per watt
						</strong>{" "}
						in existing facilities, we free up critical rack space
						and power budgets. This reclaims existing capacity,
						slashes carbon footprints, and dramatically reduces the
						need to build new megawatt facilities.
					</p>
					</BlurFade>
				</section>
				</div>

				<section className="bg-[#1C3A32] px-4 py-12 text-white sm:px-6 md:py-16">
					<div className="mx-auto max-w-6xl">
						<BlurFade>
							<div className="mb-8 flex flex-col items-center">
								<Image
									src="/logo.png"
									alt="Altwy"
									width={160}
									height={46}
									className="h-11 w-auto sm:h-12"
								/>
								<p className="mt-4 text-sm font-medium uppercase tracking-[0.22em] text-white/80">
									Leadership Perspectives
								</p>
							</div>
						</BlurFade>
						<div className="mt-14 grid items-stretch gap-12 md:mt-16 md:grid-cols-2 md:gap-8 lg:gap-20">
							{PERSPECTIVES.map((item, index) => (
								<BlurFade
									key={item.name}
									delay={index * 0.1}
									className="h-full"
								>
								<figure
									className="mx-auto flex h-full w-full max-w-md flex-col items-center text-center"
								>
									<div className="relative size-16 overflow-hidden rounded-full sm:size-20">
										<Image
											src={item.image}
											alt={item.name}
											fill
											sizes="80px"
											className="object-cover object-top"
										/>
									</div>
									<blockquote className="mt-5">
										<p className="font-[family-name:var(--font-inter)] text-base leading-7 text-white">
											&ldquo;{item.quote}&rdquo;
										</p>
									</blockquote>
									<div className="mt-auto flex flex-col items-center pt-8">
										<div className="h-px w-16 bg-white/20" />
										<figcaption className="mt-5">
											<p className="text-base font-semibold text-white">
												{item.name}
											</p>
											<p className="mt-0.5 text-sm text-white/80">
												{item.title}
											</p>
										</figcaption>
									</div>
								</figure>
								</BlurFade>
							))}
						</div>
					</div>
				</section>

				<section className="bg-[var(--background)] px-4 py-16 text-white sm:px-6 md:py-24">
					<div className="mx-auto max-w-6xl">
						<div className="text-center">
							<BlurFade>
								<h2 className="mx-auto font-display text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
									100% European R&amp;D
									<br />
									Zero US CLOUD Act Risk
								</h2>
							</BlurFade>
							<BlurFade delay={0.08}>
							<div className="mx-auto mt-6 max-w-3xl space-y-4 text-base leading-7 text-white/80">
								<p>
									Proudly rooted in{" "}
									<em className="text-white">Occitanie</em>,
									Altwy is supported by Bpifrance, France
									2030, and the Occitanie Region. Operating
									across{" "}
									<em className="text-white">
										France and Germany
									</em>
									, Altwy was selected by the French and
									German governments to represent the future
									of European cloud infrastructure at the{" "}
									<strong className="font-medium text-white">
										Digital Sovereignty Summit in Berlin
									</strong>
									.
								</p>
								<p>
									100% of our core R&amp;D is conducted in
									Europe. Our software stack provides complete
									infrastructure independence with zero
									dependency on US hyperscalers or
									extraterritorial laws, offering ultimate
									data security for European, Asian, and
									security-conscious organizations globally.
								</p>
							</div>
							</BlurFade>
						</div>

						<BlurFade delay={0.12}>
						<div className="mx-auto mt-10 w-full max-w-[240px] overflow-hidden border border-[#3f3f3f] sm:max-w-[280px] md:mt-12">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src="/about/eu-flag.svg"
								alt="Flag of the European Union"
								className="aspect-[3/2] w-full object-cover"
							/>
						</div>

						<div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:mt-10 md:gap-12">
							<Image
								src="/bpifrance-logo-blanc.png"
								alt="Bpifrance"
								width={140}
								height={40}
								className="h-7 w-auto"
							/>
							<Image
								src="/occitanie-logo.png"
								alt="Région Occitanie"
								width={140}
								height={40}
								className="h-10 w-auto"
							/>
							<Image
								src="/logo-france2030-white.png"
								alt="France 2030"
								width={140}
								height={40}
								className="h-8 w-auto"
							/>
						</div>
						</BlurFade>
					</div>
				</section>

				<CorePillars />

				<section className="bg-white px-4 pt-16 sm:px-6 md:pt-24">
					<div className="mx-auto max-w-6xl">
						<BlurFade>
							<header className="mx-auto max-w-3xl text-center">
								<h2 className="font-display text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl md:text-5xl md:leading-[1.12]">
									Empowering People, Respecting Our Planet
								</h2>
								<p className="mt-6 text-base leading-7 text-neutral-600">
									At{" "}
									<span className="font-galano font-semibold text-neutral-900">
										Altwy
									</span>
									, we believe that breakthrough technology is
									built by thriving teams in harmony with
									their environment.
								</p>
							</header>
						</BlurFade>

						<div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,32rem)_minmax(0,1fr)] lg:gap-8">
							<BlurFade delay={0.08} className="text-center lg:self-center">
							<article>
								<h3 className="font-display text-xl font-medium tracking-tight text-[#00B35C] sm:text-2xl">
									{CULTURE[0].title}
								</h3>
								<p className="mt-3 text-base leading-7 text-neutral-600">
									{CULTURE[0].body}
								</p>
							</article>
							</BlurFade>

							<BlurFade delay={0.12} className="order-last mx-auto w-full max-w-md lg:order-none lg:max-w-none lg:self-end">
							<div>
								<Image
									src="/about/culture/environment.png"
									alt="People planting, watering, and cleaning up to care for the planet"
									width={2102}
									height={2093}
									className="h-auto w-full"
								/>
							</div>
							</BlurFade>

							<BlurFade delay={0.16} className="text-center lg:self-center">
							<article>
								<h3 className="font-display text-xl font-medium tracking-tight text-[#00B35C] sm:text-2xl">
									{CULTURE[1].title}
								</h3>
								<p className="mt-3 text-base leading-7 text-neutral-600">
									{CULTURE[1].body}
								</p>
							</article>
							</BlurFade>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
