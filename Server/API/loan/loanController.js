
import {checkUser} from "../User/userService.js"

import { borrowBook,myLoans ,loanHistory, handleRenewloan,listLoans, getLoanById,returnBook ,markLoanOverdue, getOverdueLoans } from "./loanService.js";



// controller to handle logic for creating  loan 
export async function handleBorrow(req,res){
  if (!req.user){
     return res.status(401).json({mssg:"not authorized"});
  }


  const userId = req.user.id
  
  const bookId=  Number(req.body.bookId)


  
  if (isNaN(bookId)){

    return  res.status(400).json({mssg:"book id id not in the right format "})
  }
  if (!bookId||!userId){

     return res.status(400).json({mssg:"  book id is not provided "});
  } 
  try {
  const  user= await  checkUser(req.user.id )


  if (user.role!="MEMBER"){

     return res.status(401).json({mssg:"not authorized"});
  }
  const  loan = await borrowBook({bookId,userId});
  
  if (!loan){
 

     return res.status(500).json({mssg:"couldn't create loan for the user "})
  }
  res.status(201).json({mssg:"the loan is created succesfullly ", loan})
  }catch(err){
  console.log(err.message)

    res.status(500).json({err:err.message})
  }

  }
 

//handler to get list of users loan  return active loans 

export async function  getMyloans (req,res){
  
  const userId =   req.user?req.user.id:""


   if (!userId){
     return res.status(401).json({mssg:"not authorized"});
  }
  
  try {
  const  user= await  checkUser(req.user.id )
  if (user.role!="MEMBER"){
     return res.status(401).json({mssg:"not authorized"});
  }
  const loans = await  myLoans({userId})
   res.status(200).json(loans);
}catch(err){
  console.log(err)

   res.status(500).json({err:err.message})
}
}



// handler  to get loan history ;

export async function getLoansHistory (req, res){

  const userId =   req.user?req.user.id:""

  if (!req.user||!userId){
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


//handler to renew loans 
export async function renewLoan (req, res)  {
  const { id } = req.body;
  const userId =    req.user?req.user.id:""
  if (!req.user||!userId){
     return res.status(401).json({mssg:"not authorized"});
  }

  try {

   const  user= await  checkUser(req.user.id )
  if (user.role!="MEMBER"){
    return res.status(401).json({mssg:"not authorized"});
  }
    const renewedLoan = await handleRenewloan({userId,id})

    res.json(renewedLoan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to renew loan" });
  }
}



//--------------------------------  librarian  controllers ------------------

// controller to give the list of loans to librarian based on filter 

export async function getLoans(req, res) {
    const userId =    req.user?req.user.id:""

      if (!req.user||! userId){
        return res.status(401).json({mssg:"not authorized"});
      }
      
      try {
      const  user= await  checkUser(req.user.id )
      if (user.role!="LIBRARIAN"){
        return res.status(401).json({mssg:"not authorized"});
      }
      
    const filters = {};

      //dynamic building filter based on the  query parameter 
    if (req.query.status) {
      filters.status = req.query.status; 
    }

    if (req.query.userId) {
      filters.user_id = Number(req.query.userId);
    }

    if (req.query.bookId) {
      filters.book_id = Number(req.query.bookId);
    }

    
    if (req.query.fromDate && req.query.toDate) {
      filters.checkout_date = {
        gte: new Date(req.query.fromDate),
        lte: new Date(req.query.toDate),
      };
    }
 
        const loans = await listLoans(filters);
        res.json(loans);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch loans" });
      }
}



// controller to detail of each loan 

export async function getLoan(req, res) {
   const userId =   req.user?req.user.id:""

   if (!req.user||! userId){
     return res.status(401).json({mssg:"not authorized"});
  }
  
  try {
  const  user= await  checkUser(req.user.id )
  if (user.role!="LIBRARIAN"){
      return res.status(401).json({mssg:"not authorized"});
    }
    const loanId = req.params.id
    console.log("loan",loanId)
      const loan = await getLoanById(loanId );
      if (!loan) return res.status(404).json({ error: "Loan not found" });
      res.json(loan);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch loan details",err });
    }
}
//  handle create loan by  librarian 

export  async function  handleCreateLoan(req,res){
    const user_id =   req.user?req.user.id:""
    if (!req.user||!user_id){
      return res.status(401).json({mssg:"not authorized"});
    }

    const  bookId=Number (req.body.bookId);

    
    const userId = Number(req.body.userId)

    if (isNaN(bookId) || isNaN(userId)) {
      return res.status(400).json({ mssg: "bookId and userId must be numbers" });
    }   
    console.log(typeof(bookId),typeof(userId))
    try {

        const user= await checkUser (user_id);
        
          if (user.role!="LIBRARIAN"){
           
          return res.status(401).json({mssg:"not authorized"});
        }
        const  loan = await borrowBook({bookId,userId});
        if (!loan){
          res.status(500).json({mssg:"couldn't create loan for the user "})
        }
          res.status(201).json({mssg:"the loan is created succesfullly ", loan})
        }
        catch(err){
          res.status(500).json({err:err.message})
        }
}



//  return controller 

export async function  handleReturn (req,res){
    
    const user_id = req.user.id
    if (!req.user||! user_id){
      return res.status(401).json({mssg:"not authorized"});
    }
    const {bookId ,userId}= req.body
    if (!bookId&&!userId){
      return res.status ("bookid and user id is required in order to return  book  ");
    }
      const bookIdNum = Number(bookId);
      const userIdNum = Number(userId);
      
    if (isNaN(bookIdNum) || isNaN(userIdNum)) {
      return res.status(400).json({ mssg: "bookId and userId must be numbers" });
    }


    try{

      const loan = await returnBook({bookIdNum,userIdNum});
      if (!loan){
        return res.status(500).json({mssg:"couldn't retrun the book image "})
      }
      res.status(200).json({mssg:"book returned succefully"});

}catch(err){
res.status(500).json({mssg:"couldn't retrun the book image ",err:err.message})
}
    

}



export async function markOverdue(req, res) {
  
    const user_id = req.user?req.user.id:""
    if (!req.user||!user_id){
           

      return res.status(401).json({mssg:"not authorized"});
    }


    try{
        const user = await  checkUser(user_id);
          if (!user||user.role!= "LIBRARIAN"){
              return res.status(401).json({mssg:"not authorized"});
          }
        const id = Number(req.params.id);
        const loan = await markLoanOverdue(id);
        res.status(200).json({ data: loan });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Failed to mark overdue' });
  }
}


export async function listOverdue(req, res) {
  const user_id = req.user?req.user.id:""
    if (!req.user||! user_id){
      return res.status(401).json({mssg:"not authorized"});
    }


    try{
        const user = await  checkUser(user_id);
          if (!user||user.role!= "LIBRARIAN"){
              return res.status(401).json({mssg:"not authorized"});
          }
    const loans = await getOverdueLoans();
    res.status(200).json({ data: loans });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Failed to list overdue loans' });
  }
}
























