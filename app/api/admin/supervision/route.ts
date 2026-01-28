import { addSupervisee, deleteSupervisee } from "@/lib/db-queries"
import { checkAdminAPI, handleAdminError } from "@/lib/api-auth"
import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
    try {
        const authCheck = await checkAdminAPI()
        if (!authCheck.authorized) return authCheck.response

        const body = await request.json()
        const newRecord = await addSupervisee(body)

        if (!newRecord) {
            return NextResponse.json({ error: "Failed to add supervisee" }, { status: 500 })
        }

        revalidatePath("/supervision")
        revalidatePath("/admin/supervision")
        return NextResponse.json(newRecord, { status: 201 })
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

        const success = await deleteSupervisee(id)

        if (!success) {
            return NextResponse.json({ error: "Failed to delete supervisee" }, { status: 500 })
        }

        revalidatePath("/supervision")
        return NextResponse.json({ success: true })
    } catch (error) {
        return handleAdminError(error)
    }
}
