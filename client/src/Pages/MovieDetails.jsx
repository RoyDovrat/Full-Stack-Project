import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MOVIES_URL = 'http://localhost:8000/movies';

function MovieDetails() {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();  

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get(`${MOVIES_URL}/${movieId}`);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error.response?.data || error.message);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <p>Loading movie details...</p>;
  }

  return (
    <div>
      <h3 >{movie.name}</h3>
      <span className="movie-info-label">Premiered:</span>
      {new Date(movie.premiered).toISOString().split('T')[0]}
      <br /> <br />
      <span className="movie-info-label">Genres:</span>
      {movie.genres.join(', ')} <br /><br />
      <img src={movie.image} alt={movie.name} style={{ width: '200px' }} />
    </div>
  );
}

export default MovieDetails;
