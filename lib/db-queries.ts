import "server-only"
import { getSupabaseServer, getSupabaseAdmin } from "./supabase-server"

// Publications
export async function getPublications() {
  const supabase = await getSupabaseServer()
  const { data, error } = await supabase
    .from("publications")
    .select("*")
    .order("publication_year", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching publications:", error)
    return []
  }
  return data || []
}

// Courses
export async function getCourses() {
  const supabase = await getSupabaseServer()
  const { data, error } = await supabase.from("courses").select("*").order("code", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching courses:", error)
    return []
  }
  return data || []
}

// Research Projects
export async function getResearchProjects() {
  const supabase = await getSupabaseServer()
  const { data, error } = await supabase.from("research_projects").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching research projects:", error)
    return []
  }
  return data || []
}

// Research Grants
export async function getResearchGrants() {
  const supabase = await getSupabaseServer()
  const { data, error } = await supabase.from("research_grants").select("*").order("year", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching research grants:", error)
    return []
  }
  return data || []
}

// Supervisees
export async function getSupervisees() {
  const supabase = await getSupabaseServer()
  const { data, error } = await supabase.from("supervisees").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching supervisees:", error)
    return []
  }
  return data || []
}

// Conferences
export async function getConferences() {
  const supabase = await getSupabaseServer()
  const { data, error } = await supabase.from("conferences").select("*").order("conference_date", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching conferences:", error)
    return []
  }
  return data || []
}

// Consultancy Services
export async function getConsultancyServices() {
  const supabase = await getSupabaseServer()
  const { data, error } = await supabase
    .from("consultancy_services")
    .select("*")
    .order("order_index", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching consultancy services:", error)
    return []
  }
  return data || []
}

// Consultancy Case Studies
export async function getConsultancyCaseStudies() {
  const supabase = await getSupabaseServer()
  const { data, error } = await supabase
    .from("consultancy_case_studies")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching case studies:", error)
    return []
  }
  return data || []
}

// Student Resources
export async function getStudentResources() {
  const supabase = await getSupabaseServer()
  const { data, error } = await supabase
    .from("student_resources")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching student resources:", error)
    return []
  }
  return data || []
}

// Virtual Class Links
export async function getVirtualClassLinks() {
  const supabase = await getSupabaseServer()
  const { data, error } = await supabase
    .from("student_resources")
    .select("*")
    .eq("is_public", true)
    .not("virtual_class_link", "is", null)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching virtual class links:", error)
    return []
  }
  return data || []
}

// Consultancy Leads
export async function getConsultancyLeads(limit = 50) {
  const supabase = await getSupabaseServer()
  const { data, error } = await supabase
    .from("consultancy_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("[v0] Error fetching consultancy leads:", error)
    return []
  }
  return data || []
}

// Contact Messages
export async function getContactMessages(limit = 50) {
  const supabase = await getSupabaseServer()
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("[v0] Error fetching contact messages:", error)
    return []
  }
  return data || []
}

// Add Publication
export async function addPublication(publication: any) {
  const supabase = await getSupabaseAdmin()
  const { data, error } = await supabase.from("publications").insert([publication]).select()

  if (error) {
    console.error("[v0] Error adding publication:", error)
    return null
  }
  return data?.[0] || null
}

// Update Consultancy Lead Read Status
export async function markLeadAsRead(leadId: string) {
  const supabase = await getSupabaseAdmin()
  const { error } = await supabase.from("consultancy_leads").update({ read: true }).eq("id", leadId)

  if (error) {
    console.error("[v0] Error updating lead:", error)
    return false
  }
  return true
}

// --- BOOKS ---

export async function getBooks() {
  const supabase = await getSupabaseServer()
  const { data, error } = await supabase.from("books").select("*").order("publication_year", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching books:", error)
    return []
  }
  return data || []
}

export async function addBook(book: any) {
  const supabase = await getSupabaseAdmin()
  const { data, error } = await supabase.from("books").insert([book]).select()

  if (error) {
    console.error("[v0] Error adding book:", error)
    return null
  }
  return data?.[0] || null
}

export async function deleteBook(id: string) {
  const supabase = await getSupabaseAdmin()
  const { error } = await supabase.from("books").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting book:", error)
    return false
  }
  return true
}

// --- STUDENT RESOURCES ---

// Note: getStudentResources exists but only gets public ones. Need admin one.
export async function getAllStudentResources() {
  const supabase = await getSupabaseServer()
  const { data, error } = await supabase
    .from("student_resources")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching all resources:", error)
    return []
  }
  return data || []
}

export async function addStudentResource(resource: any) {
  const supabase = await getSupabaseAdmin()
  const { data, error } = await supabase.from("student_resources").insert([resource]).select()

  if (error) {
    console.error("[v0] Error adding resource:", error)
    return null
  }
  return data?.[0] || null
}

export async function deleteStudentResource(id: string) {
  const supabase = await getSupabaseAdmin()
  const { error } = await supabase.from("student_resources").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting resource:", error)
    return false
  }
  return true
}

// --- STUDENT ASSIGNMENTS ---

