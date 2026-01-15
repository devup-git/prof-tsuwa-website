import { getSupabaseServer } from "@/lib/supabase-server"
import { contactFormSchema } from "@/lib/validation-schemas"
import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = contactFormSchema.parse(body)

    // Get Supabase client
    const supabase = await getSupabaseServer()

    // Save to database
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject,
          message_type: validatedData.messageType,
          message: validatedData.message,
        },
      ])
      .select()

    if (error) {
      console.error("[contact] Database error:", error)
      return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data,
      message: "Your message has been received. We'll get back to you soon!"
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
    }

    console.error("[contact] API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
