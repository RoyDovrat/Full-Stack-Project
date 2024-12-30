import { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const URL = 'http://localhost:3000/auth/login';

function LoginPage() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const handleLogin = async () => {
        if (!userName || !password) {
            setError('Please enter both username and password.');
            return;
        }

        try {
            const resp = await axios.post(URL, { userName, password });

            if (resp.status === 200) {
                const { token } = resp.data;
                const decoded = jwtDecode(token);
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('fullName', decoded.fullName);
                sessionStorage.setItem('isAdmin', decoded.isAdmin);

                const data ={
                    id: decoded.userId,
                    fullName: decoded.fullName,
                    isAdmin: decoded.isAdmin,
                    permissions: decoded.permissions || []
                }
                dispatch({ type: 'SET_CURR_USER', payload: data });

                navigate('/main');
            }

        } catch (err) {
            console.error('Error during login:', err.response?.data || err.message);
            if (err.response && err.response.status === 401) {
                setError(err.response.data.message || 'Invalid username or password.');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <>
            <h1>Movies Subscriptions Web Site</h1>
            <h3>Log in Page</h3>
            <label className="login-label">User name:</label>
            <input type="email" placeholder="User Name" onChange={(e) => setUserName(e.target.value)} required/><br /><br />
            <label className="login-label">Password:</label>
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} required/><br /><br />
            <button className="button" onClick={handleLogin}>Login</button> <br />

            New User?: <Link to='/create-account'>Create Account</Link> <br />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    );
}

export default LoginPage;
