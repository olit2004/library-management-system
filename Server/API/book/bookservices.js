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
            include :{
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

//  adding specifc book


export async function createBook(data){
    const { isbn ,title ,description, coverImageUrl,totalCopies ,publishedYear ,authorFirstName,authorLastName }= data ;
    if (!isbn||!title||!description||!publishedYear||!authorFirstName||!authorLastName){
       throw new Error ("some detail abou the book is missing please make sure you give the detaied in formmation")
    }
    return prisma.$transaction(async (tx)=>{

        // check if the book already exist 

        const existingBook = await  tx.book.findUnique({where:{isbn}})
        if (existingBook){
            throw new Error ("book  already exists  ");

        }
        // check if the aouthor already exist
      
       let author = await tx.author.findFirst({
            where:{
                first_name:authorFirstName,
                last_name:authorLastName,
            }
        })
       
        if (!author){
                   //create author 
       author= await tx.author.create({data:
            {
                                                first_name:authorFirstName,
                                                last_name:authorLastName,
            }}) 


        }
         
 

        // create the book 
        const  book = await tx.book.create({
            data:{
                isbn,
                title,
                description,
                published_year:publishedYear,
                cover_image_url:coverImageUrl,
                total_copies:totalCopies||1,
                available_copies:totalCopies||1,
                author_id:author.id
            }
        })

        return book;


    })

}

export async function editBook(data) {
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
  } = data;

  if (
    !isbn ||
    (!title &&!description &&!coverImageUrl &&!totalCopies &&!publishedYear &&!authorFirstName &&!authorLastName &&!newIsbn)
  ) {
    throw new Error(
      "You need to provide the current ISBN and at least one field to be updated"
    );
  }

  return prisma.$transaction(async (tx) => {
    // Find the book by current isbn
    const book = await tx.book.findUnique({
      where: { isbn },
    });

    if (!book) {
      throw new Error(`Book with ISBN ${isbn} not found`);
    }

    let authorId = book.author_id;

    // check and update if the author is need to be updated 
    
    if (authorFirstName || authorLastName) {
      const existingAuthor = await tx.author.findFirst({
        where: {
          first_name: authorFirstName ?? undefined,
          last_name: authorLastName ?? undefined,
        },
      });

      if (existingAuthor) {
        authorId = existingAuthor.id;
      } else {
        const newAuthor = await tx.author.create({
          data: {
            first_name: authorFirstName ?? "",
            last_name: authorLastName ?? "",
          },
        });
        authorId = newAuthor.id;
      }
    }

    // Update using primary key (id),
    const updatedBook = await tx.book.update({
      where: { id: book.id },
      data: {
        isbn: newIsbn ?? book.isbn,
        title: title ?? book.title,
        description: description ?? book.description,
        cover_image_url: coverImageUrl ?? book.cover_image_url,
        published_year: publishedYear ?? book.published_year,
        total_copies: totalCopies ?? book.total_copies,
        author_id: authorId,
      },
    });
    return updatedBook;
  });
}


export async  function removeBook(id) {
    const book = await prisma.book.delete({
      where: { id },
    });
    return book;
 }
