import express from "express"
import {handleReserve} from "./reservationController"


const route = express.Router()



route.post("/borrow",handleReserve);





export default  route ;
