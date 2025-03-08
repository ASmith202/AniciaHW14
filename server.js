const express = require("express");
const connectDB = require("./db")
const PORT = 3000;

const app = express();
app.use(express.json());


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
