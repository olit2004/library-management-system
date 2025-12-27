import { useState, useEffect, useCallback, useRef } from "react";
import * as booksApi from "../api/books";

export const useBooks = (limit = 10, query = "") => {
  /* ---------------- STATE ---------------- */
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Librarian-only
  const [totalCount, setTotalCount] = useState(0);

  // Prevent duplicate page fetches
  const fetchingPage = useRef(null);


  useEffect(() => {
    setBooks([]);
    setPage(1);
    setHasMore(true);
    fetchingPage.current = null;
  }, [query]);

  
  const fetchBooks = useCallback(
    async (isInitial = false) => {
      const currentPage = isInitial ? 1 : page;

      if (
        loading ||
        !hasMore ||
        fetchingPage.current === currentPage
      ) {
        return;
      }

      setLoading(true);
      fetchingPage.current = currentPage;

      try {
        const { data } = await booksApi.getBooks({
          page: currentPage,
          limit,
          query,
        });

        const newBooks = data?.books ?? data ?? [];

        setBooks((prev) => {
          if (isInitial) return newBooks;

          const ids = new Set(prev.map((b) => b.id));
          return [...prev, ...newBooks.filter((b) => !ids.has(b.id))];
        });

        if (newBooks.length < limit) {
          setHasMore(false);
        }

        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch books");
      } finally {
        setLoading(false);
        fetchingPage.current = null;
      }
    },
    [page, limit, query, hasMore, loading]
  );

  
  useEffect(() => {
    fetchBooks();
  }, [page, fetchBooks]);

 
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  
  const fetchTotalCount = useCallback(async () => {
    try {
      const res = await booksApi.countBook();
      setTotalCount(res.data?.mssg || 0);
    } catch (err) {
      console.error("Failed to fetch book count:", err);
      setTotalCount("!");
    }
  }, []);

  
  return {
   
    books,
    loading,
    error,
    hasMore,

  
    loadMore,

    
    fetchBooks,
    fetchTotalCount,
    totalCount,
  };
};
