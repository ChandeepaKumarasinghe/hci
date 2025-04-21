import React from 'react';
import RoomDesigner from './components/RoomDesigner';
import Login from './components/Login';
import Register from './components/Register';
import './styles.css';

function App() {
  return (
    <div className="app-container">
      <h1>3D Room Designer</h1>
      <RoomDesigner />
    </div>
  );
}

export default App;