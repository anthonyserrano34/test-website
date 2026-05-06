import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type ImpactMetricsFrameProps = {
	children: ReactNode;
	className?: string;
};

export function ImpactMetricsFrame({ children, className }: ImpactMetricsFrameProps) {
	return (
		<div
			className={cn(
				"relative mx-auto flex w-full flex-col border-y border-white/10",
				"bg-[radial-gradient(35%_80%_at_25%_0%,rgba(255,255,255,0.08),transparent)]",
				className
			)}
		>
			<Plus
				className="pointer-events-none absolute -top-[12.5px] -left-[11.5px] z-[1] size-6 text-white/35"
				strokeWidth={1}
			/>
			<Plus
				className="pointer-events-none absolute -top-[12.5px] -right-[11.5px] z-[1] size-6 text-white/35"
				strokeWidth={1}
			/>
			<Plus
				className="pointer-events-none absolute -bottom-[12.5px] -left-[11.5px] z-[1] size-6 text-white/35"
				strokeWidth={1}
			/>
			<Plus
				className="pointer-events-none absolute -right-[11.5px] -bottom-[12.5px] z-[1] size-6 text-white/35"
				strokeWidth={1}
			/>

			<div className="pointer-events-none absolute -inset-y-6 left-0 w-px border-l border-white/10" />
			<div className="pointer-events-none absolute -inset-y-6 right-0 w-px border-r border-white/10" />

			<div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-full -translate-x-1/2 border-l border-dashed border-white/10" />

			{children}
		</div>
	);
}
