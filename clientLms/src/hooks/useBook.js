import { useState, useEffect, useCallback, useRef } from "react";
import * as booksApi from "../api/books";

export const useBooks = (limit = 10, query = "") => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchingPage = useRef(null);

  // Reset when query changes
  useEffect(() => {
    setBooks([]);
    setPage(1);
    setHasMore(true);
    fetchingPage.current = null;
  }, [query]);

  const fetchBooks = useCallback(async () => {
    if (loading || !hasMore || fetchingPage.current === page) return;

    setLoading(true);
    fetchingPage.current = page;

    try {
      const { data } = await booksApi.getBooks({
        page,
        limit,
        query,
      });

      const newBooks = data.books || data;

      if (newBooks.length === 0) {
        setHasMore(false);
      } else {
        setBooks((prev) => {
          const ids = new Set(prev.map((b) => b.id));
          return [...prev, ...newBooks.filter((b) => !ids.has(b.id))];
        });

        if (newBooks.length < limit) {
          setHasMore(false);
        }
      }

      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch books");
    } finally {
      setLoading(false);
      fetchingPage.current = null;
    }
  }, [page, limit, query, hasMore, loading]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return { books, loading, error, hasMore, loadMore };
};
