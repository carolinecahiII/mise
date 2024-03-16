const mysql = require('mysql');

// Database connection configuration
const dbConfig = {
  host: 'localhost', 
  user: 'root',
  password: 'toroymoi',
  database: 'social', 
};

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('An error occurred while connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL server.');
});

module.exports = connection;


// use for connecting database

//const connection = require('./database'); // Adjust the path as necessary

// Example query
//connection.query('SELECT * FROM your_table_name', (err, results) => {
 // if (err) throw err;
  //console.log('Results: ', results);
// });
//