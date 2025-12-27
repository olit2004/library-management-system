
     import {checkUser} from "../User/userService.js"
    
import {reserveBook,
      findMyReservations,
  cancelOwnReservation,
  findAllReservations,
  findReservationById,
  markReservationReady,
  cancelAnyReservation,
  findReservationsByBook
} from "./reservationServices.js";


// service for setting reservation of book 

export async function handleReserve (req,res){
    const userId = req.user? req.user.id :""; 
    if (!req.user || !userId){
      console.log("*******************")
         return res.status(401).json({mssg:"not authorized"});
    }
    let {bookId} =  req.body;
    if (!bookId){
        return  res.status(400).json({mssg:"book id is requered in order to make reservation "})
    }
    bookId=Number(bookId)
    if (isNaN(bookId)){
      return  res.status(400).json({mssg:"book id isshould be number "})
    }

    try{
            const userId = req.user.id;
            const reservation = await  reserveBook({ bookId, userId });
            res.status(201).json({
                                        mssg: "reservation created successfully",
                                        reservation });}
    catch(err){
                res.status(500).json({err:err.message})
              }
}


// Member routes
export async function getMyReservations(req, res) {
    const userId = req.user? req.user.id :""; 
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

export async function cancelMyReservation(req, res) {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ mssg: "Not authorized" });
  }

  try {
    const user = await checkUser(userId);

    if (user.role !== "MEMBER") {
      return res.status(403).json({ mssg: "Only members can cancel reservations" });
    }

    const reservationId = Number(req.params.id);

    if (!reservationId || isNaN(reservationId)) {
      return res.status(400).json({ mssg: "Invalid reservation id" });
    }

    const reservation = await cancelOwnReservation(userId, reservationId);

    return res.json({ data: reservation });

  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}


// Librarian routes
export async function listAllReservations(req, res) {
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

export async function getReservationDetails(req, res) {
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

export async function fulfillReservation(req, res) {
  const  userId =  req.user.id
  console.log(
  "this is running fine"
  )
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

export async function cancelReservation(req, res) {
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

export async function getBookReservations(req, res) {
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

