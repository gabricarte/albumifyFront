import React from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';

const RegisterPage: React.FC = () => {
  const handleRegister = async (data: { username: string; email?: string; password: string; imgUrl: string }) => {
    try {
      const response = await fetch('http://localhost:8080/albumify/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Registration successful');
      } else {
        console.error('Error: ', response.statusText);
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return <AuthForm isLogin={false} handleSubmit={handleRegister} />;
};

export default RegisterPage;
