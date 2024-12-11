import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Journal = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [assessments, setAssessments] = useState([]);

  const fetchJournalData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token'); 

      if (!token) {
        navigate('/login');
        return; 
      }

      const [studentResponse, groupResponse, assessmentResponse] = await Promise.all([
        axios.get('/api/students', {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }),
        axios.get('/api/groups', {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }),
        axios.get('/api/assessments', {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        })
      ]); 

      setStudents(studentResponse.data);
      setGroups(groupResponse.data);
      setAssessments(assessmentResponse.data);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  }, []);

  useEffect(() => {
    fetchJournalData();
  }, [fetchJournalData]);

  const getAssessmentsForStudent = (studentId) => {
    return assessments.filter((assessment) => assessment.student._id === studentId);
  };

  const getGroupForStudent = (studentId) => {
    const student = students.find((s) => s._id === studentId);
    return groups.find((g) => g._id === student.group);
  };

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
              <td>{getGroupForStudent(student._id)?.name || 'Без группы'}</td>
              <td>
                {getAssessmentsForStudent(student._id).map((assessment) => (
                  <div key={assessment._id}>
                    {assessment.subject}: {assessment.grade}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Journal;