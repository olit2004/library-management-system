import api from "./auth";

export const loanService = {
  
  
  // Member Specific
  borrow: (bookId) => api.post('/borrow', { bookId }),
  getMyActive: () => api.get('/myLoans'),
  getHistory: () => api.get('/loansHistory'),
  renew: (loanId) => api.post('/renew', { id: loanId }),


  getAll: (filters) => api.get('/loans', { params: filters }),
  getDetails: (id) => api.get(`/loan/${id}`),
  returnBook: (userId, bookId) => api.post('/returnBook', { userId, bookId }),
  markOverdue: (id) => api.put(`/overdue/${id}`),
  getOverdue: () => api.get('/overdue'),
  createLoan: ({userId,bookId})=>api.post("/createLoan",{userId,bookId})
};