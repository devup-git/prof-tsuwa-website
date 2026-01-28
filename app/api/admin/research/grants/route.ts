import { addResearchGrant, deleteResearchGrant, updateResearchGrant } from "@/lib/db-queries"
import { checkAdminAPI, handleAdminError } from "@/lib/api-auth"
import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
    try {
        const authCheck = await checkAdminAPI()
        if (!authCheck.authorized) return authCheck.response

        const body = await request.json()
        const newGrant = await addResearchGrant(body)

        if (!newGrant) {
            return NextResponse.json({ error: "Failed to add grant" }, { status: 500 })
        }

        revalidatePath("/research")
        revalidatePath("/admin/research")
        return NextResponse.json(newGrant, { status: 201 })
    } catch (error) {
        return handleAdminError(error)
    }
}

export async function PUT(request: NextRequest) {
    try {
        const authCheck = await checkAdminAPI()
        if (!authCheck.authorized) return authCheck.response

        const body = await request.json()
        const { id, ...updates } = body

        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 })

        const success = await updateResearchGrant(id, updates)

        if (!success) {
            return NextResponse.json({ error: "Failed to update grant" }, { status: 500 })
        }

        revalidatePath("/research")
        revalidatePath("/admin/research")
        return NextResponse.json({ success: true, ...body })
    } catch (error) {
        return handleAdminError(error)
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const authCheck = await checkAdminAPI()
        if (!authCheck.authorized) return authCheck.response

        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json({ error: "Missing ID" }, { status: 400 })
        }

        const success = await deleteResearchGrant(id)

        if (!success) {
            return NextResponse.json({ error: "Failed to delete grant" }, { status: 500 })
        }

        revalidatePath("/research")
        revalidatePath("/admin/research")
        return NextResponse.json({ success: true })
    } catch (error) {
        return handleAdminError(error)
    }
}
