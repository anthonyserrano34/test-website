"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const TILE_W = 36;
const TILE_H = 18;
const RACK_H = 88;
const ORIGIN_X = 260;
const ORIGIN_Y = 200;

function iso(col: number, row: number) {
	return {
		x: ORIGIN_X + (col - row) * TILE_W,
		y: ORIGIN_Y + (col + row) * TILE_H,
	};
}

function Rack({
	col,
	row,
	delay,
	dense = false,
}: {
	col: number;
	row: number;
	delay: number;
	dense?: boolean;
}) {
	const { x, y } = iso(col, row);
	const w = TILE_W;
	const d = TILE_H;
	const h = RACK_H;
	const bays = dense ? 10 : 7;

	const top = {
		n: [0, -d - h],
		e: [w, -h],
		s: [0, d - h],
		w: [-w, -h],
	} as const;
	const floor = {
		n: [0, -d],
		e: [w, 0],
		s: [0, d],
		w: [-w, 0],
	} as const;

	return (
		<motion.g
			transform={`translate(${x} ${y})`}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.55, delay, ease: "easeOut" }}
		>
			<polygon
				points={`${floor.w.join(",")} ${floor.n.join(",")} ${floor.e.join(",")} ${floor.s.join(",")}`}
				fill="#07140e"
			/>
			<polygon
				points={`${top.w.join(",")} ${top.s.join(",")} ${floor.s.join(",")} ${floor.w.join(",")}`}
				fill="#0c2418"
			/>
			<polygon
				points={`${top.s.join(",")} ${top.e.join(",")} ${floor.e.join(",")} ${floor.s.join(",")}`}
				fill="#123322"
			/>
			<polygon
				points={`${top.n.join(",")} ${top.e.join(",")} ${top.s.join(",")} ${top.w.join(",")}`}
				fill="#184a32"
			/>
			<polygon
				points={`${top.n.join(",")} ${top.e.join(",")} ${top.s.join(",")} ${top.w.join(",")}`}
				fill="none"
				stroke="#00FF88"
				strokeOpacity="0.45"
				strokeWidth="0.9"
			/>
			<polyline
				points={`${floor.w.join(",")} ${top.w.join(",")} ${top.n.join(",")} ${top.e.join(",")} ${floor.e.join(",")}`}
				fill="none"
				stroke="#00FF88"
				strokeOpacity="0.35"
				strokeWidth="0.9"
			/>
			<line
				x1={top.s[0]}
				y1={top.s[1]}
				x2={floor.s[0]}
				y2={floor.s[1]}
				stroke="#00FF88"
				strokeOpacity="0.4"
				strokeWidth="0.9"
			/>

			{Array.from({ length: bays }).map((_, i) => {
				const t = (i + 1) / (bays + 1);
				const lx1 = top.w[0] + (floor.w[0] - top.w[0]) * t;
				const ly1 = top.w[1] + (floor.w[1] - top.w[1]) * t;
				const lx2 = top.s[0] + (floor.s[0] - top.s[0]) * t;
				const ly2 = top.s[1] + (floor.s[1] - top.s[1]) * t;
				const rx1 = top.s[0] + (floor.s[0] - top.s[0]) * t;
				const ry1 = top.s[1] + (floor.s[1] - top.s[1]) * t;
				const rx2 = top.e[0] + (floor.e[0] - top.e[0]) * t;
				const ry2 = top.e[1] + (floor.e[1] - top.e[1]) * t;

				return (
					<g key={i}>
						<line
							x1={lx1}
							y1={ly1}
							x2={lx2}
							y2={ly2}
							stroke="#00FF88"
							strokeOpacity="0.28"
							strokeWidth="3"
						/>
						<line
							x1={rx1}
							y1={ry1}
							x2={rx2}
							y2={ry2}
							stroke="#00FF88"
							strokeOpacity="0.4"
							strokeWidth="3"
						/>
						<motion.circle
							cx={lx1 + (lx2 - lx1) * 0.72}
							cy={ly1 + (ly2 - ly1) * 0.72}
							r="1.5"
							fill="#00FF88"
							initial={{ opacity: 0.2 }}
							animate={{ opacity: [0.18, 0.95, 0.18] }}
							transition={{
								duration: dense ? 1.35 : 2.1,
								delay: delay + i * 0.1,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						/>
					</g>
				);
			})}
		</motion.g>
	);
}

