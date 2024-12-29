import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import EditMember from './EditMember';
import SubscribeToNewMovie from './SubscribeToNewMovie';

const MEMBERS_URL = 'http://localhost:8000/members';
const CREATE_SUBSCRIPTIONS_PERMISSION = "Create Subscriptions";
const DELETE_SUBSCRIPTIONS_PERMISSION = "Delete Subscriptions";

function Member({ member }) {
    const currUser = useSelector((state) => state.currUser);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isShowSubscribe, setIsShowSubscribe] = useState(false);
    const dispatch = useDispatch();

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
                        {isShowSubscribe ? (
                            <SubscribeToNewMovie
                                member={member}
                                setIsShowSubscribe={setIsShowSubscribe}
                            />
                        ) : (
                            <button onClick={() => setIsShowSubscribe(true)}>
                                Subscribe to new movie
                            </button>
                        )}
                        {member.moviesWatched?.length > 0 ? (
                            <ul>
                                {member.moviesWatched.map((movie, index) => (
                                    <li key={index}>
                                        <span>{movie.name}</span> - <span>{movie.watchedDate}</span>
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
