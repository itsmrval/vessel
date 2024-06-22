import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/Layout/PrivateRoute';

function App() {
  return (
    
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<DashboardPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
