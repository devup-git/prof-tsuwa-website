import { getSupabaseServer } from "./supabase-server"

export async function checkAdminAuth() {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { isAdmin: false, user: null }
  }

  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  return {
    isAdmin: profile?.is_admin || false,
    user,
  }
}

export async function requireAdmin() {
  const { isAdmin, user } = await checkAdminAuth()

  if (!isAdmin) {
    throw new Error("Unauthorized: Admin access required")
  }

  return user
}
