"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import FileUploader from "@/components/admin/FileUploader"
import { toast } from "sonner"

interface Book {
    id: string
    title: string
    author: string
    publication_year: number
    cover_image_url: string | null
    publisher: string | null
    isbn: string | null
    purchase_link: string | null
    description: string | null
    created_at: string
}

interface BooksManagerClientProps {
    initialBooks: Book[]
}

export default function BooksManagerClient({ initialBooks }: BooksManagerClientProps) {
    const [books, setBooks] = useState<Book[]>(initialBooks)
    const [formOpen, setFormOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        publication_year: new Date().getFullYear(),
        cover_image_url: "",
        publisher: "",
        isbn: "",
        purchase_link: "",
        description: "",
    })

    // TODO: Add image upload functionality here once storage is ready
    // For now we just use a URL input

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === "publication_year" ? Number.parseInt(value) : value,
        }))
    }

    const handleAddBook = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch("/api/admin/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                const newBook = await response.json()
                setBooks([newBook, ...books]) // Add to top
                setFormData({
                    title: "",
                    author: "",
                    publication_year: new Date().getFullYear(),
                    cover_image_url: "",
                    publisher: "",
                    isbn: "",
                    purchase_link: "",
                    description: "",
                })
                setFormOpen(false)
                toast.success("Book added successfully")
            } else {
                console.error("Failed to add book")
                toast.error("Failed to add book")
            }
        } catch (error) {
            console.error("Error adding book:", error)
            toast.error("An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteBook = async (id: string) => {
        if (!confirm("Are you sure you want to delete this book?")) return

        try {
            const response = await fetch(`/api/admin/books?id=${id}`, {
                method: "DELETE",
            })

            if (response.ok) {
                setBooks(books.filter((b) => b.id !== id))
                toast.success("Book deleted")
            } else {
                console.error("Failed to delete book")
                toast.error("Failed to delete book")
            }
        } catch (error) {
            console.error("Error deleting book:", error)
            toast.error("Error deleting book")
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Books Manager</h1>
                    <p className="text-foreground/80">Total books: {books.length}</p>
                </div>
                <Button onClick={() => setFormOpen(!formOpen)} className="bg-primary hover:bg-primary/90">
                    {formOpen ? "Cancel" : "Add Book"}
                </Button>
            </div>

            {/* Add Book Form */}
            {formOpen && (
                <Card className="border-border">
                    <CardHeader>
                        <CardTitle>Add New Book</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddBook} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-primary mb-2">Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-primary mb-2">Author *</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-primary mb-2">Publication Year *</label>
                                    <input
                                        type="number"
                                        name="publication_year"
                                        value={formData.publication_year}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-primary mb-2">Publisher</label>
                                    <input
                                        type="text"
                                        name="publisher"
                                        value={formData.publisher}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-border rounded-lg"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-primary mb-2">Cover Image</label>
                                <FileUploader
                                    bucket="cms_images"
                                    onUploadComplete={(url: string) => setFormData(prev => ({ ...prev, cover_image_url: url }))}
                                    currentFileUrl={formData.cover_image_url}
                                    acceptedFileTypes="image/*"
                                    label="Upload Cover Image"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-primary mb-2">ISBN</label>
                                    <input
                                        type="text"
                                        name="isbn"
                                        value={formData.isbn}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-primary mb-2">Purchase Link</label>
                                    <input
                                        type="url"
                                        name="purchase_link"
                                        value={formData.purchase_link}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-border rounded-lg"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-primary mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-border rounded-lg"
                                />
                            </div>

                            <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90">
                                {isLoading ? "Adding..." : "Add Book"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Books List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {books.map((book) => (
                    <Card key={book.id} className="border-border overflow-hidden">
                        <div className="flex h-full">
                            {book.cover_image_url && (
                                <div className="w-1/3 bg-muted">
                                    <img
                                        src={book.cover_image_url}
                                        alt={book.title}
                                        className="w-full h-full object-cover"
                                        crossOrigin="anonymous"
                                    />
                                </div>
                            )}
                            <div className={`${book.cover_image_url ? "w-2/3" : "w-full"} flex flex-col`}>
                                <CardHeader>
                                    <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{book.author} ({book.publication_year})</p>
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col justify-end">
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-xs text-muted-foreground">{book.publisher}</span>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDeleteBook(book.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </CardContent>
                            </div>
                        </div>
                    </Card>
                ))}
                {books.length === 0 && (
                    <div className="col-span-1 md:col-span-2 text-center py-12 text-muted-foreground border rounded-lg">
                        No books added yet.
                    </div>
                )}
            </div>
        </div>
    )
}
