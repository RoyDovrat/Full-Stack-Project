import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import '../Style.css';
import User from './User';

const USERS_URL = 'http://localhost:3000/users';

function Users() {
  const [isAdmin, setIsAdmin] = useState(false);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsAdmin(sessionStorage.getItem('isAdmin') === 'true');
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const config = { headers: { 'x-access-token': token } };
        const { data } = await axios.get(USERS_URL, config);
        dispatch({ type: 'INITIALIZE_USERS', payload: data });
      } catch (error) {
        console.error('Error fetching users:', error.response?.data || error.message);
      }
    };
    fetchUsers();
  }, [dispatch]);

  return (
    <div>
      {isAdmin &&
        users.map((user) => (
          <User key={user._id} user={user} />
        ))}
    </div>
  );
}

export default Users;
