import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import '../Style.css'
import '../Style/users.scss'

function UsersManagement() {
  const currUser = useSelector((state) => state.currUser);
  const navigate = useNavigate();
  const adminButtons = [
    { label: 'All Users', path: '/main/users-management/all-users' },
    { label: 'Add User', path: '/main/users-management/add-user' },
  ];

  return (

    <div className='usersManagement-container'>
      {currUser?.isAdmin && adminButtons.map(({ label, path }) => (
        <button key={path} className="usersManagement-button" onClick={() => navigate(path)}>
          {label}
        </button>
      ))} <br /> <br />
      <Outlet />
    </div>

  )
}

export default UsersManagement
