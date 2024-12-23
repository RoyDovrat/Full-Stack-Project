import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import '../Style.css'

function UsersManagement() {
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsAdmin(sessionStorage.getItem('isAdmin') === 'true');
  }, []);


  return (

    <div className='usersManagement-container'>
      <h3>Users</h3>
      {isAdmin && (<button onClick={() => navigate('/main/users-management/all-users')}>All Users</button>)}
      {isAdmin && (<button onClick={() => navigate('/main/users-management/add-user')}>Add User</button>)} <br /><br />
      <Outlet />
    </div>

  )
}

export default UsersManagement
