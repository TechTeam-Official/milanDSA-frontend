"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

/* ----------------------------------
   Bento Grid Wrapper
----------------------------------- */

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return <div className={cn("flex flex-col gap-6", className)}>{children}</div>;
}

/* ----------------------------------
   Bento Card
----------------------------------- */

interface BentoCardProps {
  name: string;
  description: string;
  href?: string;
  cta: string;
  Icon: LucideIcon;
  className?: string;
  background?: ReactNode;
  rulebook?: string;
}

export function BentoCard({
  name,
  description,
  href,
  cta,
  Icon,
  className,
  background,
  rulebook,
}: BentoCardProps) {
  const hasBackground = Boolean(background);

  return (
    <div
      className={cn(
        // 🔑 IMPORTANT: min-h added so Image `fill` works
        "group relative min-h-[260px] h-full overflow-hidden rounded-3xl border transition-all hover:shadow-xl",
        hasBackground
          ? "border-[#C9A24D]/20 bg-transparent"
          : "border-[#C9A24D]/20 bg-[#FDFBF7] shadow-[0_4px_20px_-10px_rgba(201,162,77,0.1)]",
        className,
      )}>
      {/* Background image */}
      {background}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div>
          <Icon
            className={cn(
              "mb-4 h-8 w-8",
              hasBackground ? "text-white" : "text-[#0F766E]",
            )}
          />
          <h3
            className={cn(
              "text-xl font-semibold tracking-tight",
              hasBackground ? "text-white" : "text-[#3A2A5E]",
            )}>
            {name}
          </h3>
          <p
            className={cn(
              "mt-2 text-sm",
              hasBackground ? "text-neutral-200" : "text-[#5D4037]",
            )}>
            {description}
          </p>
        </div>

        {href ? (
          <a
            href={href}
            className={cn(
              "mt-6 inline-flex items-center text-sm font-medium transition-colors",
              hasBackground
                ? "text-[#C9A24D] hover:text-[#FFD700]"
                : "text-[#C9A24D] hover:text-[#B87333] hover:underline",
            )}>
            {cta} →
          </a>
        ) : (
          <div className="mt-6 flex items-center justify-between w-full">
            <div
              className={cn(
                "inline-flex items-center text-sm font-medium transition-colors pointer-events-none",
                // Unified color to Antique Gold for consistency
                "text-[#C9A24D]",
              )}>
              {cta} →
            </div>

            {rulebook && (
              <a
                href={rulebook}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "z-20 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg backdrop-blur-md border border-[#C9A24D]/30",
                  hasBackground
                    ? "bg-black/40 text-[#C9A24D] hover:bg-black/60 hover:text-[#FFD700]"
                    : "bg-[#C9A24D]/10 text-[#C9A24D] hover:bg-[#C9A24D]/20 hover:text-[#B87333]"
                )}>
                Rulebook ↗
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
