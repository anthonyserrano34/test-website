import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const glowVariants = {
	"top-right":
		"absolute -top-20 -right-20 h-56 w-56 rounded-full bg-[#00FF88]/10 blur-[60px]",
	"top-left":
		"absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#00FF88]/20 blur-[80px]",
	"bottom-right":
		"absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[#00FF88]/10 blur-[60px]",
	center:
		"absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00FF88]/10 blur-[80px]",
} as const;

export type BentoCardGlow = keyof typeof glowVariants;

type BentoCardShellProps = {
	children: ReactNode;
	className?: string;
	contentClassName?: string;
	glow?: BentoCardGlow;
	/** `false` si le contenu dépasse (ex. tooltip) */
	clip?: boolean;
};

export function BentoCardShell({
	children,
	className,
	contentClassName,
	glow = "top-right",
	clip = true,
}: BentoCardShellProps) {
	return (
		<div
			className={cn(
				"group relative rounded-3xl border border-white/[0.06] bg-[#121212] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors duration-500 hover:border-[#00FF88]/25",
				clip ? "overflow-hidden" : "overflow-visible",
				className,
			)}
		>
			<div className="pointer-events-none absolute inset-0 bento-bg-noise" />
			<div
				className={cn(
					"pointer-events-none opacity-50 transition-opacity duration-500 group-hover:opacity-100",
					glowVariants[glow],
				)}
			/>
			<div className={cn("relative z-10", contentClassName)}>{children}</div>
		</div>
	);
}
