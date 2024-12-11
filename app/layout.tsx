import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieBannerWrapper from "@/components/CookieBannerWrapper";
import { Suspense } from "react";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
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
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
				<CookieBannerWrapper />
			</body>
		</html>
	);
}
