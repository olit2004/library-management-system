import express from "express";
import {handleAuthors,getAuthor} from  "./authorController"


const route= express.Router();


route.get("/authors",handleAuthors);
route.get("/author",getAuthor)











export default route;
