// server.js
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 10000;

// MongoDB URI (with encoded password)
const uri = "mongodb+srv://Cyberakhil:cyberakhil027%40gmail.com@cluster0.g4qkm9d.mongodb.net/?appName=Cluster0

async function connectDB() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log("✅ MongoDB Connected Successfully");
        return client.db("myDB"); // database select
    } catch (err) {
        console.error("MongoDB connection failed:", err);
        process.exit(1); // crash server if DB fail
    }
}

connectDB();

app.get('/api/web', (req, res) => {
    res.json({ status: "SUCCESS", message: "API Working Perfectly" });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
