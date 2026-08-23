import { cn } from "@/lib/utils";

type LogoType = {
	src: string;
	alt: string;
	isInvertable?: boolean;
};

type TileData = {
	row: number;
	col: number;
	logo?: LogoType;
};

const logos = {
	amd: {
		src: "/integrations/amd.svg",
		alt: "AMD",
		isInvertable: true,
	},
	arm: {
		src: "/integrations/arm.svg",
		alt: "ARM",
		isInvertable: true,
	},
	intel: {
		src: "/integrations/intel.svg",
		alt: "Intel",
		isInvertable: true,
	},
	riscv: {
		src: "/integrations/riscv.svg",
		alt: "RISC-V",
		isInvertable: true,
	},
} as const satisfies Record<string, LogoType>;

const tiles: TileData[] = [
	{ row: 0, col: 1 },
	{ row: 0, col: 3 },
	{ row: 1, col: 0 },
	{ row: 1, col: 2, logo: logos.arm },
	{ row: 1, col: 4 },
	{ row: 2, col: 1, logo: logos.riscv },
	{ row: 2, col: 3, logo: logos.amd },
	{ row: 3, col: 0 },
	{ row: 3, col: 2, logo: logos.intel },
	{ row: 3, col: 4 },
	{ row: 4, col: 1 },
	{ row: 4, col: 3 },
];

const emptyTiles = tiles.filter((tile) => !tile.logo);
const logoTiles = tiles.filter((tile) => tile.logo);

export function IntegrationGrid({ className }: { className?: string }) {
	return (
		<div className={cn("grid place-items-end", className)}>
			<div className="relative h-[360px] w-[360px]">
				<div
					className="absolute inset-0"
					style={{
						maskImage:
							"radial-gradient(ellipse at center, black 28%, transparent 72%)",
						WebkitMaskImage:
							"radial-gradient(ellipse at center, black 28%, transparent 72%)",
					}}
				>
					{emptyTiles.map((tile) => (
						<IntegrationCard key={`${tile.row}_${tile.col}`} {...tile} />
					))}
				</div>
				{logoTiles.map((tile) => (
					<IntegrationCard key={`${tile.row}_${tile.col}`} {...tile} />
				))}
			</div>
		</div>
	);
}

export function Integrations() {
	return (
		<div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 p-4 md:grid-cols-2 md:items-center">
			<div className="max-w-xl space-y-5">
				<h2 className="font-medium text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
					Seamless Integration
				</h2>
				<p className="text-lg leading-8 text-white/60">
					Integrate with over 100+ tools and platforms to streamline your
					workflow and boost productivity.
				</p>
			</div>

			<IntegrationGrid />
		</div>
	);
}

function IntegrationCard({ row, col, logo }: TileData) {
	return (
		<div
			className={cn(
				"absolute flex h-[72px] w-[72px] items-center justify-center rounded-md border",
				logo
					? "border-[#3f3f3f] bg-[#1a1a1a] shadow-sm"
					: "border-white/[0.08] bg-white/[0.05]"
			)}
			style={{
				left: col * 72,
				top: row * 72,
			}}
		>
			{logo && (
				// eslint-disable-next-line @next/next/no-img-element -- local brand SVGs
				<img
					alt={logo.alt}
					className={cn(
						"pointer-events-none h-8 w-8 select-none object-contain p-1",
						logo.isInvertable && "invert"
					)}
					height={40}
					src={logo.src}
					width={40}
				/>
			)}
		</div>
	);
}

export default Integrations;
