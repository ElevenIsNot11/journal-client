import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import StudentDetails from './components/StudentDetails';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Profile from './components/Profile';
import Journal from './components/Journal';
import AddGroup from './components/AddGroup';
import AddAssessment from './components/AddAssessment';
import UserList from './components/UserList'; 

const App = () => {
    return (
      <BrowserRouter>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<LoginForm />} />
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
          </ErrorBoundary>
      </BrowserRouter>
    );
  };
  export default App;