const RACKS = [
	{ col: 0, row: 0, delay: 0.1 },
	{ col: 1, row: 0, delay: 0.16, dense: true },
	{ col: 2, row: 0, delay: 0.22 },
	{ col: 0, row: 2, delay: 0.28, dense: true },
	{ col: 1, row: 2, delay: 0.34 },
	{ col: 2, row: 2, delay: 0.4, dense: true },
] as const;

export function DatacenterScene({ className }: { className?: string }) {
	const xs = RACKS.map((rack) => iso(rack.col, rack.row).x);
	const ys = RACKS.map((rack) => iso(rack.col, rack.row).y);
	const west = Math.min(...xs) - TILE_W - 8;
	const east = Math.max(...xs) + TILE_W + 8;
	const north = Math.min(...ys) - TILE_H - 8;
	const south = Math.max(...ys) + TILE_H + 10;
	const midX = (west + east) / 2;
	const midY = (north + south) / 2;

	const floor = {
		n: [midX, north],
		e: [east, midY],
		s: [midX, south],
		w: [west, midY],
	};

	const minX = Math.min(...xs) - TILE_W;
	const maxX = Math.max(...xs) + TILE_W;
	const minY = Math.min(...ys) - TILE_H - RACK_H;
	const maxY = Math.max(...ys) + TILE_H + 16;
	const padX = 70;
	const padY = 36;
	const viewBox = `${minX - padX} ${minY - padY} ${maxX - minX + padX * 2} ${maxY - minY + padY * 2}`;

	return (
		<div className={cn("relative mx-auto flex w-full items-center justify-center", className)}>
			<svg
				viewBox={viewBox}
				className="mx-auto h-auto w-full max-w-[420px]"
				preserveAspectRatio="xMidYMid meet"
				role="img"
				aria-label="Isometric datacenter with two rows of server racks"
			>
				<polygon
					points={`${floor.w.join(",")} ${floor.n.join(",")} ${floor.e.join(",")} ${floor.s.join(",")}`}
					fill="#0a1611"
					stroke="#00FF88"
					strokeOpacity="0.22"
					strokeWidth="1"
				/>
				<g stroke="#00FF88" strokeOpacity="0.1" strokeWidth="1">
					{[0, 1, 2, 3].map((i) => {
						const a = iso(-0.5 + i, -0.3);
						const b = iso(-0.5 + i, 2.4);
						return (
							<line
								key={`a-${i}`}
								x1={a.x}
								y1={a.y}
								x2={b.x}
								y2={b.y}
							/>
						);
					})}
					{[-0.3, 0.7, 1.7, 2.4].map((r) => {
						const a = iso(-0.55, r);
						const b = iso(2.55, r);
						return (
							<line
								key={`r-${r}`}
								x1={a.x}
								y1={a.y}
								x2={b.x}
								y2={b.y}
							/>
						);
					})}
				</g>
				<polygon
					points={`${floor.w.join(",")} ${floor.s.join(",")} ${floor.s[0]},${floor.s[1] + 14} ${floor.w[0]},${floor.w[1] + 14}`}
					fill="#07110c"
				/>
				<polygon
					points={`${floor.s.join(",")} ${floor.e.join(",")} ${floor.e[0]},${floor.e[1] + 14} ${floor.s[0]},${floor.s[1] + 14}`}
					fill="#0a1812"
				/>

				{[...RACKS]
					.sort((a, b) => a.col + a.row - (b.col + b.row))
					.map((rack) => (
						<Rack key={`${rack.col}-${rack.row}`} {...rack} />
					))}
			</svg>
		</div>
	);
}
