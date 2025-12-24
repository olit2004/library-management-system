import { useState, useCallback, useRef } from "react";
import * as booksApi from "../api/books";

export const useBooks = (limit = 10, query = "") => {
  const [books, setBooks] = useState([]);
  const [totalCount, setTotalCount] = useState(0); // New state for the inventory count
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const fetchingPage = useRef(null);

  
  const fetchTotalCount = useCallback(async () => {
    try {
      const res = await booksApi.countBook();
      // Using the property 'mssg' as per your existing logic
      setTotalCount(res.data?.mssg || 0);
    } catch (err) {
      console.error("Failed to fetch book count:", err);
      setTotalCount("!"); // Fallback error indicator
    }
  }, []);

  const fetchBooks = useCallback(async (isInitial = false) => {
    const currentPage = isInitial ? 1 : page;
    if (loading || (!hasMore && !isInitial) || fetchingPage.current === currentPage) return;

    setLoading(true);
    fetchingPage.current = currentPage;

    try {
      const { data } = await booksApi.getBooks({ page: currentPage, limit, query });
      const newBooks = data.books || data;

      if (isInitial) {
        setBooks(newBooks);
      } else {
        setBooks((prev) => {
          const ids = new Set(prev.map((b) => b.id));
          return [...prev, ...newBooks.filter((b) => !ids.has(b.id))];
        });
      }
      setHasMore(newBooks.length === limit);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      fetchingPage.current = null;
    }
  }, [page, limit, query, hasMore, loading]);

  // Return totalCount and fetchTotalCount
  return { books, totalCount, loading, fetchBooks, fetchTotalCount };
};