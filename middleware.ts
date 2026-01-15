import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Check for required environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Middleware: Missing Supabase environment variables")
    return new NextResponse(
      JSON.stringify({ error: "Configuration Error: Missing Supabase Environment Variables" }),
      { status: 500, headers: { "content-type": "application/json" } },
    )
  }

  // The issue was calling getSetCookie() which doesn't exist; instead we properly
  // serialize cookies using the correct Supabase SSR pattern with NextRequest
  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          // Convert NextRequest cookies to array format
          return Array.from(request.cookies.getAll(), ({ name, value }) => ({
            name,
            value,
          }))
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    },
  )

  // Refresh session if needed
  await supabase.auth.getSession()

  // Check if this is an admin route (and not the login page)
  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) {
    // Get the user session
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // If no user, redirect to login
    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    // Get user profile to check if admin
    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

    // If not admin, redirect to home
    if (!profile?.is_admin) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return response
}

export const config = {
  matcher: ["/admin/:path*"],
}
