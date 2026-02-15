"use client"

import { useState } from "react"
import { getSupabaseClient } from "@/lib/supabase-client"
import { Button } from "@/components/ui/button"
import { Upload, X, Loader2, FileText, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import { addWatermarkToPdf } from "@/lib/watermark"

interface FileUploaderProps {
    bucket: "cms_docs" | "cms_images"
    onUploadComplete?: (url: string) => void
    onUploadsComplete?: (urls: string[]) => void
    currentFileUrl?: string
    acceptedFileTypes?: string
    label?: string
    allowMultiple?: boolean
}

export default function FileUploader({
    bucket,
    onUploadComplete,
    onUploadsComplete,
    currentFileUrl,
    acceptedFileTypes = "*",
    label = "Upload File",
    allowMultiple = false,
}: FileUploaderProps) {
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [uploadProgress, setUploadProgress] = useState(0)

    const supabase = getSupabaseClient()

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setIsUploading(true)
        setError(null)
        setUploadProgress(0)

        const uploadedUrls: string[] = []
        const filesArray = Array.from(files)

        try {
            for (let i = 0; i < filesArray.length; i++) {
                const file = filesArray[i]
                const fileExt = file.name.split(".").pop()
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
                const filePath = `${fileName}`

                let fileToUpload = file

                // Apply watermark if it's a PDF
                if (fileExt?.toLowerCase() === "pdf") {
                    try {
                        const reader = new FileReader()
                        const pdfData = await new Promise<ArrayBuffer>((resolve, reject) => {
                            reader.onload = () => resolve(reader.result as ArrayBuffer)
                            reader.onerror = reject
                            reader.readAsArrayBuffer(file)
                        })

                        const watermarkedPdf = await addWatermarkToPdf(
                            new Uint8Array(pdfData),
                            "John Tor Tsuwa, Ph.D",
                            "johntortsuwa.edu.ng"
                        )

                        fileToUpload = new File([watermarkedPdf as any], file.name, { type: "application/pdf" })
                        toast.success("PDF watermark applied successfully")
                    } catch (wmError) {
                        console.error("Watermarking error:", wmError)
                        toast.error("Watermark failed (PDF may be protected), uploading original...")
                        // Continue with original file if watermarking fails
                    }
                }

                const { data, error: uploadError } = await supabase.storage
                    .from(bucket)
                    .upload(filePath, fileToUpload)

                if (uploadError) throw uploadError

                const { data: { publicUrl } } = supabase.storage
                    .from(bucket)
                    .getPublicUrl(filePath)

                uploadedUrls.push(publicUrl)
                setUploadProgress(Math.round(((i + 1) / filesArray.length) * 100))
            }

            if (allowMultiple && onUploadsComplete) {
                onUploadsComplete(uploadedUrls)
            } else if (onUploadComplete) {
                onUploadComplete(uploadedUrls[0])
            }

            if (filesArray.length > 1) {
                toast.success(`Successfully uploaded ${filesArray.length} files`)
            }
        } catch (err: any) {
            console.error("Upload error:", err)
            setError(err.message || "Failed to upload file")
            toast.error("Upload failed")
        } finally {
            setIsUploading(false)
        }
    }

    const handleClear = () => {
        if (onUploadComplete) onUploadComplete("")
    }

    return (
        <div className="w-full">
            <label className="block text-sm font-semibold text-primary mb-2">{label}</label>

            {!currentFileUrl || allowMultiple ? (
                <div className="flex flex-col gap-2">
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
                                <span>Uploading ({uploadProgress}%)...</span>
                            </>
                        ) : (
                            <>
                                <Upload className="h-6 w-6 text-muted-foreground" />
                                <span className="text-muted-foreground">
                                    {allowMultiple ? "Click to upload multiple files" : "Click to upload"}
                                </span>
                            </>
                        )}
                    </Button>
                    <input
                        id={`file-upload-${label}`}
                        type="file"
                        multiple={allowMultiple}
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
