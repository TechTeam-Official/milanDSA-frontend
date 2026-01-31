import fs from "fs";
import path from "path";
import sharp from "sharp";

const FULL_DIR = path.join(process.cwd(), "public/Teams/full");
const THUMB_DIR = path.join(process.cwd(), "public/Teams/thumbs");

// Only handle jpg/jpeg/png
const SUPPORTED_EXT = /\.(jpe?g|png)$/i;

// Target thumb size (square, adjust to your sphere needs)
const THUMB_SIZE = 256;

async function walk(dir: string, cb: (filePath: string) => Promise<void>) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath, cb);
    } else if (SUPPORTED_EXT.test(entry.name)) {
      await cb(fullPath);
    }
  }
}

async function generate() {
  if (!fs.existsSync(FULL_DIR)) {
    throw new Error(`FULL_DIR not found: ${FULL_DIR}`);
  }

  await walk(FULL_DIR, async (filePath) => {
    const relativePath = path.relative(FULL_DIR, filePath);

    // Keep same name and folder, force extension to .JPG (uppercase)
    const outPath = path.join(
      THUMB_DIR,
      relativePath.replace(/\.(jpe?g|png)$/i, ".JPG"),
    );

    fs.mkdirSync(path.dirname(outPath), { recursive: true });

    try {
      await sharp(filePath)
        .rotate() // auto-rotate based on EXIF
        .resize(THUMB_SIZE, THUMB_SIZE, {
          fit: "cover",
          kernel: "lanczos3", // high-quality resampling
        })
        .jpeg({ quality: 75 }) // decent compression, keeps detail
        .toFile(outPath);

      console.log("✔ Thumb created:", path.relative(THUMB_DIR, outPath));
    } catch (err) {
      console.warn("✖ Skipped (sharp error):", relativePath, err);
    }
  });
}

generate().catch((err) => {
  console.error("❌ Thumbnail generation failed", err);
  process.exit(1);
});
