import { createBrowserClient } from "@supabase/ssr"

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      if (typeof window === "undefined") {
        // During build/SSR if variables are missing, don't crash but return a dummy or null
        // attempting to use this will likely fail, but it prevents build crashes from simple import/init
        return createBrowserClient("https://placeholder.supabase.co", "placeholder")
      }
      throw new Error("Missing Supabase Environment Variables")
    }

    supabaseClient = createBrowserClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseClient
}
