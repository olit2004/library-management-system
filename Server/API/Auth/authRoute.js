import express from "express";
import {registerMember} from "./authController.js"

const route =express.Router()


route.post("/registerMember", registerMember);

route.post("/login", loginUser);




















export default  route;
