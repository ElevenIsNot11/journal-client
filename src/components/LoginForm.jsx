import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null); // Clear any previous error messages

    if (!login || !password) {
      setErrorMessage('Заполните все поля');
      return;
    }

    try {
      const response = await axios.post('/login', { login, password });
      console.log('Успешная авторизация:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/journal'); // Redirect to the journal page
    } catch (error) {
      console.error('Ошибка авторизации:', error); // Log the full error for debugging
      setErrorMessage(error.response?.data?.error || 'Ошибка авторизации');
    }
  };

  return (
    <div className="login-form-container">
      <h1>Авторизация</h1>
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login">Имя пользователя:</label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginForm;