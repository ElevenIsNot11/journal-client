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

import "./App.css"; // Подключаем CSS-стили

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/">Вход</NavLink>
              </li>
              <li>
                <NavLink to="/register">Регистрация</NavLink>
              </li>
              <li>
                <NavLink to="/students">Список студентов</NavLink>
              </li>
              <li>
                <NavLink to="/add">Добавить студента</NavLink>
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
              <li>
                <NavLink to="/users">Список пользователей</NavLink>
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
            <Route path="/add" element={<AddStudent />} />
            <Route path="/students/:id" element={<StudentDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/groups/add" element={<AddGroup />} /> 
            <Route path="/assessments/add/:studentId" element={<AddAssessment />} /> 
            <Route path="/users" element={<UserList />} /> 
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;