require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');

// Get the MongoDB URI from environment variables
const uri = process.env.MONGO_URI;

// Define client options (can be expanded for other configurations)
const clientOptions = {
    useNewUrlParser: true, // Use the new URL string parser
    useUnifiedTopology: true, // Use the new topology engine
    serverApi: { version: '1', strict: true, deprecationErrors: true }, // Stable API version
};

async function connectDB() {
    try {
        // Try to connect to MongoDB using the provided URI and options
        await mongoose.connect(uri, clientOptions);

        // Ping the database to confirm the connection
        await mongoose.connection.db.admin().command({ ping: 1 });

        console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } catch (error) {
        // Log and handle connection errors
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the application if DB connection fails
    }
}

// Disconnect function in case you want to manually close the connection
async function disconnectDB() {
    try {
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error.message);
    }
}

module.exports = { connectDB, disconnectDB };