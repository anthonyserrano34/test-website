"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface SpotlightBorderProps {
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange";
}

const glowColorMap = {
  blue: { hue: "220 100% 65%", white: "rgba(255,255,255,0.95)" },
  purple: { hue: "280 100% 70%", white: "rgba(255,255,255,0.95)" },
  green: { hue: "145 100% 56%", white: "rgba(255,255,255,0.98)" },
  red: { hue: "0 100% 60%", white: "rgba(255,255,255,0.95)" },
  orange: { hue: "30 100% 60%", white: "rgba(255,255,255,0.95)" },
} as const;

export function SpotlightBorder({
  className,
  glowColor = "green",
}: SpotlightBorderProps) {
  const color = glowColorMap[glowColor];

  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 rounded-xl pointer-events-none", className)}
      style={
        {
          "--spot-x": "50%",
          "--spot-y": "0%",
          "--spot-size": "72%",
          "--core-size": "18%",
          "--spot-hue": color.hue,
          "--spot-white": color.white,
        } as CSSProperties
      }
    >
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          WebkitMaskImage:
            "linear-gradient(#fff,#fff),linear-gradient(#fff,#fff)",
          WebkitMaskClip: "padding-box,border-box",
          WebkitMaskComposite: "xor",
          maskImage: "linear-gradient(#fff,#fff),linear-gradient(#fff,#fff)",
          maskClip: "padding-box,border-box",
          maskComposite: "exclude",
          padding: "1px",
          background: `
            radial-gradient(
              92% 300% at var(--spot-x) var(--spot-y),
              hsl(var(--spot-hue) / 1) 0%,
              hsl(var(--spot-hue) / 0.72) 24%,
              transparent 62%
            ),
            radial-gradient(
              46% 210% at var(--spot-x) var(--spot-y),
              var(--spot-white) 0%,
              transparent 60%
            )
          `,
        }}
      />

      <div
        className="absolute -top-5 left-1/2 -translate-x-1/2 h-16 w-[78%] rounded-full blur-[42px]"
        style={{
          background:
            "radial-gradient(72% 130% at 50% 8%, hsl(var(--spot-hue) / 0.52) 0%, transparent 74%)",
        }}
      />
      <div
        className="absolute -top-1 left-1/2 -translate-x-1/2 h-8 w-[22%] rounded-full blur-[10px]"
        style={{
          background:
            "radial-gradient(62% 150% at 50% 0%, var(--spot-white) 0%, transparent 76%)",
        }}
      />
    </div>
  );
}
