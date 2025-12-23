import express from "express"
import {handleReserve,
getMyReservations,
cancelMyReservation,
listAllReservations,
getReservationDetails,
fulfillReservation,
cancelReservation,
getBookReservations
} from "./reservationController.js"
import {requireAuth}  from "../../middleware/requireauth.js";


const route = express.Router()









// --- Member routes ---
route.post("/reserve",requireAuth,handleReserve);
route.get('/myReservation',requireAuth, getMyReservations);
route.get('/cancel/:id',requireAuth, cancelMyReservation);

// --- Librarian-only routes ---
route.get('/reservations', requireAuth,listAllReservations);
route.get('/reservation/:id', requireAuth,getReservationDetails);
route.get('/reservation/:id/fulfill', requireAuth,fulfillReservation);
route.delete('/reservation/:id', requireAuth,cancelReservation);
route.get('/books/:id/reservations', requireAuth,getBookReservations);






export default  route ;
