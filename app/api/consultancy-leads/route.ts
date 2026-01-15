import { getSupabaseServer } from "@/lib/supabase-server"
import { consultancyLeadSchema } from "@/lib/validation-schemas"
import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = consultancyLeadSchema.parse(body)

    // Get Supabase client
    const supabase = await getSupabaseServer()

    // Save to database
    const { data, error } = await supabase
      .from("consultancy_leads")
      .insert([
        {
          full_name: validatedData.fullName,
          email: validatedData.email,
          company_name: validatedData.companyName || null,
          phone: validatedData.phone || null,
          service_interest: validatedData.serviceInterest,
          message: validatedData.message,
          budget_range: validatedData.budgetRange,
          timeline: validatedData.timeline,
        },
      ])
      .select()

    if (error) {
      console.error("[consultancy] Database error:", error)
      return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data,
      message: "Your inquiry has been received. We'll contact you shortly!"
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
    }

    console.error("[consultancy] API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
