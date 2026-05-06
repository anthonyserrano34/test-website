"use client";

import { animate } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import { cn } from "@/lib/utils";

export interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
	value: number;
	startValue?: number;
	direction?: "up" | "down";
	delay?: number;
	decimalPlaces?: number;
}

export function NumberTicker({
	value,
	startValue = 0,
	direction = "up",
	delay = 0,
	className,
	decimalPlaces = 0,
	...props
}: NumberTickerProps) {
	const ref = useRef<HTMLSpanElement | null>(null);
	const [display, setDisplay] = useState(startValue);
	const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

	const formatter = useMemo(
		() =>
			new Intl.NumberFormat("en-US", {
				minimumFractionDigits: decimalPlaces,
				maximumFractionDigits: decimalPlaces,
			}),
		[decimalPlaces]
	);

	useEffect(() => {
		if (!inView) return;

		const from = direction === "down" ? value : startValue;
		const to = direction === "down" ? startValue : value;

		const controls = animate(from, to, {
			duration: 1.35,
			delay,
			ease: [0.16, 1, 0.3, 1],
			onUpdate: (latest) => {
				setDisplay(latest);
				if (ref.current) {
					ref.current.textContent = formatter.format(Number(latest.toFixed(decimalPlaces)));
				}
			},
		});

		return () => controls.stop();
	}, [decimalPlaces, delay, direction, formatter, inView, startValue, value]);

	return (
		<span
			ref={(node) => {
				ref.current = node;
				inViewRef(node);
			}}
			className={cn("inline-block tabular-nums tracking-tight", className)}
			{...props}
		>
			{formatter.format(Number(display.toFixed(decimalPlaces)))}
		</span>
	);
}
