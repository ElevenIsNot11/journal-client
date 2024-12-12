import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddGroup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null); // Clear previous error messages

    if (!name) {
      setErrorMessage('Введите название группы');
      return;
    }

    try {
      const response = await axios.post('/group/new', { name });
      console.log('Группа добавлена:', response.data);
      navigate('/groups'); // Redirect to the groups list
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Ошибка добавления группы');
    }
  };

  return (
    <div className="add-group-container">
      <h1>Добавить группу</h1>
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Название группы:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Добавить</button>
      </form>
    </div>
  );
};

export default AddGroup;