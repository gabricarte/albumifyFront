import React from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (data: { username: string; password: string }) => {
    try {
      const response = await fetch('http://localhost:8080/albumify/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        sessionStorage.setItem('token', responseData.token);
        navigate('/home');
      } else {
        console.error('Error: ', response.statusText);
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return <AuthForm isLogin={true} handleSubmit={handleLogin} />;
};

export default LoginPage;
