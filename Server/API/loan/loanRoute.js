import express from "express";
import { handleBorrow } from "./loanController.js";
import requireAuth from "../../middleware/requireauth.js"


const route=  express.Router();
route.post("/borrow", requireAuth, handleBorrow)




export default  route;