import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import '../Style.css';
import User from './User';

const USERS_URL = 'http://localhost:3000/users';

function Users() {
  const users = useSelector((state) => state.users);
  const currUser = useSelector((state) => state.currUser);
  const dispatch = useDispatch();

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
      {currUser?.isAdmin &&
        users.map((user, index) => (
          <User key={user._id || index} user={user} />
        ))}
    </div>
  );
}

export default Users;
