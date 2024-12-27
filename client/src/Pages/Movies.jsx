import { useNavigate, Outlet } from 'react-router-dom';

function Movies() {
  const navigate = useNavigate();

  return (
    <>

      <div className='moviesManagement-container'>
        <h3>Movies</h3>
        <button onClick={() => navigate('/main/movies/all-movies')}>All Movies</button>
        <button onClick={() => navigate('/main/movies/add-movie')}>Add Movie</button> <br /><br />
        <Outlet />
      </div>
    </>
  )
}

export default Movies
