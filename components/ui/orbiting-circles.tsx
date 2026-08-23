import { type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface OrbitingCirclesProps {
	className?: string;
	children?: ReactNode;
	reverse?: boolean;
	duration?: number;
	radius?: number;
	path?: boolean;
	iconSize?: number;
	speed?: number;
}

export function OrbitingCircles({
	className,
	children,
	reverse,
	duration = 20,
	radius = 160,
	path = true,
	iconSize = 40,
	speed = 1,
}: OrbitingCirclesProps) {
	const childArray = Array.isArray(children) ? children : children ? [children] : [];
	const calculatedDuration = duration / speed;

	return (
		<>
			{path ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="pointer-events-none absolute inset-0 size-full"
				>
					<circle
						className="stroke-white/10"
						cx="50%"
						cy="50%"
						r={radius}
						fill="none"
						strokeWidth="1"
					/>
				</svg>
			) : null}
			{childArray.map((child, index) => {
				const angle = (360 / childArray.length) * index;
				return (
					<div
						key={index}
						style={
							{
								"--duration": calculatedDuration,
								"--radius": radius,
								"--angle": angle,
								"--icon-size": `${iconSize}px`,
								width: iconSize,
								height: iconSize,
								marginLeft: -iconSize / 2,
								marginTop: -iconSize / 2,
							} as CSSProperties
						}
						className={cn(
							"absolute top-1/2 left-1/2 flex transform-gpu animate-orbit items-center justify-center",
							reverse && "[animation-direction:reverse]",
							className,
						)}
					>
						{child}
					</div>
				);
			})}
		</>
	);
}
