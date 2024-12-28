const membersRepository = require('../Repositories/membersDBrepository');
const subscriptionRepository = require('../Repositories/SubscriptionsDBRepository')
const movieRepository = require('../Repositories/moviesDBrepository')

const getAllMembers = (filters) => {
  return membersRepository.getAllMembers(filters);
};

const getAllMembersWithMoviesWatched = async () => {
  const members = await membersRepository.getAllMembers({});
  const subscriptions = await subscriptionRepository.getAllSubscriptions({});
  const movies = await movieRepository.getAllMovies({});

  // create a map of movies
  const movieMap = movies.reduce((map, movie) => {
    map[movie._id.toString()] = movie;
    return map;
  }, {});

  // combine members and their watched movies
  const membersWithMovies = members.map((member) => {
    const subscription = subscriptions.find(
      (sub) => sub.memberId.toString() === member._id.toString()
    );

    const moviesWatched = subscription
      ? subscription.movies.map((movieEntry) => ({
        movieId: movieEntry.movieId,
        name: movieMap[movieEntry.movieId.toString()]?.name || 'Unknown Movie',
        date: movieEntry.date,
      }))
      : [];

    return {
      ...member._doc,
      moviesWatched,
    };
  });

  return membersWithMovies;

};

const getMemberById = (id) => {
  return membersRepository.getMemberById(id);
};

const addMember = (obj) => {
  return membersRepository.addMember(obj);
};

const updateMember = (id, obj) => {
  return membersRepository.updateMember(id, obj);
};

const deleteMemberWithSubscription = async (memberId) => {
  const deletedMember = await membersRepository.deleteMember(id);
  const deletedSubscriptions = await subscriptionRepository.deleteSubscription({ memberId });
  
  return {
    deletedMember,
    deletedSubscriptions,
  };
};

module.exports = {
  getAllMembers,
  getAllMembersWithMoviesWatched,
  getMemberById,
  addMember,
  updateMember,
  deleteMemberWithSubscription,
}