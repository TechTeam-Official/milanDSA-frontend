import { galleryImages } from "@/lib/gallery";
import { GalleryClient } from "./GalleryClient";

// We don't need "force-dynamic" anymore because we aren't fetching an API.
// We are reading files directly, which is faster and safer.

export default function GalleryPage() {
  // Directly access the data from your library
  const images = galleryImages;

  // Optional: Handle the case where no images are found
  if (!images || images.length === 0) {
    return (
      <main className="relative min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-neutral-400">
            Gallery is Empty
          </h2>
          <p className="text-neutral-600">
            No images found in the gallery folder.
          </p>
        </div>
      </main>
    );
  }

  // Pass the data straight to the client
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <GalleryClient initialImages={images} />
    </main>
  );
}
