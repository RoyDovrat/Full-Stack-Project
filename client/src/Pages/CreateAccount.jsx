import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const URL = 'http://localhost:3000/users/createAccount';

function CreateAccount() {
  const [userName, setUseName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!userName || !password) {
      setMessage('Please enter both username and password.');
      return;
    }

    try {
      const resp = await axios.post(URL, { userName, password });

      if (resp.status === 201) {
        alert('Account created successfully! Redirecting to login page...');
        navigate('/');
      }

    } catch (err) {
      if (err.response && err.response.status === 404) {
        setMessage('User does not exist. Please contact the system administrator.');
      } else if (err.response && err.response.status === 500) {
        setMessage('An error occurred on the server. Please try again later.');
      } else {
        setMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      <h1>Movies Subscriptions Web Site</h1>
      <h3>Create An Account</h3>

      <label>User name:</label>
      <input type="text" placeholder="User Name" onChange={(e) => setUseName(e.target.value)} /><br /><br />
      <label>Password:</label>
      <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
      <button onClick={handleCreate}>Create</button> <br />

      {message && <p style={{ color: 'red' }}>{message}</p>}
    </>
  );
}

export default CreateAccount;
