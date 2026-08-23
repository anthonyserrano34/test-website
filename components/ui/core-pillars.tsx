import { BlurFade } from "@/components/ui/blur-fade";

function DotField({
	points,
}: {
	points: Array<{ x: number; y: number; r?: number }>;
}) {
	return (
		<svg
			viewBox="0 0 56 56"
			className="size-14 text-white"
			aria-hidden
		>
			{points.map((point, index) => (
				<circle
					key={index}
					cx={point.x}
					cy={point.y}
					r={point.r ?? 1.55}
					fill="currentColor"
				/>
			))}
		</svg>
	);
}

function dotsGrid(
	cols: number,
	rows: number,
	fill: (col: number, row: number) => boolean,
	{
		gap = 5.2,
		ox = 8,
		oy = 8,
		r = 1.45,
	}: { gap?: number; ox?: number; oy?: number; r?: number } = {},
) {
	const points: Array<{ x: number; y: number; r: number }> = [];
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			if (!fill(col, row)) continue;
			points.push({
				x: ox + col * gap,
				y: oy + row * gap,
				r,
			});
		}
	}
	return points;
}

const GRID = { gap: 5.2, ox: 9.8, oy: 9.8, r: 1.45 };

const REFRESH_DOTS = dotsGrid(7, 8, (_col, row) => row % 3 !== 2, {
	...GRID,
	ox: 12.4,
});

const LOCKIN_DOTS = dotsGrid(7, 8, (col, row) => {
	const shackle =
		(row === 0 && col >= 2 && col <= 4) ||
		(row >= 1 && row <= 3 && (col === 1 || col === 5));
	const body =
		row >= 4 &&
		!((row === 4 || row === 7) && (col === 0 || col === 6));
	const keyhole = row === 5 && col === 3;
	return (shackle || body) && !keyhole;
}, { ...GRID, ox: 12.4 });

const MODERN_DOTS = dotsGrid(7, 7, (col, row) => {
	if (col <= 1) return row >= 4;
	if (col <= 3) return row >= 2;
	return true;
}, { ...GRID, ox: 12.4, oy: 12.4 });

const PILLARS = [
	{
		title: "Hardware Refresh",
		dots: REFRESH_DOTS,
		body: (
			<>
				Replacing legacy server footprints with high-efficiency
				multi-core architectures (ARM, RISC-V, next-gen x86) powered by{" "}
				<span className="font-galano font-semibold text-white">
					Altwy
				</span>{" "}
				frees up physical rack space and up to{" "}
				<strong className="font-medium text-white">
					75% of power capacity
				</strong>
				. You extract significantly more compute from your existing
				footprint without building new walls.
			</>
		),
	},
	{
		title: "Escape Vendor Lock-in",
		dots: LOCKIN_DOTS,
		body: (
			<>
				Say goodbye to massive hypervisor price hikes and public cloud
				cost spikes.{" "}
				<span className="font-galano font-semibold text-white">
					Altwy
				</span>{" "}
				brings the agility of cloud-native software directly to private
				and sovereign infrastructure at a fraction of the cost.
			</>
		),
	},
	{
		title: "Pragmatic Modernization",
		dots: MODERN_DOTS,
		body: (
			<>
				Transformation shouldn&apos;t mean operational risk. From
				allowing sysadmins and DevOps teams to test locally on
				workstations with{" "}
				<span className="font-galano font-semibold text-white">
					Altwy One
				</span>
				, to turning single servers into autonomous mini-datacenters
				with{" "}
				<span className="font-galano font-semibold text-white">
					Altwy Access
				</span>
				, up to multi-node orchestration, our modular software suite
				accompanies your growth step-by-step.
			</>
		),
	},
] as const;

export function CorePillars() {
	return (
		<section className="relative z-10 bg-[#121212] px-4 py-16 text-white sm:px-6 md:py-24">
			<div className="mx-auto max-w-6xl">
				<BlurFade>
					<h2 className="max-w-xl font-display text-3xl font-medium tracking-tight text-white sm:text-4xl md:max-w-2xl md:text-5xl">
						Our Core Pillars
					</h2>
				</BlurFade>

				<div className="mt-14 grid md:mt-20 md:grid-cols-3">
					{PILLARS.map((pillar, index) => (
						<BlurFade
							key={pillar.title}
							delay={index * 0.08}
							className={
								index === 0
									? "border-t border-white/10 py-10 md:border-t-0 md:py-0 md:pr-10 lg:pr-12"
									: index === PILLARS.length - 1
										? "border-t border-white/10 py-10 md:border-t-0 md:border-l md:border-white/10 md:py-0 md:pl-10 lg:pl-12"
										: "border-t border-white/10 py-10 md:border-t-0 md:border-l md:border-white/10 md:px-10 md:py-0 lg:px-12"
							}
						>
							<article>
								<DotField points={pillar.dots} />
								<h3 className="mt-8 font-display text-xl font-medium tracking-tight text-white sm:text-2xl">
									{pillar.title}
								</h3>
								<p className="mt-3 text-sm leading-6 text-white/80">
									{pillar.body}
								</p>
							</article>
						</BlurFade>
					))}
				</div>
			</div>
		</section>
	);
}
