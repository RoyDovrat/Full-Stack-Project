const axios = require('axios');

MOVIES_URL = 'https://api.tvmaze.com/shows';

const getAllMovies = () => {
  return axios.get(MOVIES_URL);
};

module.exports = { getAllMovies };