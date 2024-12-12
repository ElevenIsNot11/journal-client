import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState(null);
  const [newGrade, setNewGrade] = useState(''); // Changed to empty string
  const [newSubject, setNewSubject] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`/students/${id}`);
        setStudent(response.data);
        setGrades(response.data.grades || []);
      } catch (error) {
        console.error('Ошибка получения студента:', error);
        setError('Ошибка загрузки данных студента.');
      }
    };
    fetchStudent();
  }, [id]);



  const handleGradeChange = (index, newGrade) => {
    const updatedGrades = [...grades];
    updatedGrades[index].grade = newGrade;
    setGrades(updatedGrades);
  };

  console.log(student);
  const handleAddGrade = async (e) => { // Added e parameter
    e.preventDefault(); // Prevent default form submission behavior
    if (newGrade === '' || newSubject === '') return;

    try {
      console.log(newGrade, newSubject);
      const newGradeObj = { grade: parseInt(newGrade, 10), subject: newSubject }; 
      const updatedStudent = { ...student, grades: [...student.grades, newGradeObj] }; 
      const response = await axios.patch(`/student/${student.id}`, updatedStudent);
      setGrades([...grades, response.data]);
      setNewGrade('');
      setNewSubject('');
    } catch (error) {
      console.error("Ошибка добавления оценки:", error);
      setError("Ошибка добавления оценки.");
    }
  };

  const handleDeleteGrade = async (gradeId) => {
    try {
      await axios.delete(`/user/delete/${id}/${gradeId}`);
      setGrades(grades.filter((grade) => grade._id !== gradeId));
    } catch (error) {
      console.error("Ошибка удаления оценки:", error);
      setError("Ошибка удаления оценки.");
    }
  };

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!student) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h1>Информация о студенте</h1>
      <p>Имя: {student.name}</p>
      <h2>Оценки:</h2>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Оценка</th>
            <th>Предмет</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, index) => (
            <tr key={grade._id}>
              <td>{index + 1}</td>
              <td>{grade.grade}</td>
              <td>{grade.subject}</td>
              <td><button onClick={() => handleDeleteGrade(grade._id)}>X</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Добавить оценку</h2>
      <form onSubmit={handleAddGrade}> {/*Added onSubmit*/}
        <label htmlFor="newGrade">Оценка:</label>
        <select id="newGrade" value={newGrade} onChange={(e) => setNewGrade(e.target.value)}>
          <option value="">Выберите оценку</option>
          {[1, 2, 3, 4, 5].map((grade) => (
            <option key={grade} value={grade}>{grade}</option>
          ))}
        </select>

        <label htmlFor="newSubject">Предмет:</label>
        <select id="newSubject" value={newSubject} onChange={(e) => setNewSubject(e.target.value)}>
          <option value="">Выберите предмет</option>
          {['математика', 'русский язык', 'литература', 'информатика'].map((subject) => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
        <button type="submit">Добавить</button>
      </form>
      <button onClick={() => navigate('/students')}>Назад к списку</button>
    </div>
  );
};

export default StudentDetails;