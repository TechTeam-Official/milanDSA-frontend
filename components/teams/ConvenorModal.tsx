"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { ImageData } from "@/components/ui/img-sphere";

export default function ConvenorModal({
  convenor,
  onClose,
}: {
  convenor: ImageData | null;
  onClose: () => void;
}) {
  if (!convenor) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[#F3E8D7] rounded-3xl shadow-[0_25px_50px_-12px_rgba(31,77,74,0.25)] overflow-hidden border border-[#B89B5E]">
        {/* IMAGE */}
        <div className="relative aspect-square">
          <Image
            src={convenor.src}
            alt={convenor.alt}
            fill
            className="object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-[#1F4D4A]/50 hover:bg-[#1F4D4A]/70 text-white rounded-full p-2 transition-colors backdrop-blur-sm">
            <X size={18} />
          </button>
        </div>

        {/* NAME & POSITION */}
        <div className="p-5">
          {convenor.title && (
            <h3 className="text-xl font-bold text-[#2A1E1A] mb-1">
              {convenor.title}
            </h3>
          )}
          {convenor.description && (
            <p className="text-sm font-medium text-[#1F4D4A] uppercase tracking-wide">
              {convenor.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
