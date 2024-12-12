import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/registration', { login, password });
      console.log('Пользователь зарегистрирован:', response.data);
      window.location.reload()
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Регистрация</h1>
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
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegisterForm;