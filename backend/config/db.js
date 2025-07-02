const { connect } = require('http2');
const mongoose=require('mongoose');

const mydb=async()=>{
    await mongoose.connect(process.env.db_url);
    console.log('DataBase is connect');


}
module.exports=mydb;