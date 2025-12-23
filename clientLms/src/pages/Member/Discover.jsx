

import React, { useRef, useCallback, useState } from 'react';
import BookCard from '../../components/shared/BookCard';
import { useBooks } from "../../hooks/useBook";
import { ArrowLeft, User, BookOpen } from 'lucide-react'; // Example icons

function Discover() {
  const { books, loading, hasMore, loadMore } = useBooks(10);
  const [viewingBook, setViewingBook] = useState(null);

  // Observer for Infinite Scroll
  const observer = useRef();
  const lastBookElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) loadMore();
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);

  // Handle Back Navigation
  const handleBack = () => setViewingBook(null);


// --- DETAIL VIEW RENDER ---
  if (viewingBook) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
        {/* Navigation */}
        <button 
          onClick={handleBack}
          className="group flex items-center text-secondary-text hover:text-brand-text mb-8 transition-all"
        >
          <div className="p-2 rounded-full group-hover:bg-accent-light transition-colors mr-2">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-medium">Back to Collection</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left: Book Cover Column */}
          <div className="w-full lg:w-2/5 sticky top-24">
            <div className="relative group">
              {/* Decorative Glow Background */}
              <div className="absolute -inset-1 bg-linear-to-r from-accent-base to-brand-text rounded-2xl blur opacity-15 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
              
              <img 
                src={viewingBook.cover_image_url} 
                alt={viewingBook.title}
                className="relative w-full rounded-xl shadow-2xl object-cover aspect-[2/3] transform transition duration-500 hover:scale-[1.01]"
              />
            </div>
            
            <button className="w-full mt-8 bg-accent-base text-on-accent-text py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:bg-accent-base/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5" />
              Borrow this Book
            </button>
          </div>

          {/* Right: Book & Author Content */}
          <div className="w-full lg:w-3/5">
            <div className="border-b border-border-subtle pb-6 mb-8">
              <h1 className="text-4xl md:text-5xl font-black text-primary-text leading-tight tracking-tight">
                {viewingBook.title}
              </h1>
              <p className="text-xl md:text-2xl text-brand-text mt-3 font-medium">
                {viewingBook.author.first_name} {viewingBook.author.last_name}
              </p>
            </div>

            <div className="space-y-8">
              {/* Description Section */}
              <section>
                <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-muted-text mb-4">
                  Synopsis
                </h3>
                <p className="text-lg text-secondary-text leading-relaxed font-serif italic">
                  "{viewingBook.description || "In a world where stories are lost, this title remains a mystery awaiting its reader."}"
                </p>
              </section>

              {/* Author Profile Card */}
              <section className="mt-12">
                <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-muted-text mb-6">
                  The Creator
                </h3>
                <div className="relative p-6 rounded-2xl bg-secondary-bg border border-border-subtle overflow-hidden group">
                  {/* Subtle decorative background circle */}
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-accent-light rounded-full blur-3xl opacity-50 transition-all group-hover:scale-150"></div>
                  
                  <div className="relative flex items-center gap-6">
                    <div className="relative shrink-0">
                      {viewingBook.author.photo ? (
                        <img 
                          src={viewingBook.author.photo} 
                          className="w-20 h-20 rounded-full object-cover ring-4 ring-accent-light shadow-md" 
                          alt="Author" 
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-input-bg flex items-center justify-center ring-4 ring-accent-light">
                          <User className="w-8 h-8 text-muted-text" />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-xl font-bold text-primary-text">
                        {viewingBook.author.first_name} {viewingBook.author.last_name}
                      </p>
                      <p className="text-sm text-secondary-text mt-1 leading-relaxed max-w-md">
                        {viewingBook.author.bio || "A dedicated writer specializing in transformative literature and profound storytelling."}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- LIST VIEW RENDER ---
  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      <header className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary-text tracking-tight">Discover</h1>
        <p className="text-secondary-text mt-1">Scrolling through our entire collection</p>
      </header>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
        {books.map((book, index) => (
          <div 
            key={book.id} 
            ref={books.length === index + 1 ? lastBookElementRef : null}
            onClick={() => setViewingBook(book)}
            className="cursor-pointer"
          >
            <BookCard 
              id={book.id}
              title={book.title}
              author={`${book.author.first_name} ${book.author.last_name}`}
              cover={book.cover_image_url}
            />
          </div>
        ))}
      </div>

      {/* Loading States */}
      <div className="mt-10 py-4 flex justify-center">
        {loading && (
          <div className="w-8 h-8 border-4 border-accent-light border-t-accent-base rounded-full animate-spin"></div>
        )}
      </div>
    </div>
  );
}

export default Discover;