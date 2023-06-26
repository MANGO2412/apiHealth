import express from "express";
import 'dotenv/config';
import DB from "./db.js";
import cors from 'cors';

const app=express();
app.use(cors())

//db class 
let mongo=new DB(process.env.MONGOSH,"mongodb+srv://manuel:lima123@cluster0.ny3z4us.mongodb.net/?retryWrites=true&w=majority") 


app.get('/',(req,res)=>{
   console.log(process.env)
   res.send("hello world")
})


app.get('/movie',async (req,res)=>{
    try {
        const result = await mongo.get('Movie');
        res.send(result).status(200);
      } catch (error) {
        console.error('Error retrieving data:', error);
        res.sendStatus(500);
      }
})

export default  app;