import {authorList,addAuthor,delAuthor} from "./authorService"


// handler  that returns list of the authors in data base 
export async function  handleAuthors(req,res){
    try {
     const  authors = await authorList();
     res.status(200).json(authors);
    }catch{
        res.status(500).json({mss:"server error couldn't  get list of authors "})
    }
}

// handler for getting info about individual author 

export async function  getAuthor(req,res){
    const { id } = req.params;

  try {
    const author = await  authorDetail(id)
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.json(author);
  } 
  catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch author details" });

}

}


// handle fro creating    author in the data base 

export  async function createAuthor  (req, res)  {
    const userId = req.user.id
    if (!req.user||!userId){
            return res.status(401).json({mssg:"not authorized"});
    }


  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({ error: "First name and last name are required" });
  }
  try {
       
        const user = await  checkUser(userId);
        if (!user||user.role!= "LIBRARIAN"){
            return res.status(401).json({mssg:"not authorized"});
        }
        const newAuthor = await addAuthor ({firstName,lastName})
        res.status(201).json(newAuthor);
        } catch (error) {
          
            res.status(500).json({ error: "Failed to create author" });
        }
}
;




export async function deleteAuthor (req, res) {
    const userId = req.user.id

    if (!req.user||!userId){
            return res.status(401).json({mssg:"not authorized"});
    }

  const { id } = req.params;
  try {
        const user = await  checkUser(userId);
        if (!user||user.role!= "LIBRARIAN"){
            return res.status(401).json({mssg:"not authorized"});
        }

    // Check if author has books
    const author = delAuthor (id)
    

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

   
    res.json({ message: "Author deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete author" ,error});
  }
}