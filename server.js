// server.js
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 10000;

// -------------------- MongoDB URI --------------------
// Tumhara actual username/password/DB name
// Special characters in username/password properly URL encoded
const uri = "mongodb+srv://Cyberakhil027%40gmail.com:@cluster0.g4qkm9d.mongodb.net/myDB?retryWrites=true&w=majority";

async function connectDB() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log("✅ MongoDB Connected Successfully");
        return client.db("myDB");
    } catch (err) {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    }
}

// Connect DB immediately
connectDB();

// -------------------- API Key --------------------
const API_KEY = "Cyberakhil027@gmail.com86309615707505460548";

// Middleware to check API key
function checkApiKey(req, res, next) {
    const key = req.header("x-api-key");
    if (key && key === API_KEY) {
        next(); // correct key → allow
    } else {
        res.status(401).json({ status: "FAILED", message: "Invalid API Key" });
    }
}

// -------------------- Routes --------------------

// Secure endpoint: /api/web
app.get('/api/web', checkApiKey, (req, res) => {
    res.json({ status: "SUCCESS", message: "API Working Perfectly" });
});

// Secure endpoint: /api/hello
app.get('/api/hello', checkApiKey, (req, res) => {
    res.json({ status: "SUCCESS", message: "Hello from API!" });
});

// Base route
app.get('/', (req, res) => {
    res.send("Server is running. Use /api/web or /api/hello with x-api-key");
});

// -------------------- Start server --------------------
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
