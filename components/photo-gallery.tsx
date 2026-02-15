"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"

interface PhotoGalleryProps {
    title: string
    description?: string
    images: string[]
}

export function PhotoGallery({ title, description, images }: PhotoGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    return (
        <section className="py-12">
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-primary mb-2">{title}</h3>
                {description && <p className="text-muted-foreground">{description}</p>}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((src, index) => (
                    <Dialog key={index}>
                        <DialogTrigger asChild>
                            <Card
                                className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group aspect-square relative"
                                onClick={() => setSelectedImage(src)}
                            >
                                <Image
                                    src={src}
                                    alt={`${title} - Image ${index + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </Card>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
                            <div className="relative aspect-video w-full h-[80vh]">
                                <Image
                                    src={src}
                                    alt={`${title} - Large Image ${index + 1}`}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </section>
    )
}
