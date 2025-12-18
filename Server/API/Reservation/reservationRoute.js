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



route.post("/borrow",handleReserve);





const router = express.Router();

// --- Member routes ---
router.get('/my', getMyReservations);
router.post('/:id/cancel', cancelMyReservation);

// --- Librarian-only routes ---
router.get('/', requireAuth,listAllReservations);
router.get('/:id', requireAuth,getReservationDetails);
router.post('/:id/fulfill', requireAuth,fulfillReservation);
router.delete('/:id', requireAuth,cancelReservation);
router.get('/books/:id/reservations', requireAuth,getBookReservations);

module.exports = router;




export default  route ;
