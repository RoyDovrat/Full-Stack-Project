import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const URL = 'http://localhost:3000/users/createAccount';

function CreateAccount() {
  const [userName, setUseName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const checkValidation = () => {
    if (!userName || !password) {
      setMessage('Please enter both username and password.');
      return false;
    }

    if (!isStrongPassword(password)) {
      setMessage('Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.');
      return false;
    }
    return true;
  }
  
    const handleCreate = async () => {
      if (!checkValidation()) return;

      try {
        const resp = await axios.post(URL, { userName, password });

        if (resp.status === 201) {
          alert('Account created successfully! Redirecting to login page...');
          navigate('/');
        }

      } catch (err) {
        if (err.response && err.response.status === 404) {
          setMessage(err.response.data.message);
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

        <label className="login-label">User name:</label>
        <input type="email" placeholder="User Name" onChange={(e) => setUseName(e.target.value)} /><br /><br />
        <label className="login-label">Password:</label>
        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
        <button className="button" onClick={handleCreate}>Create</button> <br />

        {message && <p style={{ color: 'red' }}>{message}</p>}
      </>
    );
  }

  export default CreateAccount;
