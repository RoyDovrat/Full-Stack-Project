import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const URL = 'http://localhost:3000/auth/login';

function LoginPage() {
    const [userName, setUseName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async () => {
        if (!userName || !password) { 
            setError('Please enter both username and email.');
            return;
        }

        try {
            const resp = await fetch(URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName, password }),
            });

            if (resp.ok) {
                const { token } = await resp.json();
                sessionStorage.setItem('token', token);
                //navigate('/main');
            } else {
                const { message } = await resp.json();
                setError(message);
            }
        } catch (err) { 
            console.error(err);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <h1>Movies Subscriptions Web Site</h1>

            <h3>Log in Page</h3>
            User name: <input type="text" placeholder="User Name" onChange={(e) => setUseName(e.target.value)} /><br /><br />
            Password: <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br /><br />

            <button onClick={handleLogin}>Login</button> <br />
            New User?: <Link to='/create-account'>Create Account</Link> <br />

            {error && <p>{error}</p>}
        </>
    );
}

export default LoginPage;
