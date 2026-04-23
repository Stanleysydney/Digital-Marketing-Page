require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  interest: { type: String },
  createdAt: { type: Date, default: Date.now },
});
const Lead = mongoose.model("Lead", leadSchema);

app.get("/", (req, res) => res.json({ message: "Digital Marketing API running!" }));

app.post("/api/leads", async (req, res) => {
  try {
    const { name, email, phone, interest } = req.body;
    if (!name || !email) return res.status(400).json({ error: "Name and email are required." });
    const lead = new Lead({ name, email, phone, interest });
    await lead.save();
    res.status(201).json({ success: true, message: "Thank you! We'll be in touch soon." });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: "Email already registered." });
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

app.get("/api/leads", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/digitalmarketing";
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
    app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT} (no DB)`));
  });