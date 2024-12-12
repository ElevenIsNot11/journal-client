import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const StudentList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]); // Add groups state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const [studentResponse, groupResponse] = await Promise.all([
          axios.get('/student/'),
          axios.get('/group/'),
        ]);
        setStudents(studentResponse.data);
        setGroups(groupResponse.data);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        setError("Ошибка загрузки данных.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, []);

  const getGroupForStudent = (studentId) => {
    const student = students.find((s) => s._id === studentId);
    return student ? groups.find((g) => g._id === student.group) : null;
  };


  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className="student-list-container">
      <h1>Список студентов</h1>
      <table className="student-list-table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Группа</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id} className="student-row">
              <td>
                <Link to={`/student/${student.id}`}>{student.name}</Link>
              </td>
              <td>{getGroupForStudent(student._id)?.name || 'Без группы'}</td>
              <td>
                <button className="edit-button">Редактировать</button>
                <button className="delete-button">Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/students/add" className="add-student-link">Добавить студента</Link>
    </div>
  );
};

export default StudentList;