//server.js
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

// Define Mongoose Schemas

const foodItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  isVeg: Boolean,
  serves: Number,
  consumeWithin: Number,
});

const donorSchema = new mongoose.Schema({
  name: String,
  contact: String,
  address: String,
  foodItems: [foodItemSchema], // Array of food items donated
});

const Donor = mongoose.model("Donor", donorSchema);

// Get all donations
app.get("/food", async (req, res) => {
  try {
    const donations = await Donor.find();
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new donation
app.post("/food", async (req, res) => {
    try {
      console.log("Received Data:", req.body); // Log incoming request
  
      const { donorInfo, foodItems } = req.body;
  
      // Validate request body
      if (!donorInfo || !donorInfo.name || !donorInfo.contact || !donorInfo.address || !foodItems || !foodItems.length) {
        return res.status(400).json({ error: "Invalid donation details" });
      }
  
      // Create and save new donation
      const newDonation = new Donor({
        name: donorInfo.name,
        contact: donorInfo.contact,
        address: donorInfo.address,
        foodItems: foodItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          isVeg: item.isVeg,
          serves: item.serves,
          consumeWithin: item.consumeWithin,
        })),
      });
  
      const savedDonation = await newDonation.save();
      res.status(201).json(savedDonation);
    } catch (error) {
      console.error("Error saving donation:", error); // Log error details
      res.status(500).json({ error: "Error saving donation" });
    }
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});