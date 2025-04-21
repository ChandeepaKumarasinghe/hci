import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login&reg.css'; // We'll create this for shared styles

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simply redirect to home page without checking anything
        navigate('/');
    };

    return (
        <div className="auth-page">
            <div className="login-container">
                <h1>Login</h1>
                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" id="email" placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required />
                    </div>
                    <button type="submit" className="btn">Login</button>
                </form>
                <div className="auth-footer">
                    <p>Don't have an account? <a href="/register">Create one</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;