import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [groupId, setGroupId] = useState(''); // Changed to empty string
  const [groups, setGroups] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('/group/');
        setGroups(response.data);
      } catch (error) {
        setErrorMessage('Ошибка получения групп');
      } finally {
        setLoading(false); // Set loading to false after fetch completes (success or failure)
      }
    };

    fetchGroups();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!groupId) {
        setErrorMessage('Выберите группу');
        return;
    }

    try {
      const response = await axios.post('/student/new', { name, groupId });
      console.log('Студент добавлен:', response.data);
      window.location.reload()
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Ошибка добавления студента'); // Safer error handling
    }
  };

  return (
    <div>
      <h1>Добавить студента</h1>
      {loading && <div>Загрузка групп...</div>} {/* Display loading message */}
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Имя:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="groupId">Группа:</label>
        <select 
          id="groupId" 
          value={groupId} 
          onChange={(e) => setGroupId(e.target.value)}
          required
        >
          <option value="">Выберите группу</option> {/* Empty string as default value */}
          {groups.map((group) => (
            <option key={group._id} value={group._id}>
              {group.name}
            </option>
          ))}
        </select>
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};

export default AddStudent;