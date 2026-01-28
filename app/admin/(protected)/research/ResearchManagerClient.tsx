"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Plus, Edit2, Loader2 } from "lucide-react"
import { toast } from "sonner"
import FileUploader from "@/components/admin/FileUploader"

interface Project {
    id: string
    title: string
    abstract: string | null
    status: string
    start_date: string | null
    end_date: string | null
    collaborators: string[] | null
    research_areas: string[] | null
    image_url: string | null
}

interface Grant {
    id: string
    title: string
    funding_agency: string
    amount: number
    year: number
    status: string | null
    description: string | null
}

interface ResearchManagerClientProps {
    initialProjects: Project[]
    initialGrants: Grant[]
}

export default function ResearchManagerClient({ initialProjects, initialGrants }: ResearchManagerClientProps) {
    const [projects, setProjects] = useState<Project[]>(initialProjects)
    const [grants, setGrants] = useState<Grant[]>(initialGrants)

    const [projectFormOpen, setProjectFormOpen] = useState(false)
    const [grantFormOpen, setGrantFormOpen] = useState(false)

    const [isProjectLoading, setIsProjectLoading] = useState(false)
    const [isGrantLoading, setIsGrantLoading] = useState(false)

    const [editingProjectId, setEditingProjectId] = useState<string | null>(null)
    const [editingGrantId, setEditingGrantId] = useState<string | null>(null)

    const [projectFormData, setProjectFormData] = useState({
        title: "",
        abstract: "",
        status: "ongoing",
        start_date: "",
        end_date: "",
        collaborators: "",
        research_areas: "",
        image_url: "",
    })

    const [grantFormData, setGrantFormData] = useState({
        title: "",
        funding_agency: "",
        amount: 0,
        year: new Date().getFullYear(),
        status: "awarded",
        description: "",
    })

    // Projects Handlers
    const handleProjectSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsProjectLoading(true)

        const url = "/api/admin/research/projects"
        const method = editingProjectId ? "PUT" : "POST"

        const body: any = {
            ...projectFormData,
            collaborators: projectFormData.collaborators.split(",").map(s => s.trim()).filter(Boolean),
            research_areas: projectFormData.research_areas.split(",").map(s => s.trim()).filter(Boolean),
        }

        if (editingProjectId) body.id = editingProjectId

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })

            if (response.ok) {
                const savedProject = await response.json()
                if (editingProjectId) {
                    setProjects(projects.map(p => p.id === editingProjectId ? savedProject : p))
                    toast.success("Project updated")
                } else {
                    setProjects([savedProject, ...projects])
                    toast.success("Project added")
                }
                setProjectFormOpen(false)
                setEditingProjectId(null)
                setProjectFormData({
                    title: "", abstract: "", status: "ongoing", start_date: "", end_date: "",
                    collaborators: "", research_areas: "", image_url: ""
                })
            } else {
                toast.error("Failed to save project")
            }
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setIsProjectLoading(false)
        }
    }

    const handleDeleteProject = async (id: string) => {
        if (!confirm("Are you sure?")) return
        try {
            const resp = await fetch(`/api/admin/research/projects?id=${id}`, { method: "DELETE" })
            if (resp.ok) {
                setProjects(projects.filter(p => p.id !== id))
                toast.success("Project deleted")
            } else {
                toast.error("Delete failed")
            }
        } catch (error) {
            toast.error("An error occurred")
        }
    }

    // Grants Handlers
    const handleGrantSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsGrantLoading(true)

        const url = "/api/admin/research/grants"
        const method = editingGrantId ? "PUT" : "POST"

        const body: any = { ...grantFormData }
        if (editingGrantId) body.id = editingGrantId

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })

            if (response.ok) {
                const savedGrant = await response.json()
                if (editingGrantId) {
                    setGrants(grants.map(g => g.id === editingGrantId ? savedGrant : g))
                    toast.success("Grant updated")
                } else {
                    setGrants([savedGrant, ...grants])
                    toast.success("Grant added")
                }
                setGrantFormOpen(false)
                setEditingGrantId(null)
                setGrantFormData({
                    title: "", funding_agency: "", amount: 0, year: new Date().getFullYear(),
                    status: "awarded", description: ""
                })
            } else {
                toast.error("Failed to save grant")
            }
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setIsGrantLoading(false)
        }
    }

    const handleDeleteGrant = async (id: string) => {
        if (!confirm("Are you sure?")) return
        try {
            const resp = await fetch(`/api/admin/research/grants?id=${id}`, { method: "DELETE" })
            if (resp.ok) {
                setGrants(grants.filter(g => g.id !== id))
                toast.success("Grant deleted")
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
                <h1 className="text-3xl font-bold">Research Management</h1>
            </div>

            <Tabs defaultValue="projects" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="projects">Research Projects</TabsTrigger>
                    <TabsTrigger value="grants">Research Grants</TabsTrigger>
                </TabsList>

                <TabsContent value="projects" className="space-y-4 pt-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Project List ({projects.length})</h2>
                        <Button onClick={() => setProjectFormOpen(!projectFormOpen)}>
                            {projectFormOpen ? "Cancel" : <><Plus className="w-4 h-4 mr-2" /> Add Project</>}
                        </Button>
                    </div>

                    {projectFormOpen && (
                        <Card>
                            <CardHeader><CardTitle>{editingProjectId ? "Edit Project" : "Add New Project"}</CardTitle></CardHeader>
                            <CardContent>
                                <form onSubmit={handleProjectSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Title *</label>
                                        <input
                                            className="w-full p-2 border rounded"
                                            value={projectFormData.title}
                                            onChange={e => setProjectFormData({ ...projectFormData, title: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Abstract</label>
                                        <textarea
                                            className="w-full p-2 border rounded h-24"
                                            value={projectFormData.abstract}
                                            onChange={e => setProjectFormData({ ...projectFormData, abstract: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Status</label>
                                            <select
                                                className="w-full p-2 border rounded"
                                                value={projectFormData.status}
                                                onChange={e => setProjectFormData({ ...projectFormData, status: e.target.value })}
                                            >
                                                <option value="ongoing">Ongoing</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Image URL</label>
                                            <FileUploader
                                                bucket="cms_images"
                                                onUploadComplete={url => setProjectFormData({ ...projectFormData, image_url: url })}
                                                currentFileUrl={projectFormData.image_url}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Start Date</label>
                                            <input
                                                type="date"
                                                className="w-full p-2 border rounded"
                                                value={projectFormData.start_date}
                                                onChange={e => setProjectFormData({ ...projectFormData, start_date: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">End Date</label>
                                            <input
                                                type="date"
                                                className="w-full p-2 border rounded"
                                                value={projectFormData.end_date}
                                                onChange={e => setProjectFormData({ ...projectFormData, end_date: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Collaborators (Comma separated)</label>
                                        <input
                                            className="w-full p-2 border rounded"
                                            value={projectFormData.collaborators}
                                            onChange={e => setProjectFormData({ ...projectFormData, collaborators: e.target.value })}
                                            placeholder="e.g. John Doe, Jane Smith"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Research Areas (Comma separated)</label>
                                        <input
                                            className="w-full p-2 border rounded"
                                            value={projectFormData.research_areas}
                                            onChange={e => setProjectFormData({ ...projectFormData, research_areas: e.target.value })}
                                            placeholder="e.g. Political Science, Governance"
                                        />
                                    </div>
                                    <Button type="submit" disabled={isProjectLoading} className="w-full">
                                        {isProjectLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                                        {editingProjectId ? "Update Project" : "Add Project"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    <div className="grid gap-4">
                        {projects.map(project => (
                            <Card key={project.id}>
                                <CardHeader className="p-4 flex flex-row items-start justify-between">
                                    <div>
                                        <CardTitle className="text-lg">{project.title}</CardTitle>
                                        <CardDescription>{project.status} • {project.start_date || 'N/A'}</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => {
                                            setEditingProjectId(project.id)
                                            setProjectFormData({
                                                title: project.title,
                                                abstract: project.abstract || "",
                                                status: project.status,
                                                start_date: project.start_date || "",
                                                end_date: project.end_date || "",
                                                collaborators: project.collaborators?.join(", ") || "",
                                                research_areas: project.research_areas?.join(", ") || "",
                                                image_url: project.image_url || "",
                                            })
                                            setProjectFormOpen(true)
                                        }}>
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDeleteProject(project.id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="grants" className="space-y-4 pt-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Grant List ({grants.length})</h2>
                        <Button onClick={() => setGrantFormOpen(!grantFormOpen)}>
                            {grantFormOpen ? "Cancel" : <><Plus className="w-4 h-4 mr-2" /> Add Grant</>}
                        </Button>
                    </div>

                    {grantFormOpen && (
                        <Card>
                            <CardHeader><CardTitle>{editingGrantId ? "Edit Grant" : "Add New Grant"}</CardTitle></CardHeader>
                            <CardContent>
                                <form onSubmit={handleGrantSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Grant Title *</label>
                                        <input
                                            className="w-full p-2 border rounded"
                                            value={grantFormData.title}
                                            onChange={e => setGrantFormData({ ...grantFormData, title: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Funding Agency *</label>
                                        <input
                                            className="w-full p-2 border rounded"
                                            value={grantFormData.funding_agency}
                                            onChange={e => setGrantFormData({ ...grantFormData, funding_agency: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Amount ($) *</label>
                                            <input
                                                type="number"
                                                className="w-full p-2 border rounded"
                                                value={grantFormData.amount}
                                                onChange={e => setGrantFormData({ ...grantFormData, amount: Number(e.target.value) })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Year *</label>
                                            <input
                                                type="number"
                                                className="w-full p-2 border rounded"
                                                value={grantFormData.year}
                                                onChange={e => setGrantFormData({ ...grantFormData, year: Number(e.target.value) })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Status</label>
                                        <select
                                            className="w-full p-2 border rounded"
                                            value={grantFormData.status || "awarded"}
                                            onChange={e => setGrantFormData({ ...grantFormData, status: e.target.value })}
                                        >
                                            <option value="awarded">Awarded</option>
                                            <option value="pending">Pending</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Description</label>
                                        <textarea
                                            className="w-full p-2 border rounded h-24"
                                            value={grantFormData.description || ""}
                                            onChange={e => setGrantFormData({ ...grantFormData, description: e.target.value })}
                                        />
                                    </div>
                                    <Button type="submit" disabled={isGrantLoading} className="w-full">
                                        {isGrantLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                                        {editingGrantId ? "Update Grant" : "Add Grant"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    <div className="grid gap-4">
                        {grants.map(grant => (
                            <Card key={grant.id}>
                                <CardHeader className="p-4 flex flex-row items-start justify-between">
                                    <div>
                                        <CardTitle className="text-lg">{grant.title}</CardTitle>
                                        <CardDescription>{grant.funding_agency} • ${grant.amount} • {grant.year}</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => {
                                            setEditingGrantId(grant.id)
                                            setGrantFormData({
                                                title: grant.title,
                                                funding_agency: grant.funding_agency,
                                                amount: grant.amount,
                                                year: grant.year,
                                                status: grant.status || "awarded",
                                                description: grant.description || "",
                                            })
                                            setGrantFormOpen(true)
                                        }}>
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDeleteGrant(grant.id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
