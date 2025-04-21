import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RoomDesigner from './components/RoomDesigner';
import Login from './components/Login';
import Register from './components/Register';
import Payment from './components/Payment';
import AdminPanel from './components/AdminPanel';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Main Room Designer Route */}
          <Route path="/" element={
            <>
              <h1>3D Room Designer</h1>
              <RoomDesigner />
            </>
          } />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/roomdesigner" element={<RoomDesigner />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/adminpanel" element={<AdminPanel />} />

          {/* Redirect any unknown paths to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;