import {fetchUser,patchUser} from "./userService.js"



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

