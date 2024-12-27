import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MainPage() {
  const currUser = useSelector((state) => state.currUser);
  console.log('curr', currUser)

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <>
      <h3>Welcome, {currUser?.fullName || 'Guest'}</h3>

      <h1>Movies Subscriptions Web Site</h1>
      <button onClick={() => navigate('/movies')}>Movies</button>
      <button onClick={() => navigate('/subscriptions')}>Subscriptions</button>
      {currUser?.isAdmin && (
        <button onClick={() => navigate('/main/users-management')}>Users Management</button>
      )}
      <button onClick={handleLogout}>Log Out</button> <br /> <br />
      <Outlet />
    </>
  );
}

export default MainPage;
