import express from "express";
import { handleBorrow,getMyloans ,getLoansHistory,handleRenew,getLoans,getLoan, handleCreateLoan} from "./loanController.js";
import requireAuth from "../../middleware/requireauth.js"


const route=  express.Router();
route.post("/borrow", requireAuth, handleBorrow)
route.get("/myLoans",requireAuth,getMyloans)
route.get("/loansHistory",requireAuth,getLoansHistory)
route.post("/renew",requireAuth,handleRenew)
route.get("/loans", requireAuth, getLoans);
route.get("loan", requireAuth,getLoan);
route.get("/returnBook", requireAuth,handleReturn )
// libraiarian can overirde and create laon for  the user ;

route.post("/createLoan", requireAuth, handleCreateLoan)

route.put('/overdue', markOverdue);

// GET /api/loans/overdue
route.get('/overdue', listOverdue);




export default  route;