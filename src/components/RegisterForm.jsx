import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState(''); // State for selected student ID
  const [students, setStudents] = useState([]); // State for fetched students
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/student/');
        setStudents(response.data);
      } catch (error) {
        setErrorMessage('Ошибка загрузки списка студентов');
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!login || !password || !studentId) {
      setErrorMessage('Заполните все поля');
      return;
    }

    try {
      const response = await axios.post('/registration', { login, password });
      const student = students.find((student_in_loop) => student_in_loop.name === studentId); 
      console.log("-----", student, studentId);
      const updatedStudent = {...student, userId: response.data.id }; 
      console.log("updated student", updatedStudent)
      await axios.patch(`/student/${student.id}`, updatedStudent);
      console.log('Пользователь зарегистрирован:', response.data);
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Ошибка регистрации');
    }
  };

  if (loading) {
    return <div>Загрузка списка студентов...</div>;
  }

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
        <div className="form-group">
          <label htmlFor="studentId">Студент:</label>
          <select
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          >
            <option value="">Выберите студента</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;