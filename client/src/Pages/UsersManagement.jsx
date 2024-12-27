import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import '../Style.css'

function UsersManagement() {
  const currUser = useSelector((state) => state.currUser);

  const navigate = useNavigate();

  return (

    <div className='usersManagement-container'>
      <h3>Users</h3>
      {currUser?.isAdmin && (<button onClick={() => navigate('/main/users-management/all-users')}>All Users</button>)}
      {currUser?.isAdmin && (<button onClick={() => navigate('/main/users-management/add-user')}>Add User</button>)} <br /><br />
      <Outlet />
    </div>

  )
}

export default UsersManagement
