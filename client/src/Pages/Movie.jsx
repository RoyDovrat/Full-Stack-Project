import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditMovie from './EditMovie';

const MOVIES_URL = 'http://localhost:8000/movies';
const CREATE_MOVIE_PERMISSION = "Create Movies";
const DELETE_MOVIE_PERMISSION = "Delete Movies";

function Movie({ movie }) {
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [premieredYear, setPremieredYear] = useState('')
    const [subscribers, setSubscribers] = useState([]);

    const currUser = useSelector((state) => state.currUser);
    const members = useSelector((state) => state.members);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const dateStr = movie.premiered;
        const year = dateStr.split('-')[0];
        setPremieredYear(year)

        const watchedBy = members.filter((member) =>
            member.moviesWatched.some((watched) => watched.movieId === movie._id)
        );
        setSubscribers(watchedBy);
    }, [movie, members]);


    const deleteMovie = async () => {
        try {
            const { data } = await axios.delete(`${MOVIES_URL}/${movie._id}`);
            dispatch({ type: 'DELETE_MOVIE', payload: movie._id });
            console.log(`Movie deleted successfully. ID: ${data._id}, Name: ${data.name}`);
            alert(`Movie "${data.name}" deleted successfully.`);
        } catch (error) {
            console.error('Error deleting movie:', error.response?.data || error.message);
        }
    };

    const handleMemberClick = (member) => {
        navigate('/main/subscriptions/all-members', { state: { member } });
    };

    return (
        <>
            {isEditVisible ?
                (<EditMovie movie={movie} setIsEditVisible={setIsEditVisible} />) :
                (<div className="movie-container">
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
                        {subscribers.length > 0 ? (
                            <ul>
                                {subscribers.map((member) => (
                                    <li key={member._id}>
                                        <span
                                            style={{ cursor: 'pointer', color: 'blue' }}
                                            onClick={() => handleMemberClick(member)}
                                        >
                                            {member.name}
                                        </span>{' '}
                                        -{' '}
                                        <span>
                                            {new Date(
                                                member.moviesWatched.find(
                                                    (watched) => watched.movieId === movie._id
                                                )?.date || 'Unknown Date'
                                            ).toISOString().split('T')[0]
                                            }
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No subscriptions watched this movie yet.</p>
                        )}

                    </div>
                    <br />

                    {currUser?.permissions?.includes(CREATE_MOVIE_PERMISSION) && <button className="button-edit-movie" onClick={() => setIsEditVisible(true)}>Edit</button>}
                    {currUser?.permissions?.includes(DELETE_MOVIE_PERMISSION) && <button className="button-edit-movie" onClick={deleteMovie}>Delete</button>}
                </div>)
            }
        </>
    )
}

export default Movie