import prisma from "../../lib/prisma.js"


// fecth books in buch using pagination
export async function  fetchBooks (page=1,limit=15){
    try{

        const skip = (page-1)*limit;
        
        const books= await prisma.book.findMany({
            skip,
            take:limit,
            orderBy: { created_at: "desc"} 
        });
        
        return books

    }catch(err){
        console.log("here is the problem ",err)
        throw err;
    }
} 

// fecth deatill of specific book 

export async function fetchBook (id){
    try{
        if (!id){
            throw new Error ("id is required");
        }
        const book = await prisma.book.findUnique({
            where:{id},
            includes:{
                author:true
            }
        })
         if (!book){
            throw new Error (" the boook doesn't exist ");
         }
         return book;
    }
    catch(err){
        throw err

    }
}