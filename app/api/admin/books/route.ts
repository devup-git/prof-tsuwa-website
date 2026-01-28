import { addBook, deleteBook } from "@/lib/db-queries"
import { checkAdminAPI, handleAdminError } from "@/lib/api-auth"
import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
    try {
        const authCheck = await checkAdminAPI()
        if (!authCheck.authorized) return authCheck.response

        const body = await request.json()
        // TODO: Add Zod validation here

        const newBook = await addBook(body)

        if (!newBook) {
            return NextResponse.json({ error: "Failed to add book" }, { status: 500 })
        }

        revalidatePath("/books")
        revalidatePath("/admin/books")
        return NextResponse.json(newBook, { status: 201 })
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

        const success = await deleteBook(id)

        if (!success) {
            return NextResponse.json({ error: "Failed to delete book" }, { status: 500 })
        }

        revalidatePath("/books")
        revalidatePath("/admin/books")
        return NextResponse.json({ success: true })
    } catch (error) {
        return handleAdminError(error)
    }
}
