"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, User } from "lucide-react"

interface Submission {
    id: string
    student_name: string
    student_email: string
    assignment_title: string
    course_code: string | null
    file_url: string
    submission_date: string
}

interface AssignmentsManagerClientProps {
    submissions: Submission[]
}

export default function AssignmentsManagerClient({ submissions }: AssignmentsManagerClientProps) {
    const [filter, setFilter] = useState("")

    const filteredSubmissions = submissions.filter(s =>
        s.student_name.toLowerCase().includes(filter.toLowerCase()) ||
        s.assignment_title.toLowerCase().includes(filter.toLowerCase()) ||
        (s.course_code && s.course_code.toLowerCase().includes(filter.toLowerCase()))
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Student Submissions</h1>
                    <p className="text-foreground/80">Total submissions: {submissions.length}</p>
                </div>
            </div>

            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Filter by name, title or course..."
                    className="w-full max-w-sm px-4 py-2 border border-border rounded-lg"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>

            <div className="space-y-4">
                {filteredSubmissions.map((submission) => (
                    <Card key={submission.id} className="border-border">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-accent/20 rounded-full flex items-center justify-center text-accent">
                                    <User size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">{submission.student_name}</h4>
                                    <p className="text-sm text-muted-foreground">{submission.assignment_title} {submission.course_code && `• ${submission.course_code}`}</p>
                                    <p className="text-xs text-muted-foreground mt-1">Submitted: {new Date(submission.submission_date).toLocaleString()}</p>
                                </div>
                            </div>

                            <a href={submission.file_url} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Download size={16} /> Download
                                </Button>
                            </a>
                        </CardContent>
                    </Card>
                ))}
                {filteredSubmissions.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground border rounded-lg bg-card">
                        No submissions found.
                    </div>
                )}
            </div>
        </div>
    )
}
