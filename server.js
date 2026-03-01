// server.js
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 10000;

// -------------------- CORS --------------------
app.use(cors()); // allow all domains to call API

// -------------------- MongoDB URI --------------------
// Replace with your actual username/password/DB name
const uri ="mongodb+srv://CyberAkhil:Cyberakhil027%40gmail.com@cluster0.mongodb.net/myDB?retryWrites=true&w=majority";

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

connectDB();

// -------------------- API Key --------------------
const API_KEY = "Cyberakhil027@gmail.com86309615707505460548";

// Middleware to check API key
function checkApiKey(req, res, next) {
    const key = req.header("x-api-key");
    if (key && key === API_KEY) {
        next(); // correct key → allow
    } else {
        // Browser direct access allowed
        if (!req.headers["x-api-key"]) {
            return res.json({ status:"SUCCESS", message:"API Working Perfectly (Browser access)" });
        }
        res.status(401).json({ status: "FAILED", message: "Invalid API Key" });
    }
}

// -------------------- Routes --------------------

// Secure endpoint
app.get('/api/web', checkApiKey, (req, res) => {
    res.json({ status: "SUCCESS", message: "API Working Perfectly" });
});

// Optional extra endpoint
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
