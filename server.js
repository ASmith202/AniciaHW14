const express = require("express");
const connectDB = require("./db")
const PORT = 3000;
const mongoose = require("mongoose");
const Shoe = require("./models/shoe"); // Import the Shoe model

const app = express();
app.use(express.json());
connectDB();

// GET route to access shoes
app.get("/shoes", async (req, res) => {
  try {
    const shoes = await Shoe.find();
    res.status(200).json(shoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST route to add a new shoe type
app.post("/shoe", async (req, res) => {
  try {
    const { type, color } = req.body;
    const newShoe = new Shoe({ type, color });
    await newShoe.save();
    res.status(201).json(newShoe); // Respond with the created shoe
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


  // PUT route to update a shoe by id
app.put("/shoe/:id", async (req, res) => {
  try {
    const { type, color } = req.body;
    const updatedShoe = await Shoe.findByIdAndUpdate(
      req.params.id,
      { type, color },
      { new: true }
    );

    if (!updatedShoe) {
      return res.status(404).json({ message: "Shoe not found" });
    }

    res.status(200).json(updatedShoe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE route to remove a shoe by id
app.delete("/shoe/:id", async (req, res) => {
  try {
    const deletedShoe = await Shoe.findByIdAndDelete(req.params.id);

    if (!deletedShoe) {
      return res.status(404).json({ message: "Shoe not found" });
    }

    res.status(200).json({ message: "Shoe deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


async function startAPI() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Express server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error)
    }
}

startAPI();
