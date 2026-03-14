import express from "express";
import { getBook, getBooks, checkAvailability, Addbook, updateBook, deleteBook, countBooks, searchGoogle, syncBook } from "./bookController.js";
import { requireAuth } from "../../middleware/requireauth.js"


const route = express.Router();

//public routes
route.get("/books", getBooks);
route.get("/book/count", countBooks)
route.get("/book/:id", getBook)
route.get("/availability/:id", checkAvailability)

//private routes
route.post("/book", requireAuth, Addbook)
route.post("/updateBook", requireAuth, updateBook);
route.delete("/book/:id", requireAuth, deleteBook);

route.get("/books/google-search", requireAuth, searchGoogle);
route.post("/books/sync/:id", requireAuth, syncBook);



export default route;