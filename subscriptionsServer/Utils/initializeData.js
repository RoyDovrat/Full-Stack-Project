const { getAllMembersData } = require('../Services/membersWSservice');
const { getAllMoviesData } = require('../Services/moviesWSservice');
const Member = require('../Models/memberModel');
const Movie = require('../Models/movieModel');
const Subscription = require('../Models/subscriptionModel');

const initializeData = async () => {
    try {
        console.log('Initializing data...');

        const members = await getAllMembersData();
        const movies = await getAllMoviesData();

        // clear the existing collections
        await Member.deleteMany({});
        await Movie.deleteMany({});
        await Subscription.deleteMany({});

        // insert the new data
        await Member.insertMany(members);
        await Movie.insertMany(movies);

        console.log('Data initialized successfully');

    } catch (error) {
        console.error('Error during data initialization:', error);
    }
};

module.exports = initializeData;
