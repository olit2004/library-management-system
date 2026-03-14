
import React, { useEffect, useRef, useState } from 'react';
import { X, Loader2, AlertCircle } from 'lucide-react';

export default function BookViewer({ googleVolumeId, isbn, onClose }) {
    const viewerRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
        console.log("Initializing BookViewer with ID:", googleVolumeId, "ISBN:", isbn, "API Key present:", !!apiKey);

        // Function to initialize the viewer
        const initializeViewer = () => {
            if (!window.google || !window.google.books) {
                console.error("Google Books API failed to load or 'google.books' is missing.");
                setError("Google Books API failed to load.");
                setLoading(false);
                return;
            }

            try {
                const viewer = new window.google.books.DefaultViewer(viewerRef.current);
                const identifier = googleVolumeId ? `google_id:${googleVolumeId}` : (isbn ? `ISBN:${isbn}` : null);
                
                if (!identifier) {
                    setError("No valid book identifier found.");
                    setLoading(false);
                    return;
                }

                console.log("Loading viewer with identifier:", identifier);
                viewer.load(identifier, () => {
                    console.log("Viewer successfully loaded content.");
                    setLoading(false);
                }, () => {
                    console.error("Viewer failed to load content for identifier:", identifier);
                    setError("This book is not available for preview.");
                    setLoading(false);
                });
            } catch (err) {
                console.error("Exception during viewer initialization:", err);
                setError("Failed to initialize the book reader.");
                setLoading(false);
            }
        };

        // Load the Google JS API
        const scriptId = 'google-books-jsapi';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = `https://www.google.com/jsapi${apiKey ? `?key=${apiKey}` : ''}`;
            script.type = 'text/javascript';
            script.onload = () => {
                window.google.load('books', '0', {
                    callback: initializeViewer
                });
            };
            script.onerror = () => {
                setError("Failed to load Google JS API.");
                setLoading(false);
            };
            document.head.appendChild(script);
        } else if (window.google && window.google.books) {
            initializeViewer();
        } else if (window.google) {
            window.google.load('books', '0', {
                callback: initializeViewer
            });
        }
    }, [googleVolumeId, isbn]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="relative w-full max-w-5xl bg-secondary-bg rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[90vh]">
                {/* Header */}
                <div className="p-4 border-b border-border-subtle flex justify-between items-center bg-secondary-bg/50 backdrop-blur">
                    <h3 className="text-lg font-bold text-primary-text">Book Preview</h3>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-input-bg rounded-full transition-colors"
                    >
                        <X size={24} className="text-secondary-text" />
                    </button>
                </div>

                {/* Viewer Container */}
                <div className="flex-1 relative bg-input-bg/30">
                    {loading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="w-10 h-10 text-accent-base animate-spin" />
                            <p className="text-sm font-medium text-muted-text">Initializing Google Reader...</p>
                        </div>
                    )}

                    {error && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                                <AlertCircle className="w-8 h-8 text-red-500" />
                            </div>
                            <h4 className="text-xl font-bold text-primary-text">{error}</h4>
                            <p className="text-secondary-text max-w-md">
                                Some books have restricted preview access. You might need to check the physical copy.
                            </p>
                            <button 
                                onClick={onClose}
                                className="mt-4 px-6 py-2 bg-accent-base text-white rounded-xl font-bold hover:bg-accent-base/90 transition"
                            >
                                Close Viewer
                            </button>
                        </div>
                    )}

                    <div 
                        ref={viewerRef} 
                        id="viewerCanvas" 
                        style={{ width: '100%', height: '100%' }}
                        className={loading || error ? 'invisible' : 'visible'}
                    />
                </div>
            </div>
        </div>
    );
}
