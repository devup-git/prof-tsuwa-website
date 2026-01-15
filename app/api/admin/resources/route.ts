import { addStudentResource, deleteStudentResource } from "@/lib/db-queries"
import { checkAdminAPI, handleAdminError } from "@/lib/api-auth"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const authCheck = await checkAdminAPI()
        if (!authCheck.authorized) return authCheck.response

        const body = await request.json()
        const newResource = await addStudentResource(body)

        if (!newResource) {
            return NextResponse.json({ error: "Failed to add resource" }, { status: 500 })
        }

        return NextResponse.json(newResource, { status: 201 })
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

        const success = await deleteStudentResource(id)

        if (!success) {
            return NextResponse.json({ error: "Failed to delete resource" }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return handleAdminError(error)
    }
}
