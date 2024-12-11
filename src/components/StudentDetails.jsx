import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`/api/students/${id}`);
        setStudent(response.data);
        setGrades(response.data.grades);
      } catch (error) {
        console.error('Ошибка получения студента:', error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleGradeChange = (index, newGrade) => {
    const updatedGrades = [...grades];
    updatedGrades[index].grade = newGrade;
    setGrades(updatedGrades);
  };

  const handleSaveGrades = async () => {
    try {
      await axios.put(`/api/students/${id}`, { grades });
      // После успешного сохранения можно обновить состояние студента
      // setStudent({ ...student, grades }); 
    } catch (error) {
      console.error('Ошибка сохранения оценок:', error);
    }
  };

  if (!student) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h1>Информация о студенте</h1>
      <p>Имя: {student.name}</p>
      <h2>Оценки:</h2>
      {grades.map((grade, index) => (
        <div key={index}>
          <label htmlFor={`grade-${index}`}>Предмет: {grade.subject}</label>
          <input
            type="number"
            id={`grade-${index}`}
            value={grade.grade}
            onChange={(e) => handleGradeChange(index, parseInt(e.target.value, 10))}
          />
        </div>
      ))}
      <button onClick={handleSaveGrades}>Сохранить изменения</button>
      <button onClick={() => navigate(`/students`)}>Назад к списку</button>
    </div>
  );
};

export default StudentDetails;