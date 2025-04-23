import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Authentication logic here
    if (isAdmin) {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return React.createElement("div", { style: styles.container },
    React.createElement("form", { onSubmit: handleSubmit, style: styles.form },
      React.createElement("h2", null, "Login"),
      
      React.createElement("div", { style: styles.toggle },
        React.createElement("button", {
          type: 'button',
          style: isAdmin ? styles.toggleButton : { ...styles.toggleButton, ...styles.activeToggle },
          onClick: () => setIsAdmin(false)
        }, "User"),
        React.createElement("button", {
          type: 'button',
          style: isAdmin ? { ...styles.toggleButton, ...styles.activeToggle } : styles.toggleButton,
          onClick: () => setIsAdmin(true)
        }, "Admin")
      ),
      
      React.createElement("div", { style: styles.formGroup },
        React.createElement("label", null, "Email"),
        React.createElement("input", {
          type: 'email',
          value: email,
          onChange: (e) => setEmail(e.target.value),
          required: true,
          style: styles.input
        })
      ),
      
      React.createElement("div", { style: styles.formGroup },
        React.createElement("label", null, "Password"),
        React.createElement("input", {
          type: 'password',
          value: password,
          onChange: (e) => setPassword(e.target.value),
          required: true,
          style: styles.input
        })
      ),
      
      React.createElement("button", { type: 'submit', style: styles.submitButton }, "Login"),
      
      React.createElement("p", null,
        "Don't have an account? ",
        React.createElement(Link, { to: "/register", style: styles.link }, "Register")
      )
    )
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh'
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  toggle: {
    display: 'flex',
    marginBottom: '20px'
  },
  toggleButton: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    cursor: 'pointer'
  },
  activeToggle: {
    backgroundColor: '#2c3e50',
    color: 'white'
  },
  formGroup: {
    marginBottom: '15px'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginTop: '5px'
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
  },
  link: {
    color: '#2c3e50',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};

export default Login;