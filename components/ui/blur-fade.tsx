"use client";

import { useRef, type ReactNode } from "react";
import {
	AnimatePresence,
	motion,
	useInView,
	type UseInViewOptions,
	type Variants,
} from "framer-motion";

import { cn } from "@/lib/utils";

interface BlurFadeProps {
	children: ReactNode;
	className?: string;
	variant?: {
		hidden: { y: number };
		visible: { y: number };
	};
	duration?: number;
	delay?: number;
	yOffset?: number;
	inView?: boolean;
	inViewMargin?: UseInViewOptions["margin"];
	blur?: string;
}

export function BlurFade({
	children,
	className,
	variant,
	duration = 0.45,
	delay = 0,
	yOffset = 8,
	inView = true,
	inViewMargin = "-60px",
	blur = "8px",
}: BlurFadeProps) {
	const ref = useRef(null);
	const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
	const isInView = !inView || inViewResult;
	const defaultVariants: Variants = {
		hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
		visible: { y: 0, opacity: 1, filter: "blur(0px)" },
	};

	return (
		<AnimatePresence>
			<motion.div
				ref={ref}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				exit="hidden"
				variants={variant || defaultVariants}
				transition={{
					delay: 0.04 + delay,
					duration,
					ease: "easeOut",
				}}
				className={cn(className)}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}
