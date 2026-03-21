import express from "express";
import cors from "cors";
import authRoute from "./API/Auth/authRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
import { requireAuth } from "./middleware/requireauth.js";
import userRoute from "./API/User/userRoute.js"
import bookRoute from "./API/book/bookRoute.js"
import loanRoute from "./API/loan/loanRoute.js"
import reservationRoute from "./API/Reservation/reservationRoute.js"



app.use(express.json());
app.use(cookieParser())
app.use(cors(
    {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true
    }
));

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {

})



app.get("/", requireAuth, (req, res) => {

    const role = req.user.role
    res.status(200).json({ mssg: `hello this  lms running welcome to the site ${role}` })
})
app.use(authRoute);
app.use(userRoute);
app.use(bookRoute);
app.use(loanRoute);
app.use(reservationRoute)