export async function getStudentSubmissions(limit = 100) {
  const supabase = await getSupabaseServer()
  const { data, error } = await supabase
    .from("student_submissions")
    .select("*")
    .order("submission_date", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("[v0] Error fetching submissions:", error)
    return []
  }
  return data || []
}

// --- PUBLICATIONS CRUD ---

export async function updatePublication(id: string, updates: any) {
  const supabase = await getSupabaseAdmin()
  const { error } = await supabase.from("publications").update(updates).eq("id", id)

  if (error) {
    console.error("[v0] Error updating publication:", error)
    return false
  }
  return true
}

export async function deletePublication(id: string) {
  const supabase = await getSupabaseAdmin()
  const { error } = await supabase.from("publications").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting publication:", error)
    return false
  }
  return true
}

// --- SUPERVISION (Supervisees) ---

export async function addSupervisee(supervisee: any) {
  const supabase = await getSupabaseAdmin()
  const { data, error } = await supabase.from("supervisees").insert([supervisee]).select()

  if (error) {
    console.error("[v0] Error adding supervisee:", error)
    return null
  }
  return data?.[0] || null
}

export async function deleteSupervisee(id: string) {
  const supabase = await getSupabaseAdmin()
  const { error } = await supabase.from("supervisees").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting supervisee:", error)
    return false
  }
  return true
}

// --- CONFERENCES ---

export async function addConference(conference: any) {
  const supabase = await getSupabaseAdmin()
  const { data, error } = await supabase.from("conferences").insert([conference]).select()

  if (error) {
    console.error("[v0] Error adding conference:", error)
    return null
  }
  return data?.[0] || null
}

export async function deleteConference(id: string) {
  const supabase = await getSupabaseAdmin()
  const { error } = await supabase.from("conferences").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting conference:", error)
    return false
  }
  return true
}

// --- RESEARCH PROJECTS ---

export async function addResearchProject(project: any) {
  const supabase = await getSupabaseAdmin()
  const { data, error } = await supabase.from("research_projects").insert([project]).select()

  if (error) {
    console.error("[v0] Error adding research project:", error)
    return null
  }
  return data?.[0] || null
}

export async function updateResearchProject(id: string, updates: any) {
  const supabase = await getSupabaseAdmin()
  const { error } = await supabase.from("research_projects").update(updates).eq("id", id)

  if (error) {
    console.error("[v0] Error updating research project:", error)
    return false
  }
  return true
}

export async function deleteResearchProject(id: string) {
  const supabase = await getSupabaseAdmin()
  const { error } = await supabase.from("research_projects").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting research project:", error)
    return false
  }
  return true
}

// --- RESEARCH GRANTS ---

export async function addResearchGrant(grant: any) {
  const supabase = await getSupabaseAdmin()
  const { data, error } = await supabase.from("research_grants").insert([grant]).select()

  if (error) {
    console.error("[v0] Error adding research grant:", error)
    return null
  }
  return data?.[0] || null
}

export async function updateResearchGrant(id: string, updates: any) {
  const supabase = await getSupabaseAdmin()
  const { error } = await supabase.from("research_grants").update(updates).eq("id", id)

  if (error) {
    console.error("[v0] Error updating research grant:", error)
    return false
  }
  return true
}

export async function deleteResearchGrant(id: string) {
  const supabase = await getSupabaseAdmin()
  const { error } = await supabase.from("research_grants").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting research grant:", error)
    return false
  }
  return true
}

// --- COURSES ---

export async function addCourse(course: any) {
  const supabase = await getSupabaseAdmin()
  const { data, error } = await supabase.from("courses").insert([course]).select()

  if (error) {
    console.error("[v0] Error adding course:", error)
    return null
  }
  return data?.[0] || null
}

export async function updateCourse(id: string, updates: any) {
  const supabase = await getSupabaseAdmin()
  const { error } = await supabase.from("courses").update(updates).eq("id", id)

  if (error) {
    console.error("[v0] Error updating course:", error)
    return false
  }
  return true
}

export async function deleteCourse(id: string) {
  const supabase = await getSupabaseAdmin()
  const { error } = await supabase.from("courses").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting course:", error)
    return false
  }
  return true
}
// --- GALLERY ---

export async function getGalleryItems() {
  const supabase = await getSupabaseServer()
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching gallery items:", JSON.stringify(error, null, 2))
    return []
  }
  return data || []
}

export async function addGalleryItem(item: any) {
  const supabase = await getSupabaseAdmin()
  const { data, error } = await supabase.from("gallery").insert([item]).select()

  if (error) {
    console.error("[v0] Error adding gallery item:", error)
    return null
  }
  return data?.[0] || null
}

export async function updateGalleryItem(id: string, updates: any) {
  const supabase = await getSupabaseAdmin()
  const { error } = await supabase.from("gallery").update(updates).eq("id", id)

  if (error) {
    console.error("[v0] Error updating gallery item:", error)
    return false
  }
  return true
}

export async function deleteGalleryItem(id: string) {
  const supabase = await getSupabaseAdmin()
  const { error } = await supabase.from("gallery").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting gallery item:", error)
    return false
  }
  return true
}
