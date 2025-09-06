import express from "express";
import axios from "axios";
import path from "path";
import {fileURLToPath } from "url";

const app=express();
const port=3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
     res.render("index",{joke:null});
});

app.get("/getjoke",async(req,res)=>{
    try{
      const response=await  axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
     const joke = response.data.joke;
      res.render("index",{joke});
    }
    catch(error){
        console.error("Error In Fetching Joke",error.message);
        res.render("index", { joke: "Sorry! Couldn't fetch a joke." });
    }
});

app.listen(port,(req,res)=>{
   console.log(`Server is running on http://localhost:${port}`);
});