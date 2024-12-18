const moviesRepository = require('../Repositories/moviesWSrepository')

const getAllMoviesData = async () => {
    const { data: movies } = await moviesRepository.getAllMovies();

    return movies.map((movie) => {
        return {
            name: movie.name,
            genres: movie.genres,
            image: movie.image?.medium,
            premiered: movie.premiered 
        }
    })
}
module.exports = { getAllMoviesData }