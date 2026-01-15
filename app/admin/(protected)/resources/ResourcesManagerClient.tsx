"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Trash2, Download } from "lucide-react"
import FileUploader from "@/components/admin/FileUploader"

interface Resource {
    id: string
    title: string
    category: string
    file_url: string | null
    file_type: string | null
    is_public: boolean
    virtual_class_link?: string | null
    link_type?: string | null
    created_at: string
}

interface ResourcesManagerClientProps {
    initialResources: Resource[]
}

export default function ResourcesManagerClient({ initialResources }: ResourcesManagerClientProps) {
    const [resources, setResources] = useState<Resource[]>(initialResources)
    const [formOpen, setFormOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        category: "lecture_notes",
        file_url: "",
        description: "",
        virtual_class_link: "",
        link_type: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleAddResource = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Determine file type from extension
            const extension = formData.file_url.split(".").pop()?.toLowerCase() || "doc"

            const payload = {
                title: formData.title,
                category: formData.category,
                file_url: formData.file_url,
                description: formData.description,
                file_type: extension,
                is_public: true,
                virtual_class_link: formData.virtual_class_link || null,
                link_type: formData.link_type || null
            }

            const response = await fetch("/api/admin/resources", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (response.ok) {
                const newResource = await response.json()
                setResources([newResource, ...resources])
                setFormData({
                    title: "",
                    category: "lecture_notes",
                    file_url: "",
                    description: "",
                    virtual_class_link: "",
                    link_type: "",
                })
                setFormOpen(false)
            } else {
                console.error("Failed to add resource")
            }
        } catch (error) {
            console.error("Error adding resource:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteResource = async (id: string) => {
        if (!confirm("Are you sure you want to delete this resource?")) return

        try {
            const response = await fetch(`/api/admin/resources?id=${id}`, {
                method: "DELETE",
            })

            if (response.ok) {
                setResources(resources.filter((r) => r.id !== id))
            } else {
                console.error("Failed to delete resource")
            }
        } catch (error) {
            console.error("Error deleting resource:", error)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Student Resources</h1>
                    <p className="text-foreground/80">Total resources: {resources.length}</p>
                </div>
                <Button onClick={() => setFormOpen(!formOpen)} className="bg-primary hover:bg-primary/90">
                    {formOpen ? "Cancel" : "Add Resource"}
                </Button>
            </div>

            {formOpen && (
                <Card className="border-border">
                    <CardHeader>
                        <CardTitle>Upload New Resource</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddResource} className="space-y-4">
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
                                <label className="block text-sm font-semibold text-primary mb-2">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-border rounded-lg"
                                >
                                    <option value="lecture_notes">Lecture Notes</option>
                                    <option value="course_materials">Course Materials</option>
                                    <option value="slides">Slides</option>
                                    <option value="assignments">Assignments</option>
                                    <option value="questions">Questions/Past Questions</option>
                                    <option value="virtual_class">Virtual Class</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-primary mb-2">Virtual Class Link (Optional)</label>
                                    <input
                                        type="text"
                                        name="virtual_class_link"
                                        value={formData.virtual_class_link}
                                        onChange={handleInputChange}
                                        placeholder="https://zoom.us/..."
                                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-primary mb-2">Link Type</label>
                                    <select
                                        name="link_type"
                                        value={formData.link_type}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-border rounded-lg"
                                    >
                                        <option value="">Select Type</option>
                                        <option value="zoom">Zoom</option>
                                        <option value="google_meet">Google Meet</option>
                                        <option value="teams">Microsoft Teams</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-primary mb-2">File Upload *</label>
                                <FileUploader
                                    bucket="cms_docs"
                                    onUploadComplete={(url: string) => setFormData(prev => ({ ...prev, file_url: url }))}
                                    currentFileUrl={formData.file_url}
                                    acceptedFileTypes=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-primary mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={2}
                                    className="w-full px-4 py-2 border border-border rounded-lg"
                                />
                            </div>

                            <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90">
                                {isLoading ? "Adding..." : "Add Resource"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Resources List */}
            <div className="space-y-4">
                {resources.map((resource) => (
                    <Card key={resource.id} className="border-border p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                <FileText size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{resource.title}</h3>
                                <div className="flex gap-2 text-sm text-muted-foreground">
                                    <span className="capitalize">{resource.category.replace('_', ' ')}</span>
                                    <span>•</span>
                                    <span>{new Date(resource.created_at).toLocaleDateString()}</span>
                                    <span className="uppercase text-xs border px-1 rounded bg-muted">{resource.file_type}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <a href={resource.file_url || resource.virtual_class_link || "#"} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="gap-2" disabled={!resource.file_url && !resource.virtual_class_link}>
                                    <Download size={16} /> Open
                                </Button>
                            </a>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:bg-destructive/10"
                                onClick={() => handleDeleteResource(resource.id)}
                            >
                                <Trash2 size={18} />
                            </Button>
                        </div>
                    </Card>
                ))}
                {resources.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground border rounded-lg bg-card">
                        No resources uploaded yet.
                    </div>
                )}
            </div>
        </div>
    )
}
