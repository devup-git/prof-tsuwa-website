import fs from "fs"
import path from "path"

export interface GalleryImage {
    src: string
    caption: string
    alt: string
}

/**
 * Scans a directory within the public folder and returns an array of GalleryImage objects.
 * Captions are derived from filenames (underscores to spaces, extension removed).
 */
export function getGalleryImages(folderPath: string): GalleryImage[] {
    const fullPath = path.join(process.cwd(), "public", folderPath)

    if (!fs.existsSync(fullPath)) {
        console.warn(`Gallery directory not found: ${fullPath}`)
        return []
    }

    const files = fs.readdirSync(fullPath)
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG"]

    return files
        .filter((file) => imageExtensions.includes(path.extname(file)))
        .map((file) => {
            // Remove extension and replace characters for the caption
            const fileNameWithoutExt = path.parse(file).name
            const caption = fileNameWithoutExt
                .replace(/_/g, " ")
                .replace(/\(\d+\)/g, "") // Remove numbers in parentheses like (1)
                .trim()

            return {
                src: `/${folderPath}/${file}`.replace(/\/+/g, "/"),
                caption: caption || "Dr. John Tor Tsuwa Activity",
                alt: caption || "Dr. John Tor Tsuwa",
            }
        })
        .sort((a, b) => a.caption.localeCompare(b.caption))
}
