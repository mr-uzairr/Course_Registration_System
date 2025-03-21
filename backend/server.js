require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");
const adminRoutes = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Serve Static Files
app.use("/public", express.static(path.join(__dirname, "public")));

// Database Connection
mongoose
    .connect(process.env.MONGO_URI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        tlsAllowInvalidCertificates: true // Allows connecting without strict SSL
    })
    .then(() => console.log(" MongoDB Connected"))
    .catch((err) => console.error(" Database Connection Failed", err));

// Routes
app.use("/auth", authRoutes);
app.use("/student", studentRoutes);
app.use("/admin", adminRoutes);

// Render Views
app.get("/", (req, res) => res.render("index"));
app.get("/student", (req, res) => res.render("student"));
app.get("/admin", (req, res) => res.render("admin"));

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
