const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

// MongoDB connection URI
const uri = "mongodb+srv://pradydevs:1kqHoUq5vu7DCUDb@custord.3lnuwjb.mongodb.net/custord";

// Connect to MongoDB using Mongoose
mongoose.connect(uri);

// Get the default connection
const db = mongoose.connection;

// Check for MongoDB connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Once connected, log a success message
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create a user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Create a User model based on the user schema
const User = mongoose.model('User', userSchema);

// Use body-parser middleware to parse POST request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to insert a new user
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Create a new user instance
    const newUser = new User({ username, password });

    // Save the new user to the database
    await newUser.save();

    res.send('User added successfully');
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
