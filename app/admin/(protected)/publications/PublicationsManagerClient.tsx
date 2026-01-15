"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from "lucide-react"
import FileUploader from "@/components/admin/FileUploader"
import { toast } from "sonner"

interface Publication {
  id: string
  title: string
  authors: string[] | string
  publication_year: number
  publication_type: string
  journal_name: string | null
  doi: string | null
  abstract: string | null
  url: string | null
  created_at: string
}

interface PublicationsManagerClientProps {
  initialPublications: Publication[]
}

export default function PublicationsManagerClient({ initialPublications }: PublicationsManagerClientProps) {
  const [publications, setPublications] = useState<Publication[]>(initialPublications)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    publication_year: new Date().getFullYear(),
    publication_type: "journal",
    journal_name: "",
    doi: "",
    abstract: "",
    url: "",
  })

  const resetForm = () => {
    setFormData({
      title: "",
      authors: "",
      publication_year: new Date().getFullYear(),
      publication_type: "journal",
      journal_name: "",
      doi: "",
      abstract: "",
      url: "",
    })
    setEditingId(null)
    setFormOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "publication_year" ? Number.parseInt(value) : value,
    }))
  }

  const handleEditClick = (pub: Publication) => {
    const authorsStr = Array.isArray(pub.authors) ? pub.authors.join(", ") : pub.authors
    setFormData({
      title: pub.title,
      authors: authorsStr,
      publication_year: pub.publication_year,
      publication_type: pub.publication_type,
      journal_name: pub.journal_name || "",
      doi: pub.doi || "",
      abstract: pub.abstract || "",
      url: pub.url || "",
    })
    setEditingId(pub.id)
    setFormOpen(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const url = "/api/admin/publications"
    const method = editingId ? "PUT" : "POST"
    const body = {
      ...formData,
      authors: formData.authors.split(",").map((a) => a.trim()),
      id: editingId, // Include ID for updates
    }

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        if (editingId) {
          // Update local state
          setPublications(prev => prev.map(p => p.id === editingId ? { ...p, ...body, id: p.id } : p))
          toast.success("Publication updated successfully")
        } else {
          // Add new
          const newPub = await response.json()
          setPublications([newPub, ...publications])
          toast.success("Publication added successfully")
        }
        resetForm()
      } else {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.error || "Failed to save publication"
        console.error("Failed to save publication:", errorMessage)
        toast.error(errorMessage)
      }
    } catch (error) {
      console.error("[v0] Error saving publication:", error)
      toast.error("An unexpected error occurred")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this publication?")) return

    try {
      const response = await fetch(`/api/admin/publications?id=${id}`, { method: "DELETE" })
      if (response.ok) {
        setPublications(prev => prev.filter(p => p.id !== id))
        toast.success("Publication deleted")
      } else {
        toast.error("Failed to delete publication")
      }
    } catch (error) {
      console.error("Error deleting:", error)
      toast.error("Error deleting publication")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Publications Manager</h1>
          <p className="text-foreground/80">Total publications: {publications.length}</p>
        </div>
        <Button onClick={() => {
          if (formOpen) resetForm()
          else setFormOpen(true)
        }} className={formOpen ? "bg-secondary text-secondary-foreground" : "bg-primary hover:bg-primary/90"}>
          {formOpen ? "Cancel" : "Add Publication"}
        </Button>
      </div>

      {/* Add/Edit Publication Form */}
      {formOpen && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Publication" : "Add New Publication"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Authors (comma-separated) *</label>
                <input
                  type="text"
                  name="authors"
                  value={formData.authors}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Author 1, Author 2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Publication Year *</label>
                  <input
                    type="number"
                    name="publication_year"
                    value={formData.publication_year}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Type *</label>
                  <select
                    name="publication_type"
                    value={formData.publication_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg"
                  >
                    <option value="journal">Journal Article</option>
                    <option value="book">Book</option>
                    <option value="chapter">Book Chapter</option>
                    <option value="conference">Conference Paper</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Journal/Publication Name</label>
                <input
                  type="text"
                  name="journal_name"
                  value={formData.journal_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">DOI</label>
                <input
                  type="text"
                  name="doi"
                  value={formData.doi}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                />
              </div>

              <div>
                <FileUploader
                  bucket="cms_docs"
                  onUploadComplete={(url: string) => setFormData(prev => ({ ...prev, url }))}
                  currentFileUrl={formData.url}
                  acceptedFileTypes=".pdf"
                  label="Upload Publication PDF (Optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Abstract</label>
                <textarea
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                />
              </div>

              <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                {editingId ? "Update Publication" : "Add Publication"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Publications List */}
      {publications.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {publications.map((pub) => (
            <Card key={pub.id} className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">{pub.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  {Array.isArray(pub.authors) ? pub.authors.join(", ") : pub.authors}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-sm text-foreground/70">
                    <p>{pub.journal_name}</p>
                    <p>{pub.publication_year}</p>
                    {pub.doi && <p>DOI: {pub.doi}</p>}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditClick(pub)}>
                      <Edit2 size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(pub.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-border text-center py-12">
          <p className="text-muted-foreground">No publications yet. Add your first publication.</p>
        </Card>
      )}
    </div>
  )
}
