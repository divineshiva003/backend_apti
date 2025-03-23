const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = process.env.PORT || 3000;

const connect = mongoose.connect(`mongodb+srv://raishivamin2k3:6rDJtLwpAYCEHaCg@cluster0.fwd0z.mongodb.net/testDB`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const registrationSchema = new mongoose.Schema({
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

const collection = mongoose.model("Registration",registrationSchema);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.render("login.ejs");
})

app.get("/signup",(req,res)=>{
    res.render("signup.ejs");
});

// app.post("/register",async (req,res)=>{
//     try {
//         const {name, email, password} = req.body;

//         const existingUser = await Registration.findOne({email : email});
//         if(!existingUser){
//             const registrationData = new Registration({
//                 name,
//                 email,
//                 password
//             });
//             await registrationData.save();
//             res.redirect("/success");
//         }
//         else{
//             console.log("User already exist");
//             res.redirect("/error");
//         }
//     }
//         catch (error){
//             console.log(error);
//             res.redirect("/error");
//         }
// })

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

app.get("/success", (req,res)=>{
    res.sendFile(__dirname + "/pages/success.html");
})

app.get("/error", (req,res)=>{
    res.sendFile(__dirname + "/pages/error.html");
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})