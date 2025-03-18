const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/foodDonation", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Mongoose Schema
const foodSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  location: String,
  donor: String,
  expiry: String,
});

const Food = mongoose.model("Food", foodSchema);

// Get all food items
app.get("/food", async (req, res) => {
  try {
    const foodItems = await Food.find();
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new food item
app.post("/food", async (req, res) => {
  const { name, quantity, location, donor, expiry } = req.body;
  if (!name || !quantity || !location || !donor || !expiry) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const foodItem = new Food({ name, quantity, location, donor, expiry });
    await foodItem.save();
    res.status(201).json(foodItem);
  } catch (error) {
    res.status(500).json({ error: "Error saving food item" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
