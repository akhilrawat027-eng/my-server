// ===========================
// 🍃 MongoDB Connection
// ===========================
const { MongoClient } = require("mongodb");

// 🔑 Replace your password & cluster link here
const uri = "mongodb+srv://mongodb+srv://Cyberakhil:Cyberakhil027@gmail.com86309615707505460548@cluster0.g4qkm9d.mongodb.net/?appName=Cluster0

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.log("❌ DB Connection Error:", err);
  }
}

// Connect to Database immediately
connectDB();

// ===========================
// 🚀 Express Server + API
// ===========================
const express = require("express");
const app = express();

// ---------------------------
// 🔑 Secure API Key
// ---------------------------
const API_KEY = "Cyberakhil027@gmail.com86309615707505460548";

app.get("/api/web", (req, res) => {
  const providedKey = req.headers["x-api-key"];

  if (!providedKey) {
    return res.status(400).json({ error: "API Key required ❌ (Send in headers)" });
  }

  if (providedKey !== API_KEY) {
    return res.status(401).json({ error: "Invalid API Key ❌" });
  }

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
