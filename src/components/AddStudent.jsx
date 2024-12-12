import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [groupId, setGroupId] = useState('');
  const [groups, setGroups] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('/group/');
        setGroups(response.data);
      } catch (error) {
        setErrorMessage('Ошибка получения групп');
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null); // Clear any previous error messages

    if (!name) {
      setErrorMessage('Введите имя студента');
      return;
    }
    if (!groupId) {
        setErrorMessage('Выберите группу');
        return;
    }

    try {
      const response = await axios.post('/student/new', { name, groupId });
      console.log('Студент добавлен:', response.data);
      navigate('/students'); // Redirect to the student list page
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Ошибка добавления студента');
    }
  };


  if (loading) {
    return <div className="loading-container">Загрузка групп...</div>;
  }

  if (errorMessage) {
    return (
      <div className="error-container">
        <p className="error-message">{errorMessage}</p>
      </div>
    );
  }



  return (
    <div className="add-student-container">
      <h1>Добавить студента</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="groupId">Группа:</label>
          <select
            id="groupId"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            required
          >
            <option value="">Выберите группу</option>
            {groups.map((group) => (
              <option key={group._id} value={group._id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Добавить</button>
      </form>
    </div>
  );
};

export default AddStudent;