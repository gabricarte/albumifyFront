import React from 'react';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';



interface RegisterUser {
  username: string;
  email: string;
  password: string;
  profileImageBase64: string;
}

const Register: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [profileImageBase64, setProfileImageBase64] = React.useState<string>('');
  const [imagePreview, setImagePreview] = React.useState<string>('');
  const navigate = useNavigate();

 
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const newUser: RegisterUser = {
      username,
      email,
      password,
      profileImageBase64
    };

    const url = 'http://localhost:8080/albumify/register'; 

    try {
    console.log(newUser);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Registration successful!');
      alert('Registration successful!')
      const data = await response.json();
      sessionStorage.setItem('token', data.token);
      navigate('/home');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Verify if the selected file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        e.target.value = ''; // Reset the input field to clear the invalid file
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProfileImageBase64(reader.result);
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };



  return (
    <div className={styles.register}>
      <form>
        <InputField
          id="username"
          name="Username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          icon={PersonIcon}
        />

        <InputField
          id="email"
          name="Email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={EmailIcon}
        />

        <InputField
          id="password"
          name="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={LockIcon}
        />

        <InputField
          id="profileImage"
          name="Profile Image"
          type="file"
          placeholder=""
          value=""
          onChange={handleFileChange}
          icon={InsertPhotoIcon}
        />
        

        <Button label="Register" onClick={handleRegister}/>
      </form>

      <div className={styles.imgContainer}>
      {imagePreview && (
          <img src={imagePreview} />
        )}
      </div>
    </div>
  );
};

export default Register;
