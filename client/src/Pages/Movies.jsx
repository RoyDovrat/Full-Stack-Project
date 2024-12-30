import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../Style.css';
import Movie from './Movie';

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
    <div>
      <label>Find Movie: </label>
      <input
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <button className="button" onClick={handleFindMovies}>Find</button>
      <br /><br />

      {currUser?.permissions?.includes(VIEW_MOVIE_PERMISSION) &&
        filteredMovies.map((movie) => (
          <Movie key={movie._id} movie={movie} />
        ))}

      {filteredMovies.length === 0 && searchTerm && (
        <p className="no-movies-found">No movies found matching"{searchTerm}"</p>
      )}
    </div>
  );
}

export default Movies;
