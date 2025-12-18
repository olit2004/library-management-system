import express from "express";
import { requireAuth } from "../../middleware/requireauth.js";
import {handleMe,updateProfile,listUsers,deactivateUser,getUserReservations,getUser} from "./userController.js"

const route  = express.Router()


route.get("/me",requireAuth,handleMe);
route.patch("/me",requireAuth,updateProfile)



route.get('/users', requireAuth, listUsers);
route.get('/users/:id', requireAuth,getUser);
route.delete('/users', requireAuth,deactivateUser);
route.get('users/reservations', requireAuth,getUserReservations);















export default route