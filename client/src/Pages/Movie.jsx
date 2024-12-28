import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const MOVIES_URL = 'http://localhost:8000/movies';
const CREATE_MOVIE_PERMISSION = "Create Movies";
const DELETE_MOVIE_PERMISSION = "Delete Movies";

function Movie({ movie }) {
    const currUser = useSelector((state) => state.currUser);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [premieredYear, setPremieredYear] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        const dateStr = movie.premiered;
        const year = dateStr.split('-')[0];
        setPremieredYear(year)
    }, []);

    const deleteMovie = async () => {
        try {
            const { data } = await axios.delete(`${MOVIES_URL}/${movie._id}`);
            console.log(`Movie deleted successfully. ID: ${data._id}, Name: ${data.name}`);
            alert(`Movie "${data.name}" deleted successfully.`);
            dispatch({ type: 'DELETE_MOVIE', payload: movie._id });
        } catch (error) {
            console.error('Error deleting movie:', error.response?.data || error.message);
        }
    };

    return (
        <>
            <div className="movie-container">
                <span style={{ fontWeight: 'bold' }}>{`${movie.name}, ${premieredYear}`}</span>
                <br />
                <span className="movie-info-label">Genres:</span>
                <ul>
                    {movie.genres.map((genre, index) => (
                        <li key={index}>{genre}</li>
                    ))}
                </ul>

                <img
                    src={movie.image}
                    style={{ width: '100px', height: 'auto' }}
                />
                <div className="subscriptions-watched-container">
                    <span className="movie-info-label">Subscriptions watched</span>

                </div>
                <br />

                {currUser?.permissions?.includes(CREATE_MOVIE_PERMISSION) && <button onClick={() => setIsEditVisible(true)}>Edit</button>}
                {currUser?.permissions?.includes(DELETE_MOVIE_PERMISSION) && <button onClick={deleteMovie}>Delete</button>}
            </div>

        </>
    )
}

export default Movie
