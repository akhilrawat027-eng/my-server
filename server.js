const app = express();
const port = process.env.PORT || 10000;

// -------------------- CORS --------------------
app.use(cors()); // ✅ allow all origins for browser/testing

// -------------------- MongoDB --------------------
// Replace username/password/DB name with your own
const uri = "mongodb+srv://Cyberakhil:cyberakhil027%40gmail.com@cluster0.g4qkm9d.mongodb.net/?appName=Cluster0";

let db;
async function connectDB() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log("✅ MongoDB Connected Successfully");
        db = client.db("myDB"); // store db instance for future use
    } catch (err) {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    }
}

connectDB();

// -------------------- API Key --------------------
const API_KEY = "Cyberakhil027@gmail.com86309615707505460548";

// Middleware: Check API Key
function checkApiKey(req, res, next) {
    const key = req.header("x-api-key");
    if (key && key === API_KEY) {
        next(); // correct key
    } else {
        // Browser direct access allowed without key
        if (!req.headers["x-api-key"]) {
            return res.json({ status: "SUCCESS", message: "API Working Perfectly (Browser access)" });
        }
        return res.status(401).json({ status: "FAILED", message: "Invalid API Key" });
    }
}

// -------------------- API Routes --------------------

// Example secure endpoint: /api/web
app.get('/api/web', checkApiKey, (req, res) => {
    res.json({ status: "SUCCESS", message: "API Working Perfectly" });
});

// Example extra endpoint: /api/hello
app.get('/api/hello', checkApiKey, (req, res) => {
    res.json({ status: "SUCCESS", message: "Hello from API!" });
});

// Example: database data fetch
app.get('/api/users', checkApiKey, async (req, res) => {
    try {
        const users = await db.collection('users').find({}).toArray(); // future collection
        res.json({ status: "SUCCESS", data: users });
    } catch (err) {
        res.status(500).json({ status: "FAILED", message: err.message });
    }
});

// Base route
app.get('/', (req, res) => {
    res.send("Server is running. Use /api/web or /api/hello with x-api-key");
});

// -------------------- Start server --------------------
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
