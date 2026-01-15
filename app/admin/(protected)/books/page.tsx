import BooksManagerClient from "./BooksManagerClient"
import { getBooks } from "@/lib/db-queries"

export const metadata = {
    title: "Books Manager | Admin",
}

export default async function BooksPage() {
    const books = await getBooks()

    return <BooksManagerClient initialBooks={books} />
}
