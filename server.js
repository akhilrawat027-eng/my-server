const express = require("express");
const app = express();

// Root route
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Akhil Server Online 🚀"
  });
});

// Example API route
app.get("/api/user", (req, res) => {
  res.json({
    name: "Akhil",
    age: 17,
    role: "Developer"
  });
});

app.listen(3000, () => {
  console.log("Server Running");
});
