import express from "express";
import { handleBorrow,getMyloans ,getLoansHistory,handleRenew,getLoans,getLoan} from "./loanController.js";
import requireAuth from "../../middleware/requireauth.js"


const route=  express.Router();
route.post("/borrow", requireAuth, handleBorrow)
route.get("/myLoans",requireAuth,getMyloans)
route.get("/loansHistory",requireAuth,getLoansHistory)
route.post("/renew",requireAuth,handleRenew)
route.get("/loans", requireAuth, getLoans);

route.get("loan", getLoan);






export default  route;