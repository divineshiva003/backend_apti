const express=require("express");
const path=require("path");
const bcrypt=require("bcrypt");
const app=express();
const collection=require("./signindata");
const { parseArgs } = require("util");
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render("login.ejs");
});

app.get("/signup",(req,res)=>{
    res.render("signup.ejs");
});

app.post("/signup",async(req,res)=>{
    const data={
        name:req.body.username,
        password:req.body.password,
        confirm:req.body.ConfirmPassword
    }
    const existuser=await collection.findOne({name:data.name});
    if(existuser){
       res.redirect('http://127.0.0.1:5502/existuser.html');
    }
    else{
    const userdata=await collection.insertMany(data);
    console.log(userdata);
    res.redirect('http://localhost:8085/');
    }
})
app.post("/login",async(req,res)=>{
    let check=await collection.findOne({name:req.body.username});
    try{
        if(check.password===req.body.password){
            res.redirect("http://127.0.0.1:5502/index.html");
            
            console.log(check);
            console.log(req.body.password);
        }
        else{
            res.redirect('http://127.0.0.1:5502/loginprompt.html');
        }
    }
    catch(err){
        res.send(err);
        console.log(req.body.username);
        console.log(req.body.password);
    }
});

const port=8085;
app.listen(port,()=>{
    console.log("listen");
})