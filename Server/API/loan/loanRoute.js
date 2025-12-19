import express from "express";
import { handleBorrow,getMyloans ,getLoansHistory,renewLoan,getLoans,getLoan, handleCreateLoan,handleReturn,markOverdue,listOverdue} from "./loanController.js";
import {requireAuth} from "../../middleware/requireauth.js"


const route=  express.Router();

route.post("/borrow", requireAuth, handleBorrow)  //  book id is sent with the request   


route.get("/myLoans",requireAuth,getMyloans)    //get the loans of the user  only return active loans 

route.get("/loansHistory",requireAuth,getLoansHistory)  //returns all sort of loan

route.post("/renew",requireAuth,renewLoan)    // renew  loan 


// librarian routes 

route.get("/loans", requireAuth, getLoans);   // returns list of  loans  based on pafination 


route.get("/loan/:id", requireAuth,getLoan);   // return detail of book ;

route.post("/returnBook", requireAuth,handleReturn )  // route to return book to the library


route.post("/createLoan", requireAuth, handleCreateLoan)  //libraiain to create loan

route.put('/overdue/:id',requireAuth, markOverdue);  // write overdue for books

// GET /api/loans/overdue
route.get('/overdue', listOverdue);




export default  route;