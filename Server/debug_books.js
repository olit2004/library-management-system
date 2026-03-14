
import prisma from "./lib/prisma.js";

async function listBooks() {
    try {
        const books = await prisma.book.findMany({
            select: {
                id: true,
                title: true,
                isbn: true,
                google_volume_id: true,
                preview_link: true,
                is_digital: true
            }
        });

        console.log(`Found ${books.length} books in the database:`);
        books.forEach(book => {
            console.log(`- [${book.id}] ${book.title} (ISBN: ${book.isbn})`);
            console.log(`  Google ID: ${book.google_volume_id || 'MISSING'}`);
            console.log(`  Preview Link: ${book.preview_link || 'MISSING'}`);
            console.log(`  Is Digital: ${book.is_digital}`);
        });
    } catch (err) {
        console.error("Error listing books:", err);
    } finally {
        await prisma.$disconnect();
    }
}

listBooks();
