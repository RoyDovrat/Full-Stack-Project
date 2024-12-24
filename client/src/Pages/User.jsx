import { useState } from 'react';
import axios from 'axios';
import EditUser from './EditUser';

const USERS_URL = 'http://localhost:3000/users';

function User({ user, handleDeleteUser, handleUpdateUser }) {
    const [isEditVisible, setIsEditVisible] = useState(false);

    const deleteUser = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const config = {
                headers: { 'x-access-token': token },
            };
            const resp = await axios.delete(`${USERS_URL}/${user._id}`, config);
            handleDeleteUser(user._id);
        } catch (error) {
            console.error('Error deleting user:', error.response?.data || error.message);
        }
    }

    return (
        <>
            {isEditVisible ? (<EditUser user={user} setIsEditVisible={setIsEditVisible} handleUpdateUser={handleUpdateUser} />) : (
                <div className="user-container">
                    <span className="user-info-label">Name:</span>
                    {`${user.firstName} ${user.lastName}`} <br />
                    <span className="user-info-label">Username:</span>
                    {user.userName} <br />
                    <span className="user-info-label">Session Time Out (Minutes):</span>
                    {user.sessionTimeOut} <br />
                    <span className="user-info-label">Created Date:</span>
                    {user.createdDate} <br />
                    <span className="user-info-label">Permissions:</span>
                    <ul>
                        {user.permissions.map((permission, index) => (
                            <li key={index}>{permission}</li>
                        ))}
                    </ul> <br /> <br />

                    <button onClick={() => setIsEditVisible(true)}>Edit</button>
                    <button onClick={deleteUser}>Delete</button>



                </div>
            )}
        </>
    )
}

export default User
