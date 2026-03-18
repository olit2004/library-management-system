
import React from 'react';
import { X, ExternalLink, BookOpen, AlertCircle } from 'lucide-react';

export default function BookViewer({ googleVolumeId, isbn, previewLink, title, coverUrl, onClose }) {
    // Construct the preview URL — prefer stored previewLink, then build from volumeId/isbn
    const previewUrl =
        previewLink ||
        (googleVolumeId
            ? `https://books.google.com/books?id=${googleVolumeId}&printsec=frontcover`
            : isbn
            ? `https://books.google.com/books?vid=ISBN${isbn}`
            : null);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="relative w-full max-w-lg bg-secondary-bg rounded-3xl overflow-hidden shadow-2xl flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-border-subtle flex justify-between items-center bg-secondary-bg/50 backdrop-blur shrink-0">
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-accent-base" />
                        <h3 className="text-lg font-bold text-primary-text">Book Preview</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-input-bg rounded-full transition-colors"
                    >
                        <X size={20} className="text-secondary-text" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col items-center gap-6 text-center">
                    {coverUrl && (
                        <img
                            src={coverUrl}
                            alt={title || 'Book cover'}
                            className="w-28 h-40 object-cover rounded-xl shadow-xl"
                        />
                    )}

                    {previewUrl ? (
                        <>
                            <div>
                                <p className="text-primary-text font-semibold text-lg">
                                    {title || 'Book Preview'}
                                </p>
                                <p className="text-secondary-text text-sm mt-2 max-w-sm">
                                    The preview opens on Google Books in a new tab — Google Books does not allow embedding in other websites.
                                </p>
                            </div>

                            <a
                                href={previewUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-8 py-4 bg-accent-base text-white rounded-2xl font-bold text-lg hover:bg-accent-base/90 transition-all active:scale-95 shadow-lg"
                            >
                                <ExternalLink className="w-5 h-5" />
                                Open on Google Books
                            </a>

                            <button
                                onClick={onClose}
                                className="text-sm text-secondary-text hover:text-primary-text transition-colors"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                                <AlertCircle className="w-8 h-8 text-red-500" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-primary-text">No Preview Available</h4>
                                <p className="text-secondary-text text-sm mt-1">
                                    This book doesn't have a Google Books link. Try syncing it first.
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="px-6 py-2 bg-accent-base text-white rounded-xl font-bold hover:bg-accent-base/90 transition"
                            >
                                Close
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
