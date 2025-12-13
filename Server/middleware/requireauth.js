import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

const secret = process.env.access_secret

export function requireAuth (req,res ,next){
   const access_token = req.cookies.token;
   
   if (!access_token){
    return res.status(401).json({mssg:"not authorized"})
   }

   try{
       const decoded = jwt.verify(access_token,secret)
       req.user=decoded;
       next()

   }catch(err){
    return res.status(401).json({mssg:" not authorized "})
   }

}