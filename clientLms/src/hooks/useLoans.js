import { useState, useCallback } from 'react';
import { loanService } from '../api/loans';

export function useLoans() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiCall) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiCall();
      
      // Update items if the response is an array (fetching lists)
      if (Array.isArray(res.data)) {
        setItems(prev =>
          JSON.stringify(prev) === JSON.stringify(res.data)
            ? prev
            : res.data
        );
      }
      return { success: true, data: res.data };
    } catch (err) {
     
      const msg =
        err.originalError?.err ||
        err.originalError?.mssg ||
        "An error occurred";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Member Actions
  const fetchActive = useCallback(
    () => execute(() => loanService.getMyActive()),
    [execute]
  );

  const fetchHistory = useCallback(
    () => execute(() => loanService.getHistory()),
    [execute]
  );

  const borrowBook = useCallback(
    (id) => execute(() => loanService.borrow(id)),
    [execute]
  );

  const renewLoan = useCallback(
    (id) => execute(() => loanService.renew(id)),
    [execute]
  );

 
  const returnBook = useCallback(
    (userId, bookId) => execute(() => loanService.returnBook(userId, bookId)),
    [execute]
  );

  return {
    items,
    loading,
    error,
    fetchActive,
    fetchHistory, 
    borrowBook,  
    renewLoan,
    returnBook
  };
}