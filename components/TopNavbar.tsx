"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

interface TopNavbarProps {
	isTransparent?: boolean;
	trackScroll?: boolean;
	scrollThreshold?: number;
}

export default function TopNavbar({
	isTransparent = false,
	trackScroll = false,
	scrollThreshold = 50,
}: TopNavbarProps) {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		if (!trackScroll) {
			return;
		}

		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [trackScroll]);

	const shouldBeTransparent = trackScroll
		? scrollY <= scrollThreshold
		: isTransparent;

	return <Navbar isTransparent={shouldBeTransparent} />;
}
