import React, { useState } from 'react';
import styles from './styles.module.scss';
import { onLogin } from '../../utils/sessionStorage';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    try {
      const response = await fetch('http://localhost:8080/albumify/login', {
        method: 'POST',
          headers: {
                    'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      if (response.ok) {
        const data = await response.json();
        onLogin(data.token);
        navigate('/home');
      } else {
        console.error('Error: ', response.statusText);
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const onLogin = (token: string) => {
    sessionStorage.setItem("token", token); 
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <Link to="/register" style={{textDecoration: "none"}}>
        Do not have an account? Register
        </Link>

      </form>
    </div>
  );
};

export default LoginPage;
