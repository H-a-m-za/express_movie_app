// src/models/movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true, // Ensures uniqueness of custom IDs
  },
  title: String,
  year: Number,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;


