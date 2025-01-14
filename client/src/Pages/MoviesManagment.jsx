import { useNavigate, Outlet } from 'react-router-dom';
import '../Style/movies.scss'

function Movies() {
  const navigate = useNavigate();

  return (

      <div className='moviesManagement-container'>

        <main>
          <button className='moviesManagement-button' onClick={() => navigate('/main/movies-management/all-movies')}>All Movies</button>
          <button className='moviesManagement-button' onClick={() => navigate('/main/movies-management/add-movie')}>Add Movie</button> 
        </main>
        <Outlet />

      </div>
  )
}

export default Movies
