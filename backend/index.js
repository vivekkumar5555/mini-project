const express=require('express');
const server =express();
const dotenv=require('dotenv');
const mydb = require('./config/db');
const cors=require('cors')
const router = require('./Routes/PostRouter');
dotenv.config();
server.use(express.json());
server.use(cors())
console.log(process.env.PORT);
const Port=process.env.PORT||3000;
server.use('/api',router)
server.listen(Port,async()=>{
await mydb();
console.log("server is connected successfully",Port);

})