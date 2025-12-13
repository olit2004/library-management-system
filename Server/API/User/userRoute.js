import express from "express";
import { requireAuth } from "../../middleware/requireauth.js";
import {handleMe,updateProfile} from "./userController.js"

const route  = express.Router()


route.get("/me",requireAuth,handleMe);
route.patch("/me",requireAuth,updateProfile)
















export default route