const express = require("express");
const app = express();

const API_KEY = "af86a4cbffdf7aa0eea013d025a0f92f";

// ✅ Homepage (important)
app.get("/", (req, res) => {
  res.send("🚀 Akhil Server Live Successfully");
});

// ✅ API Route
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

// ✅ Server Start (always last)
app.listen(3000, () => {
  console.log("Server running...");
});
