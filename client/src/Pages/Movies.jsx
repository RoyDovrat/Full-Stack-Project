import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import '../Style.css';
import Movie from './Movie';

const MOVIES_URL = 'http://localhost:8000/movies';
const VIEW_MOVIE_PERMISSION = "View Movies";

function Movies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const movies = useSelector((state) => state.movies);
  const currUser = useSelector((state) => state.currUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(MOVIES_URL);
        dispatch({ type: 'INITIALIZE_MOVIES', payload: data });
        setFilteredMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error.response?.data || error.message);
      }
    };
    fetchMovies();
  }, [dispatch]);

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
      <button onClick={handleFindMovies}>Find</button>
      <br /><br />

      {currUser?.permissions?.includes(VIEW_MOVIE_PERMISSION) &&
        filteredMovies.map((movie) => (
          <Movie key={movie._id} movie={movie} />
        ))}

      {filteredMovies.length === 0 && searchTerm && (
        <p className="no-movies-found">No movies found matching "{searchTerm}"</p>
      )}
    </div>
  );
}

export default Movies;
