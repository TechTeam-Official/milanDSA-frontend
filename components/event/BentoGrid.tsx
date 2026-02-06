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
  href: string;
  cta: string;
  Icon: LucideIcon;
  className?: string;
  background?: ReactNode;
}

export function BentoCard({
  name,
  description,
  href,
  cta,
  Icon,
  className,
  background,
}: BentoCardProps) {
  const hasBackground = Boolean(background);

  return (
    <div
      className={cn(
        // 🔑 IMPORTANT: min-h added so Image `fill` works
        "group relative min-h-[260px] h-full overflow-hidden rounded-3xl border transition-all hover:shadow-xl",
        hasBackground
          ? "border-white/10 bg-transparent"
          : "border-neutral-200 bg-white",
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
              hasBackground ? "text-white" : "text-neutral-900",
            )}
          />
          <h3
            className={cn(
              "text-xl font-semibold tracking-tight",
              hasBackground ? "text-white" : "text-neutral-900",
            )}>
            {name}
          </h3>
          <p
            className={cn(
              "mt-2 text-sm",
              hasBackground ? "text-neutral-200" : "text-neutral-600",
            )}>
            {description}
          </p>
        </div>

        <a
          href={href}
          className={cn(
            "mt-6 inline-flex items-center text-sm font-medium transition-colors",
            hasBackground
              ? "text-purple-300 hover:text-purple-200"
              : "text-purple-600 hover:underline",
          )}>
          {cta} →
        </a>
      </div>
    </div>
  );
}
