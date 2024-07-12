import React from 'react';
import { Link } from 'react-router-dom';
import InputField from '../InputField/InputField';
import styles from './styles.module.scss';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../../images/logo.png';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

interface AuthFormProps {
  isLogin: boolean;
  handleSubmit: (data: { username: string; email?: string; password: string; imgUrl?: string }) => Promise<void>;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin, handleSubmit }) => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [imgFile, setImgFile] = React.useState<File | null>(null);
  const [imgBase64, setImgBase64] = React.useState<string>('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('username', username);
      if (email) {
        formData.append('email', email);
      }
      formData.append('password', password);
      if (imgBase64) {
        formData.append('profileImageBase64', imgBase64); // Ensure the key matches what your backend expects
      }

      await handleSubmit({
        username,
        email,
        password,
        imgUrl: imgBase64 ? `data:image/jpeg;base64,${imgBase64}` : '', // Display image in UI if needed
      });
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1] || '';
        setImgBase64(base64String);
      };
      reader.readAsDataURL(file);
      setImgFile(file);
    }
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
          {!isLogin && (
            <InputField
              id="imgFile"
              name="Profile Image"
              type="file"
              placeholder="Choose profile image"
              value=""
              onChange={handleFileChange}
              icon={InsertPhotoIcon}
            />
          )}
          <button type="submit">{isLogin ? 'Sign in' : 'Register'}</button>
          <Link to={isLogin ? '/register' : '/'} style={{ textDecoration: 'none' }}>
            {isLogin ? 'Do not have an account? Register' : 'Already have an account? Login'}
          </Link>
        </form>
      </div>
      <div className={styles.imgContainer}>
        {imgBase64 && <img src={`data:image/jpeg;base64,${imgBase64}`} alt="Preview" />}
      </div>
    </div>
  );
};

export default AuthForm;
