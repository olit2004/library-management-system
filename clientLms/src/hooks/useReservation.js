// src/hooks/useReservations.js
import { useState } from 'react';
import { reservationService } from "../api/reservation";

export const useReservations = () => {
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState([]);

  const handleAction = async (apiCall) => {
    setLoading(true);
    try {
      const response = await apiCall;
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setLoading(false);
      return { 
        success: false, 
        error: err.response?.data?.mssg || err.response?.data?.error || "Action failed" 
      };
    }
  };

  return {
    loading,
    reservations,
    // Member methods
    reserveBook: (bookId) => handleAction(reservationService.reserve(bookId)),
    fetchMyReservations: async () => {
      const res = await handleAction(reservationService.getMyReservations());
      if (res.success) setReservations(res.data.data);
      return res;
    },

    cancelMyReservation: (id) => handleAction(reservationService.cancelMyReservation(id)),

    // Librarian methods
    fetchAllReservations: async () => {
      const res = await handleAction(reservationService.getAll());
      if (res.success) setReservations(res.data.data);
      return res;
    },
    fulfillReservation: (id) => handleAction(reservationService.fulfill(id)),
    cancelAny: (id) => handleAction(reservationService.delete(id))
  };
};