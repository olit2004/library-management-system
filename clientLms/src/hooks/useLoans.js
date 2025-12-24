import { useState, useCallback } from 'react';
import { loanService } from '../api/loans';

export function useLoans() {
  const [items, setItems] = useState([]);
  const [overdue, setOverdue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiCall, updateState) => {
    setLoading(true);
    try {
      const res = await apiCall();
      const data = Array.isArray(res.data) ? res.data : [];
      // Optimization: Only update if data actually changed
      updateState(prev => JSON.stringify(prev) === JSON.stringify(data) ? prev : data);
      return { success: true, data };
    } catch (err) {
      setError(err?.message || 'An error occurred');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllLoans = useCallback(() => execute(() => loanService.getAll(), setItems), [execute]);
  const fetchOverdue = useCallback(() => execute(() => loanService.getOverdue(), setOverdue), [execute]);

  return { items, overdue, loading, error, fetchAllLoans, fetchOverdue };
}