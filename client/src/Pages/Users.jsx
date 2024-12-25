import { useEffect, useState } from 'react';
import axios from 'axios';
import '../Style.css'
import User from './User';

const USERS_URL = 'http://localhost:3000/users';

function Users() {
  const [users, setUsers] = useState([])
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(sessionStorage.getItem('isAdmin') === 'true');
  }, []);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const config = {
          headers: { 'x-access-token': token },
        };
        const { data } = await axios.get(USERS_URL, config);
        console.log('usersData', data)
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error.response?.data || error.message);
      }
    };

    getAllUsers();
  }, []);

  const handleDeleteUser = (deletedUserId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== deletedUserId));
  };
  /*
    const handleUpdateUser = (updatedUser) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
      );
    };
  */
  const handleUpdateUser = (updatedUser) => {
    setUsers((prevUsers) => {
      console.log("Before update:", prevUsers); // Debugging
      const updatedUsers = prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      );
      console.log("After update:", updatedUsers); // Debugging
      return updatedUsers;
    });
  };

  return (
    <div>

      {isAdmin &&
        users.map((user) => (<User key={user._id} user={user} handleDeleteUser={handleDeleteUser} handleUpdateUser={handleUpdateUser} />))
      }

    </div>
  )
}

export default Users
