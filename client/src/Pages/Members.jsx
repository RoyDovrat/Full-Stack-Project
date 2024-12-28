import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import '../Style.css';
import Member from './Member';

const MEMBERS_URL = 'http://localhost:8000/members//WithMoviesWatched';
const VIEW_SUBSCRIPTINS_PERMISSION = "View Subscriptions";

function Members() {
    const members = useSelector((state) => state.members);
    const currUser = useSelector((state) => state.currUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const { data } = await axios.get(MEMBERS_URL);
                dispatch({ type: 'INITIALIZE_MEMBERS', payload: data });
                console.log('members', data)
            } catch (error) {
                console.error('Error fetching members:', error.response?.data || error.message);
            }
        };
        fetchMembers();
    }, []);


    return (
        <div>
            
            {currUser?.permissions?.includes(VIEW_SUBSCRIPTINS_PERMISSION) &&
                members.map((member) => (
                    <Member key={member._id} member={member} />
                ))}

        </div>
    );
}

export default Members;
