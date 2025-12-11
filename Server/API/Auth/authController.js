import { registerUser } from "./authService.js";

import bcrypt from "bcrypt";
import dotenv from"dotenv";

dotenv.config()
const saltRound = parseInt(process.env.saltRound);



// ---- function to handle regiset of the user object 

export async function registerMember(req,res){
    const {email, password , first_name,last_name,address, avatar_url, phone, membership_id} =req.body;
    try{
      // check if the neccassyary dat ais provided

          if (!email||!password||!first_name){
            return res.status(400).json({mssg:"email, password and first name is required"})

    }
      // check bcrypt hashing 
    const salt = await bcrypt.genSalt(saltRound);
    const hashed_password = await  bcrypt.hash(password,salt);
    
    const user= await registerUser({
        email, 
        password:hashed_password, 
        first_name,
        role:"MEMEBER",
        last_name,
        address,
        avatar_url, 
        phone, 
        membership_id})
    res.status(201).json(user)
      
  }catch(err){
    console.log("ERROR: couldn't reagister the user",err.message)
    res.status(500).json({mssg:"Server error couldn't register the user"});
}
}