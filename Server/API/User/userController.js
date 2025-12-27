import {checkUser, fetchUser,patchUser,getAllUsers,getUserById,deleteUser,getReservations} from "./userService.js"



export async function librarianOnly(req) {
  if (!req.user) {
    throw new Error("Authentication required");
  }
  
  if (req.user.role !== "LIBRARIAN" && req.user.role !== "ADMIN") {
    throw new Error("Access denied: Librarian privileges required");
  }
  return req.user;
}

// get user profile data 




export async function handleMe (req,res){
    try{

      if(! req.user){
        res.status(401).json({mssg:"not Uthorized"})
      }
      const user =await fetchUser(req.user.id); 
      res.status(200).json(user)
    }catch(err){
        console.log("ERROR : couldn't fetch user",err);
        res.status(400).json(err)
    }
}



//  update user profile 



export async  function updateProfile (req,res){
    const {avatar_url,phone} =req.body;
    try{
      if(! req.user){
        res.status(401).json({mssg:"not authorized"})
      }
      const  user = await patchUser({id:req.user.id,avatar_url,phone})
      res.status(200).json({mssg:"successfully updated users profile a"})


    }catch(err){
        console.log("ERROR: couldn't update yser profile",err)
        res.status(500).json(err)
    }  
}




// controllers userController.js
















export async function listUsers(req, res) {
  try {
    
    await librarianOnly(req);

   
    const { page = 1, limit = 10 } = req.query;


    const result = await getAllUsers(page, limit);


    return res.status(200).json(result);

  } catch (err) {
    console.error("ListUsers Error:", err);

 
    const isAuthError = err.message.includes("denied") || err.message.includes("required");
    
    return res.status(isAuthError ? 403 : 500).json({ 
      error: err.message || "Failed to retrieve users" 
    });
  }
}

export async  function  getUser(req, res) {
    try {
      const usr = await librarianOnly(req)
      if(!usr){
        return  res.status.message({mssg:"not authorized "})
      } 
      const user = await getUserById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

export async  function  deactivateUser(req, res) {
    try {
         const usr = await librarianOnly(req)
      if(!usr){
        return  res.status.message({mssg:"not authorized "})
      } 
      const user = await deleteUser(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deactivated', user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }



export async function getUserReservations(req, res) {
    try {
      const user = await librarianOnly(req)
      if(!user){
        return  res.status.message({mssg:"not authorized "})
      } 
      const reservations = await getReservations(req.params.id);
      res.json(reservations);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}


