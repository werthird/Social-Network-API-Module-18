const db = require('../config/connection');
const { User, Thought } = require('../models');
// Import the usernames and emails from the data
const { usernames, emails, thought } = require('./data');

db.once('open', async () => {
  console.log('connected to db');


  // Clear any existing data
  await User.deleteMany({});
  await Thought.deleteMany({});


  // Create empty array
  const userData = [];
  const thoughtData = [];


  // Populate arrays with data
  thought.forEach((thoughtText, index) => {
    thoughtData.push({ 
      thoughtText: thoughtText, 
      username: usernames[index] 
    });
  });
  // Insert Thoughts into db
  const thoughts = await Thought.insertMany(thoughtData);

  usernames.forEach((username, index) => {
    userData.push({ 
      username: username, 
      email: emails[index],
      thoughts: thoughts[index]._id,
    });
  });
  // Insert users into db
  const users = await User.insertMany(userData);


  // Give users random friends
  users.forEach((user) => {
    const randomUserIndex = Math.floor(Math.random() * users.length);
    const randomUser = users[randomUserIndex]._id;
    user.friends = randomUser;
  });

  await Promise.all(users.map(user => user.save()));


  console.log(users);
  console.log('Seeding complete 🌱');
  process.exit(0);
});