import { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Style/Login.scss'
import icon from '../images/icon.png'
import movielogin from '../images/movielogin.jpg'
//#f25c29 orange
//blue #0e64ad

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

                const data = {
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
        <div className='login-layout'>

            <header>
            <img src={icon} alt="icon" className="icon" />
                <div className="header-content">
                    <h1>Movies Subscriptions</h1>
                </div>  
            </header>

            <main>
                <input className='text-input' type="email" placeholder="Type Email" onChange={(e) => setUserName(e.target.value)} required />
                <input className='text-input' type="password" placeholder="Type Password" onChange={(e) => setPassword(e.target.value)} required />
            </main>

            <footer>
                <button className="button" onClick={handleLogin}>Login</button> <br />
                New User?: <Link to='/create-account'>Create Account</Link> 
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </footer>

        </div>
    );
}

export default LoginPage;
