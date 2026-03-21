
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

        books.forEach(book => {
        });
    } catch (err) {
    } finally {
        await prisma.$disconnect();
    }
}

listBooks();
