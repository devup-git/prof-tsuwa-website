import { z } from "zod"

// Contact form validation
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200, "Subject is too long"),
  messageType: z.enum(["general", "consultancy", "student", "collaboration"]),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000, "Message is too long"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Consultancy lead validation
export const consultancyLeadSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(100),
  email: z.string().email("Invalid email"),
  companyName: z.string().max(200).optional().nullable(),
  phone: z.string().min(10, "Invalid phone number").optional().nullable(),
  serviceInterest: z.string().min(5, "Service interest is required"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  budgetRange: z.string().optional().nullable(),
  timeline: z.string().optional().nullable(),
})

export type ConsultancyLeadData = z.infer<typeof consultancyLeadSchema>
