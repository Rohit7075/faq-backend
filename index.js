const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./config/db");
const faqRoutes = require("./routes/faqRoutes");
const FAQ = require("./models/faqModels"); // Import model for admin panel

dotenv.config();
const app = express();

// Connect to MongoDB before starting the server
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // Add this to parse form data


// Set EJS as the template engine
app.set("view engine", "ejs");

// Set views directory
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS/JS)
// Serve static files
app.use(express.static("public"));

app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api", faqRoutes);

// Admin Panel Route
app.get("/admin", async (req, res) => {
    try {
        const faqs = await FAQ.find(); // Fetch FAQs from MongoDB
        res.render("admin", { faqs }); // Render admin.ejs
    } catch (error) {
        res.status(500).send("Error loading admin panel");
    }
});

// Default Route
app.get("/", (req, res) => res.send("Hello World!"));

// Start Server
// const PORT = process.env.PORT || 5000;
const PORT=3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
