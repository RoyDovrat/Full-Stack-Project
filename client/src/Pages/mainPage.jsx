import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
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

      <h1>Movies Subscriptions Web Site</h1>
      <button onClick={() => navigate('/movies')}>Movies</button>
      <button onClick={() => navigate('/subscriptions')}>Subscriptions</button>
      {isAdmin && (
        <button onClick={() => navigate('/main/users-management')}>Users Management</button> 
      )}
      <button onClick={handleLogout}>Log Out</button>
    </>
  );
}

export default MainPage;
