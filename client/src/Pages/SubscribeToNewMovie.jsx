import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SUBSCRIPTIONS_URL = 'http://localhost:8000/subscriptions';
const CREATE_SUBSCRIPTIONS_PERMISSION = "Create Subscriptions";

function SubscribeToNewMovie({ member, setIsShowSubscribe }) {
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedMovieId, setSelectedMovieId] = useState('')
    const [unwatchedMovies, setUnwatchedMovies] = useState([]);
    const currUser = useSelector((state) => state.currUser);
    const allMovies = useSelector((state) => state.movies);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('in sub comp', allMovies)
        const watchedMovieIds = member.moviesWatched.map((movie) => movie.movieId);
        const unwatched = allMovies.filter((movie) => !watchedMovieIds.includes(movie._id));
        setUnwatchedMovies(unwatched);
    }, [member, allMovies]);

    const addSubscription = async () => {
        if (!selectedMovieId || !date) {
            alert('Please select a movie and provide a date.');
            return;
        }

        const movie = movies.find((m) => m._id === selectedMovieId);

        const newSubscription = {
            memberId: member._id,
            movies: [{ movieId: selectedMovieId, date: selectedDate }],
        }

        const newMmberSubscription = {
            memberId: member._id,
            movies: [{ movieId: selectedMovieId, name:movie.name, date: selectedDate }],
        }

        try {
            const { data } = await axios.post(SUBSCRIPTIONS_URL, newSubscription);
            dispatch({ type: 'ADD_SUBSCRIPTIONS', payload: newMmberSubscription });
            console.log(`Subscriptions added successfully. ID: ${data._id}`);
            alert(`Subscriptions "${data.name}" added successfully.`);
            setIsShowSubscribe(false)
        } catch (error) {
            console.error('Error adding subscriptions:', error.response?.data || error.message);
        }
    };


    return (
        <>
            <h4>Add a new movie: </h4>
            {currUser?.permissions?.includes(CREATE_SUBSCRIPTIONS_PERMISSION) &&
                <div className="subscribe-movie-container">
                    <span className="member-info-label">Choose Movie:</span>
                    <select
                        onChange={(e) => setSelectedMovieId(e.target.value)}
                        value={selectedMovieId}
                    >
                        <option value="">-- Select a movie --</option>
                        {unwatchedMovies.map((movie) => (
                            <option key={movie._id} value={movie._id}>
                                {movie.name}
                            </option>
                        ))}
                    </select> <br /> <br />

                    <span className="member-info-label">Choose Date:</span>
                    <input type="date"
                        onChange={(e) => {
                            setSelectedDate(e.target.value);
                        }} /> <br /> <br />

                    <button onClick={addSubscription}>Save</button>
                    <button onClick={() => setIsShowSubscribe(false)}>Cancel</button>
                </div>}
        </>
    );
}

export default SubscribeToNewMovie;
