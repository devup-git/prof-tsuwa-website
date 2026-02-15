import GalleryManagerClient from "./GalleryManagerClient"
import { getGalleryItems } from "@/lib/db-queries"

export const metadata = {
    title: "Gallery Manager | Admin",
}

export const dynamic = "force-dynamic"

export default async function GalleryAdminPage() {
    const items = await getGalleryItems()
    return <GalleryManagerClient initialItems={items} />
}
