import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UsersManagement() {
  const [userFullName, setUserFullName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setUserFullName(sessionStorage.getItem('fullName') || 'Guest');
    setIsAdmin(sessionStorage.getItem('isAdmin') === 'true');
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <>
      <h3>Welcome, {userFullName}</h3>

      <h3>Manage Users</h3>
      {isAdmin && (<button onClick={() => navigate('/users-management/all-users')}>All Users</button>)}
      {isAdmin && (<button onClick={() => navigate('/users-management/add-user')}>Add User</button>)}
      <button onClick={() => navigate('/main')}>Main</button>
      <button onClick={handleLogout}>Log Out</button>
    </>
  )
}

export default UsersManagement
