import { useNavigate, Outlet } from 'react-router-dom';
import '../Style/movies.scss'

function Movies() {
  const navigate = useNavigate();
  const buttons = [
    { label: 'All Movies', path: '/main/movies-management/all-movies' },
    { label: 'Add Movie', path: '/main/movies-management/add-movie' },
  ];

  return (
    <div className='moviesManagement-container'>

      <main>
        {buttons.map(({ label, path }) => (
          <button key={path} className="moviesManagement-button" onClick={() => navigate(path)}>
            {label}
          </button>
        ))}
      </main>

      <Outlet />

    </div>
  )
}

export default Movies
