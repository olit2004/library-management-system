import express from "express";
import {getBook, getBooks,checkAvailability,Addbook,updateBook,deleteBook} from "./bookController.js";
import {requireAuth} from "../../middleware/requireauth.js"


const route = express.Router();

route.get("/books",getBooks);
route.get("/book/:id",getBook)
route.get("/availability/:id",checkAvailability)

route.post("/book",requireAuth,Addbook)
route.post("/updateBook",requireAuth,updateBook);
route.delete("/book/:id", requireAuth,deleteBook);


export default route;