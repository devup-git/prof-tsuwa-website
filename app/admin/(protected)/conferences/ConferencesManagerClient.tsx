"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Mic2 } from "lucide-react"

interface Conference {
    id: string
    conference_name: string
    conference_date: string
    location: string
    role: string
    paper_title?: string | null
    created_at: string
}

interface ConferencesManagerClientProps {
    initialConferences: Conference[]
}

export default function ConferencesManagerClient({ initialConferences }: ConferencesManagerClientProps) {
    const [conferences, setConferences] = useState<Conference[]>(initialConferences)
    const [formOpen, setFormOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        conference_name: "",
        conference_date: new Date().toISOString().split('T')[0],
        location: "",
        role: "Participant",
        paper_title: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleAddConference = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch("/api/admin/conferences", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                const newConference = await response.json()
                setConferences([newConference, ...conferences])
                setFormData({
                    conference_name: "",
                    conference_date: new Date().toISOString().split('T')[0],
                    location: "",
                    role: "Participant",
                    paper_title: "",
                })
                setFormOpen(false)
            } else {
                console.error("Failed to add conference")
            }
        } catch (error) {
            console.error("Error adding conference:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteConference = async (id: string) => {
        if (!confirm("Are you sure you want to delete this record?")) return

        try {
            const response = await fetch(`/api/admin/conferences?id=${id}`, {
                method: "DELETE",
            })

            if (response.ok) {
                setConferences(conferences.filter((c) => c.id !== id))
            } else {
                console.error("Failed to delete conference")
            }
        } catch (error) {
            console.error("Error deleting conference:", error)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Conference Presentations</h1>
                    <p className="text-foreground/80">Total records: {conferences.length}</p>
                </div>
                <Button onClick={() => setFormOpen(!formOpen)} className="bg-primary hover:bg-primary/90">
                    {formOpen ? "Cancel" : "Add Conference"}
                </Button>
            </div>

            {formOpen && (
                <Card className="border-border">
                    <CardHeader>
                        <CardTitle>Add New Conference</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddConference} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-primary mb-2">Conference Name *</label>
                                <input
                                    type="text"
                                    name="conference_name"
                                    value={formData.conference_name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-primary mb-2">Date</label>
                                    <input
                                        type="date"
                                        name="conference_date"
                                        value={formData.conference_date}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-primary mb-2">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-primary mb-2">Role</label>
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-border rounded-lg"
                                    >
                                        <option value="Participant">Participant</option>
                                        <option value="Presenter">Presenter</option>
                                        <option value="Keynote Speaker">Keynote Speaker</option>
                                        <option value="Panelist">Panelist</option>
                                        <option value="Organizer">Organizer</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-primary mb-2">Paper Title (Optional)</label>
                                <input
                                    type="text"
                                    name="paper_title"
                                    value={formData.paper_title}
                                    onChange={handleInputChange}
                                    placeholder="Title of paper presented or workshop topic"
                                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90">
                                {isLoading ? "Adding..." : "Add Conference"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* List */}
            <div className="space-y-4">
                {conferences.map((conf) => (
                    <Card key={conf.id} className="border-border p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                <Mic2 size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{conf.conference_name}</h3>
                                <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-muted-foreground">
                                    <span>{conf.conference_date} • {conf.location}</span>
                                </div>
                                {conf.paper_title && <p className="text-xs text-muted-foreground italic mt-1">{conf.paper_title}</p>}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-1 rounded text-xs bg-muted border">
                                {conf.role}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:bg-destructive/10"
                                onClick={() => handleDeleteConference(conf.id)}
                            >
                                <Trash2 size={18} />
                            </Button>
                        </div>
                    </Card>
                ))}
                {conferences.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground border rounded-lg bg-card">
                        No conference records found.
                    </div>
                )}
            </div>
        </div>
    )
}
