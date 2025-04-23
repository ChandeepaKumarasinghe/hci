import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './m.css';

function UserAdminLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Authentication logic here
    if (isAdmin) {
      // Redirect to admin dashboard
      navigate('/admin-dashboard');
    } else {
      // Redirect to user dashboard or home
      navigate('/');
    }
  };

  return React.createElement('div', { className: 'login-container' },
    React.createElement('h2', null, isLogin ? 'Login' : 'Register'),
    React.createElement('div', { className: 'toggle-buttons' },
      React.createElement('button', { onClick: () => setIsAdmin(false) }, 'User'),
      React.createElement('button', { onClick: () => setIsAdmin(true) }, 'Admin')
    ),
    React.createElement('form', { onSubmit: handleSubmit },
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', null, 'Username:'),
        React.createElement('input', {
          type: 'text',
          value: username,
          onChange: (e) => setUsername(e.target.value),
          required: true
        })
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', null, 'Password:'),
        React.createElement('input', {
          type: 'password',
          value: password,
          onChange: (e) => setPassword(e.target.value),
          required: true
        })
      ),
      !isLogin && React.createElement('div', { className: 'form-group' },
        React.createElement('label', null, 'Confirm Password:'),
        React.createElement('input', { type: 'password', required: true })
      ),
      React.createElement('button', { type: 'submit' }, isLogin ? 'Login' : 'Register'),
      React.createElement('p', null,
        isLogin ? "Don't have an account? " : "Already have an account? ",
        React.createElement('button', {
          type: 'button',
          onClick: () => setIsLogin(!isLogin)
        }, isLogin ? 'Register' : 'Login')
      )
    ),
    React.createElement(Link, { to: '/', className: 'back-button' }, 'Back to Home')
  );
}

export default UserAdminLogin;