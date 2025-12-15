import e from "express";
import prisma  from "../../lib/prisma.js";


export async function authorList(){
    const authors = await prisma.author.findMany()
    return authors
}

export async function authorDetail (id){
     const author =await prisma.author.findUnique({
                        where: { id: Number(id) },
                        include: { books: true } 
    });

    return author ;
};


//service to add service to the data base 

export async function  addAuthor(data){
    const {firstName,lastName} = data
    if (!firstName||!lastName){
        throw new Error ("first name and last name is required ");
    }
    const author =await  prisma.author.create({
      data: { first_name:firstName, last_name:lastName }
    });
    return author;
}

export async function delAuthor(id) {
  const author = await prisma.author.findUnique({
    where: { id: Number(id) },
    include: { books: true }
  });

  if (!author) {
    throw new Error("Author not found, cannot delete.");
  }

  if (author.books.length > 0) {
    throw new Error("Cannot delete author with existing books.");
  }

  const deletedAuthor = await prisma.author.delete({
    where: { id: Number(id) }
  });

  return deletedAuthor; 
}
