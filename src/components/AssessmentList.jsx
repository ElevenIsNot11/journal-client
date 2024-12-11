import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AssessmentList = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    const fetchAssessments = async () => {
      const response = await axios.get('/api/assessments');
      setAssessments(response.data);
    };

    fetchAssessments();
  }, []);

  const handleDeleteAssessment = async (assessmentId) => {
    try {
      await axios.delete(`/api/assessments/${assessmentId}`);
      setAssessments(assessments.filter((assessment) => assessment._id !== assessmentId));
    } catch (error) {
      console.error('Ошибка удаления оценки:', error);
    }
  };

  return (
    <div>
      <h1>Список оценок</h1>
      <ul>
        {assessments.map((assessment) => (
          <li key={assessment._id}>
            <Link to={`/assessments/${assessment._id}`}>
              Студент: {assessment.student.name}, Предмет: {assessment.subject}, Оценка: {assessment.grade}, Дата: {new Date(assessment.date).toLocaleDateString()}
            </Link>
            <button onClick={() => handleDeleteAssessment(assessment._id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <Link to="/assessments/add">Добавить оценку</Link>
    </div>
  );
};

export default AssessmentList;