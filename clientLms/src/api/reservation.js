
import  api from "./auth"

export const reservationService = {
  // Member Actions
  reserve: (bookId) => api.post('/reserve', { bookId }),
  getMyReservations: () => api.get('/myReservation'),
  cancelMyReservation: (id) => api.get(`/cancel/${id}`),

  // Librarian Actions
  getAll: () => api.get('/reservations'),
  getDetails: (id) => api.get(`/reservation/${id}`),
  fulfill: (id) => api.get(`/reservation/${id}/fulfill`),
  delete: (id) => api.delete(`/reservation/${id}`),
  getByBook: (bookId) => api.get(`/books/${bookId}/reservations`)
};