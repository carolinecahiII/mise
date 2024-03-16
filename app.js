// Require the express module
const express = require('express');
const bcrypt = require('bcrypt'); // Include bcrypt for password hashing
const connection = mysql.createConnection(dbConfig);

// Create an Express application
const app = express();

// Define a port number
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Registration endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    connection.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      (err, results) => {
        if (err) {
          console.error('Failed to insert new user:', err);
          return res.status(500).send('An error occurred');
        }
        res.status(201).send('User registered successfully');
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Make the application listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

