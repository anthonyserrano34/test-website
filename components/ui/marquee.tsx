import * as React from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	pauseOnHover?: boolean;
	reverse?: boolean;
	vertical?: boolean;
	repeat?: number;
	fade?: boolean;
}

export function Marquee({
	children,
	pauseOnHover = false,
	reverse = false,
	vertical = false,
	repeat = 4,
	fade = true,
	className,
	...props
}: MarqueeProps) {
	const items = React.Children.toArray(children);

	return (
		<div
			{...props}
			className={cn(
				"group relative flex overflow-hidden [--duration:40s] [--gap:3rem] [gap:var(--gap)]",
				vertical ? "flex-col" : "flex-row",
				className,
			)}
		>
			{Array.from({ length: repeat }).map((_, index) => (
				<div
					key={index}
					aria-hidden={index > 0 || undefined}
					className={cn(
						"flex shrink-0 flex-nowrap items-center justify-around [gap:var(--gap)] will-change-transform",
						vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row",
						pauseOnHover && "group-hover:[animation-play-state:paused]",
						reverse && "[animation-direction:reverse]",
					)}
				>
					{items}
				</div>
			))}
			{fade && (
				<>
					<div
						aria-hidden
						className={cn(
							"pointer-events-none absolute z-10 from-[var(--background)] to-transparent",
							vertical
								? "inset-x-0 top-0 h-16 bg-gradient-to-b sm:h-24"
								: "inset-y-0 left-0 w-16 bg-gradient-to-r sm:w-28 md:w-40",
						)}
					/>
					<div
						aria-hidden
						className={cn(
							"pointer-events-none absolute z-10 from-[var(--background)] to-transparent",
							vertical
								? "inset-x-0 bottom-0 h-16 bg-gradient-to-t sm:h-24"
								: "inset-y-0 right-0 w-16 bg-gradient-to-l sm:w-28 md:w-40",
						)}
					/>
				</>
			)}
		</div>
	);
}
