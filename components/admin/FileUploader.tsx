"use client"

import { useState } from "react"
import { getSupabaseClient } from "@/lib/supabase-client"
import { Button } from "@/components/ui/button"
import { Upload, X, Loader2, FileText, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface FileUploaderProps {
    bucket: "cms_docs" | "cms_images"
    onUploadComplete: (url: string) => void
    currentFileUrl?: string
    acceptedFileTypes?: string
    label?: string
}

export default function FileUploader({
    bucket,
    onUploadComplete,
    currentFileUrl,
    acceptedFileTypes = "*",
    label = "Upload File",
}: FileUploaderProps) {
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const supabase = getSupabaseClient()

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        setError(null)

        try {
            // Create a unique file path: timestamp-filename
            const fileExt = file.name.split(".").pop()
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
            const filePath = `${fileName}`

            const { data, error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file)

            if (uploadError) throw uploadError

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath)

            onUploadComplete(publicUrl)
        } catch (err: any) {
            console.error("Upload error:", err)
            setError(err.message || "Failed to upload file")
        } finally {
            setIsUploading(false)
        }
    }

    const handleClear = () => {
        onUploadComplete("") // Clear the URL in parent
    }

    return (
        <div className="w-full">
            <label className="block text-sm font-semibold text-primary mb-2">{label}</label>

            {!currentFileUrl ? (
                <div className="flex items-center gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isUploading}
                        onClick={() => document.getElementById(`file-upload-${label}`)?.click()}
                        className="w-full h-24 border-dashed border-2 flex flex-col gap-2 hover:bg-accent/5"
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="animate-spin h-6 w-6" />
                                <span>Uploading...</span>
                            </>
                        ) : (
                            <>
                                <Upload className="h-6 w-6 text-muted-foreground" />
                                <span className="text-muted-foreground">Click to upload</span>
                            </>
                        )}
                    </Button>
                    <input
                        id={`file-upload-${label}`}
                        type="file"
                        accept={acceptedFileTypes}
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={isUploading}
                    />
                </div>
            ) : (
                <div className="relative p-4 border rounded-lg bg-accent/5 flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                        {bucket === "cms_images" ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={currentFileUrl}
                                alt="Uploaded preview"
                                className="h-12 w-12 object-cover rounded bg-muted"
                            />
                        ) : (
                            <div className="h-12 w-12 flex items-center justify-center bg-primary/10 rounded text-primary">
                                <FileText size={20} />
                            </div>
                        )}
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                                <CheckCircle size={12} /> Uploaded
                            </span>
                            <a
                                href={currentFileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-muted-foreground hover:underline truncate"
                            >
                                View File
                            </a>
                        </div>
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleClear}
                        className="text-destructive hover:bg-destructive/10"
                    >
                        <X size={16} />
                    </Button>
                </div>
            )}

            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
        </div>
    )
}
