require("dotenv").config();
const express = require("express");
const cors = require("cors");

const carRoutes = require("./routes/carRoutes");

const app = express();
app.use(cors());
app.use(express.json()); // Enable JSON parsing
app.use("/api", carRoutes); // Mount routes under /api

// ✅ Add this default route to prevent "Cannot GET /" error
app.get("/", (req, res) => {
  res.send("✅ Server is running! Welcome to the Car API.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
