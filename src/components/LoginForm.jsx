import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginForm = () => {
  const navigate = useNavigate(); // Use useNavigate
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/login', { login, password });
      console.log('Успешная авторизация:', response.data);
      // Сохранить токен в localStorage (или другое хранилище)
      localStorage.setItem('token', response.data.token); // Adjust as needed for your token structure

      // Перенаправить пользователя на главную страницу или другую защищенную страницу
      navigate('http://localhost:3000/journal'); // Use navigate to change the route
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Ошибка авторизации'); // Safer error handling
    }
  };

  return (
    <div>
      <h1>Авторизация</h1>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Имя пользователя:</label>
        <input
          type="text"
          id="username"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <label htmlFor="password">Пароль:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginForm;