import express from "express";
import {registerMember,loginuser,handleRefresh,handleLogout,registerLibrarian} from "./authController.js"
import { requireAuth } from "../../middleware/requireauth.js";
const route =express.Router()


route.post("/registerMember", registerMember);
route.post("/login", loginuser);
route.get("/refresh",handleRefresh)
route.get("/logout",handleLogout)

route.post("/registerLibrarian",requireAuth,registerLibrarian);























export default  route;
