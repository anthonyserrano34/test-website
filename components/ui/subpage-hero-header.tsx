import DemoBackground from "@/components/ui/demo";
import { Component as BackgroundSnippets } from "@/components/ui/background-snippets";
import { FlickeringGrid } from "@/registry/magicui/flickering-grid";

const HEADER_LIGHT_MASK =
	"radial-gradient(ellipse 80% 80% at 50% -20%, white, transparent)";

type SubpageHeroHeaderProps = {
	heightClassName?: string;
	className?: string;
};

export function SubpageHeroHeader({
	heightClassName = "h-[min(100vh,820px)]",
	className,
}: SubpageHeroHeaderProps) {
	return (
		<div
			className={`pointer-events-none absolute inset-x-0 top-0 isolate z-0 overflow-hidden ${heightClassName} ${className ?? ""}`}
			aria-hidden
		>
			<BackgroundSnippets />
			<DemoBackground />
			<div
				className="absolute inset-0 z-[-1] h-full w-full overflow-hidden"
				style={{
					maskImage: HEADER_LIGHT_MASK,
					WebkitMaskImage: HEADER_LIGHT_MASK,
					maskRepeat: "no-repeat",
					WebkitMaskRepeat: "no-repeat",
					maskSize: "100% 100%",
					WebkitMaskSize: "100% 100%",
					maskPosition: "center top",
					WebkitMaskPosition: "center top",
				}}
			>
				<FlickeringGrid
					className="relative h-full w-full"
					squareSize={4}
					gridGap={6}
					color="#00FF88"
					maxOpacity={0.18}
					flickerChance={0.06}
				/>
			</div>
		</div>
	);
}
