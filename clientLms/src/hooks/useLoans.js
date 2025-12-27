import { useState, useCallback } from "react";
import { loanService } from "../api/loans";

export function useLoans() {
  const [items, setItems] = useState([]);
  const [overdue, setOverdue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ---------------- CORE EXECUTOR ---------------- */
  const execute = useCallback(async (apiCall, updateState) => {
    setLoading(true);
    try {
      const res = await apiCall();
      console.log(res.data)
      const data = Array.isArray(res.data) ? res.data : [];


      updateState(prev =>
        data
      );
      console.log("the incoming data is ",data)

      setError(null);
      return { success: true, data };
    } catch (err) {
      const message = err?.message || "An error occurred";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  /* ---------------- MEMBER ---------------- */
  const fetchActive = useCallback(
    () => execute(() => loanService.getMyActive(), setItems),
    [execute]
  );

  const fetchHistory = useCallback(
    () => execute(() => loanService.getHistory(), setItems),
    [execute]
  );

  const borrowBook = useCallback(async (bookId) => {
    try {
      await loanService.borrow(bookId);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err?.message || "Failed to borrow book",
      };
    }
  }, []);

  const renewLoan = useCallback(async (loanId) => {
    try {
      await loanService.renew(loanId);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err?.message || "Failed to renew loan",
      };
    }
  }, []);

  /* ---------------- LIBRARIAN ---------------- */
  const fetchAllLoans = useCallback(
    () => execute(() => loanService.getAll(),  setItems),
    [execute]
  );

  const fetchOverdue = useCallback(
    () => execute(() => loanService.getOverdue(), setOverdue),
    [execute]
  );


  const returnBook = useCallback(async (userId, bookId) => {
  try {
    await loanService.returnBook(userId, bookId);
    return { success: true };
  } catch (err) {
      const message = err.originalError?.mssg|| "failed to return the book  "
      setError(message)
      
    return {
      success: false, 
    };
  }
}, []);
  const  createLoan = useCallback (async ({userId,bookId})=>{
    try{
      await loanService.createLoan ({userId,bookId});
      return{sucess:true}
    }
    catch(err) {
     console.log(err)
     const message = err.originalError?.mssg|| "failed to return the book  "
      setError(message)
      return {
        success :false
      }

    }
  })


  return {
    items,
    overdue,
    loading,
    error,

    // member
    fetchActive,
    fetchHistory,
    borrowBook,
    renewLoan,

    // librarian
    fetchAllLoans,
    fetchOverdue,
    returnBook,  
    createLoan,
  };
}
