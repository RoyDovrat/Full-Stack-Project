import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const MOVIES_URL = 'http://localhost:8000/movies';

function EditMovie({ movie, setIsEditVisible }) {
    const [message, setMessage] = useState('');

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0'); 
        return `${year}-${month}-${day}`;
    };

    const [updatedMovie, setUpdatedMovie] = useState({
        ...movie,
        genres: movie.genres.join(', '),
        premiered: formatDate(movie.premiered)
    });
    const dispatch = useDispatch();

    const checkValidation = () => {
        if (!updateMovie.name || !updateMovie.genres || !updateMovie.premiered) {
          setMessage('Please enter all the required details.');
          return false;
        }
        return true;
      }

    const updateMovie = async () => {
        if (!checkValidation()) return;
        try {
            const updatedMovieWithArrayGenres = {
                ...updatedMovie,
                genres: updatedMovie.genres.split(',').map((genre) => genre.trim())
            };
            const { data } = await axios.patch(`${MOVIES_URL}/${movie._id}`, updatedMovieWithArrayGenres);
            dispatch({ type: 'UPDATE_MOVIE', payload: updatedMovieWithArrayGenres });
            console.log(`Movie updated successfully. ID: ${data._id}, Name: ${data.name}`);
            alert(`Movie "${data.name}" updated successfully.`);
            setIsEditVisible(false);
        } catch (error) {
            console.error('Error updating movie:', error.response?.data || error.message);
        }
    };

    return (
        <>
            <h2 style={{ fontWeight: 'bold' }}>Edit Movie: {`${movie.name}`}</h2>
            <div className="movie-container">
                <span className="movie-info-label">Name:</span>
                <input
                    type="text"
                    value={updatedMovie.name}
                    onChange={(e) => {
                        setUpdatedMovie({ ...updatedMovie, name: e.target.value });
                    }}
                />
                <br /> <br />
                <span className="movie-info-label">Genres:</span>
                <input
                    type="text"
                    value={updatedMovie.genres}
                    onChange={(e) => {
                        setUpdatedMovie({ ...updatedMovie, genres: e.target.value });
                    }}
                />
                <br /> <br />
                <span className="movie-info-label">Image Url:</span>
                <input
                    type="text"
                    value={updatedMovie.image}
                    onChange={(e) => {
                        setUpdatedMovie({ ...updatedMovie, image: e.target.value });
                    }}
                />
                <br /> <br />
                <span className="movie-info-label">Premiered:</span>
                <input
                    type="date"
                    value={updatedMovie.premiered}
                    onChange={(e) => {
                        setUpdatedMovie({ ...updatedMovie, premiered: e.target.value });
                    }}
                />
                <br /> <br />
                <button className="button-edit-movie" onClick={updateMovie}>Update</button>
                <button className="button-edit-movie" onClick={() => setIsEditVisible(false)}>Cancel</button>
            </div>
            {message && <p style={{ color: 'red' }}>{message}</p>}
        </>
    );
}

export default EditMovie;
