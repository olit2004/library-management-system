
const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

/**
 * Search Google Books by a query string.
 * @param {string} query 
 * @returns {Promise<Array>}
 */
export async function searchGoogleBooks(query) {
    try {
        const url = `${GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(query)}&maxResults=10${API_KEY ? `&key=${API_KEY}` : ''}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.items || [];
    } catch (error) {
        return [];
    }
}

/**
 * Get book details by ISBN.
 * @param {string} isbn 
 * @returns {Promise<Object|null>}
 */
export async function getBookByISBN(isbn) {
    try {
        const url = `${GOOGLE_BOOKS_API_URL}?q=isbn:${isbn}${API_KEY ? `&key=${API_KEY}` : ''}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
            return data.items[0];
        }
        return null;
    } catch (error) {
        return null;
    }
}

/**
 * Get book details by Google Volume ID.
 * @param {string} volumeId 
 * @returns {Promise<Object|null>}
 */
export async function getBookByVolumeId(volumeId) {
    try {
        const url = `${GOOGLE_BOOKS_API_URL}/${volumeId}${API_KEY ? `?key=${API_KEY}` : ''}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

/**
 * Extracts relevant metadata from a Google Books API volume item.
 * @param {Object} googleBook 
 * @returns {Object}
 */
export function extractMetadata(googleBook) {
    const volumeInfo = googleBook.volumeInfo;
    const accessInfo = googleBook.accessInfo;

    return {
        google_volume_id: googleBook.id,
        title: volumeInfo.title,
        description: volumeInfo.description || "",
        published_year: volumeInfo.publishedDate ? parseInt(volumeInfo.publishedDate.split("-")[0]) : null,
        cover_image_url: volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail || null,
        preview_link: volumeInfo.previewLink,
        is_digital: accessInfo?.viewability !== "NO_PAGES",
        isbn: volumeInfo.industryIdentifiers?.find(id => id.type === "ISBN_13")?.identifier || 
              volumeInfo.industryIdentifiers?.find(id => id.type === "ISBN_10")?.identifier || null,
        authors: volumeInfo.authors || []
    };
}
