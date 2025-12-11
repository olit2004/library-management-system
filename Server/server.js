import express from "express";
import cors from "cors";
import route from"./API/Auth/authRoute.js"; 

const app = express();

app.use(express.json());
app.listen(3000,(req,res)=>{
    console.log("listening to port number 3000")
})

app.use(authRoute);