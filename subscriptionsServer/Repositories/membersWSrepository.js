const axios = require('axios');

MEMBERS_URL = 'https://jsonplaceholder.typicode.com/users';

const getAllMembers = () => {
  return axios.get(MEMBERS_URL);
};

module.exports = { getAllMembers };