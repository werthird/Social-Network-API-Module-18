const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// more input needed

const PORT = process.env.PORT || 3001;
const app = express();

// more input needed

app.use(express.urlencoded({ extend: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} listening at http://localhost:${PORT}`);
  });
});