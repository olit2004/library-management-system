import express from "express";
import {getBook, getBooks,checkAvailability,book} from "./bookController.js";
import {requireAuth} from "../../middleware/requireauth.js"


const route = express.Router();

route.get("/books",getBooks);
route.get("/book",getBook)
route.get("/availability",checkAvailability)
route.post("/book",requireAuth,Addbook)

export default route;