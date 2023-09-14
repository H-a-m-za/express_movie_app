// src/movies.js
const express = require('express');
const router = express.Router();
const Movie = require('./models/movie');


// Middleware to log requests to log.txt (removed)

router.get('/', async (req, res) => {
    try {
      const movies = await Movie.find();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  router.get('/:id', async (req, res) => {
    try {
      const movie = await Movie.findOne({ id: req.params.id });
      if (movie) {
        res.json(movie);
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Update DELETE route to remove a movie by custom id
  router.delete('/:id', async (req, res) => {
    try {
      const movie = await Movie.findOneAndRemove({ id: req.params.id });
      if (movie) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Add a new movie
router.post('/', async (req, res) => {
    try {
      const { id, title, year } = req.body;
  
      // Check if a movie with the same custom ID already exists
      const existingMovie = await Movie.findOne({ id });
  
      if (existingMovie) {
        return res.status(400).json({ error: 'Movie with the same ID already exists' });
      }
  
      const newMovie = new Movie({ id, title, year });
      await newMovie.save();
      res.status(201).json(newMovie);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Edit a movie by ID
router.put('/:id', async (req, res) => {
    try {
      const { id, title, year } = req.body;
      const updatedMovie = await Movie.findOneAndUpdate({ id }, { title, year }, { new: true });
      if (updatedMovie) {
        res.json(updatedMovie);
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Delete a movie by ID


module.exports = router;
