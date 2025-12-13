
import {fetchBooks,fetchBook} from "./bookservices.js"

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
    
    const id = req.params;
    if(!id){
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