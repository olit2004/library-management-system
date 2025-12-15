
import {reserveBook} from "./reservationServices";

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