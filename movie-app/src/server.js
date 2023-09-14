// src/server.js
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const moviesRouter = require('./movies');
const app = express();
const port = process.env.PORT || 3000;
const logRequests = require('./logRequests');
// src/server.js
app.use(logRequests);


mongoose.connect('mongodb+srv://youtube:youtube@cluster0.pnafrxk.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use(bodyParser.json());

// Use the movies router for movie-related routes
app.use('/movies', moviesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
