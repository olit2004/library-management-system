import express from "express";
import {registerMember,loginuser,handleRefresh,handleLogout} from "./authController.js"

const route =express.Router()


route.post("/registerMember", registerMember);
route.post("/login", loginuser);
route.get("/refresh",handleRefresh)
route.get("/logout",handleLogout)




















export default  route;
