import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import StudentDetails from "./components/StudentDetails";
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Profile from './components/Profile';
import Journal from './components/Journal';
import AddGroup from './components/AddGroup';
import AddAssessment from './components/AddAssessment';
import UserList from './components/UserList'; 
import axios from 'axios';

import "./App.css"; // Подключаем CSS-стили
import GroupList from "./components/GroupList";

axios.defaults.port = 8080;

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/login">Вход</NavLink>
              </li>
              <li>
                <NavLink to="/register">Регистрация</NavLink>
              </li>
              <li>
                <NavLink to="/students">Список студентов</NavLink>
              </li>
              <li>
                <NavLink to="/students/add">Добавить студента</NavLink>
              </li>
              <li>
                <NavLink to="/profile">Профиль</NavLink>
              </li>
              <li>
                <NavLink to="/journal">Журнал</NavLink>
              </li>
              <li>
                <NavLink to="/groups/add">Добавить группу</NavLink>
              </li>
            </ul>
          </nav>
        </header> 
        <main>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/add" element={<AddStudent />} />
            <Route path="/student/:id" element={<StudentDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/groups/add" element={<AddGroup />} /> 
            <Route path="/groups" element={<GroupList/>} />
            <Route path="/assessments/add/:studentId" element={<AddAssessment />} /> 
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;