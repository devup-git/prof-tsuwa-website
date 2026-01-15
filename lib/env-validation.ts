const requiredEnvVars = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"]

const optionalEnvVars = ["NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL", "RESEND_API_KEY", "SENDGRID_API_KEY"]

export function validateEnv() {
  const missing = requiredEnvVars.filter((env) => !process.env[env])

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`)
  }

  // Optional vars configured (logged only in development)
  const configured = optionalEnvVars.filter((env) => process.env[env])
  if (configured.length > 0 && process.env.NODE_ENV === "development") {
    console.log("[env] Optional vars configured:", configured.join(", "))
  }

  return true
}

// Call on app startup
if (typeof window === "undefined") {
  validateEnv()
}
