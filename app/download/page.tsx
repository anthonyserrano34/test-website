import { Metadata } from "next"
import TopNavbar from "@/components/TopNavbar"
import { SubpageHeroHeader } from "@/components/ui/subpage-hero-header"

export const metadata: Metadata = {
	title: "Altwy - Download",
	description: "Download Access by Altwy.",
}

export default function Page() {
	return (
		<div className="relative min-h-screen bg-[var(--background)]">
			<SubpageHeroHeader />
			<TopNavbar trackScroll />

			<main className="relative z-10 mx-auto max-w-3xl px-4 pb-24 pt-32 text-center">
				<p className="text-sm text-white">This page is under development.</p>
			</main>
		</div>
	)
}
