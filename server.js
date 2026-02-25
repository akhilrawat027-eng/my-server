const express = require("express");
const app = express();

app.get("/", (req,res)=>{
  res.send("Akhil Server Online 🚀");
});

app.listen(3000,()=>{
  console.log("Server Running");
});
