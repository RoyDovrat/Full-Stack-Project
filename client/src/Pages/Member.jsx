import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import EditMember from './EditMember';
import SubscribeToNewMovie from './SubscribeToNewMovie';

const MEMBERS_URL = 'http://localhost:8000/members';
const CREATE_SUBSCRIPTIONS_PERMISSION = "Create Subscriptions";
const DELETE_SUBSCRIPTIONS_PERMISSION = "Delete Subscriptions";

function Member({ member: propMember }) {
    const currUser = useSelector((state) => state.currUser);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isShowSubscribe, setIsShowSubscribe] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    const member = location.state?.member || propMember;

    const deleteMember = async () => {
        try {
            const { data } = await axios.delete(`${MEMBERS_URL}/${member._id}`);
            console.log(`Member deleted successfully. ID: ${data._id}, Name: ${data.name}`);
            alert(`Member "${member.name}" deleted successfully.`);
            dispatch({ type: 'DELETE_MEMBER', payload: data._id });
        } catch (error) {
            console.error('Error deleting member:', error.response?.data || error.message);
        }
    };

    const handleMovieClick = (movieId) => {
        navigate(`/main/movies-management/all-movies/${movieId}`);
    };

    return (
        <>
            {isEditVisible ? (
                <EditMember member={member} setIsEditVisible={setIsEditVisible} />
            ) : (
                <div className="member-container">
                    <span style={{ fontWeight: 'bold' }}>{`${member.name}`}</span>
                    <br />
                    <span className="member-info-label">Email:</span>
                    {member.email} <br />
                    <span className="member-info-label">City:</span>
                    {member.city} <br /> <br />

                    {currUser?.permissions?.includes(CREATE_SUBSCRIPTIONS_PERMISSION) && (
                        <button onClick={() => setIsEditVisible(true)}>Edit</button>
                    )}
                    {currUser?.permissions?.includes(DELETE_SUBSCRIPTIONS_PERMISSION) && (
                        <button onClick={deleteMember}>Delete</button>
                    )}
                    <br /> <br />

                    <div className="subscriptions-watched-container">
                        <span className="member-info-label">Movies watched:</span>

                        <button onClick={() => setIsShowSubscribe(!isShowSubscribe)}>
                            Subscribe to new movie
                        </button>

                        {isShowSubscribe &&
                            <SubscribeToNewMovie member={member} setIsShowSubscribe={setIsShowSubscribe} />
                        }
                        
                        {member.moviesWatched?.length > 0 ? (
                            <ul>
                                {member.moviesWatched.map((movie, index) => (
                                    <li key={index}>
                                        <span style={{ cursor: 'pointer', color: 'blue' }}
                                            onClick={() => handleMovieClick(movie.movieId)}
                                        >{movie.name}</span> -
                                        <span>{new Date(movie.date).toISOString().split('T')[0]}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No movies watched yet.</p>
                        )}
                    </div>
                    <br />
                </div>
            )}
        </>
    );
}

export default Member;
