import {
	type ComponentPropsWithoutRef,
	type CSSProperties,
	type FC,
} from "react";

import { cn } from "@/lib/utils";

export interface AnimatedShinyTextProps
	extends ComponentPropsWithoutRef<"span"> {
	shimmerWidth?: number;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
	children,
	className,
	shimmerWidth = 120,
	...props
}) => {
	return (
		<span className={cn("relative inline-block", className)} {...props}>
			<span className="opacity-80">{children}</span>
			<span
				aria-hidden
				style={
					{
						"--shiny-width": `${shimmerWidth}px`,
					} as CSSProperties
				}
				className="absolute inset-0 animate-shiny-text bg-gradient-to-r from-transparent via-white via-50% to-transparent bg-clip-text bg-no-repeat text-transparent [background-position:0_0] [background-size:var(--shiny-width)_100%]"
			>
				{children}
			</span>
		</span>
	);
};
