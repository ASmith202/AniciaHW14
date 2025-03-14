require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');

// Get the MongoDB URI from environment variables
const uri = process.env.MONGO_URI;

async function connectDB() {
  try {
    // Connect to MongoDB without using deprecated options
    await mongoose.connect(uri);

    // Ping the database to confirm the connection
    await mongoose.connection.db.admin().command({ ping: 1 });

    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (error) {
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