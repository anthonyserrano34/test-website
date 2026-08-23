"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { IntegrationGrid } from "@/components/ui/integrations-4";

export function SiliconSection() {
	return (
		<section className="relative z-10 bg-[#121212] px-4 py-16 sm:px-6 md:py-24">
			<div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
				<BlurFade delay={0.04}>
					<p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[#00FF88]/80 sm:text-xs">
						Multi-architecture
					</p>
					<h2 className="font-display text-3xl font-medium tracking-tight text-white md:text-5xl">
						One stack across ARM, RISC-V, and x86
					</h2>
					<p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
						<span className="font-galano font-semibold text-white/80">
							Altwy
						</span>{" "}
						is optimized for modern silicon (ARM, RISC-V) and
						traditional x86 architectures — near-native guest
						performance, with less heat and less energy.
					</p>
				</BlurFade>

				<IntegrationGrid className="mx-auto lg:mx-0 lg:justify-self-end" />
			</div>
		</section>
	);
}
