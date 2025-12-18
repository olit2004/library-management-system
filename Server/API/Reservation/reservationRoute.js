import express from "express"
import {handleReserve,
      getMyReservations,
    cancelMyReservation,
    listAllReservations,
    getReservationDetails,
    fulfillReservation,
    cancelReservation,
  getBookReservations
} from "./reservationController"


const route = express.Router()



route.post("/borrow",handleReserve);


const express = require('express');
const {

} = require('../controllers/reservations.controller');

const router = express.Router();

// --- Member routes ---
router.get('/my', getMyReservations);
router.post('/:id/cancel', cancelMyReservation);

// --- Librarian-only routes ---
router.get('/', listAllReservations);
router.get('/:id', getReservationDetails);
router.post('/:id/fulfill', fulfillReservation);
router.delete('/:id', cancelReservation);
router.get('/books/:id/reservations', getBookReservations);

module.exports = router;




export default  route ;
