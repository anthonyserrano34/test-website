import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "@/app/globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieBannerWrapper from "@/components/CookieBannerWrapper";
import { SiteFooter } from "@/components/SiteFooter";
import { Suspense } from "react";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-space-grotesk",
	display: "swap",
});

const galanoGrotesque = localFont({
	src: "./fonts/0_GalanoGrotesqueDEMO-Bold.otf",
	variable: "--font-galano",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Altwy",
	description: "The future of datacenters management",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Suspense fallback={null}>
				<GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
			</Suspense>
			<body
				className={`${inter.variable} ${spaceGrotesk.variable} ${galanoGrotesque.variable} antialiased`}
			>
				{children}
				<SiteFooter />
				<CookieBannerWrapper />
			</body>
		</html>
	);
}
