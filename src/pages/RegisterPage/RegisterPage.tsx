import React from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';

const RegisterPage: React.FC = () => {
  const handleRegister = async (data: { username: string; email?: string; password: string; imgUrl?: string }) => {
    try {
      const formData = new FormData();
      formData.append('username', data.username);
      if (data.email) {
        formData.append('email', data.email);
      }
      formData.append('password', data.password);
      if (data.imgUrl) {
        formData.append('imgUrl', data.imgUrl);
      }
      const response = await fetch('http://localhost:8080/albumify/register', {
        method: 'POST',
        body: formData,
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
