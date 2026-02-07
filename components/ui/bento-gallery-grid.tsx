"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { X } from "lucide-react"

interface BentoGalleryGridProps {
  images: string[]
  className?: string
}

export function BentoGalleryGrid({ images, className }: BentoGalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Pattern for grid spans
  // 0: Large Square (2x2)
  // 1: Small (1x1)
  // 2: Tall (1x2)
  // 3: Small (1x1)
  // 4: Wide (2x1)
  // 5: Small (1x1)
  // 6: Small (1x1)
  // 5: Small (1x1)
  // 6: Small (1x1)
  const getSpanClass = (index: number) => {
    const pattern = index % 7
    switch (pattern) {
      case 0:
        return "md:col-span-2 md:row-span-2"
      case 2:
        return "md:row-span-2"
      case 4:
        return "md:col-span-2"
      default:
        return "col-span-1 row-span-1"
    }
  }

  const isVideo = (src: string) => src.toLowerCase().endsWith('.mp4') || src.toLowerCase().endsWith('.webm');

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[250px] gap-4 p-4",
          className
        )}
      >
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            className={cn(
              "relative overflow-hidden rounded-xl cursor-pointer group",
              "bg-[#2A1F1A] border border-[#8C6A3D]/30", // New background & border
              "hover:shadow-[0_0_30px_rgba(201,162,77,0.15)] transition-shadow duration-500", // Soft Gold Hover Glow
              getSpanClass(idx)
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            onClick={() => setSelectedImage(src)}
          >
            {isVideo(src) ? (
              <video
                src={src}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <Image
                src={src}
                alt={`Gallery image ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            )}
            {/* Removed the black darkening overlay as per "No color shifts" instruction */}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/95 p-4 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-[#F1EEE8] hover:text-[#C9A24D] z-50 p-2 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <div className="relative w-full max-w-5xl h-[80vh]" onClick={e => e.stopPropagation()}>
            {isVideo(selectedImage) ? (
              <video
                src={selectedImage}
                className="w-full h-full object-contain"
                controls
                autoPlay
              />
            ) : (
              <Image
                src={selectedImage}
                alt="Selected gallery image"
                fill
                className="object-contain"
                priority
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}