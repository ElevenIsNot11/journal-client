import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Перенаправление на страницу входа, если токен отсутствует
      return;
    }
    
    const fetchStudents = async () => {
      const response = await axios.get('/api/students', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStudents(response.data);
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Список студентов</h1>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            <Link to={`/students/${student._id}`}>
              {student.name}
            </Link>
            {/* <button>Редактировать</button>
            <button>Удалить</button> */}
          </li>
        ))}
      </ul>
      <Link to="/add">Добавить студента</Link>
    </div>
  );
};

export default StudentList;