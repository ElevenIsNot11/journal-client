import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('id');
    console.log("id", id);
  }, []);

  if (!user) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h1>Мой Профайл</h1>
      <p>Имя пользователя: {user.username}</p>
      <p>Роль: {user.role}</p>
      {/* Добавьте отображение других данных пользователя */}
    </div>
  );
};

export default Profile;