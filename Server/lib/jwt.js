import jwt from "jsonwebtoken";
import  dotenv from "dotenv";

dotenv.config()


const access_secret = process.env.access_secret
const refresh_secret=process.env.refresh_secret

if (!access_secret || !refresh_secret) {
  throw new Error("JWT secrets are missing in environment variables");
}


// creating and setting jwt access token 
export function setToken(res, payload){
   const accessToken =jwt.sign(payload,access_secret,{expiresIn:"15m"})
   res.cookie("token",accessToken,{
    httpOnly:true,
    maxAge: 15*60*1000,
    secure: process.env.NODE_ENV === "production",
   })
   const refreshToken = jwt.sign(payload,refresh_secret,{expiresIn:"7d"});
   res.cookie("rft",refreshToken,{
    httpOnly:true,
    maxAge:7*24*60*60*1000,
    secure: process.env.NODE_ENV === "production",
   } )
}


// function to remove the cookies 

export function  removeToken(res){
    res.cookie("token","",{
    httpOnly:true,
    maxAge: 1,
    secure: process.env.NODE_ENV === "production",
   })
    res.cookie("rft","",{
    httpOnly:true,
    maxAge:1,
    secure: process.env.NODE_ENV === "production",
   } )

}
