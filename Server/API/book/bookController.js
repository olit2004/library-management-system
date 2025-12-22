
import {fetchBooks,fetchBook,createBook,editBook,removeBook} from  "./bookServices.js"
import {checkUser} from "../User/userService.js"


// CONTROLLER FOR FETCHING BOOKS FROM THE DATABASE

export async function getBooks (req,res){


    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await fetchBooks(page, limit);
        res.status(200).json(result);
    }catch(err){
         res.status(500).json(err);


    }

}

//CONTROLLER TO HANDLE GETTING SPECIFIC BOOK INFO

export async function getBook(req,res){
    
    const id = Number(req.params.id)

    if(!id||isNaN(id)){
        res.status(400).json({mssg:"the id is required inorder to get the specific info of give book"})
    }
    try{
        const  book = await fetchBook(id);
        if (!book){
            res.status(404).json({mssg:"the book doesn't exist"})  
        }
        res.status(200).json (book);

    }catch(err){
        res.status(500).json({err})
    }
}


//  checking wheather book is avaailable or not 

export  async function checkAvailability (req,res){
        const id = Number (req.params.id);
   

        if(!id||isNaN(id)){
            res.status(400).json({mssg:"the id is required inorder to get the specific info of give book"})
        }
        try{
        const   book= await fetchBook(id)
        const availableCopies = book.available_copies;
        res.status(200).json({mssg:availableCopies})

        }catch(err){
            console.log("ERROR: occured : user ",)
            res.status(500).json({error:err.message})
            
        }
}




//  add a single book in to the data base ;

export async function Addbook (req,res){
   const userId = req.user.id

   if (!req.user||!userId){
        return res.status(401).json({mssg:"not authorized"});
   }

   const { isbn ,title ,description, coverImageUrl,totalCopies ,publishedYear ,authorFirstName,authorLastName } = req.body;
   if (!isbn||!title||!description||!publishedYear||!authorFirstName||!authorLastName){
    return res.status(400).json({mssg:"some detail about the book is missing please make sure you give the detaied in formation"})
   }
   try {
    const user = await  checkUser(userId);
    if (!user||user.role!= "LIBRARIAN"){
        return res.status(401).json({mssg:"not authorized"});
    }
    const book =await  createBook({ isbn ,
                                    title ,
                                    description, 
                                    coverImageUrl,
                                    totalCopies ,
                                    publishedYear ,
                                    authorFirstName,
                                    authorLastName })

    if (!book){
        res.status(500).json({mssg:"couldn't add the book to the data base"})
    }     
    res.status(201).json({mssg:"the book is added to the data base ",book})                            

   }
   catch(err){
        res.status(500).json({err})

   }
     

}


// handler for  updating the book deatial 
export async function updateBook (req,res){

    const userId =  req.user.id
      const {
    isbn,
    newIsbn,
    title,
    description,
    coverImageUrl,
    totalCopies,
    publishedYear,
    authorFirstName,
    authorLastName,
  } = req.body;

//    check for auth 
    if (!req.user||!userId){
        return res.status(401).json({mssg:"not authorized"});
    }
    try{
        const user = await  checkUser(userId);
        if (!user||user.role!= "LIBRARIAN"){
            return res.status(401).json({mssg:"not authorized"});
        }
        const book = await  editBook  ({  isbn,
                                            newIsbn,
                                            title,
                                            description,
                                            coverImageUrl,
                                            totalCopies,
                                            publishedYear,
                                            authorFirstName,
                                            authorLastName, });
    if (!book){
        res.status(500).json({mssg:"couldn't  update  the book "})
    }     
        res.status(201).json({mssg:"the book is updated successfully ",book})   

    }
    catch(err){
        res.status(500).json({err})
   }

 }


 // handler to remove book fro the data base 

export  async function  deleteBook(req,res){
    const id  = Number(req.params.id) ;
    if (isNaN(!id)){
        return res.status("in correct  format for bookid ")
    }
    const userId = req.user.id
    if (!req.user||!userId){
            return res.status(401).json({mssg:"not authorized"});
    }
    try {
    const user = await  checkUser(userId);

    if (!user||user.role!= "LIBRARIAN"){
        return res.status(401).json({mssg:"not authorized"});
    }
     const delBook =  await removeBook(id)
     if (!delBook){
        res.status(500).json({mssg:"server error couldn't delete the book"})


     }
     res.status(200).json({mssg:"book  removed succesfully ", delBook})

    }catch (err){
        res.status(500).json({mssg:"server error couldn't delete the book",err})
    }
}