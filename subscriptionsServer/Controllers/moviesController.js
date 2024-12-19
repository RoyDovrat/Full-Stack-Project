const express = require('express');
const moviesService = require('../Services/moviesDBservice');

const router = express.Router();

// Entry point: http://localhost:3000/movies

router.get('/', async (req, res) => {
  try {
    const filters = req.query;
    const movies = await moviesService.getAllMovies(filters);
    res.json(movies);
  } catch (error) {
    res.json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await moviesService.getMovieById(id);
    res.json(movie);
  } catch (error) {
    res.json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const obj = req.body;
    const result = await moviesService.addMovie(obj);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await moviesService.updateMovie(id, obj);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await moviesService.deleteMovie(id);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;