"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Edit2, Loader2, FileText } from "lucide-react"
import { toast } from "sonner"
import FileUploader from "@/components/admin/FileUploader"

interface Course {
    id: string
    code: string
    title: string
    description: string | null
    semester: string | null
    year: number | null
    level: string | null
    credits: number | null
    syllabus_url: string | null
}

interface TeachingManagerClientProps {
    initialCourses: Course[]
}

export default function TeachingManagerClient({ initialCourses }: TeachingManagerClientProps) {
    const [courses, setCourses] = useState<Course[]>(initialCourses)
    const [formOpen, setFormOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        code: "",
        title: "",
        description: "",
        semester: "First Semester",
        year: new Date().getFullYear(),
        level: "undergraduate",
        credits: 3,
        syllabus_url: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const url = "/api/admin/teaching"
        const method = editingId ? "PUT" : "POST"

        const body: any = { ...formData }
        if (editingId) body.id = editingId

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })

            if (response.ok) {
                const savedCourse = await response.json()
                if (editingId) {
                    setCourses(courses.map(c => c.id === editingId ? savedCourse : c))
                    toast.success("Course updated")
                } else {
                    setCourses([savedCourse, ...courses])
                    toast.success("Course added")
                }
                setFormOpen(false)
                setEditingId(null)
                setFormData({
                    code: "", title: "", description: "", semester: "First Semester",
                    year: new Date().getFullYear(), level: "undergraduate", credits: 3, syllabus_url: ""
                })
            } else {
                toast.error("Failed to save course")
            }
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return
        try {
            const resp = await fetch(`/api/admin/teaching?id=${id}`, { method: "DELETE" })
            if (resp.ok) {
                setCourses(courses.filter(c => c.id !== id))
                toast.success("Course deleted")
            } else {
                toast.error("Delete failed")
            }
        } catch (error) {
            toast.error("An error occurred")
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Teaching Management</h1>
                <Button onClick={() => setFormOpen(!formOpen)}>
                    {formOpen ? "Cancel" : <><Plus className="w-4 h-4 mr-2" /> Add Course</>}
                </Button>
            </div>

            {formOpen && (
                <Card>
                    <CardHeader><CardTitle>{editingId ? "Edit Course" : "Add New Course"}</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Course Code *</label>
                                    <input
                                        className="w-full p-2 border rounded"
                                        value={formData.code}
                                        onChange={e => setFormData({ ...formData, code: e.target.value })}
                                        required
                                        placeholder="e.g. POL 101"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Course Title *</label>
                                    <input
                                        className="w-full p-2 border rounded"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <textarea
                                    className="w-full p-2 border rounded h-24"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Semester</label>
                                    <select
                                        className="w-full p-2 border rounded"
                                        value={formData.semester || "First Semester"}
                                        onChange={e => setFormData({ ...formData, semester: e.target.value })}
                                    >
                                        <option value="First Semester">First Semester</option>
                                        <option value="Second Semester">Second Semester</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Level</label>
                                    <select
                                        className="w-full p-2 border rounded"
                                        value={formData.level || "undergraduate"}
                                        onChange={e => setFormData({ ...formData, level: e.target.value })}
                                    >
                                        <option value="undergraduate">Undergraduate</option>
                                        <option value="postgraduate">Postgraduate</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Credits</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded"
                                        value={formData.credits}
                                        onChange={e => setFormData({ ...formData, credits: Number(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Syllabus (PDF)</label>
                                <FileUploader
                                    bucket="cms_docs"
                                    onUploadComplete={url => setFormData({ ...formData, syllabus_url: url })}
                                    currentFileUrl={formData.syllabus_url}
                                    acceptedFileTypes="application/pdf"
                                    label="Upload Syllabus"
                                />
                            </div>

                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                                {editingId ? "Update Course" : "Add Course"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4">
                {courses.map(course => (
                    <Card key={course.id}>
                        <CardHeader className="p-4 flex flex-row items-start justify-between">
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold">
                                    {course.code.substring(0, 3)}
                                </div>
                                <div>
                                    <CardTitle className="text-lg">{course.code}: {course.title}</CardTitle>
                                    <CardDescription>{course.level} • {course.semester} • {course.credits} Credits</CardDescription>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => {
                                    setEditingId(course.id)
                                    setFormData({
                                        code: course.code,
                                        title: course.title,
                                        description: course.description || "",
                                        semester: course.semester || "First Semester",
                                        year: course.year || new Date().getFullYear(),
                                        level: course.level || "undergraduate",
                                        credits: course.credits || 3,
                                        syllabus_url: course.syllabus_url || "",
                                    })
                                    setFormOpen(true)
                                }}>
                                    <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(course.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
                {courses.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground border rounded-lg bg-card">
                        No courses found.
                    </div>
                )}
            </div>
        </div>
    )
}
