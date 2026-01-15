"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, UserPlus, GraduationCap } from "lucide-react"
import { toast } from "sonner"

interface Supervisee {
    id: string
    student_name: string
    project_title: string
    level: string
    start_year: number
    completion_year?: number | null
    status: string
    research_area?: string | null
    institution?: string | null
    created_at: string
}

interface SupervisionManagerClientProps {
    initialSupervisees: Supervisee[]
}

export default function SupervisionManagerClient({ initialSupervisees }: SupervisionManagerClientProps) {
    const [supervisees, setSupervisees] = useState<Supervisee[]>(initialSupervisees)
    const [formOpen, setFormOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        student_name: "",
        project_title: "",
        level: "postgraduate",
        start_year: new Date().getFullYear(),
        status: "ongoing",
        research_area: "",
        institution: "Federal University of Makurdi",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleAddSupervisee = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch("/api/admin/supervision", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                const newSupervisee = await response.json()
                setSupervisees([newSupervisee, ...supervisees])
                setFormData({
                    student_name: "",
                    project_title: "",
                    level: "postgraduate",
                    start_year: new Date().getFullYear(),
                    status: "ongoing",
                    research_area: "",
                    institution: "Federal University of Makurdi",
                })
                setFormOpen(false)
                toast.success("Student record added")
            } else {
                console.error("Failed to add supervisee")
                toast.error("Failed to add student record")
            }
        } catch (error) {
            console.error("Error adding supervisee:", error)
            toast.error("An error occurred while adding")
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteSupervisee = async (id: string) => {
        if (!confirm("Are you sure you want to delete this record?")) return

        try {
            const response = await fetch(`/api/admin/supervision?id=${id}`, {
                method: "DELETE",
            })

            if (response.ok) {
                setSupervisees(supervisees.filter((s) => s.id !== id))
                toast.success("Record deleted")
            } else {
                console.error("Failed to delete supervisee")
                toast.error("Failed to delete student record")
            }
        } catch (error) {
            console.error("Error deleting supervisee:", error)
            toast.error("Error deleting record")
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Graduate Supervision</h1>
                    <p className="text-foreground/80">Total students: {supervisees.length}</p>
                </div>
                <Button onClick={() => setFormOpen(!formOpen)} className="bg-primary hover:bg-primary/90">
                    {formOpen ? "Cancel" : "Add Student"}
                </Button>
            </div>

            {formOpen && (
                <Card className="border-border">
                    <CardHeader>
                        <CardTitle>Add New Student</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddSupervisee} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-primary mb-2">Student Name *</label>
                                    <input
                                        type="text"
                                        name="student_name"
                                        value={formData.student_name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-primary mb-2">Level</label>
                                    <select
                                        name="level"
                                        value={formData.level}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-border rounded-lg"
                                    >
                                        <option value="postgraduate">Postgraduate (MSc/MA)</option>
                                        <option value="phd">PhD</option>
                                        <option value="undergraduate">Undergraduate</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-primary mb-2">Project Title *</label>
                                <input
                                    type="text"
                                    name="project_title"
                                    value={formData.project_title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-primary mb-2">Start Year</label>
                                    <input
                                        type="number"
                                        name="start_year"
                                        value={formData.start_year}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-primary mb-2">Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-border rounded-lg"
                                    >
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-primary mb-2">Institution</label>
                                    <input
                                        type="text"
                                        name="institution"
                                        value={formData.institution}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-primary mb-2">Research Area (Optional)</label>
                                <input
                                    type="text"
                                    name="research_area"
                                    value={formData.research_area}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Conflict Resolution"
                                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90">
                                {isLoading ? "Adding..." : "Add Student"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* List */}
            <div className="space-y-4">
                {supervisees.map((student) => (
                    <Card key={student.id} className="border-border p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                <UserPlus size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{student.student_name}</h3>
                                <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-muted-foreground">
                                    <span>{student.level.toUpperCase()} • {student.start_year}</span>
                                    <span className="hidden sm:inline">•</span>
                                    <span className="italic">{student.project_title}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs text-white ${student.status === 'ongoing' ? 'bg-blue-500' : 'bg-green-500'}`}>
                                {student.status}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:bg-destructive/10"
                                onClick={() => handleDeleteSupervisee(student.id)}
                            >
                                <Trash2 size={18} />
                            </Button>
                        </div>
                    </Card>
                ))}
                {supervisees.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground border rounded-lg bg-card">
                        No supervision records found.
                    </div>
                )}
            </div>
        </div>
    )
}
