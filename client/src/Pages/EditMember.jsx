import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const MEMBERS_URL = 'http://localhost:8000/members';

function EditMember({ member, setIsEditVisible }) {
    const [updatedMember, setUpdatedMember] = useState({ ...member });
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const checkValidation = () => {
        if (!updateMember.name || !updateMember.email || !updateMember.city) {
            setMessage('Please enter all the required details.');
            return false;
        }
        return true;
    }

    const updateMember = async () => {
        if (!checkValidation()) return;
        try {
            const { data } = await axios.patch(`${MEMBERS_URL}/${member._id}`, updatedMember);
            dispatch({ type: 'UPDATE_MEMBER', payload: updatedMember });
            console.log(`Member updated successfully. ID: ${data._id}, Name: ${data.name}`);
            alert(`Member "${data.name}" updated successfully.`);
            setIsEditVisible(false);
        } catch (error) {
            console.error('Error updating member:', error.response?.data || error.message);
        }
    };

    return (
        <>
            <h2 style={{ fontWeight: 'bold' }}>Edit Member: {`${member.name}`}</h2>
            <div className="member-container">
                <span className="member-info-label">Name:</span>
                <input
                    type="text"
                    value={updatedMember.name}
                    onChange={(e) => {
                        setUpdatedMember({ ...updatedMember, name: e.target.value });
                    }}
                />
                <br /> <br />
                <span className="movie-info-label">Email:</span>
                <input
                    type="email"
                    value={updatedMember.email}
                    onChange={(e) => {
                        setUpdatedMember({ ...updatedMember, email: e.target.value });
                    }}
                />
                <br /> <br />
                <span className="movie-info-label">City:</span>
                <input
                    type="text"
                    value={updatedMember.city}
                    onChange={(e) => {
                        setUpdatedMember({ ...updatedMember, city: e.target.value });
                    }}
                />
                <br /> <br />
                <button className="button-edit-member" onClick={updateMember}>Update</button>
                <button className="button-edit-member" onClick={() => setIsEditVisible(false)}>Cancel</button>
            </div>
            {message && <p style={{ color: 'red' }}>{message}</p>}
        </>
    );
}

export default EditMember;
