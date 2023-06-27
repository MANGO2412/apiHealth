import express from "express";
import 'dotenv/config';
import DB from "./db.js";
import cors from 'cors';
import routes from './routes/index.js'

//configuration
const app=express();
app.use(cors())
app.use(routes)

let mongo=new DB(process.env.MONGOSH,process.env.ATLAS) 


//page to welcome api
app.get('/',(req,res)=>{
   res.send("hello world")
})


// app.get('/movie',async (req,res)=>{
//     try {
//         const result = await mongo.get('Movie');
//         res.send(result).status(200);
//       } catch (error) {
//         console.error('Error retrieving data:', error);
//         res.sendStatus(500);
//       }
// })

export default  app;