"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ImageGallery({
  title = "Our Latest Creations",
  description = "A visual collection of our most recent works – each piece crafted with intention, emotion, and style.",
  images = [],
  className,
}: {
  title?: string;
  description?: string;
  images?: string[];
  className?: string;
}) {
  const defaultImages = [
    "https://images.unsplash.com/photo-1719368472026-dc26f70a9b76?q=80&h=800&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1649265825072-f7dd6942baed?q=80&h=800&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&h=800&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1729086046027-09979ade13fd?q=80&h=800&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1601568494843-772eb04aca5d?q=80&h=800&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1585687501004-615dfdfde7f1?q=80&h=800&w=800&auto=format&fit=crop",
  ];

  const galleryImages = images.length > 0 ? images : defaultImages;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleImageClick = (idx: number) => {
    if (expandedIndex === idx) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(idx);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');

        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <section className={cn("w-full flex flex-col items-center justify-start h-full", className)}>
        <div className="max-w-3xl text-center px-4 py-2">
          <h1 className="text-3xl font-semibold pb-2">{title}</h1>
          {description && <p className="text-sm text-slate-500 mt-2">{description}</p>}
        </div>

        {/* Галерея снизу */}
        <div className="flex flex-col md:flex-row items-center gap-2 flex-1 w-full px-4 pb-4 overflow-y-auto md:overflow-hidden">
          {galleryImages.map((src, idx) => (
            <div
              key={idx}
              onClick={() => handleImageClick(idx)}
              className={cn(
                "relative group flex-grow transition-all rounded-lg overflow-hidden duration-500 cursor-pointer",
                // Mobile: vertical layout with click expansion (height changes)
                "w-full",
                expandedIndex === idx ? "h-250" : "h-32",
                // Desktop: horizontal layout with hover expansion (width changes)
                "md:h-full md:w-56 md:hover:w-full"
              )}
            >
              <Image
                className="object-cover object-center"
                src={src}
                alt={`image-${idx}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
