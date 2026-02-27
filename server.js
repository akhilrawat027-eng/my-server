// -----------------------------
// 🚀 Express Server + Secure API Key
// -----------------------------

const express = require("express");
const app = express();

// ===========================
// 🔑 API Key Setup (Server Only)
// ===========================

// Example ke liye maine ek strong key generate ki hai
// Tum isko apni marzi se change kar sakte ho
const API_KEY = "Cyberakhil027@gmail.com86309615707505460548";

// ===========================
// 🌐 API Route
// ===========================
app.get("/api/web", (req, res) => {
  // Header se key check karenge
  const providedKey = req.headers["x-api-key"];

  if (!providedKey) {
    return res.status(400).json({ error: "API Key required ❌ (Send in headers)" });
  }

  if (providedKey !== API_KEY) {
    return res.status(401).json({ error: "Invalid API Key ❌" });
  }

  // Success response
  res.json({
    status: "SUCCESS ✅",
    message: "API Working Perfectly 🚀"
  });
});

// ===========================
// ⚡ Server Start
// ===========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
  console.log(`Test your API with header: x-api-key: ${API_KEY}`);
});
