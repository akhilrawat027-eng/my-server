const express = require("express");
const app = express();

const API_KEY = "af86a4cbffdf7aa0eea013d025a0f92f";

app.get("/api/web", (req, res) => {

  const key = req.query.key;

  if (key !== API_KEY) {
    return res.json({
      error: "Invalid API Key ❌"
    });
  }

  res.json({
    status: "SUCCESS ✅",
    message: "API Working Perfectly 🚀"
  });

});

app.listen(3000, () => {
  console.log("Server running...");
});
