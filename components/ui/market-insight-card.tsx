import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type MarketInsightSource = {
	name: string;
	logo: string;
};

export type MarketInsight = {
	sources: readonly MarketInsightSource[];
	headline: string;
	description: string;
	cta: string;
	href: string;
};

type MarketInsightCardProps = {
	insight: MarketInsight;
	index: number;
	className?: string;
};

export function MarketInsightCard({
	insight,
	index,
	className,
}: MarketInsightCardProps) {
	const number = String(index + 1).padStart(2, "0");

	return (
		<a
			href={insight.href}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(
				"group grid grid-cols-1 gap-4 border-b border-white/10 py-8 outline-none md:grid-cols-[5.5rem_minmax(0,1fr)_auto] md:items-start md:gap-10 md:py-10",
				"transition-colors duration-300 hover:border-white/20",
				"focus-visible:ring-2 focus-visible:ring-[#00FF88]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
				className,
			)}
		>
			<span className="font-light tracking-tighter text-[#00FF88] text-4xl md:text-5xl">
				{number}
			</span>

			<div className="min-w-0">
				<div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
					{insight.sources.map((source, sourceIndex) => (
						<span key={source.name} className="flex items-center gap-3">
							{sourceIndex > 0 && (
								<span className="h-3.5 w-px bg-white/15" aria-hidden />
							)}
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={source.logo}
								alt={source.name}
								className="h-5 w-auto max-w-[130px] object-contain object-left opacity-80 transition-opacity duration-300 group-hover:opacity-100"
							/>
						</span>
					))}
				</div>

				<h3 className="text-xl font-medium tracking-tight text-white transition-colors duration-300 group-hover:text-[#00FF88] md:text-2xl">
					&ldquo;{insight.headline}&rdquo;
				</h3>

				<p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
					{insight.description}
				</p>

				<span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#00FF88] md:hidden">
					{insight.cta}
					<ArrowUpRight className="h-4 w-4" />
				</span>
			</div>

			<span className="hidden items-center gap-1.5 pt-1 text-sm font-medium text-white/40 transition-colors duration-300 group-hover:text-[#00FF88] md:inline-flex">
				{insight.cta}
				<ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
			</span>
		</a>
	);
}
