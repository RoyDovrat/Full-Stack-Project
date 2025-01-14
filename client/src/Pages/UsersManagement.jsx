import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import '../Style.css'
import '../Style/users.scss'

function UsersManagement() {
  const currUser = useSelector((state) => state.currUser);

  const navigate = useNavigate();

  return (

    <div className='usersManagement-container'>
      {currUser?.isAdmin && (<button className="userssManagement-button" onClick={() => navigate('/main/users-management/all-users')}>All Users</button>)}
      {currUser?.isAdmin && (<button className="userssManagement-button" onClick={() => navigate('/main/users-management/add-user')}>Add User</button>)} <br /><br />
      <Outlet />
    </div>

  )
}

export default UsersManagement
