import express from "express";
import cors from "cors";
import authRoute from"./API/Auth/authRoute.js"; 
import cookieParser from "cookie-parser";
const app = express();
import { requireAuth } from "./middleware/requireauth.js";
import userRoute from "./API/User/userRoute.js"
import bookRoute from "./API/book/bookRoute.js"


//middlewares 

app.use(express.json());
app.use(cookieParser())



app.listen(3000,(req,res)=>{
    console.log("listening to port number 3000")
})


app.get("/",requireAuth,(req,res)=>{
    console.log("the first request is here")
    const  role=req.user.role
    res.status(200).json({mssg:`hello this  lms running welcome to the site ${role}`})})
 app.use(authRoute);
 app.use(userRoute);
 app.use(bookRoute);