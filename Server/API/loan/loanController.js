
import {checkUser} from "../User/userService.js"

import { borrowBook } from "./loanService.js";


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


  if (user.role="MEMBER"){
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
 