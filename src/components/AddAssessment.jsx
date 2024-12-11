import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddAssessment = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/assessments', { student: studentId, subject, grade });
      console.log('Оценка добавлена:', response.data);
      navigate(`/students/${studentId}`); // Перенаправление на страницу студента
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Добавить оценку</h1>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="subject">Предмет:</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <label htmlFor="grade">Оценка:</label>
        <input
          type="number"
          id="grade"
          value={grade}
          onChange={(e) => setGrade(parseInt(e.target.value, 10))}
        />
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};

export default AddAssessment;