import express from "express";
import 'dotenv/config';
import DB from "./db.js";
import cors from 'cors';
import routes from './routes/index.js'

//mqtt
import * as mqtt from 'mqtt'



//configuration
const app=express();
app.use(cors())
app.use(routes)
let mongo=new DB(process.env.MONGOSH,process.env.ATLAS)

//configurstion to mqtt client
let client=mqtt.connect('tcp://broker.hivemq.com'+':1883')
const topic="/UTT/0321101422/send/onevalue";

client.on('connect',()=>{
  console.log('connected')
  client.subscribe([topic],()=>{
    console.log(`Subscribe to topic ${topic}`)
  })
})

client.on('error', (error) => {
  console.error('connection failed', error)
})

//conection
client.on('message',(topic,payload)=>{
 console.log('Received Message',topic,payload.toString())
})


//page to welcome api
app.get('/',(req,res)=>{
   //connection
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