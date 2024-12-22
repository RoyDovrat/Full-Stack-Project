import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const USER_FULL_NAME = sessionStorage.getItem('fullName');
const IS_ADMIN = sessionStorage.getItem('isAdmin');

function MainPage() {
  const navigate = useNavigate();

  return (
    <>
     <h3>Welcome, {USER_FULL_NAME}</h3>
     

    </>
  )
}

export default MainPage
