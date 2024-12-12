import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import cloneDeep from 'lodash/cloneDeep';

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
        console.log(response.data);
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

  const handleAddGrade = async (e) => {
    e.preventDefault(); 
    if (newGrade === '' || newSubject === '') return;

    try {
      console.log(newGrade, newSubject);
      const newGradeObj = { value: parseInt(newGrade, 10), subject: newSubject }; 
      const updatedStudent = { ...student, grades: [...student.grades, newGradeObj] }; 
      console.log("updated student", updatedStudent);
      const response = await axios.patch(`/student/${student.id}`, updatedStudent);
      setGrades([...grades, response.data]);
      setNewGrade('');
      setNewSubject('');
      window.location.reload()
    } catch (error) {
      console.error("Ошибка добавления оценки:", error);
      setError("Ошибка добавления оценки.");
    }
  };

  console.log("grades", grades);

  const handleDeleteGrade = async (gradeId) => {
    try {
      console.log("student   ",student);
      console.log(gradeId);
      student.grades = student.grades.filter((grade) => grade.id !== gradeId);
      const response = await axios.patch(`/student/${student.id}`, student);
      setStudent(response.data); // Update the student state
      setGrades(response.data.grades); // Update the grades array in your state
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
    <div className="student-details-container">
      <h1>Информация о студенте: {student.name}</h1>
  
      {/* Grades Section */}
      <div className="grades-section">
        <h2>Оценки:</h2>
        {grades.length > 0 ? (
          <table className="grades-table">
            <tbody>
              {grades.map((grade, index) => (
                <tr key={grade.id} className="grade-row">
                  <td>{index + 1}</td>
                  <td>{grade.value}</td>
                  <td>{grade.subject}</td>
                  <td>
                    <button className="delete-button" onClick={() => handleDeleteGrade(grade.id)}>
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Оценок нет.</p>
        )}
      </div>
  
      {/* Add Grade Section */}
      <div className="add-grade-section">
        <h2>Добавить оценку</h2>
        <form onSubmit={handleAddGrade}>
          <div className="form-group">
            <label htmlFor="newGrade">Оценка:</label>
            <select id="newGrade" className="custom-select" value={newGrade} onChange={(e) => setNewGrade(e.target.value)}>
              <option value="">Выберите оценку</option>
              {[1, 2, 3, 4, 5].map((grade) => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="newSubject">Предмет:</label>
            <select id="newSubject" className="custom-select" value={newSubject} onChange={(e) => setNewSubject(e.target.value)}>
              <option value="">Выберите предмет</option>
              {['математика', 'русский язык', 'литература', 'информатика'].map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="add-button">Добавить</button>
        </form>
      </div>
  
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate('/students')}>Назад к списку</button>
    </div>
  );
};

export default StudentDetails;