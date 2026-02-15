"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"

interface PhotoGalleryProps {
    title: string
    description?: string
    images: {
        url: string
        caption?: string
    }[]
}

export function PhotoGallery({ title, description, images }: PhotoGalleryProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <section className="py-12">
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-primary mb-2">{title}</h3>
                    {description && <p className="text-muted-foreground">{description}</p>}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((_, index) => (
                        <div key={index} className="aspect-square bg-muted animate-pulse rounded-xl" />
                    ))}
                </div>
            </section>
        )
    }

    return (
        <section className="py-12">
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-primary mb-2">{title}</h3>
                {description && <p className="text-muted-foreground">{description}</p>}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((img, index) => (
                    <Dialog key={index}>
                        <DialogTrigger asChild>
                            <Card
                                className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group aspect-square relative"
                            >
                                <Image
                                    src={img.url}
                                    alt={img.caption || `${title} - Image ${index + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                {img.caption && (
                                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity translate-y-full group-hover:translate-y-0 duration-300">
                                        <p className="line-clamp-2">{img.caption}</p>
                                    </div>
                                )}
                            </Card>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
                            <div className="relative aspect-video w-full h-[80vh] flex flex-col">
                                <div className="relative flex-1">
                                    <Image
                                        src={img.url}
                                        alt={img.caption || `${title} - Large Image ${index + 1}`}
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                                {img.caption && (
                                    <div className="bg-black/80 p-4 text-white text-center">
                                        <p className="text-lg">{img.caption}</p>
                                    </div>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </section>
    )
}
