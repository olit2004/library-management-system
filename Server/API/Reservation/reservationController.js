
     import {checkUser} from "../User/userService.js"
    
import {reserveBook,
      findMyReservations,
  cancelOwnReservation,
  findAllReservations,
  findReservationById,
  markReservationReady,
  cancelAnyReservation,
  findReservationsByBook
} from "./reservationServices";


// service for setting reservation of book 

export async function handleReserve (req,res){
    if (!req.user){
         return res.status(401).json({mssg:"not authorized"});
    }
    const {bookId} =  req.body;
    if (!bookId){
        return  res.status(400).json({mssg:"book id is requered in order to make reservation "})
    }
    try{
            const userId = req.user.id;
            const reservation =  reserveBook({ bookId, userId });
                res.status(201).json({
                                        mssg: "reservation created successfully",
                                        reservation });}
    catch(err){
                res.status(500).json({err})
              }
}


// Member routes
async function getMyReservations(req, res) {
    const userId = req.user.id; 
    if (!userId){
        res.status(401).json({mssg:"not authorized "})
    }
    try {
    const user = await  checkUser(userId);
    if (!userId|| user.role!="MEMBER"){
        res.status(401).json({mssg:"not authorized "})
    }

    const reservations = await findMyReservations(userId);
    res.json({ data: reservations });
  } catch (err) {
        res.status(400).json({ error: err.message });
  }
}

async function cancelMyReservation(req, res) {

    const userId = req.user.id;
if (!userId){
        res.status(401).json({mssg:"not authorized "})
    }
    try {
    const user = await  checkUser(userId);
    if (!userId|| user.role!="MEMBER"){
        res.status(401).json({mssg:"not authorized "})
    }
    const reservationId = Number(req.params.id);
    const reservation = await cancelOwnReservation(userId, reservationId);
    res.json({ data: reservation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Librarian routes
async function listAllReservations(req, res) {
    const  userId =  req.user.id
    if (!userId){
        res.status(401).json({mssg:"not authorized "})
    }
    try {
    const user = await  checkUser(userId);
    if (!userId|| user.role!="LIBRARIAN"){
        res.status(401).json({mssg:"not authorized "})
    }
    const reservations = await findAllReservations();
    res.json({ data: reservations });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getReservationDetails(req, res) {
const  userId =  req.user.id
    if (!userId){
        res.status(401).json({mssg:"not authorized "})
    }
    try {
    const user = await  checkUser(userId);
    if (!userId|| user.role!="LIBRARIAN"){
        res.status(401).json({mssg:"not authorized "})
    }
    const reservationId = Number(req.params.id);
    const reservation = await findReservationById(reservationId);
    res.json({ data: reservation });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function fulfillReservation(req, res) {
  const  userId =  req.user.id
    if (!userId){
        res.status(401).json({mssg:"not authorized "})
    }
    try {
    const user = await  checkUser(userId);
    if (!userId|| user.role!="LIBRARIAN"){
        res.status(401).json({mssg:"not authorized "})
    }
    const reservationId = Number(req.params.id);
    const reservation = await markReservationReady(reservationId);
    res.json({ data: reservation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function cancelReservation(req, res) {
 const  userId =  req.user.id
    if (!userId){
        res.status(401).json({mssg:"not authorized "})
    }
    try {
    const user = await  checkUser(userId);
    if (!userId|| user.role!="LIBRARIAN"){
        res.status(401).json({mssg:"not authorized "})
    }
    const reservationId = Number(req.params.id);
    const reservation = await cancelAnyReservation(reservationId);
    res.json({ data: reservation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getBookReservations(req, res) {
 const  userId =  req.user.id
    if (!userId){
        res.status(401).json({mssg:"not authorized "})
    }
    try {
    const user = await  checkUser(userId);
    if (!userId|| user.role!="LIBRARIAN"){
        res.status(401).json({mssg:"not authorized "})
    }
    const bookId = Number(req.params.id);
    const reservations = await findReservationsByBook(bookId);
    res.json({ data: reservations });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

