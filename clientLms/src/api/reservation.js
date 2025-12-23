
import  api from "./auth"

export const reservationService = {
  // Member Actions
  reserve: (bookId) => api.post('/reserve', { bookId }),
  getMyReservations: () => api.get('/myReservation'),
  cancelMyReservation: (id) => api.get(`/cancel/${id}`),

  // Librarian Actions
  getAll: () => api.get('/reservations'),
  getDetails: (id) => api.get(`${API_BASE}/reservation/${id}`),
  fulfill: (id) => api.get(`${API_BASE}/reservation/${id}/fulfill`),
  delete: (id) => api.delete(`${API_BASE}/reservation/${id}`),
  getByBook: (bookId) => axios.get(`${API_BASE}/books/${bookId}/reservations`)
};