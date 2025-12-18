import { registerUser,loginUser } from "./authService.js";
import { setToken,removeToken } from "../../lib/jwt.js";
import jwt from "jsonwebtoken"

import bcrypt from "bcrypt";
import dotenv from"dotenv";
import { checkUser } from "../User/userService.js";

dotenv.config()
const saltRound = parseInt(process.env.saltRound);
const refresh_secret = process.env.refresh_secret


// ---- function to handle regiset of the user object 

export async function registerMember(req,res){
    const {email, password , first_name,last_name,address, avatar_url, phone} =req.body;
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
        role:"MEMBER",
        last_name,
        address,
        avatar_url, 
        phone})
    res.status(201).json(user)
      
  }catch(err){
    console.log("ERROR: couldn't reagister the user",err.message)
    res.status(500).json({mssg:"Server error couldn't register the user"});
}
}



// login controller 
export async function loginuser (req,res){
    const {email, password}= req.body;
    try {
      if (!email ||!password){
        new Error ("Both email and password is required");
      }
      const user = await loginUser({email,password});
      const payload={ id:user.id,role:user.role};
      setToken(res,payload)
      
      res.status(200).json({mssg:`${user.role} logged in `})
      
    }catch(err){
      console.log("ERROR:  couldn't log you in ",err)
      res.status(401).json({mssg:err.message})
    }
}



export function handleRefresh (req,res){
  
  const refresh_token = req.cookies.rft 
  try{
    if (!refresh_token){
      res.status(400).json({mssg:" no refersh token provideds"})
    }
    const decoded = jwt.verify(refresh_token,refresh_secret);
    const  payload ={
      id :decoded.id,
      role:decoded.role
    }
    setToken(res,payload);
    res.status(200).json({mssg:"token refereshed"});
}catch(err){

  console.log(" ERROR: couldn't refersh token ",err);
  res.status(400).jon({mssg:"server error  couldn't reffresh token"})
}
}


export function handleLogout(req,res){
  try{
    removeToken(res)
    res.status(200).json({mssg:"loged out successfully"})

  }catch(err){
    console.log("ERROR: couldn't logout ",err)
    res.status(400).json({err})
  }

}



export async function registerLibrarian(req, res) {
  const { email, password, first_name, last_name, address, avatar_url, phone } = req.body;

  try {
    const userId = req.user.id;
    const user = await checkUser(userId)

  // only admins are allowed tp add libraians 
  
    if (req.user.role !== "ADMIN"|| user.role!="ADMIN") {
      return res.status(403).json({ mssg: "Only admins can add librarians" });
    }

    if (!email || !password || !first_name) {
      return res.status(400).json({ mssg: "email, password and first name is required" });
    }

    const salt = await bcrypt.genSalt(saltRound);
    const hashed_password = await bcrypt.hash(password, salt);

    const librarian = await registerUser({
      email,
      password: hashed_password,
      first_name,
      role: "LIBRARIAN",
      last_name,
      address,
      avatar_url,
      phone,
    });

    res.status(201).json(librarian);
  } catch (err) {
    console.log("ERROR: couldn't register the librarian", err.message);
    res.status(500).json({ mssg: "Server error couldn't register the librarian" });
  }
}

