import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null); // Clear previous error messages

    if (!login || !password) {
      setErrorMessage('Заполните все поля');
      return;
    }

    try {
      const response = await axios.post('/registration', { login, password });
      console.log('Пользователь зарегистрирован:', response.data);
      navigate('/login'); // Redirect to the login page after successful registration
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Ошибка регистрации');
    }
  };

  return (
    <div className="register-form-container">
      <h1>Регистрация</h1>
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Имя пользователя:</label>
          <input
            type="text"
            id="username"
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
        <button type="submit" className="submit-button">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegisterForm;