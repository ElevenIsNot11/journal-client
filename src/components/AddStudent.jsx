import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [groupId, setGroupId] = useState(null); 
  const [groups, setGroups] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('/api/groups');
        console.log(response);
        setGroups(response.data);
      } catch (error) {
        console.error('Ошибка получения групп:', error);
        setErrorMessage('Ошибка получения групп');
      }
    };

    fetchGroups();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/students', { name, group: groupId });
      console.log('Студент добавлен:', response.data);
      navigate('/students');
    } catch (error) {
      console.error('Ошибка добавления студента:', error);
      setErrorMessage(error.response.data.error || 'Ошибка добавления студента');
    }
  };

  return (
    <div>
      <h1>Добавить студента</h1>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Имя:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="groupId">Группа:</label>
        <select id="groupId" value={groupId} onChange={(e) => setGroupId(e.target.value)}>
          <option value={null}>Выберите группу</option>
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