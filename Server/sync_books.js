import prisma from './lib/prisma.js';
import { getBookByISBN, extractMetadata } from './lib/googleBooks.js';

async function main() {
    console.log("Fetching all books to sync with Google Books...");
    let books = await prisma.book.findMany();
    books = books.filter(b => !b.preview_link);
    console.log(`Found ${books.length} books without a preview link.`);

    let successCount = 0;
    let failedCount = 0;

    for (const book of books) {
        console.log(`Syncing "${book.title}" (ISBN: ${book.isbn})...`);
        try {
            const googleBook = await getBookByISBN(book.isbn);
            if (!googleBook) {
                console.log(`  -> No Google Books match or no preview link available.`);
                failedCount++;
                continue;
            }

            const meta = extractMetadata(googleBook);
            if (meta.preview_link) {
                await prisma.$executeRawUnsafe(
                    `UPDATE "Book" SET preview_link = $1, google_volume_id = $2, is_digital = $3 WHERE id = $4`,
                    meta.preview_link, meta.google_volume_id, meta.is_digital, book.id
                );
                console.log(`  -> Success: Preview link found! (${meta.preview_link})`);
                successCount++;
            } else {
                console.log(`  -> No Google Books match or no preview link available.`);
                failedCount++;
            }
        } catch (err) {
            console.error(`  -> Failed to sync: ${err.message}`);
            failedCount++;
        }
    }

    console.log(`\nSync complete. Successfully added/updated preview links for ${successCount} books. (${failedCount} books could not be fully synced).`);
}

main().catch(console.error).finally(() => process.exit(0));
