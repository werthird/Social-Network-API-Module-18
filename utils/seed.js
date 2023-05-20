const db = require('../config/connection');
const { User, Thought } = require('../models');
// Import the usernames and emails from the data
const { usernames, emails, thought } = require('./data');

db.once('open', async () => {
  console.log('connected to db');

  // Delete any existing users
  await User.deleteMany({});
  // Delete any existing thoughts
  await Thought.deleteMany({});


  // Create empty array to hold users
  const users = [];
  // Foreach username, build an object with username and email, and send it into the users array
  usernames.forEach((username, index) => {
    users.push(
      {
        username: username,
        email: emails[index],
      },
    );
  });
  // Add users to db
  await User.collection.insertMany(users);


  // Create empty array to hold thoughts
  const thoughts = [];
  // Foreach username, build an object with username and email, and send it into the users array
  thought.forEach((thought, index) => {
    thoughts.push(
      {
        thoughtText: thought,
        username: usernames[index],
      },
    );
  });
  // Add thoughts to db
  await Thought.collection.insertMany(thoughts);

  console.log(users);
  console.log('Seeding complete 🌱');
  process.exit(0);
});