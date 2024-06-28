import React from 'react';
import { Link } from 'react-router-dom';
import InputField from '../InputField/InputField';
import styles from './styles.module.scss';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../../images/logo.png';

interface AuthFormProps {
  isLogin: boolean;
  handleSubmit: (data: { username: string; email?: string; password: string }) => Promise<void>;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin, handleSubmit }) => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit({ username, email, password });
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <img src={logo} alt="Logo" />
        <form className={styles.authForm} onSubmit={onSubmit}>
          <h1>{isLogin ? 'Sign In' : 'Register'}</h1>
          <InputField
            id="username"
            name="Username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon={PersonIcon}
          />
          {!isLogin && (
            <InputField
              id="email"
              name="Email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={EmailIcon}
            />
          )}
          <InputField
            id="password"
            name="Password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={LockIcon}
          />
          <button type="submit">{isLogin ? 'Sign in' : 'Register'}</button>
          <Link to={isLogin ? "/register" : "/"} style={{ textDecoration: 'none' }}>
            {isLogin ? 'Do not have an account? Register' : 'Already have an account? Login'}
          </Link>
        </form>
      </div>
      <div className={styles.imgContainer}></div>
    </div>
  );
};

export default AuthForm;
