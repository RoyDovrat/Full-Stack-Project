const moviesRepository = require('../Repositories/moviesDBrepository');

const getAllMovies = (filters) => {
  return moviesRepository.getAllMovies(filters);
};

const getMovieById = (id) => {
  return moviesRepository.getMovieById(id);
};

const addMovie = (obj) => {
  return moviesRepository.addMovie(obj);
};

const updateMovie = (id, obj) => {
  return moviesRepository.updateMovie(id, obj);
};

const deleteMovie = (id) => {
  return moviesRepository.deleteMovie(id);
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
}