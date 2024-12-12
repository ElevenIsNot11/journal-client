import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const GroupList = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await axios.get('/group/');
      setGroups(response.data);
    };

    fetchGroups();
  }, []);

  const handleDeleteGroup = async (groupId) => {
    try {
      await axios.delete(`/group/${groupId}`);
      setGroups(groups.filter((group) => group._id !== groupId));
    } catch (error) {
      console.error('Ошибка удаления группы:', error);
    }
  };

  return (
    <div>
      <h1>Список групп</h1>
      <ul>
        {groups.map((group) => (
          <li key={group._id}>
            <Link to={`http://localhost:3000/group/${group._id}`}>{group.name}</Link>
            {/* <button onClick={() => handleDeleteGroup(group._id)}>Удалить</button> */}
          </li>
        ))}
      </ul>
      <Link to="http://localhost:3000/groups/add">Добавить группу</Link>
    </div>
  );
};

export default GroupList;