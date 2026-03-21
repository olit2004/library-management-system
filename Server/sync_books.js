import prisma from './lib/prisma.js';
import { getBookByISBN, extractMetadata } from './lib/googleBooks.js';

async function main() {
    let books = await prisma.book.findMany();
    books = books.filter(b => !b.preview_link);

    let successCount = 0;
    let failedCount = 0;

    for (const book of books) {
        try {
            const googleBook = await getBookByISBN(book.isbn);
            if (!googleBook) {
                failedCount++;
                continue;
            }

            const meta = extractMetadata(googleBook);
            if (meta.preview_link) {
                await prisma.$executeRawUnsafe(
                    `UPDATE "Book" SET preview_link = $1, google_volume_id = $2, is_digital = $3 WHERE id = $4`,
                    meta.preview_link, meta.google_volume_id, meta.is_digital, book.id
                );
                successCount++;
            } else {
                failedCount++;
            }
        } catch (err) {
            failedCount++;
        }
    }

}

main().catch(console.error).finally(() => process.exit(0));
