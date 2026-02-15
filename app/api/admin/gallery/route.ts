import { NextResponse } from "next/server"
import { addGalleryItem, updateGalleryItem, deleteGalleryItem } from "@/lib/db-queries"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const item = await addGalleryItem(body)
        return NextResponse.json(item)
    } catch (error) {
        return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 })
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json()
        const { id, ...updates } = body
        const success = await updateGalleryItem(id, updates)
        return NextResponse.json({ success })
    } catch (error) {
        return NextResponse.json({ error: "Failed to update gallery item" }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")
        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 })
        const success = await deleteGalleryItem(id)
        return NextResponse.json({ success })
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 })
    }
}
