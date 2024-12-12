import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get('/student/');
      setStudents(response.data);
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Список студентов</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <Link to={`http://localhost:3000/student/${student.id}`}>
              {student.name}
            </Link>
            {/* <button>Редактировать</button>
            <button>Удалить</button> */}
          </li>
        ))}
      </ul>
      <Link to="http://localhost:3000/students/add">Добавить студента</Link>
    </div>
  );
};

export default StudentList;