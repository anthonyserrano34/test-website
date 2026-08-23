"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface ParticlesProps {
	className?: string;
	quantity?: number;
	staticity?: number;
	ease?: number;
	size?: number;
	color?: string;
	vx?: number;
	vy?: number;
}

type Circle = {
	x: number;
	y: number;
	translateX: number;
	translateY: number;
	size: number;
	alpha: number;
	targetAlpha: number;
	dx: number;
	dy: number;
	magnetism: number;
};

function hexToRgb(hex: string): [number, number, number] {
	const normalized = hex.replace("#", "");
	const full =
		normalized.length === 3
			? normalized
					.split("")
					.map((char) => char + char)
					.join("")
			: normalized;
	const value = Number.parseInt(full, 16);
	return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function remap(
	value: number,
	start1: number,
	end1: number,
	start2: number,
	end2: number,
) {
	const remapped =
		((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
	return remapped > 0 ? remapped : 0;
}

export function Particles({
	className,
	quantity = 90,
	staticity = 50,
	ease = 50,
	size = 1.5,
	color = "#5EEAD4",
	vx = 0,
	vy = 0,
}: ParticlesProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		const canvas = canvasRef.current;
		if (!container || !canvas) return;

		const context = canvas.getContext("2d");
		if (!context) return;

		const rgb = hexToRgb(color);
		const mouse = { x: 0, y: 0 };
		const canvasSize = { w: 0, h: 0 };
		const circles: Circle[] = [];
		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		let dpr = Math.min(window.devicePixelRatio || 1, 2);
		let rafId = 0;
		let running = true;

		const createCircle = (): Circle => ({
			x: Math.random() * canvasSize.w,
			y: Math.random() * canvasSize.h,
			translateX: 0,
			translateY: 0,
			size,
			alpha: 0,
			targetAlpha: Number.parseFloat((Math.random() * 0.35 + 0.18).toFixed(2)),
			dx: (Math.random() - 0.5) * 0.16,
			dy: (Math.random() - 0.5) * 0.16,
			magnetism: 0.2 + Math.random() * 3.2,
		});

		const drawCircle = (circle: Circle) => {
			context.beginPath();
			context.arc(
				circle.x + circle.translateX,
				circle.y + circle.translateY,
				circle.size,
				0,
				Math.PI * 2,
			);
			context.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${circle.alpha})`;
			context.fill();
		};

		const resize = () => {
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvasSize.w = container.offsetWidth;
			canvasSize.h = container.offsetHeight;
			canvas.width = Math.floor(canvasSize.w * dpr);
			canvas.height = Math.floor(canvasSize.h * dpr);
			canvas.style.width = `${canvasSize.w}px`;
			canvas.style.height = `${canvasSize.h}px`;
			context.setTransform(dpr, 0, 0, dpr, 0, 0);

			circles.length = 0;
			for (let i = 0; i < quantity; i += 1) {
				const circle = createCircle();
				circle.alpha = circle.targetAlpha;
				circles.push(circle);
			}
		};

		const animate = () => {
			if (!running) return;

			context.clearRect(0, 0, canvasSize.w, canvasSize.h);

			for (let i = circles.length - 1; i >= 0; i -= 1) {
				const circle = circles[i];
				const edge = Math.min(
					circle.x + circle.translateX - circle.size,
					canvasSize.w - circle.x - circle.translateX - circle.size,
					circle.y + circle.translateY - circle.size,
					canvasSize.h - circle.y - circle.translateY - circle.size,
				);
				const edgeFade = Number.parseFloat(remap(edge, 0, 20, 0, 1).toFixed(2));

				if (edgeFade > 1) {
					circle.alpha = Math.min(circle.alpha + 0.02, circle.targetAlpha);
				} else {
					circle.alpha = circle.targetAlpha * edgeFade;
				}

				if (!reducedMotion) {
					circle.x += circle.dx + vx;
					circle.y += circle.dy + vy;
					circle.translateX +=
						(mouse.x / (staticity / circle.magnetism) - circle.translateX) /
						ease;
					circle.translateY +=
						(mouse.y / (staticity / circle.magnetism) - circle.translateY) /
						ease;
				}

				drawCircle(circle);

				if (
					circle.x < -circle.size ||
					circle.x > canvasSize.w + circle.size ||
					circle.y < -circle.size ||
					circle.y > canvasSize.h + circle.size
				) {
					circles.splice(i, 1);
					circles.push(createCircle());
				}
			}

			if (!reducedMotion) {
				rafId = window.requestAnimationFrame(animate);
			}
		};

		const onMouseMove = (event: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			const x = event.clientX - rect.left - canvasSize.w / 2;
			const y = event.clientY - rect.top - canvasSize.h / 2;
			const inside =
				x < canvasSize.w / 2 &&
				x > -canvasSize.w / 2 &&
				y < canvasSize.h / 2 &&
				y > -canvasSize.h / 2;
			if (inside) {
				mouse.x = x;
				mouse.y = y;
			}
		};

		resize();
		animate();

		const resizeObserver = new ResizeObserver(() => {
			resize();
			if (reducedMotion) animate();
		});
		resizeObserver.observe(container);
		window.addEventListener("mousemove", onMouseMove);

		return () => {
			running = false;
			window.cancelAnimationFrame(rafId);
			resizeObserver.disconnect();
			window.removeEventListener("mousemove", onMouseMove);
		};
	}, [color, ease, quantity, size, staticity, vx, vy]);

	return (
		<div
			ref={containerRef}
			className={cn("pointer-events-none absolute inset-0", className)}
			aria-hidden="true"
		>
			<canvas ref={canvasRef} className="h-full w-full" />
		</div>
	);
}
