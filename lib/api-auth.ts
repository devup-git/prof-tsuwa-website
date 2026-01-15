import { getSupabaseServer } from "./supabase-server"
import { NextResponse } from "next/server"

interface AdminCheckResult {
  authorized: boolean
  response?: NextResponse
  isAdmin: boolean
  userId: string | null
}

export async function checkAdminAPI(): Promise<AdminCheckResult> {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      authorized: false,
      response: NextResponse.json({ error: "Authentication required" }, { status: 401 }),
      isAdmin: false,
      userId: null
    }
  }

  try {
    const { data: profile, error } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

    if (error || !profile?.is_admin) {
      return {
        authorized: false,
        response: NextResponse.json({ error: "Admin access required" }, { status: 403 }),
        isAdmin: false,
        userId: user.id
      }
    }

    return { authorized: true, isAdmin: true, userId: user.id }
  } catch (error) {
    console.error("[v0] Error checking admin status:", error)
    return {
      authorized: false,
      response: NextResponse.json({ error: "Internal Server Error" }, { status: 500 }),
      isAdmin: false,
      userId: user.id
    }
  }
}

export function handleAdminError(error: any) {
  console.error("API Error:", error)
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
}
