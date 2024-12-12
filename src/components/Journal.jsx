import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Journal = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state


  const fetchJournalData = useCallback(async () => {
    try {
      const [studentResponse, groupResponse] = await Promise.all([
        axios.get('/student/'),
        axios.get('/group/'),
      ]);

      setStudents(studentResponse.data);
      setGroups(groupResponse.data);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      setError('Ошибка загрузки данных журнала.'); // Set error message
    } finally {
      setLoading(false); // Set loading to false after fetch completes
    }
  }, []);

  useEffect(() => {
    fetchJournalData();
  }, [fetchJournalData]);

  const getGroupForStudent = (studentId) => {
    const student = students.find((s) => s._id === studentId);
    return student ? groups.find((g) => g._id === student?.group) : null; // Handle case where student is not found
  };

  if (loading) {
    return <div>Загрузка...</div>; // Show loading indicator
  }

  if (error) {
    return <div>Ошибка: {error}</div>; // Show error message
  }

  console.log(students);

  return (
    <div>
      <h1>Журнал</h1>
      <table className="journal-table">
        <thead>
          <tr>
            <th>Имя студента</th>
            <th>Группа</th>
            <th>Оценки</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{getGroupForStudent(student.id)?.name || 'Без группы'}</td>
              <td>
                {student.grades?.map((grade) => ( //Optional chaining here
                  <div key={grade._id}>
                    {grade.subject}: {grade.grade} {/* Access grade.grade */}
                  </div>
                )) || 'Оценок нет'} {/* Handle case where student.grades is null or undefined */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Journal;