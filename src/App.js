// App.js
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import './app.css';
import Courses from './components/Courses/Courses';

import CourseContent from './components/course-content/Course-content';


// admin routes
import Admin from './components/Admin/Dashboard/Admin_Dashboard';
import CoursesPage from './components/Admin/components/Course-creation';
// PrivateRoute Component
const PrivateRoute = ({ element, isAuthenticated, allowedRole, userRole }) => {
  return isAuthenticated && userRole === allowedRole ? element : <Navigate to="/" />;
};

function App() {
  // Simulate authentication state (false by default, meaning the user is not logged in)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(''); // Set to 'admin' or 'student' after login

 
  return (
    <>
      <Routes>
        {/* Public Route for Login */}
        <Route path="/" element={<Login setAuth={setIsAuthenticated} setRole={setUserRole} />} />
        
        <Route path='/courses' element={<Courses/>}/>
        
        <Route
          path="/admin"
          element={<PrivateRoute element={<Admin />} isAuthenticated={isAuthenticated} allowedRole="admin" userRole={userRole} />}
        />
         <Route path='/course-create' element={<CoursesPage/>}/>
        {/* Protected Route for Dashboard */}
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} isAuthenticated={isAuthenticated} allowedRole="student" userRole={userRole} />}
        />
        <Route path='/course-content' element={<CourseContent />}/>

        {/* Example of another protected route */}
        {/* <Route path="/courses/:courseName" element={<PrivateRoute element={<Course />} isAuthenticated={isAuthenticated} />} /> */}
        {/* <Route path="/certificate" element={<PrivateRoute element={<Certificate />} isAuthenticated={isAuthenticated} />} /> */}
      </Routes>
    </>
  );
}

export default App;
