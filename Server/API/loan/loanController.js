
import {checkUser} from "../User/userService.js"

import { borrowBook,myLoans ,loanHistory, handleRenewloan,listLoans, getLoanById} from "./loanService.js";



// controller to handle logic for creating  loan 
export async function handleBorrow(req,res){
  if (!req.user){
     return res.status(401).json({mssg:"not authorized"});
  }
  const userId = req.user.id
  const {bookId}= req.body;
  if (!bookId||!userId){
     return res.status(400).json({mssg:"  book id is not provided "});
  } 
  try {
  const  user= await  checkUser(req.user.id )


  if (user.role!="MEMBER"){
     return res.status(401).json({mssg:"not authorized"});
  }
  const  loan = await borrowBook(bookId,userId);
  if (!loan){

     res.status(500).json({mssg:"couldn't create loan for the user "})
  }
  res.status(201).json({mssg:"the loan is created succesfullly ", loan})
  }catch(err){
    res.status(500).json({err})
  }

  }
 

//handler to get list of users loan 

export async function  getMyloans (req,res){
  const userId = req.user.id

   if (!req.user||! user.id){
     return res.status(401).json({mssg:"not authorized"});
  }
  
  try {
  const  user= await  checkUser(req.user.id )
  if (user.role!="MEMBER"){
     return res.status(401).json({mssg:"not authorized"});
  }
  const loans = await  myLoans(userId)
   res.status(200).json(loans);
}catch(err){

   res.status(500).json({err})
}
}


export async function getLoansHistory (req, res){

  const userId = req.user.id

   if (!req.user||! user.id){
     return res.status(401).json({mssg:"not authorized"});
  }
  
  try {
  const  user= await  checkUser(req.user.id )
      if (user.role!="MEMBER"){
         return res.status(401).json({mssg:"not authorized"});
      }
    const loanHist = await loanHistory(userId);

    res.status(200).json(loanHist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch loan history" });
  }
};


 export async function renewLoan (req, res)  {
  const { id } = req.params;
  const userId = req.user.id;
   if (!req.user||! user.id){
     return res.status(401).json({mssg:"not authorized"});
  }
  try {

   const  user= await  checkUser(req.user.id )
      if (user.role!="MEMBER"){
         return res.status(401).json({mssg:"not authorized"});
      }

    
    const renewedLoan = await handleRenewloan(userId)

    res.json(renewedLoan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to renew loan" });
  }
}



// controller to give the list of loans to librarian based on filter 




export async function getLoans(req, res) {
const userId = req.user.id

   if (!req.user||! user.id){
     return res.status(401).json({mssg:"not authorized"});
  }
  
  try {
  const  user= await  checkUser(req.user.id )
  if (user.role!="LIBRARIAN"){
     return res.status(401).json({mssg:"not authorized"});
  }
    const filters = {}; 
    const loans = await listLoans(filters);
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch loans" });
  }
}



// controller to detail of each loan 



export async function getLoan(req, res) {
   const userId = req.user.id

   if (!req.user||! user.id){
     return res.status(401).json({mssg:"not authorized"});
  }
  
  try {
  const  user= await  checkUser(req.user.id )
  if (user.role!="LIBRARIAN"){
     return res.status(401).json({mssg:"not authorized"});
  }
  const loanId = req.params.id
    const loan = await getLoanById(loanId );
    if (!loan) return res.status(404).json({ error: "Loan not found" });
    res.json(loan);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch loan details" });
  }
}