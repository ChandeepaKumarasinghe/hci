import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login&reg.css'; // Shared styles

const Register = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('user');
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleUserTypeChange = (type) => {
        setUserType(type);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        const strength = Math.min(value.length * 10, 100);
        setPasswordStrength(strength);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get form values
        const name = e.target.name.value.trim();
        const email = e.target.email.value.trim();
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        const adminCode = userType === 'admin' ? e.target.adminCode.value : '';

        // Simulate storing user (without validation for now)
        const users = JSON.parse(localStorage.getItem('furni3d_users')) || [];
        users.push({ name, email, password, role: userType });
        localStorage.setItem('furni3d_users', JSON.stringify(users));
        localStorage.setItem('furni3d_currentUser', JSON.stringify({ name, email, role: userType }));

        // Redirect to home page
        navigate('/');
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <h1>Create Account</h1>
                    <p>Join Furni3D to start shopping</p>

                    <div className="user-type-selector">
                        <button
                            type="button"
                            className={`user-type-btn ${userType === 'user' ? 'active' : ''}`}
                            onClick={() => handleUserTypeChange('user')}
                        >
                            Regular User
                        </button>
                        <button
                            type="button"
                            className={`user-type-btn ${userType === 'admin' ? 'active' : ''}`}
                            onClick={() => handleUserTypeChange('admin')}
                        >
                            Admin
                        </button>
                    </div>

                    <form id="register-form" onSubmit={handleSubmit}>
                        <input type="hidden" name="user-type" value={userType} />

                        {userType === 'admin' && (
                            <div id="admin-code-field" className="admin-code-field">
                                <div className="form-group">
                                    <label htmlFor="admin-code">Admin Access Code</label>
                                    <input type="password" id="admin-code" name="adminCode" placeholder="Enter admin secret code" />
                                    <div id="admin-code-error" className="error-message"></div>
                                </div>
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" name="name" required placeholder="Enter Your Name" />
                            <div id="name-error" className="error-message"></div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" required placeholder="Enter Your Email Address" />
                            <div id="email-error" className="error-message"></div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                placeholder="Enter Your Password"
                                onChange={handlePasswordChange}
                            />
                            <div className="password-strength">
                                <div
                                    className="password-strength-bar"
                                    style={{
                                        width: `${passwordStrength}%`,
                                        backgroundColor: passwordStrength < 40 ? '#dc3545' :
                                            passwordStrength < 70 ? '#ffc107' : '#28a745'
                                    }}
                                ></div>
                            </div>
                            <div id="password-error" className="error-message"></div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirmPassword"
                                required
                                placeholder="Re-enter Your Password"
                            />
                            <div id="confirm-error" className="error-message"></div>
                        </div>

                        <button type="submit" className="btn">Create Account</button>
                        <div id="success-message" className="success-message"></div>
                    </form>

                    <div className="auth-footer">
                        <p>Already have an account? <a href="/login">Sign in</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;