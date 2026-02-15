"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2, ImageIcon } from "lucide-react"
import FileUploader from "@/components/admin/FileUploader"
import { toast } from "sonner"

interface GalleryItem {
    id: string
    image_url: string
    caption: string
    category: string
    created_at: string
}

interface GalleryManagerClientProps {
    initialItems: GalleryItem[]
}

export default function GalleryManagerClient({ initialItems }: GalleryManagerClientProps) {
    const [items, setItems] = useState<GalleryItem[]>(initialItems)
    const [formOpen, setFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        image_url: "",
        caption: "",
        category: "General",
    })

    const resetForm = () => {
        setFormData({
            image_url: "",
            caption: "",
            category: "General",
        })
        setEditingId(null)
        setFormOpen(false)
    }

    const handleEditClick = (item: GalleryItem) => {
        setFormData({
            image_url: item.image_url,
            caption: item.caption || "",
            category: item.category || "General",
        })
        setEditingId(item.id)
        setFormOpen(true)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.image_url) {
            toast.error("Please upload an image first")
            return
        }

        const url = "/api/admin/gallery"
        const method = editingId ? "PUT" : "POST"
        const body: any = { ...formData }

        if (editingId) {
            body.id = editingId
        }

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })

            if (response.ok) {
                if (editingId) {
                    setItems(prev => prev.map(item => item.id === editingId ? { ...item, ...body } : item))
                    toast.success("Gallery item updated")
                } else {
                    const newItem = await response.json()
                    setItems([newItem, ...items])
                    toast.success("Image added to gallery")
                }
                resetForm()
            } else {
                toast.error("Failed to save gallery item")
            }
        } catch (error) {
            console.error("Error saving gallery item:", error)
            toast.error("An unexpected error occurred")
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this image?")) return

        try {
            const response = await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" })
            if (response.ok) {
                setItems(prev => prev.filter(item => item.id !== id))
                toast.success("Image deleted from gallery")
            } else {
                toast.error("Failed to delete image")
            }
        } catch (error) {
            console.error("Error deleting gallery item:", error)
            toast.error("Error deleting image")
        }
    }

    const handleBulkUploads = async (urls: string[]) => {
        try {
            const promises = urls.map(url =>
                fetch("/api/admin/gallery", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        image_url: url,
                        caption: "",
                        category: formData.category
                    }),
                }).then(res => res.json())
            )

            const newItems = await Promise.all(promises)
            setItems(prev => [...newItems, ...prev])
            toast.success(`Bulk upload complete: ${urls.length} images added`)
            resetForm()
        } catch (error) {
            console.error("Bulk upload error:", error)
            toast.error("Bulk upload partially failed")
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Gallery Manager</h1>
                    <p className="text-foreground/80">Manage images and captions for the professional gallery.</p>
                </div>
                <Button onClick={() => setFormOpen(!formOpen)}>
                    {formOpen ? "Cancel" : "Add Images"}
                </Button>
            </div>

            {formOpen && (
                <Card>
                    <CardHeader>
                        <CardTitle>{editingId ? "Edit Caption" : "Upload to Gallery"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {!editingId && (
                                <div className="p-4 border rounded-lg bg-primary/5">
                                    <h4 className="font-semibold mb-2">Mode: Bulk Upload</h4>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Select multiple images to add them instantly with the selected category.
                                        You can edit captions individually later.
                                    </p>
                                    <FileUploader
                                        bucket="cms_images"
                                        allowMultiple={true}
                                        onUploadsComplete={handleBulkUploads}
                                        label="Select Multiple Images"
                                    />
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t">
                                <h4 className="font-semibold mb-2">{editingId ? "Update Item" : "Or: Single Upload with Caption"}</h4>
                                {!editingId && (
                                    <FileUploader
                                        bucket="cms_images"
                                        onUploadComplete={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                                        currentFileUrl={formData.image_url}
                                        label="Gallery Image"
                                    />
                                )}

                                <div>
                                    <label className="block text-sm font-semibold mb-2">Category (Type or Select)</label>
                                    <input
                                        type="text"
                                        list="category-suggestions"
                                        value={formData.category}
                                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                                        placeholder="e.g., Peace Building, Academic, Consultancy..."
                                    />
                                    <datalist id="category-suggestions">
                                        <option value="General" />
                                        <option value="Peace Building" />
                                        <option value="Academic" />
                                        <option value="Consultancy" />
                                        <option value="Community Service" />
                                        <option value="Professional Mentorship" />
                                        {/* Dynamic suggestions from existing items can be added here if needed */}
                                    </datalist>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">Caption (for single upload)</label>
                                    <textarea
                                        value={formData.caption}
                                        onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                                        rows={2}
                                        placeholder="Describe the activity..."
                                        disabled={!!editingId && false} // Just helper
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    {editingId ? "Update Gallery Item" : "Add Single Image"}
                                </Button>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <Card key={item.id} className="overflow-hidden group">
                        <div className="aspect-video relative">
                            <img src={item.image_url} alt={item.caption} className="object-cover w-full h-full" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button variant="secondary" size="sm" onClick={() => handleEditClick(item)}>
                                    <Edit2 size={16} />
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <p className="text-sm font-medium line-clamp-2">{item.caption || "No caption"}</p>
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{item.category}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
