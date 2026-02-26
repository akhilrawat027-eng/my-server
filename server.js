const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.json());

let users = [];

/* REGISTER API */
app.post("/api/register",(req,res)=>{

  const username = req.body.username;

  if(!username){
    return res.json({error:"Username required"});
  }

  const apiKey = crypto.randomBytes(16).toString("hex");

  users.push({
    username,
    apiKey
  });

  res.json({
    message:"User Registered ✅",
    apiKey: apiKey
  });
});

/* PRIVATE API */
app.get("/api/web",(req,res)=>{

  const key = req.query.key;

  const user = users.find(u=>u.apiKey === key);

  if(!user){
    return res.json({error:"Invalid API Key ❌"});
  }

  res.json({
    owner:user.username,
    message:"Akhil Secure API Working 🚀"
  });
});

app.listen(3000,()=>{
 console.log("PRO API SYSTEM RUNNING 🔥");
});
