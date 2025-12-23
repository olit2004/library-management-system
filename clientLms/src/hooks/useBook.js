import { useState, useEffect, useCallback, useRef } from 'react';
import * as booksApi from '../api/books';

export const useBooks = (limit = 10) => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
  
  // Use a ref to track if a specific page is currently being fetched
  const fetchingPage = useRef(null);

  const fetchBooks = useCallback(async () => {
    // Prevent fetching the same page twice or fetching if we are already loading
    if (loading || !hasMore || fetchingPage.current === page) return;

    setLoading(true);
    fetchingPage.current = page;

    try {
      const { data } = await booksApi.getBooks({ page, limit });
      const newBooks = data.books || data;

      if (newBooks.length === 0) {
        setHasMore(false);
      } else {
        setBooks((prev) => {
          // 1. Create a Set of existing IDs for O(1) lookup
          const existingIds = new Set(prev.map(book => book.id));
          
          // 2. Filter out any new books that are already in our list
          const uniqueNewBooks = newBooks.filter(book => !existingIds.has(book.id));
          
          return [...prev, ...uniqueNewBooks];
        });

    
        if (newBooks.length < limit) {
          setHasMore(false);
        }
      }
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch books');
    } finally {
      setLoading(false);
      fetchingPage.current = null; 
    }
  }, [page, hasMore, limit, loading]);

  useEffect(() => {
    fetchBooks();
  }, [page]); 

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return { books, loading, error, hasMore, loadMore };
};