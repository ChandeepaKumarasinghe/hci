import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RoomDesigner from './RoomDesigner';
import Login from './Login';
import Register from './Register';
import Payment from './Payment';
import AdminPanel from './AdminPanel';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Main Room Designer Route */}
          <Route path="/" element={
            <>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px'
              }}>
                <h1> &nbsp; 3D Room Designer </h1> <a href="/login" style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  padding: '10px 20px',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  display: 'inline-block',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.3s',
                }}>Login</a>
              </div>
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