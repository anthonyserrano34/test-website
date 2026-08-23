"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

function hash(n: number) {
	const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
	return x - Math.floor(x);
}

interface PixelCornerProps {
	sectionColor: string;
	placement: "top-left" | "bottom-right";
	className?: string;
}

export function PixelCorner({
	sectionColor,
	placement,
	className,
}: PixelCornerProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [compact, setCompact] = useState(false);

	useEffect(() => {
		const media = window.matchMedia("(max-width: 1023px)");
		const update = () => setCompact(media.matches);
		update();
		media.addEventListener("change", update);
		return () => media.removeEventListener("change", update);
	}, []);

	const squareSize = compact ? 14 : 16;
	const rows = compact ? 6 : 11;
	const cols = compact ? 10 : 20;
	const overlapRows = 2;
	const width = cols * squareSize;
	const height = rows * squareSize;
	const overflow = (rows - overlapRows) * squareSize;

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const dpr = window.devicePixelRatio || 1;
		canvas.width = Math.floor(width * dpr);
		canvas.height = Math.floor(height * dpr);
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		ctx.clearRect(0, 0, width, height);

		ctx.fillStyle = sectionColor;
		ctx.fillRect(
			0,
			(rows - overlapRows) * squareSize,
			width,
			overlapRows * squareSize,
		);

		for (let x = 0; x < cols; x++) {
			const t = x / Math.max(cols - 1, 1);
			const n = hash(x * 19.17 + 3.1);
			const n2 = hash(x * 7.3 + 11.9);

			let up = Math.round((1 - t) * (rows - overlapRows - 2));
			up += n > 0.72 ? 1 : n < 0.28 ? -1 : 0;
			if (n2 > 0.9) up += 1;
			if (n2 < 0.1) up -= 1;
			up = Math.max(0, Math.min(rows - overlapRows - 1, up));

			const startRow = rows - overlapRows - up;
			for (let y = startRow; y < rows - overlapRows; y++) {
				ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
			}

			if (n > 0.84 && startRow > 1) {
				ctx.fillRect(
					x * squareSize,
					(startRow - 2) * squareSize,
					squareSize,
					squareSize,
				);
			}
		}
	}, [cols, height, rows, sectionColor, squareSize, width]);

	return (
		<div
			aria-hidden
			className={cn(
				"pointer-events-none absolute z-[1]",
				placement === "top-left" && "left-0",
				placement === "bottom-right" && "right-0 rotate-180",
				className,
			)}
			style={
				placement === "top-left"
					? { top: -overflow }
					: { bottom: -overflow }
			}
		>
			<canvas ref={canvasRef} className="block" />
		</div>
	);
}
