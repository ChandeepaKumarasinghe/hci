import React, { useState } from 'react';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmitAsRole = (role) => {
        console.log(`${role} login submitted:`, { email, password, rememberMe });

        // You can handle logic based on role here
        if (role === 'admin') {
            // Admin login logic or redirect
            window.location.href = '/adminpanel';
        } else if (role === 'user') {
            // User login logic or redirect
            alert('User login clicked');
        }
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: '40px auto',
            padding: '40px',
            borderRadius: '15px',
            boxShadow: '0 0 15px rgba(0,0,0,0.2)',
            background: '#ffffff'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Sign In</h2>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#555' }}>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '5px',
                        border: '1px solid #ccc'
                    }}
                    placeholder="Enter your email"
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#555' }}>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '5px',
                        border: '1px solid #ccc'
                    }}
                    placeholder="Enter your password"
                />
            </div>

            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ marginRight: '8px' }}
                />
                <label style={{ color: '#555' }}>Remember me</label>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button
                    type="button"
                    onClick={() => handleSubmitAsRole('admin')}
                    style={{
                        flex: 1,
                        padding: '14px',
                        backgroundColor: '#764ba2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#5d3a8a'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#764ba2'}
                >
                    Admin Sign In
                </button>

                <button
                    type="button"
                    onClick={() => handleSubmitAsRole('user')}
                    style={{
                        flex: 1,
                        padding: '14px',
                        backgroundColor: '#764ba2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#5d3a8a'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#764ba2'}
                >
                    User Sign In
                </button>
            </div>
            <div style={{ textAlign: 'center' }}>
                <span style={{ color: '#777', fontSize: '14px' }}>Don't have an account? </span>
                <a href="/register" style={{
                    color: '#764ba2',
                    fontSize: '14px',
                    textDecoration: 'none',
                    fontWeight: '500',
                    transition: 'color 0.3s'
                }}>Sign up</a>
            </div>
        </div>
    );
};

export default LoginForm;
