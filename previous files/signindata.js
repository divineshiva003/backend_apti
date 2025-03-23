const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const express=require("express");
const app=express();
 const connect=mongoose.connect(`mongodb+srv://raishivamin2k3:6rDJtLwpAYCEHaCg@cluster0.fwd0z.mongodb.net/testDB`,{
   useNewUrlParser: true,
   useUnifiedTopology: true,
 });
 connect.then(()=>{
    console.log("connect");
 })
 .catch(()=>{
    console.log("not");
 });
 const loginschema=new mongoose.Schema({
    name:{
        type:String,
    },
    password:{
        type:String,
    },
    confirm:{
      type:String,

    }

 });

 const Registration = mongoose.model("Registration",loginschema);

 app.use(bodyParser.urlencoded({extended:true}));
 app.use(bodyParser.json());

 module.exports=Registration;