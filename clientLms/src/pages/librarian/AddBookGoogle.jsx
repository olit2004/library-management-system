
import React, { useState } from 'react';
import { Search, Loader2, BookPlus, Globe, CheckCircle2, AlertCircle } from 'lucide-react';
import { googleSearch, createBook } from '../../api/books';
import { toast } from 'react-hot-toast';

export default function AddBookGoogle() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [importingId, setImportingId] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        
        setLoading(true);
        try {
            const { data } = await googleSearch(query);
            setResults(data || []);
            if (data?.length === 0) toast.error("No books found.");
        } catch (err) {
            toast.error("Failed to search Google Books.");
        } finally {
            setLoading(false);
        }
    };

    const handleImport = async (googleBook) => {
        const volumeInfo = googleBook.volumeInfo;
        const isbn13 = volumeInfo.industryIdentifiers?.find(id => id.type === "ISBN_13")?.identifier;
        const isbn10 = volumeInfo.industryIdentifiers?.find(id => id.type === "ISBN_10")?.identifier;
        const isbn = isbn13 || isbn10;

        if (!isbn) {
            toast.error("This book has no ISBN and cannot be imported.");
            return;
        }

        const copies = window.prompt(`How many copies of "${volumeInfo.title}" are you adding?`, "1");
        if (copies === null) return;

        setImportingId(googleBook.id);
        const bookData = {
            isbn,
            title: volumeInfo.title,
            description: volumeInfo.description || "",
            coverImageUrl: volumeInfo.imageLinks?.thumbnail || null,
            publishedYear: volumeInfo.publishedDate ? parseInt(volumeInfo.publishedDate.split("-")[0]) : 0,
            totalCopies: parseInt(copies),
            authorFirstName: volumeInfo.authors?.[0]?.split(" ")[0] || "Unknown",
            authorLastName: volumeInfo.authors?.[0]?.split(" ").slice(1).join(" ") || "Author",
            google_volume_id: googleBook.id,
            preview_link: volumeInfo.previewLink,
            is_digital: googleBook.accessInfo?.viewability !== "NO_PAGES"
        };

        try {
            await createBook(bookData);
            toast.success("Book imported successfully!");
            setResults(prev => prev.filter(r => r.id !== googleBook.id));
        } catch (err) {
            toast.error(err.response?.data?.mssg || "Failed to import book.");
        } finally {
            setImportingId(null);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <header className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <Globe className="text-accent-base w-6 h-6" />
                    <h1 className="text-3xl font-black text-primary-text tracking-tight">
                        Import from Google
                    </h1>
                </div>
                <p className="text-secondary-text">
                    Search millions of titles and add them to your collection instantly.
                </p>
            </header>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-12">
                <div className="relative max-w-2xl mx-auto shadow-xl rounded-full overflow-hidden">
                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by Title, Author, or ISBN..."
                        className="w-full h-16 pl-8 pr-32 bg-secondary-bg border-none text-lg text-primary-text focus:ring-0"
                    />
                    <button 
                        disabled={loading}
                        className="absolute right-2 top-2 bottom-2 px-8 bg-accent-base rounded-full text-white font-bold hover:bg-accent-base/90 transition flex items-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Search className="w-5 h-5" />}
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </form>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((book) => (
                    <div key={book.id} className="bg-secondary-bg border border-border-subtle rounded-3xl p-6 flex gap-6 hover:shadow-lg transition-all group">
                        <div className="w-24 h-36 flex-shrink-0 relative">
                            <img 
                                src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150x225?text=No+Cover'} 
                                alt={book.volumeInfo.title}
                                className="w-full h-full object-cover rounded-xl shadow-md"
                            />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-primary-text line-clamp-2 mb-1 group-hover:text-brand-text transition-colors">
                                    {book.volumeInfo.title}
                                </h3>
                                <p className="text-sm text-secondary-text line-clamp-1">
                                    by {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                                </p>
                                <div className="mt-2 flex gap-2">
                                    {book.accessInfo?.viewability !== "NO_PAGES" && (
                                        <span className="text-[10px] px-2 py-0.5 bg-green-500/10 text-green-600 rounded-full font-bold uppercase">
                                            Preview Available
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button 
                                onClick={() => handleImport(book)}
                                disabled={importingId === book.id}
                                className="mt-4 w-full py-2 bg-input-bg hover:bg-accent-base hover:text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                            >
                                {importingId === book.id ? (
                                    <Loader2 className="animate-spin w-4 h-4" />
                                ) : (
                                    <BookPlus className="w-4 h-4" />
                                )}
                                {importingId === book.id ? 'Importing...' : 'Import to LMS'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {!loading && results.length === 0 && query && (
                <div className="text-center py-20 opacity-40">
                    <Search className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-xl font-bold italic">No matches found on Google Books</p>
                </div>
            )}
        </div>
    );
}
