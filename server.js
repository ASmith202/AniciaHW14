const express = require("express");
const { connectDB } = require("./db"); // Import the connectDB function
const PORT = 3000;
const mongoose = require("mongoose");
const Shoe = require("./model/Shoe");

const app = express();
app.use(express.json());

// GET route to access all shoes
app.get("/shoes", async (req, res) => {
  try {
    const shoes = await Shoe.find(); // Fetch all shoes from the database
    res.status(200).json(shoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST route to add a new shoe type
app.post("/shoe", async (req, res) => {
  try {
    const { type, color } = req.body; // Extract type and color from the request body
    const newShoe = new Shoe({ type, color }); // Create a new shoe object
    await newShoe.save(); // Save the shoe to the database
    res.status(201).json(newShoe); // Respond with the created shoe
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT route to update a shoe by id
app.put("/shoe/:id", async (req, res) => {
  try {
    const { type, color } = req.body; // Extract type and color from request body
    const updatedShoe = await Shoe.findByIdAndUpdate(
      req.params.id, // Use the shoe id from the URL
      { type, color }, // Update the type and color
      { new: true } // Return the updated document
    );

    if (!updatedShoe) {
      return res.status(404).json({ message: "Shoe not found" });
    }

    res.status(200).json(updatedShoe); // Respond with the updated shoe
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE route to remove a shoe by id
app.delete("/shoe/:id", async (req, res) => {
  try {
    const deletedShoe = await Shoe.findByIdAndDelete(req.params.id); // Delete the shoe by id

    if (!deletedShoe) {
      return res.status(404).json({ message: "Shoe not found" });
    }

    res.status(200).json({ message: "Shoe deleted successfully" }); // Confirm the deletion
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the API and connect to the database
async function startAPI() {
  try {
    await connectDB(); // Wait for DB connection
    app.listen(PORT, () => {
      console.log(`Express server running at http://localhost:${PORT}`); // Start server after DB connection
    });
  } catch (error) {
    console.log("Error starting the server:", error.message); // Handle errors
  }
}

startAPI(); // Call the startAPI function to start the server