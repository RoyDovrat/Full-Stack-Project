import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import '../Style/main.scss'
import AppHeadline from '../Components/AppHeadline';

const MOVIES_URL = 'http://localhost:8000/movies';
const MEMBERS_URL = 'http://localhost:8000/members//WithMoviesWatched';

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
    const fetchMembers = async () => {
      try {
        const { data } = await axios.get(MEMBERS_URL);
        dispatch({ type: 'INITIALIZE_MEMBERS', payload: data });
      } catch (error) {
        console.error('Error fetching members:', error.response?.data || error.message);
      }
    };

    fetchMovies();
    fetchMembers();
  }, [dispatch]);


  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };



  return (
    <div className='main-layout'>

      <AppHeadline userName={currUser?.fullName} />

      <nav className='navigate'>
        <button onClick={() => navigate('/main/movies-management')}>Movies</button>
        <button onClick={() => navigate('/main/subscriptions')}>Subscriptions</button>
        {currUser?.isAdmin && (
          <button onClick={() => navigate('/main/users-management')}>Users Management</button>
        )}
        <button onClick={handleLogout}>Log Out</button> <br /> <br />
      </nav>

      <Outlet />
    </div>
  );
}

export default MainPage;
