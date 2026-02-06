import Image from "next/image";

interface PosterBackgroundProps {
  src: string;
  alt?: string;
}

export function PosterBackground({ src, alt = "" }: PosterBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
