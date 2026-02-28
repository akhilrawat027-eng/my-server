// server.js
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 10000;

// MongoDB URI with encoded @ in password
const uri = "mongodb+srv://Cyberakhil:cyberakhil027%40@cluster0.g4qkm9d.mongodb.net/myDB?retryWrites=true&w=majority";

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

// ✅ Middleware to check x-api-key
const API_KEY = "Cyberakhil027@gmail.com86309615707505460548";

function checkApiKey(req, res, next) {
    const key = req.header("x-api-key");
    if (key && key === API_KEY) {
        next(); // ✅ correct key
    } else {
        res.status(401).json({ status: "FAILED", message: "Invalid API Key" });
    }
}

// Secure route
app.get('/api/web', checkApiKey, (req, res) => {
    res.json({ status: "SUCCESS", message: "API Working Perfectly" });
});

// Extra route example
app.get('/api/hello', checkApiKey, (req, res) => {
    res.json({ status: "SUCCESS", message: "Hello from API!" });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
