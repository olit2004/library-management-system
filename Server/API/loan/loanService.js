import prisma  from "../../lib/prisma.js"
import { renewLoan } from "./loanController.js";


export async function borrowBook(userId, bookId) {

  // using transaction inprder to bundle buch of database operation that inter depend on each other ;
   
  return prisma.$transaction(async (tx) => {

    // check if the book really exists 

    const book = await tx.book.findUnique({
      where: { id: bookId },
      
    });


    if (!book) {
      throw new Error('BOOK_NOT_FOUND');
    }

    const availableCopies = book.available_copies;

    // check if  we got  copy to loan it 
    if (availableCopies <= 0) {
      throw new Error('NO_COPIES');
    }

    // check weather the same person  loaned the book and not returned  yet 


    const existingLoan = await tx.loan.findFirst({
      where: {
        user_id:userId,
        book_id:bookId,
        status: 'ACTIVE'
      }
    });

    if (existingLoan) {
      throw new Error('ALREADY_BORROWED');
    }


    // check if the useer has reached maximum laon limit 
    
    const activeLoanCount = await tx.loan.count({
      where: {
        user_id:userId,
        status: 'ACTIVE'
      }
    });

    if (activeLoanCount >= 5) {
      throw new Error('LIMIT_EXCEEDED');
    }

 

     // check if the user got over due loans 
    const overdueCount = await tx.loan.count({
      where: {
        user_id:userId,
        status: 'OVERDUE'
      }
    });

    if (overdueCount > 0) {
      throw new Error('HAS_OVERDUE');
    }



  //  set the check out date and calculate the return date 

    const checkoutDate = new Date();
    const dueDate = new Date(checkoutDate);
    dueDate.setDate(dueDate.getDate() + 14);

    // creating the loan 
    const loan = await tx.loan.create({

        data: {
              user_id: userId,
              book_id: bookId,
              checkout_date : checkoutDate,
              due_date: dueDate,
              status: 'ACTIVE',
              renewed_count : 0
        }
    });

   
    // removing reservation if the loan was reserved before

  
    await tx.reservation.updateMany({
      where: {
         user_id: userId,
         book_id:  bookId,
         status: 'READY_FOR_PICKUP'
      },
      data: {
        status: 'FULFILLED'
      }
    });

    //  dicrease the number of available copies  of the book 
    const ac  =availableCopies-1
     await tx.book.update({
      where: { id: bookId },
      data:{
        available_copies:ac
      }
    });
    

    return loan;
  });
}


// service to remove book from the data base ;


export async function removeBook(isbn) {
  if (!isbn) {
    throw new Error("Cannot remove a book without its ISBN.");
  }

  const deletedBook = await prisma.book.delete({
    where: { isbn: isbn } 
  });

  return deletedBook;
}


// service to give me all the users loans that are active 
export async function myLoans (id ){
  if (!id){
    throw new Eror ("id is not provided ")
  }

  const loans = await prisma.loan.findMany({
      where: {
      user_id: userId,
      returned_date: null,
      status: "ACTIVE"

      },
      include: { book: true }
    });
   return loans

}

export  async function loanHistory(id){

  if (!id){
    throw new Eror ("id is not provided ")
  }
   const loanHist = await prisma.loan.findMany({
      where: {
        user_id: userId,
        returned_date: { not: null }
      },
      include: { book: true }
    });
    return loanHist;

}

export  async function handleRenewloan (id){
    if (!id){
    throw new Eror ("id is not provided ")
  }
  const loan = await prisma.loan.findUnique({
      where: { id: Number(id) }
    });

    if (!loan || loan.user_id !== userId) {
      return res.status(404).json({ error: "Loan not found" });
    }

    if (loan.returned_date) {
      return res.status(400).json({ error: "Cannot renew a returned loan" });
    }
    const renewedLoan = prisma.loan.update({
      where: { id: Number(id) },
      data: {
        due_date: new Date(loan.due_date.getTime() + 14 * 24 * 60 * 60 * 1000), 
        renewed_count: loan.renewed_count + 1
      }
    });
    return renewedLoan;

}




// services/loanService.js
export async function listLoans(filters = {}) {
  return prisma.loan.findMany({
    where: filters,
    include: { book: true, user: true }
  });
}

export async function getLoanById (id){
    return prisma.loan.findUnique({
    where:{ id},
    include: { book: true, user: true }
  });

}