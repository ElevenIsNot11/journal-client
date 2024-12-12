import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!login || !password) {
      setErrorMessage('Заполните все поля');
      return;
    }

    try {
      const authResponse = await axios.post('/login', { login, password });
      const userId = authResponse.data.id; 
      localStorage.setItem('userId', userId);

      const studentResponse = await axios.post(`/student/user`, {id: userId}); // Fetch all students
      console.log(studentResponse);
      const student = studentResponse.data

      if (student) {
        localStorage.setItem('studentId', student._id);
        navigate('/journal');
      } else {
        setErrorMessage('Студент не найден для данного пользователя.');
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      setErrorMessage(error.response?.data?.error || 'Ошибка авторизации');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-container">Загрузка данных...</div>;
  }

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
        <button type="submit" className="submit-button">Войти</button>
      </form>
    </div>
  );
};

export default LoginForm;