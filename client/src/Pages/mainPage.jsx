import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

const MOVIES_URL = 'http://localhost:8000/movies';

function MainPage() {
  const currUser = useSelector((state) => state.currUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(MOVIES_URL);
        dispatch({ type: 'INITIALIZE_MOVIES', payload: data });
      } catch (error) {
        console.error('Error fetching movies:', error.response?.data || error.message);
      }
    };
    fetchMovies();
  }, [dispatch]);


  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  

  return (
    <>
      <h3>Welcome, {currUser?.fullName || 'Guest'}</h3>

      <h1>Movies Subscriptions Web Site</h1>
      <button onClick={() => navigate('/main/movies-management')}>Movies</button>
      <button onClick={() => navigate('/main/subscriptions')}>Subscriptions</button>
      {currUser?.isAdmin && (
        <button onClick={() => navigate('/main/users-management')}>Users Management</button>
      )}
      <button onClick={handleLogout}>Log Out</button> <br /> <br />
      <Outlet />
    </>
  );
}

export default MainPage;
