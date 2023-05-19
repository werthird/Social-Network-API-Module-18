// Imports
const { connect, connection } = require('mongoose');

// Connection to database with either heroku or mongodb
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetworkDB';

// Start the connection using the provided database
connect(connectionString);

// exports
module.exports = connection;