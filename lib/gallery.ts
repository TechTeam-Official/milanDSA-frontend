import fs from "fs";
import path from "path";

const IMAGE_REGEX = /\.(png|jpe?g|webp|avif)$/i;

function getImagesRecursively(dir: string, publicPath = ""): string[] {
  // Check if directory exists before reading to avoid crashes
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const abs = path.join(dir, entry.name);
    // Ensure path separators are standardized for web URLs (forward slashes)
    const pub = `${publicPath}/${entry.name}`.replace(/\\/g, "/");

    if (entry.isDirectory()) {
      return getImagesRecursively(abs, pub);
    }

    return IMAGE_REGEX.test(entry.name) ? [pub] : [];
  });
}

// 🔥 This runs at BUILD TIME on the server
const galleryRoot = path.join(process.cwd(), "public/GalleryPage");

export const galleryImages: string[] = fs.existsSync(galleryRoot)
  ? getImagesRecursively(galleryRoot, "/GalleryPage")
  : [];

// Force regeneration helper
console.log(`[Gallery] Loaded ${galleryImages.length} images from ${galleryRoot}`);
