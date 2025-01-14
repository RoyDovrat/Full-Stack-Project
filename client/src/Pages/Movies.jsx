import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Movie from './Movie';
import '../Style/movies.scss'

const VIEW_MOVIE_PERMISSION = "View Movies";

function Movies() {
  const [searchTerm, setSearchTerm] = useState('');
  const movies = useSelector((state) => state.movies);
  const [filteredMovies, setFilteredMovies] = useState([...movies]);
  const currUser = useSelector((state) => state.currUser);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const handleFindMovies = () => {
    const filtered = movies.filter((movie) =>
      movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  return (
    <div className='movies-container'>

      <header className='movies-header'>
        <label>Find Movie: </label>
        <input type="text" placeholder='You can search' onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}  className='search-movie-text'/> 
        <button className="find-button" onClick={handleFindMovies}>Find</button>
      </header>

      <main>
        {/*check if user have permission */}
        {currUser?.permissions?.includes(VIEW_MOVIE_PERMISSION) &&
          filteredMovies.map((movie) => (
            <Movie key={movie._id} movie={movie} />
          ))}

        {/*filter movies that match the search terms  */}
        {filteredMovies.length === 0 && searchTerm && (
          <p className="no-movies-found">No movies found matching"{searchTerm}"</p>
        )}
      </main>
      
    </div>
  );
}

export default Movies;
