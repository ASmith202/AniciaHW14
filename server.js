const express = require("express");
const connectDB = require("./db")
const PORT = 3000;
const User = require("./userModel.js")
const app = express();
app.use(express.json());
app.post("/user", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: "Username already exists" });
        }
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})


app.get("/users", async (req, res) => {
    const users = await User.find()
    res.status(200).send(users)
})

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
